// ===== APP =====
const { useState: useSt, useEffect: useEf, useCallback: useCb, useRef: useRf, useMemo: useMe } = React;

function App() {
  const [s, setS] = useSt({ uq: [], csq: [], loot: [], variant: "safe", gc: false, dx: false, bs: 0, bossDmg: {}, muted: false });
  const [loading, setLoading] = useSt(true);
  const [tab, setTab] = useSt("quests");
  const [lua, setLua] = useSt(null);
  const [pua, setPua] = useSt(null);
  const [lootUp, setLootUp] = useSt(null);
  const [tweaksOpen, setTweaksOpen] = useSt(false);
  const [tweaksAvail, setTweaksAvail] = useSt(false);
  const plr = useRf(1);
  const puaQueue = useRf([]);
  const lootQueue = useRf([]);

  useEf(() => { ebLoad().then(d => { setS(d); plr.current = getLvl(calcXP(d)).level; setLoading(false); }); }, []);

  // tweaks wiring
  useEf(() => {
    const h = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", h);
    setTweaksAvail(true);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", h);
  }, []);

  useEf(() => {
    const allR = PARTY.every(m => !m.hiddenUntilQuest || s.uq.includes(m.hiddenUntilQuest));
    if (allR && !s.dx && s.uq.length > 0) {
      const ns = { ...s, gc: true, dx: true }; setS(ns); ebSave(ns);
    }
  }, [s.uq]);

  const xp = calcXP(s);
  const lvl = getLvl(xp);
  const nxt = LEVELS.find(l => l.xp > xp);
  const THEMES = s.variant === "bold" ? THEMES_BOLD : THEMES_SAFE;
  const t = THEMES[lvl.level - 1];

  const chkLvl = useCb((ns) => {
    const x = calcXP(ns);
    const nl = getLvl(x);
    if (nl.level > plr.current) {
      const ns2 = { ...ns, bs: 0 };
      setS(ns2); ebSave(ns2);
      setLua(nl);
      if (!ns.muted) SFX.levelUp();
      plr.current = nl.level;
    }
  }, []);

  const dropLoot = useCb((tier, ns) => {
    const it = rollLoot(tier);
    const ns2 = { ...ns, loot: [...(ns.loot || []), it] };
    setS(ns2); ebSave(ns2);
    lootQueue.current.push(it);
  }, []);

  const unlockQ = useCb(async (n) => {
    const q = QUESTS.find(x => x.num === n);
    const ns = { ...s, uq: [...s.uq, n] };
    const tier = q?.tier || "common";
    const it = rollLoot(tier);
    const ns2 = { ...ns, loot: [...(ns.loot || []), it] };
    setS(ns2); await ebSave(ns2);
    const willLvl = getLvl(calcXP(ns2)).level > plr.current;
    const perk = PERKS_DATA.find(p => p.questNum === n);
    // queue order: level → perk → loot
    setTimeout(() => {
      chkLvl(ns2);
      if (perk) {
        if (willLvl) puaQueue.current.push(perk);
        else setTimeout(() => setPua(perk), 600);
      }
      lootQueue.current.push(it);
      if (!willLvl && !perk) {
        const nxt = lootQueue.current.shift();
        if (nxt) setTimeout(() => { setLootUp(nxt); if (!s.muted) SFX.loot(nxt.tier); }, 500);
      }
    }, 100);
  }, [s, chkLvl]);

  const doneS = useCb(async (id) => {
    const sq = SIDE_QUESTS.find(x => x.id === id);
    const ns = { ...s, csq: [...s.csq, id], bs: Math.min(3, (s.bs || 0) + 1) };
    setS(ns); await ebSave(ns);
    chkLvl(ns);
    // small loot chance on side quests
    if (Math.random() < 0.5) {
      const tier = sq.xp >= 75 ? "rare" : "common";
      const it = rollLoot(tier);
      const ns2 = { ...ns, loot: [...(ns.loot || []), it] };
      setS(ns2); await ebSave(ns2);
      setTimeout(() => { setLootUp(it); if (!s.muted) SFX.loot(tier); }, 400);
    }
  }, [s, chkLvl]);

  const onBossHit = useCb((questNum, dmg) => {
    const cur = (s.bossDmg || {})[questNum] || 0;
    const q = QUESTS.find(x => x.num === questNum);
    const newDmg = Math.min(q.boss.hp, cur + dmg);
    const ns = { ...s, bossDmg: { ...(s.bossDmg || {}), [questNum]: newDmg } };
    setS(ns); ebSave(ns);
    if (!s.muted) SFX.bossHit();
    if (newDmg >= q.boss.hp && cur < q.boss.hp) {
      // drop legendary if final boss, else epic
      setTimeout(() => {
        if (!s.muted) SFX.crit();
        const tier = q.num === 10 ? "legendary" : "epic";
        const it = rollLoot(tier);
        const ns2 = { ...ns, loot: [...(ns.loot || []), it] };
        setS(ns2); ebSave(ns2);
        setLootUp(it);
        if (!s.muted) SFX.loot(tier);
      }, 400);
    }
  }, [s]);

  const dismissLua = useCb(() => {
    setLua(null);
    if (puaQueue.current.length > 0) {
      const n = puaQueue.current.shift();
      setTimeout(() => setPua(n), 300);
    } else if (lootQueue.current.length > 0) {
      const n = lootQueue.current.shift();
      setTimeout(() => { setLootUp(n); if (!s.muted) SFX.loot(n.tier); }, 300);
    }
  }, [s.muted]);

  const dismissPua = useCb(() => {
    setPua(null);
    if (lootQueue.current.length > 0) {
      const n = lootQueue.current.shift();
      setTimeout(() => { setLootUp(n); if (!s.muted) SFX.loot(n.tier); }, 300);
    }
  }, [s.muted]);

  const dismissLoot = useCb(() => {
    setLootUp(null);
    if (lootQueue.current.length > 0) {
      const n = lootQueue.current.shift();
      setTimeout(() => { setLootUp(n); if (!s.muted) SFX.loot(n.tier); }, 300);
    }
  }, [s.muted]);

  const setVariant = useCb((v) => {
    const ns = { ...s, variant: v }; setS(ns); ebSave(ns);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { variant: v } }, "*");
  }, [s]);

  const toggleMute = useCb(() => {
    const ns = { ...s, muted: !s.muted }; setS(ns); ebSave(ns);
  }, [s]);

  const resetAll = useCb(() => {
    if (!window.confirm("Reset hela kampanjen? All XP, loot och progress försvinner.")) return;
    const ns = { uq: [], csq: [], loot: [], variant: s.variant, gc: false, dx: false, bs: 0, bossDmg: {}, muted: s.muted };
    setS(ns); ebSave(ns); plr.current = 1;
  }, [s]);

  const avSQ = SIDE_QUESTS.filter(sq => lvl.level >= sq.unlocksAtLevel);
  const pendSQ = avSQ.filter(sq => !s.csq.includes(sq.id));
  const lockedSQ = SIDE_QUESTS.filter(sq => lvl.level < sq.unlocksAtLevel);
  const jonnaQuests = SIDE_QUESTS.filter(sq => sq.type === "JONNA");

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0508" }}>
      <div style={{ color: "#c9a84c", fontFamily: "'Cinzel',serif", letterSpacing: "3px", fontSize: "13px" }}>
        ◆ LOADING CAMPAIGN ◆
      </div>
    </div>
  );

  return (
    <div className="min-h-screen transition-all duration-1000 app-container" style={{
      background: `linear-gradient(180deg, ${t.bg1} 0%, ${t.bg2} 100%)`,
      fontFamily: "'Inter',system-ui,sans-serif",
      animation: lvl.level === 10 ? "bgFlicker 2.5s ease-in-out infinite" : undefined,
    }}>
      <FireEffect level={lvl.level} variant={s.variant} />

      <style>{`
@keyframes levelUp{0%{opacity:0;transform:scale(.5) translateY(20px)}20%{opacity:1;transform:scale(1.1) translateY(0)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes fireFloat{0%{transform:translateY(0) scale(1);opacity:0.85}50%{transform:translateY(-50px) scale(1.15);opacity:0.6}100%{transform:translateY(-110px) scale(0.35);opacity:0}}
@keyframes emberDrift{0%{transform:translateY(0) translateX(0);opacity:0.9}30%{transform:translateY(-30px) translateX(8px);opacity:0.7}60%{transform:translateY(-70px) translateX(-5px);opacity:0.4}100%{transform:translateY(-130px) translateX(4px);opacity:0}}
@keyframes bgFlicker{0%,100%{opacity:1}50%{opacity:0.93}}
@keyframes perkReveal{0%{opacity:0;transform:scale(0.6) translateY(30px)}25%{opacity:1;transform:scale(1.05) translateY(0)}100%{opacity:1;transform:scale(1) translateY(0)}}
@keyframes lootReveal{0%{opacity:0;transform:scale(0.5) rotateX(40deg)}30%{opacity:1;transform:scale(1.08) rotateX(0)}100%{opacity:1;transform:scale(1) rotateX(0)}}
@keyframes lootPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.015)}}
@keyframes radialPulse{0%{opacity:0;transform:scale(0.8)}50%{opacity:1}100%{opacity:0;transform:scale(1.8)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px) rotate(-1deg)}40%{transform:translateX(4px) rotate(1deg)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
@keyframes perkShimmer{0%{background-position:-300% center}100%{background-position:300% center}}
@keyframes perkIconPop{0%{transform:scale(0)}30%{transform:scale(1.3)}60%{transform:scale(0.9)}100%{transform:scale(1)}}
@keyframes bossPulse{0%{background-position:0% 50%}100%{background-position:200% 50%}}
@keyframes borderShift{0%{background-position:0% 50%}100%{background-position:200% 50%}}
      `}</style>

      {lua && <LevelUpOverlay lvl={lua} t={t} onDismiss={dismissLua} />}
      {pua && <PerkOverlay perk={pua} t={t} onDismiss={dismissPua} />}
      {lootUp && <LootOverlay item={lootUp} onDismiss={dismissLoot} />}

      {/* HEADER */}
      <div className="px-4 pt-6 pb-4">
        <div className="text-center mb-2">
          <div style={{ color: t.accent, fontSize: "10px", letterSpacing: "5px", opacity: 0.75, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>— THE CAMPAIGN —</div>
          <h1 className="title-font" style={t.second ? {
            fontFamily: "'Cinzel',serif", fontSize: "34px", fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "3px", marginTop: "6px",
            backgroundImage: `linear-gradient(135deg, ${t.accent} 0%, ${t.accent} 55%, ${t.second} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            filter: `drop-shadow(0 0 10px ${t.accent}88) drop-shadow(0 0 16px ${t.second}55)`,
          } : {
            fontFamily: "'Cinzel',serif", fontSize: "34px", fontWeight: 900, lineHeight: 1.0,
            color: t.accent,
            letterSpacing: "3px", marginTop: "6px",
            textShadow: `0 0 24px ${t.accent}, 0 0 48px ${t.glow}, 0 2px 0 rgba(0,0,0,0.6)`,
            filter: `drop-shadow(0 0 12px ${t.accent}66)`,
          }}>THE ETERNAL<br />BOND</h1>
          <div style={{ color: t.accent, fontSize: "11px", marginTop: "8px", fontStyle: "italic", fontFamily: "'Cinzel',serif", opacity: 0.85, letterSpacing: "1.5px" }}>
            Bind · or · break.
          </div>
          <div style={{ color: "#6a5a7a", fontSize: "10px", marginTop: "4px", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>
            MAURITZ ⚭ JONNA · THE LANDS BEYOND · APRIL 2026
          </div>
        </div>

        {/* HERO CARD */}
        <div className="mt-4 rounded-lg p-4 transition-all duration-1000 card-padding relative overflow-hidden" style={{
          background: `linear-gradient(135deg, ${t.bg1}, ${t.card})`,
          border: `2px solid ${t.accent}55`,
          boxShadow: `0 0 40px ${t.glow}, inset 0 0 40px ${t.glow}`,
        }}>
          <div className="text-center mb-3">
            <div style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "3px", fontFamily: "'JetBrains Mono',monospace" }}>▸ HOLY PRIEST MAURITZ</div>
            <div style={{ color: "#6a5a7a", fontSize: "9px", marginTop: "2px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace" }}>— RANK —</div>
            <div className="level-title" style={{
              fontFamily: "'Cinzel',serif", fontSize: "24px", fontWeight: 900, color: t.accent,
              marginTop: "2px", textShadow: `0 0 20px ${t.glow}`, letterSpacing: "2.5px", lineHeight: 1.1,
            }}>{lvl.rank}</div>
            <div style={{ color: "#b8a88a", fontSize: "11px", marginTop: "6px", fontStyle: "italic", lineHeight: 1.4, maxWidth: "320px", margin: "6px auto 0" }}>
              "{lvl.desc}"
            </div>

            {(s.bs || 0) > 0 && (
              <div style={{ color: (s.bs || 0) === 3 ? "#ff9020" : "#e07030", fontSize: "10px", marginTop: "8px", fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "2px", animation: (s.bs || 0) === 3 ? "shake 0.5s ease-in-out infinite" : undefined }}>
                ⚡ XP BOOST ×{s.bs || 0}{(s.bs || 0) === 3 ? " · MAX" : ""} ⚡
              </div>
            )}
            {s.dx && (
              <div style={{ color: "#5cb85c", fontSize: "10px", marginTop: "5px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, animation: "pulse 2s infinite" }}>
                ⚡ GUILD COMPLETE · 1.5× XP ⚡
              </div>
            )}
          </div>

          {/* XP bar */}
          <div className="w-full">
            <div className="flex justify-between items-baseline mb-1.5">
              <span style={{ color: t.accent, fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "2px" }}>LVL {String(lvl.level).padStart(2, "0")} · {lvl.title.toUpperCase()}</span>
              <span style={{ color: "#b8a88a", fontSize: "11px", fontFamily: "'JetBrains Mono',monospace" }}>{xp} / {nxt?.xp || "MAX"}</span>
            </div>
            <div className="w-full rounded-full overflow-hidden relative" style={{
              height: "14px", background: "rgba(0,0,0,0.7)", border: `1px solid ${t.accent}44`,
            }}>
              <div className="h-full transition-all duration-1000" style={{
                width: `${Math.min(100, Math.max(2, nxt ? ((xp - lvl.xp) / (nxt.xp - lvl.xp)) * 100 : 100))}%`,
                background: t.second
                  ? `linear-gradient(90deg, ${t.second}, ${t.accent}, #fff6, ${t.accent}, ${t.second})`
                  : `linear-gradient(90deg, ${t.accent}88, ${t.accent}, #fff4, ${t.accent})`,
                backgroundSize: "200% 100%", animation: "borderShift 3s linear infinite",
                boxShadow: `0 0 14px ${t.accent}88${t.second ? `, 0 0 20px ${t.second}55` : ''}, inset 0 -2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3)`,
              }} />
            </div>
          </div>

          {/* level dots = journey to Jonna */}
          <div className="flex justify-between mt-3 px-1">
            {LEVELS.map(l => (
              <div key={l.level} className="flex flex-col items-center" style={{ width: "20px" }}>
                <div className="w-3 h-3 rounded-full transition-all duration-500" style={{
                  background: lvl.level >= l.level ? t.accent : "rgba(20,14,32,0.8)",
                  border: `1px solid ${lvl.level >= l.level ? t.accent : t.accent + "22"}`,
                  boxShadow: lvl.level === l.level ? `0 0 8px ${t.accent}, 0 0 16px ${t.accent}` : "none",
                }} />
                <span style={{ color: lvl.level >= l.level ? t.accent : "#2a1a3a", fontSize: "8px", marginTop: "2px", fontWeight: lvl.level === l.level ? 900 : 400, fontFamily: "'JetBrains Mono',monospace" }}>{l.level}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2" style={{ fontSize: "10px", color: "#7a6a8a", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>
            <span>{s.uq.length}/{QUESTS.length} QUESTS</span>
            <span>{s.csq.length}/{SIDE_QUESTS.length} SIDE</span>
            <span>{(s.loot || []).length} LOOT</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex px-4 mb-4 gap-1">
        {[
          { id: "quests", label: "QUESTS" },
          { id: "side", label: "SIDE", badge: pendSQ.length || null, badgeColor: "#ff6040" },
          { id: "party", label: "GUILD" },
          { id: "loot", label: "LOOT", badge: (s.loot || []).length || null, badgeColor: t.accent },
          { id: "rank", label: "BOND" },
        ].map(tb => (
          <button key={tb.id} onClick={() => { setTab(tb.id); if (!s.muted) SFX.click(); }}
            className="flex-1 py-2 rounded text-xs font-black tracking-widest relative tab-buttons"
            style={{
              background: tab === tb.id ? (t.second ? `linear-gradient(135deg, ${t.accent}2a, ${t.second}22)` : `${t.accent}1e`) : "rgba(10,6,18,0.7)",
              border: tab === tb.id ? `1px solid ${t.accent}88` : "1px solid rgba(100,80,140,0.12)",
              color: tab === tb.id ? t.accent : "#6a5a7a",
              fontFamily: "'Cinzel',serif",
              boxShadow: tab === tb.id ? `inset 0 0 12px ${t.glow}${t.second ? `, 0 0 10px ${t.second}44` : ''}` : "none",
            }}>
            {tb.label}
            {tb.badge ? (
              <span className="absolute -top-1.5 -right-1.5 px-1 min-w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: tb.badgeColor, color: "#fff", fontSize: "10px", fontWeight: 900, boxShadow: `0 0 8px ${tb.badgeColor}`, animation: "pulse 1.5s infinite" }}>{tb.badge}</span>
            ) : null}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-32">
        {tab === "quests" && QUESTS.map(q => (
          <QCard key={q.num} q={q} unlocked={s.uq.includes(q.num)} onUnlock={unlockQ} t={t} muted={s.muted}
            bossDmg={(s.bossDmg || {})[q.num] || 0} onBossHit={onBossHit} />
        ))}

        {tab === "side" && (
          avSQ.length === 0 ? (
            <div className="text-center py-8" style={{ color: "#4a3a5a" }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔒</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "14px", letterSpacing: "1px" }}>Side quests låses upp vid Level 2</div>
            </div>
          ) : (
            <>
              <div className="mb-3" style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>▸ AVAILABLE — {avSQ.filter(q => !s.csq.includes(q.id)).length}</div>
              {avSQ.map(sq => <SQCard key={sq.id} sq={sq} done={s.csq.includes(sq.id)} onDone={doneS} t={t} muted={s.muted} />)}
              {lockedSQ.length > 0 && (
                <>
                  <div className="mt-5 mb-2" style={{ color: "#5a4a6a", fontSize: "10px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>◆ LOCKED — {lockedSQ.length}</div>
                  {lockedSQ.map(sq => (
                    <div key={sq.id} className="mb-2 rounded-lg p-3 card-padding" style={{ background: "rgba(10,6,18,0.5)", border: "1px solid rgba(100,80,140,0.1)" }}>
                      <div className="flex items-center justify-between gap-2">
                        <div style={{ color: "#4a3a5a", fontSize: "12px", fontFamily: "'Cinzel',serif", fontWeight: 700 }}>🔒 {sq.title}</div>
                        <div style={{ color: "#5a4a6a", fontSize: "10px", fontFamily: "'JetBrains Mono',monospace" }}>LVL {sq.unlocksAtLevel}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )
        )}

        {tab === "party" && (
          <div className="space-y-2">
            <div className="mb-2" style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>
              ▸ GUILD ROSTER — {PARTY.filter(m => !m.hiddenUntilQuest || s.uq.includes(m.hiddenUntilQuest)).length}/{PARTY.length}
            </div>
            {PARTY.filter(m => !m.hiddenUntilQuest || s.uq.includes(m.hiddenUntilQuest)).map(m => (
                <div key={m.name} className="rounded-lg p-3 flex items-center gap-3 card-padding transition-all duration-500" style={{
                  background: `linear-gradient(135deg,${t.card},rgba(16,10,24,0.6))`,
                  border: `1px solid ${m.color || t.accent}55`,
                }}>
                  <div className="w-12 h-12 rounded flex items-center justify-center shrink-0 overflow-hidden" style={{
                    background: `${m.color || t.accent}1a`,
                    border: `2px solid ${(m.color || t.accent)}aa`,
                    boxShadow: `0 0 12px ${(m.color || t.accent)}44`,
                  }}>
                    <span className="text-xl">{m.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ color: m.color || t.accent, fontSize: "14px", fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: "0.5px" }}>
                      {m.name}
                    </div>
                    <div style={{ color: "#a8988a", fontSize: "11px", marginTop: "2px", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.5px" }}>
                      {`${m.cls.toUpperCase()} · ${m.role}`}
                    </div>
                  </div>
                </div>
            ))}

            {/* Jonna card — the target */}
            <div className="mt-4 rounded-lg p-4 card-padding relative overflow-hidden" style={{
              background: `linear-gradient(135deg, ${t.accent}15, rgba(255,80,128,0.06))`,
              border: `1.5px solid ${t.accent}88`,
              boxShadow: `0 0 30px ${t.glow}`,
            }}>
              <div className="absolute top-2 right-3" style={{ color: "#ff5080", fontSize: "9px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 900 }}>◆ RAID TARGET</div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded flex items-center justify-center shrink-0" style={{
                  background: "linear-gradient(135deg, #ff508022, #ff80a022)",
                  border: `2px solid #ff5080`,
                  boxShadow: `0 0 18px rgba(255,80,128,0.5)`,
                }}>
                  <span style={{ fontSize: "24px" }}>♥</span>
                </div>
                <div className="flex-1">
                  <div style={{ color: "#ff80a0", fontSize: "9px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>THE OBJECTIVE</div>
                  <div style={{ color: "#ff5080", fontSize: "18px", fontWeight: 900, fontFamily: "'Cinzel',serif", letterSpacing: "1px", marginTop: "2px" }}>JONNA</div>
                  <div style={{ color: "#c8a8b8", fontSize: "11px", marginTop: "3px", fontStyle: "italic", lineHeight: 1.4 }}>
                    Hon vet inte om appen. Hon vet inte om dina quests. Hon väntar bara. Det är allt vi behöver.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "loot" && (
          <div>
            <div className="mb-3" style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>▸ INVENTORY — {(s.loot || []).length}</div>
            {(s.loot || []).length === 0 ? (
              <div className="text-center py-10" style={{ color: "#4a3a5a" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>◇</div>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: "14px" }}>Inget loot än.</div>
                <div style={{ fontSize: "11px", marginTop: "6px", fontStyle: "italic" }}>Klara quests. Döda bosses. Belöningen kommer.</div>
              </div>
            ) : (
              <div className="space-y-2">
                {[...(s.loot || [])].reverse().map(it => <LootCard key={it.id} item={it} inline />)}
              </div>
            )}
          </div>
        )}

        {tab === "rank" && (
          <div>
            <div className="mb-4 rounded-lg p-4 card-padding text-center" style={{ background: `linear-gradient(135deg,${t.accent}15,${t.card})`, border: `1px solid ${t.accent}55` }}>
              <div style={{ color: t.accent, fontSize: "11px", letterSpacing: "3px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>◆ THE BOND PROGRESSION ◆</div>
              <div style={{ color: "#b8a88a", fontSize: "11px", marginTop: "8px", fontStyle: "italic", lineHeight: 1.5 }}>
                Resan från Unworthy till Bound.<br />Jonna väntar vid slutet.
              </div>
            </div>
            {LEVELS.map((l, i) => {
              const reached = lvl.level >= l.level;
              const current = lvl.level === l.level;
              return (
                <div key={l.level} className="mb-2 rounded-lg p-3 card-padding flex items-center gap-3" style={{
                  background: current ? `${t.accent}1a` : reached ? "rgba(16,10,24,0.7)" : "rgba(6,4,10,0.4)",
                  border: current ? `1.5px solid ${t.accent}` : reached ? `1px solid ${t.accent}33` : "1px solid rgba(100,80,140,0.1)",
                  opacity: reached ? 1 : 0.5,
                  boxShadow: current ? `0 0 18px ${t.glow}` : "none",
                }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{
                    background: reached ? `${t.accent}22` : "rgba(10,6,18,0.7)",
                    border: `1.5px solid ${reached ? t.accent : "#3a2a4a"}`,
                    color: reached ? t.accent : "#3d2d55",
                    fontFamily: "'Cinzel',serif", fontWeight: 900, fontSize: "15px",
                  }}>{l.level}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span style={{ color: reached ? t.accent : "#5a4a6a", fontFamily: "'Cinzel',serif", fontSize: "15px", fontWeight: 900, letterSpacing: "1.2px" }}>{l.rank}</span>
                      {current && <span style={{ color: "#5cb85c", fontSize: "9px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, animation: "pulse 1.5s infinite" }}>◆ YOU ARE HERE</span>}
                    </div>
                    <div style={{ color: reached ? "#b8a88a" : "#3d2d55", fontSize: "11px", fontStyle: "italic", marginTop: "2px", lineHeight: 1.4 }}>"{l.desc}"</div>
                    <div style={{ color: reached ? "#7a6a8a" : "#3a2a4a", fontSize: "9px", marginTop: "2px", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>{l.xp} XP · {l.title.toUpperCase()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FIXED CONTROL STRIP (bottom-right) */}
      <div className="fixed bottom-3 right-3 flex flex-col gap-2" style={{ zIndex: 40 }}>
        <button onClick={toggleMute} title={s.muted ? "Unmute" : "Mute"}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: "rgba(10,6,18,0.9)", border: `1px solid ${t.accent}66`, color: t.accent, fontSize: "14px", backdropFilter: "blur(6px)" }}>
          {s.muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* TWEAKS PANEL */}
      {tweaksOpen && (
        <div className="fixed bottom-16 right-3 rounded-lg p-3 card-padding" style={{
          background: "rgba(6,4,10,0.96)",
          border: `1px solid ${t.accent}66`,
          boxShadow: `0 0 24px ${t.glow}, 0 12px 40px rgba(0,0,0,0.6)`,
          width: "260px", zIndex: 41, backdropFilter: "blur(10px)",
        }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 900, letterSpacing: "2px" }}>TWEAKS</span>
            <button onClick={() => setTweaksOpen(false)} style={{ color: "#8a7a9a", fontSize: "14px" }}>✕</button>
          </div>
          <div className="mb-2" style={{ color: "#8a7a9a", fontSize: "9px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>THEME</div>
          <div className="flex gap-2 mb-3">
            {[
              { id: "safe",  label: "EMBER",  g: "linear-gradient(135deg,#7c6948,#ff6010)" },
              { id: "bold",  label: "BLOOD",  g: "linear-gradient(135deg,#7a8fa8,#ff1030)" },
            ].map(v => (
              <button key={v.id} onClick={() => setVariant(v.id)}
                className="flex-1 px-2 py-2 rounded text-xs font-black tracking-widest"
                style={{
                  background: v.g,
                  opacity: s.variant === v.id ? 1 : 0.45,
                  outline: s.variant === v.id ? `2px solid ${t.accent}` : "none",
                  color: "#fff", fontFamily: "'Cinzel',serif",
                }}>
                {v.label}
              </button>
            ))}
          </div>
          <div className="mb-2" style={{ color: "#8a7a9a", fontSize: "9px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>TESTING</div>
          <button onClick={() => {
              // add +100 xp via a fake side-quest style tick — we just drop loot and bump
              const ns = { ...s };
              const it = rollLoot(["common","rare","epic","legendary"][Math.floor(Math.random()*4)]);
              ns.loot = [...(s.loot || []), it];
              setS(ns); ebSave(ns);
              setLootUp(it); if (!s.muted) SFX.loot(it.tier);
            }}
            className="w-full px-2 py-2 rounded text-xs font-bold tracking-widest mb-2"
            style={{ background: `${t.accent}15`, border: `1px solid ${t.accent}55`, color: t.accent, fontFamily: "'Cinzel',serif" }}>
            ⚔ ROLL RANDOM LOOT
          </button>
          <button onClick={resetAll}
            className="w-full px-2 py-2 rounded text-xs font-bold tracking-widest"
            style={{ background: "rgba(255,40,40,0.15)", border: "1px solid rgba(255,40,40,0.45)", color: "#ff6060", fontFamily: "'Cinzel',serif" }}>
            ⟲ RESET CAMPAIGN
          </button>
          <div className="mt-3 text-center" style={{ color: "#5a4a6a", fontSize: "9px", fontFamily: "'JetBrains Mono',monospace" }}>
            Cheat code: <span style={{ color: t.accent }}>GMMODE</span>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
