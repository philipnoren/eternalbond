// ===== COMPONENTS =====
const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ----- storage -----
const SK = "eternal-bond-v4";
window.ebLoad = async () => {
  try {
    const v = localStorage.getItem(SK);
    if (v) {
      const d = JSON.parse(v);
      return { uq: [], csq: [], loot: [], variant: "safe", gc: false, dx: false, bs: 0, bossDmg: {}, muted: false, ...d };
    }
  } catch {}
  return { uq: [], csq: [], loot: [], variant: "safe", gc: false, dx: false, bs: 0, bossDmg: {}, muted: false, ob: false };
};
window.ebSave = async (s) => { try { localStorage.setItem(SK, JSON.stringify(s)); } catch {} };

// ----- xp / level -----
window.calcXP = (s) => {
  const qxp = s.uq.reduce((a, n) => a + (QUESTS.find(q => q.num === n)?.xp || 0), 0);
  const sxp = s.csq.reduce((a, id) => a + (SIDE_QUESTS.find(q => q.id === id)?.xp || 0), 0);
  const base = qxp + sxp;
  return s.dx ? Math.floor(base * 1.5) : base;
};
window.getLvl = (xp) => LEVELS.reduce((b, l) => xp >= l.xp ? l : b, LEVELS[0]);

// ----- loot rolling -----
window.rollLoot = (tier) => {
  const pool = LOOT_TABLE[tier] || LOOT_TABLE.common;
  const item = pool[Math.floor(Math.random() * pool.length)];
  return { ...item, tier, id: Date.now() + "-" + Math.random().toString(36).slice(2, 7) };
};

// ----- Code input -----
window.CodeInput = function CodeInput({ onOk, code, t, muted }) {
  const [v, setV] = useState("");
  const [err, setErr] = useState(false);
  const MASTER = "GMMODE";
  const submit = () => {
    const val = v.toUpperCase().trim();
    if (val === code || val === MASTER) {
      if (!muted) SFX.unlock();
      onOk(); setV("");
    } else {
      if (!muted) SFX.error();
      setErr(true); setTimeout(() => setErr(false), 1500);
    }
  };
  return (
    <div className="flex gap-2 mt-3" style={{ animation: err ? "shake 0.3s" : undefined }}>
      <input type="text" value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
        placeholder="enter code..." autoFocus
        className="flex-1 px-3 py-2 rounded text-sm outline-none"
        style={{
          background: "rgba(10,6,18,0.9)",
          border: err ? "1px solid #ff3344" : `1px solid ${t.accent}44`,
          color: "#f0e6d0", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1.5px", textTransform: "uppercase",
        }}
      />
      <button onClick={submit} className="px-4 py-2 rounded text-xs font-black tracking-widest"
        style={{ background: `linear-gradient(135deg, ${t.accent}cc, ${t.accent})`, color: "#0a0508", fontFamily: "'Cinzel',serif" }}>
        UNLOCK
      </button>
    </div>
  );
};

// ----- Boss HP bar -----
window.BossBar = function BossBar({ boss, dmg, t, onHit }) {
  const pct = Math.max(0, Math.min(100, 100 - (dmg / boss.hp) * 100));
  const defeated = dmg >= boss.hp;
  return (
    <div className="rounded mb-4 overflow-hidden" style={{ background: "rgba(0,0,0,0.6)", border: `1px solid ${t.accent}55` }}>
      <div className="px-3 py-2 flex items-center justify-between"
        style={{ background: `linear-gradient(180deg, rgba(30,0,0,0.8), rgba(0,0,0,0.4))`, borderBottom: `1px solid ${t.accent}33` }}>
        <div>
          <div style={{ color: "#ff4040", fontSize: "9px", letterSpacing: "2px", fontWeight: 700 }}>◆ RAID BOSS</div>
          <div style={{ color: "#f0e6d0", fontFamily: "'Cinzel',serif", fontSize: "14px", fontWeight: 900, letterSpacing: "0.5px" }}>{boss.name}</div>
        </div>
        <div style={{ color: defeated ? "#5cb85c" : "#ff6040", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", fontWeight: 700 }}>
          {defeated ? "DEFEATED" : `${Math.round(boss.hp - dmg)}/${boss.hp} HP`}
        </div>
      </div>
      <div className="relative h-4 w-full" style={{ background: "rgba(20,0,0,0.8)" }}>
        <div className="h-full transition-all duration-700" style={{
          width: `${pct}%`,
          background: defeated
            ? "linear-gradient(90deg, #2a7a2a, #5cb85c, #2a7a2a)"
            : "linear-gradient(90deg, #8a0010, #ff2020, #ff4040, #ff2020, #8a0010)",
          backgroundSize: "200% 100%",
          animation: defeated ? undefined : "bossPulse 1.5s linear infinite",
          boxShadow: `inset 0 0 8px rgba(0,0,0,0.6)`,
        }} />
        {/* segment lines */}
        {[25,50,75].map(p => <div key={p} className="absolute top-0 bottom-0" style={{ left: `${p}%`, width: "1px", background: "rgba(0,0,0,0.4)" }} />)}
      </div>
      <div className="px-3 py-2" style={{ background: "rgba(0,0,0,0.3)" }}>
        <div style={{ color: "#b8a88a", fontSize: "11px", fontStyle: "italic", lineHeight: 1.4 }}>{boss.flavor}</div>
        {!defeated && onHit && <button onClick={onHit}
          className="mt-2 px-3 py-1 rounded text-xs font-bold tracking-widest"
          style={{ background: "rgba(255,40,40,0.15)", border: "1px solid rgba(255,40,40,0.5)", color: "#ff6060" }}>
          ⚔ STRIKE (−25 HP)
        </button>}
      </div>
    </div>
  );
};

// ----- Loot toast / item card -----
window.LootCard = function LootCard({ item, inline }) {
  const r = RARITY[item.tier] || RARITY.common;
  return (
    <div className="rounded overflow-hidden" style={{
      background: `linear-gradient(135deg, ${r.color}18, rgba(0,0,0,0.4))`,
      border: `1px solid ${r.color}`,
      boxShadow: `0 0 ${inline ? 10 : 20}px ${r.glow}`,
    }}>
      <div className="px-3 py-1.5" style={{ borderBottom: `1px solid ${r.color}44`, background: `${r.color}10` }}>
        <span style={{ color: r.color, fontSize: "9px", letterSpacing: "2px", fontWeight: 900, fontFamily: "'JetBrains Mono',monospace" }}>{r.name} ITEM</span>
      </div>
      <div className="px-3 py-2">
        <div style={{ color: r.color, fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 700, lineHeight: 1.2 }}>{item.name}</div>
        <div style={{ color: "#c8b8a0", fontSize: "11px", fontStyle: "italic", marginTop: "4px", lineHeight: 1.4 }}>{item.flavor}</div>
      </div>
    </div>
  );
};

// ----- Quest card -----
window.QCard = function QCard({ q, unlocked, onUnlock, t, muted, bossDmg, onBossHit }) {
  const [sc, setSc] = useState(false);
  const [ex, setEx] = useState(false);
  const tier = RARITY[q.tier] || RARITY.common;

  if (!unlocked) return (
    <div className="mb-3 rounded-lg p-4 card-padding" style={{ background: "rgba(10,6,18,0.82)", border: "1px solid rgba(120,100,160,0.14)" }}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
            style={{ background: "rgba(100,80,140,0.08)", border: "1px solid rgba(120,100,160,0.18)", color: "#5a4a6a",
              fontFamily: "'Cinzel',serif", fontSize: "15px", fontWeight: 900 }}>{String(q.num).padStart(2, "0")}</div>
          <div className="min-w-0">
            <div style={{ color: "#6a5a7a", fontSize: "9px", letterSpacing: "2px", fontWeight: 700 }}>{q.act} · {q.actName}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span style={{ color: "#5a4a6a", fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 700 }}>◆ LOCKED</span>
              <span style={{ color: tier.color, fontSize: "8px", letterSpacing: "1.5px", fontFamily: "'JetBrains Mono',monospace", opacity: 0.7 }}>{tier.name}</span>
            </div>
          </div>
        </div>
        {!sc && <button onClick={() => setSc(true)} className="px-3 py-1.5 rounded text-xs font-black tracking-widest shrink-0"
          style={{ background: "rgba(100,80,140,0.12)", border: "1px solid rgba(120,100,160,0.35)", color: "#8a7a9a", fontFamily: "'Cinzel',serif" }}>
          CODE
        </button>}
      </div>
      {sc && <CodeInput code={q.code} onOk={() => onUnlock(q.num)} t={t} muted={muted} />}
    </div>
  );

  const dmg = bossDmg || 0;
  const bossDefeated = q.boss && dmg >= q.boss.hp;

  return (
    <div className="mb-3 rounded-lg overflow-hidden"
      style={{ border: `1px solid ${t.accent}55`, boxShadow: `0 0 24px ${t.glow}` }}>
      <div className="px-4 py-3 cursor-pointer select-none"
        style={{ background: `linear-gradient(135deg, ${t.accent}22, ${t.card})`, borderBottom: `1px solid ${t.accent}33` }}
        onClick={() => { setEx(!ex); if (!muted) SFX.click(); }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded flex items-center justify-center shrink-0"
              style={{ background: `${t.accent}22`, border: `1.5px solid ${t.accent}`, color: t.accent,
                fontFamily: "'Cinzel',serif", fontSize: "15px", fontWeight: 900, textShadow: `0 0 8px ${t.accent}` }}>
              {String(q.num).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span style={{ color: "#b8a88a", fontSize: "9px", letterSpacing: "2px", fontWeight: 700 }}>{q.act} · {q.actName}</span>
                <span style={{ color: tier.color, fontSize: "8px", letterSpacing: "1.5px", fontFamily: "'JetBrains Mono',monospace" }}>◆ {tier.name}</span>
              </div>
              <div style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "15px", fontWeight: 700, marginTop: "1px", letterSpacing: "0.3px" }}>{q.title}</div>
            </div>
          </div>
          <span style={{ color: t.accent, fontSize: "14px" }}>{ex ? "▾" : "▸"}</span>
        </div>
      </div>

      {ex && (
        <div className="px-4 py-4 card-padding" style={{ background: "rgba(8,4,14,0.65)" }}>
          {/* meta */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "1.5px", fontFamily: "'JetBrains Mono',monospace" }}>DIFF:</span>
            <span style={{ color: "#f0a050", fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>{q.difficulty}</span>
            <span style={{ color: "#3a2d4a", fontSize: "10px" }}>│</span>
            <span style={{ color: "#8a7a9a", fontSize: "10px", letterSpacing: "1.5px", fontFamily: "'JetBrains Mono',monospace" }}>REWARD:</span>
            <span style={{ color: "#8aff8a", fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", textShadow: "0 0 6px rgba(138,255,138,0.35)" }}>+{q.xp} XP</span>
          </div>

          {/* boss bar */}
          {q.boss && <BossBar boss={q.boss} dmg={dmg} t={t} onHit={bossDefeated ? null : () => onBossHit(q.num, 25)} />}

          {/* flavor */}
          <div className="rounded p-3 mb-4" style={{ background: "rgba(0,0,0,0.35)", borderLeft: `3px solid ${t.accent}` }}>
            <p style={{ color: t.accent, fontSize: "13px", fontStyle: "italic", lineHeight: 1.5, fontFamily: "'Cinzel',serif" }}>{q.flavor}</p>
          </div>

          {/* body */}
          <div className="mb-4" style={{ color: "#d4c8b0", fontSize: "13px", lineHeight: 1.75 }}>
            {q.body.split("\n\n").map((p, i) => <p key={i} className="mb-3">{p}</p>)}
          </div>

          {/* objective */}
          <div className="mb-4 rounded p-3" style={{ background: "rgba(255,176,40,0.08)", border: "1px solid rgba(255,176,40,0.45)", boxShadow: "0 0 14px rgba(255,176,40,0.12)" }}>
            <div style={{ color: "#ffb830", fontSize: "10px", letterSpacing: "2px", fontWeight: 900, marginBottom: "6px", fontFamily: "'JetBrains Mono',monospace", textShadow: "0 0 8px rgba(255,184,48,0.45)" }}>▸ OBJECTIVE</div>
            <div style={{ color: "#ffe6b0", fontSize: "13px", lineHeight: 1.6, fontWeight: 500 }}>{q.objective}</div>
          </div>

          {/* rules */}
          {q.rules && q.rules.length > 0 && (
            <div className="mb-4">
              <div style={{ color: "#b8a88a", fontSize: "10px", letterSpacing: "2px", fontWeight: 700, marginBottom: "6px", fontFamily: "'JetBrains Mono',monospace" }}>▸ RULES & MODIFIERS</div>
              {q.rules.map((r, i) => {
                const isNeg = r.includes("−") || r.includes("-");
                const isPos = r.includes("+");
                const c = isNeg ? "#ff6060" : isPos ? "#8aff8a" : "#e0d0b0";
                return (
                  <div key={i} className="flex gap-2 mb-1.5" style={{ color: c, fontSize: "12px", lineHeight: 1.5 }}>
                    <span style={{ color: c, flexShrink: 0, textShadow: `0 0 6px ${c}66` }}>◆</span>
                    <span>{r}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* perk unlock */}
          {q.perk && (
            <div className="rounded p-3 mb-4" style={{ background: "linear-gradient(135deg,rgba(92,184,92,0.12),rgba(201,168,76,0.08))", border: "1px solid rgba(92,184,92,0.4)" }}>
              <div style={{ color: "#5cb85c", fontSize: "10px", letterSpacing: "2px", fontWeight: 900, marginBottom: "4px", fontFamily: "'JetBrains Mono',monospace" }}>▸ ABILITY UNLOCK</div>
              <div style={{ color: "#d4e8c8", fontSize: "12px", lineHeight: 1.55 }}>{q.perk}</div>
            </div>
          )}

          {/* quote */}
          <div className="mt-4 text-center px-4" style={{ color: "#5a4a6a", fontSize: "11px", fontStyle: "italic", fontFamily: "'Cinzel',serif" }}>
            "{q.quote}"
          </div>
        </div>
      )}
    </div>
  );
};

// ----- Side quest card -----
window.SQCard = function SQCard({ sq, done, onDone, t, muted }) {
  const [sc, setSc] = useState(false);
  const tc = { CHALLENGE: "#ff8040", "GUILD RULE": "#40a0ff", DECREE: "#40a0ff", GRIND: "#b060e0", JONNA: "#ff5080" }[sq.type] || "#c0a040";
  return (
    <div className="mb-2 rounded-lg p-3 card-padding" style={{
      background: done ? "rgba(92,184,92,0.08)" : "rgba(16,10,24,0.75)",
      border: done ? "1px solid rgba(92,184,92,0.35)" : `1px solid ${tc}22`,
      opacity: done ? 0.65 : 1,
    }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-1.5 py-0.5 rounded font-black" style={{ background: `${tc}1c`, color: tc, fontSize: "9px", letterSpacing: "1.5px", fontFamily: "'JetBrains Mono',monospace" }}>{sq.type}</span>
            <span style={{ color: "#8aff8a", fontSize: "10px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, textShadow: "0 0 6px rgba(138,255,138,0.35)" }}>+{sq.xp} XP</span>
          </div>
          <div style={{ color: done ? "#5cb85c" : tc, fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.3px" }}>{done ? "✓ " : ""}{sq.title}</div>
          <div style={{ color: "#b8a88a", fontSize: "12px", lineHeight: 1.55, marginTop: "4px" }}>{sq.description}</div>
        </div>
        {!done && !sc && <button onClick={() => setSc(true)} className="px-2.5 py-1 rounded text-xs font-black shrink-0 mt-0.5 tracking-widest"
          style={{ background: `${tc}18`, border: `1px solid ${tc}55`, color: tc, fontFamily: "'Cinzel',serif" }}>DONE</button>}
      </div>
      {sc && !done && <CodeInput code={sq.code} onOk={() => { onDone(sq.id); setSc(false); }} t={t} muted={muted} />}
    </div>
  );
};

// ----- Fire effect -----
window.FireEffect = function FireEffect({ level, variant }) {
  if (level < 6) return null;
  const intensity = level - 5;
  const count = intensity * 6;
  const safePalette = {
    6: ["#ffa050","#ff8030","#e06020"],
    7: ["#ff8030","#ff6020","#ffa040","#e05010"],
    8: ["#ff6020","#ff4010","#ff8030","#cc3010","#ffb060"],
    9: ["#ff5010","#ff3008","#ff7020","#aa1800","#ff9040"],
    10: ["#ff3010","#ff1000","#ff5020","#aa0010","#ff7040"],
  };
  const boldPalette = {
    6: ["#d03080","#ff4080","#a02060"],
    7: ["#ff2040","#ff4060","#e01030","#ff6080"],
    8: ["#ff3020","#ff1030","#ff5040","#cc0010","#ff8060"],
    9: ["#ff2010","#ff0020","#ff5030","#aa0010","#ff7040"],
    10: ["#ff1030","#ff0040","#ff4020","#aa0030","#ff2060"],
  };
  const palette = (variant === "bold" ? boldPalette : safePalette)[Math.min(level, 10)];
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 8 + ((i * 7) % (6 + intensity * 2)),
    left: 4 + (i * 97 % 92),
    delay: (i * 0.28 % 2.2).toFixed(2),
    dur: (1.4 + (i * 0.17) % 1.1).toFixed(2),
    color: palette[i % palette.length],
    ember: i % 3 === 2,
    blur: level >= 9 ? "2px" : "1px",
  }));
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "600px", height: "140px", pointerEvents: "none", overflow: "hidden", zIndex: 2 }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", bottom: "4px", left: p.left + "%", width: p.size + "px", height: p.size + "px",
          borderRadius: "50% 50% 40% 40%",
          background: `radial-gradient(circle at 40% 35%, ${p.color}ff, ${p.color}88 50%, transparent 80%)`,
          filter: `blur(${p.blur})`,
          animation: `${p.ember ? "emberDrift" : "fireFloat"} ${p.dur}s ${p.delay}s ease-out infinite`,
        }} />
      ))}
    </div>
  );
};

// ----- Level up overlay -----
window.LevelUpOverlay = function LevelUpOverlay({ lvl, t, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onDismiss}
      style={{ background: "rgba(0,0,0,0.94)", overflow: "hidden" }}>
      {/* radial pulse */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(circle at 50% 50%, ${t.accent}30, transparent 60%)`,
        animation: "radialPulse 1.8s ease-out",
      }} />
      <div className="text-center px-8 relative" style={{ animation: "levelUp 0.7s forwards" }}>
        <div style={{ color: t.accent, fontSize: "11px", letterSpacing: "8px", marginBottom: "16px", opacity: 0.9, fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>— LEVEL UP —</div>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "88px", fontWeight: 900, lineHeight: 1,
          background: `linear-gradient(90deg, ${t.accent}66, ${t.accent}, #fff, ${t.accent}, ${t.accent}66)`,
          backgroundSize: "300% auto", backgroundClip: "text", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", animation: "shimmer 2.5s linear infinite",
        }}>{lvl.level}</div>
        <div style={{ color: "#b8a88a", fontSize: "12px", marginTop: "16px", letterSpacing: "3px", fontFamily: "'JetBrains Mono',monospace" }}>RANK</div>
        <div style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "22px", fontWeight: 900, marginTop: "4px", letterSpacing: "2px", textShadow: `0 0 20px ${t.accent}` }}>
          {lvl.rank}
        </div>
        <div style={{ color: "#c8b8a0", fontSize: "12px", fontStyle: "italic", marginTop: "10px", maxWidth: "320px", lineHeight: 1.5 }}>
          "{lvl.desc}"
        </div>
        <div style={{ color: "#5a4a6a", fontSize: "10px", marginTop: "28px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace" }}>— Tap to continue —</div>
      </div>
    </div>
  );
};

// ----- Perk / curse overlay -----
window.PerkOverlay = function PerkOverlay({ perk, t, onDismiss }) {
  const isCurse = perk.type === "curse";
  const hue = isCurse ? "#ff4050" : "#5cb85c";
  const hue2 = isCurse ? "#ff8040" : "#8aff8a";
  const label = isCurse ? "◆ CURSE APPLIED ◆" : "◆ NEW ABILITY ◆";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onDismiss} style={{ background: "rgba(0,0,0,0.95)" }}>
      <div className="text-center px-8 max-w-sm" style={{ animation: "perkReveal 0.7s forwards" }}>
        <div style={{ color: hue, fontSize: "10px", letterSpacing: "6px", marginBottom: "16px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, textShadow: `0 0 10px ${hue}66` }}>{label}</div>
        <div style={{ fontSize: "68px", marginBottom: "12px", animation: "perkIconPop 0.7s 0.3s both", filter: `drop-shadow(0 0 20px ${hue})` }}>{perk.icon}</div>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "22px", fontWeight: 900,
          background: `linear-gradient(90deg, ${hue}66, ${hue}, ${hue2}, ${hue}, ${hue}66)`,
          backgroundSize: "300% auto", backgroundClip: "text", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", animation: "perkShimmer 2.5s linear infinite",
          marginBottom: "16px", letterSpacing: "1px",
        }}>{perk.name}</div>
        <div className="rounded-lg p-4" style={{ background: `${hue}14`, border: `1px solid ${hue}66`, color: "#d4c8b0", fontSize: "13px", lineHeight: 1.6, boxShadow: `0 0 30px ${hue}33` }}>{perk.desc}</div>
        <div style={{ color: "#5a4a6a", fontSize: "10px", marginTop: "22px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace" }}>— Tap to dismiss —</div>
      </div>
    </div>
  );
};

// ----- Loot overlay -----
window.LootOverlay = function LootOverlay({ item, onDismiss }) {
  const r = RARITY[item.tier];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onDismiss} style={{ background: "rgba(0,0,0,0.92)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 50%, ${r.color}30, transparent 55%)`,
        animation: "radialPulse 2s ease-out",
      }} />
      <div className="text-center px-8 max-w-sm relative" style={{ animation: "lootReveal 0.8s forwards" }}>
        <div style={{ color: r.color, fontSize: "10px", letterSpacing: "6px", marginBottom: "12px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>◆ LOOT DROP ◆</div>
        <div style={{ fontSize: "12px", letterSpacing: "4px", color: r.color, fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, marginBottom: "20px" }}>{r.name}</div>
        <div className="rounded-lg mx-auto" style={{
          background: `linear-gradient(135deg, ${r.color}22, rgba(0,0,0,0.6))`,
          border: `2px solid ${r.color}`,
          boxShadow: `0 0 60px ${r.glow}, inset 0 0 30px ${r.color}22`,
          padding: "24px 20px",
          animation: "lootPulse 2.5s ease-in-out infinite",
        }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: "22px", fontWeight: 900, color: r.color, letterSpacing: "0.5px", textShadow: `0 0 12px ${r.color}` }}>{item.name}</div>
          <div style={{ color: "#d4c8b0", fontSize: "13px", fontStyle: "italic", marginTop: "12px", lineHeight: 1.5 }}>{item.flavor}</div>
        </div>
        <div style={{ color: "#5a4a6a", fontSize: "10px", marginTop: "24px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace" }}>— Tap to collect —</div>
      </div>
    </div>
  );
};

// ----- Onboarding overlay (first-run intro) -----
window.OnboardingOverlay = function OnboardingOverlay({ t, onFinish }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      badge: "HEED THE CALL",
      title: "Holy Priest Mauritz",
      body: "Din guild har sammankallat dig. The Eternal Bond närmar sig — bindandet av din själ. Men först: en sista kampanj. En serie prövningar som testar om du är värdig.",
      cta: "I HEAR THE CALL",
    },
    {
      badge: "HOW IT WORKS",
      title: "Codes · XP · Levels",
      body: "Varje quest låses upp med en kod som din Raid Leader släpper vid rätt tillfälle. Klara quests ger XP. XP ger levels. Levels låser upp sidequests, perks och loot.",
      cta: "UNDERSTOOD",
    },
    {
      badge: "YOUR GUILD AWAITS",
      title: "The Guild Assembles.",
      body: "Ditt party är inte komplett. Delar av det saknas fortfarande — signaler förlorade, lokalisering okänd. De kan dyka upp. De kan inte. Du får veta när kampanjen kräver det.",
      cta: "LFG",
    },
    {
      badge: "BEGIN THE CAMPAIGN",
      title: "The Map Awaits",
      body: "Din karta visar vägen. Noder som lyser är redo. Noder i dimma väntar på rätt kod. Destinationen är hemlig — följ bara stigen.",
      cta: "START",
    },
  ];
  const s = steps[step];
  const last = step === steps.length - 1;
  const next = () => { if (last) onFinish(); else setStep(step + 1); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" onClick={next}
      style={{ background: `radial-gradient(circle at 50% 40%, ${t.bg1}, #04020a 80%)` }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 40%, ${t.accent}22, transparent 60%)`,
        animation: "radialPulse 3s ease-out infinite",
      }} />
      <div className="text-center max-w-md relative" style={{ animation: "perkReveal 0.6s forwards" }} key={step}>
        <div style={{ color: t.accent, fontSize: "10px", letterSpacing: "6px", marginBottom: "18px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>◆ {s.badge} ◆</div>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "30px", fontWeight: 900, lineHeight: 1.15,
          background: `linear-gradient(90deg, ${t.accent}88, ${t.accent}, #fff, ${t.accent}, ${t.accent}88)`,
          backgroundSize: "300% auto", backgroundClip: "text", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite", marginBottom: "20px", letterSpacing: "1px",
        }}>{s.title}</div>
        <div className="rounded-lg p-4 mb-6" style={{ background: "rgba(10,6,18,0.7)", border: `1px solid ${t.accent}44`, color: "#d4c8b0", fontSize: "14px", lineHeight: 1.65 }}>
          {s.body}
        </div>
        <button onClick={(e) => { e.stopPropagation(); next(); }}
          className="px-6 py-3 rounded text-xs font-black tracking-widest"
          style={{ background: `linear-gradient(135deg, ${t.accent}cc, ${t.accent})`, color: "#0a0508", fontFamily: "'Cinzel',serif", letterSpacing: "3px", boxShadow: `0 0 20px ${t.glow}` }}>
          {s.cta}
        </button>
        <div className="flex items-center justify-center gap-2 mt-6">
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === step ? "24px" : "6px", height: "6px", borderRadius: "3px",
              background: i <= step ? t.accent : "rgba(120,100,160,0.25)",
              transition: "width 0.3s",
            }} />
          ))}
        </div>
        <div style={{ color: "#5a4a6a", fontSize: "10px", marginTop: "16px", letterSpacing: "2px", fontFamily: "'JetBrains Mono',monospace" }}>— Tap anywhere to continue —</div>
      </div>
    </div>
  );
};

// ----- Map view (fog of war quest map) -----
window.MapView = function MapView({ quests, unlocked, t, muted, onUnlock, onOpenQuest }) {
  const unlockedSet = useMemo(() => new Set(unlocked), [unlocked]);
  const nextNum = useMemo(() => {
    for (const q of quests) if (!unlockedSet.has(q.num)) return q.num;
    return null;
  }, [quests, unlockedSet]);

  const [active, setActive] = useState(null);
  const activeQ = active != null ? quests.find(q => q.num === active) : null;

  const stateFor = (q) => {
    if (unlockedSet.has(q.num)) return "unlocked";
    if (q.num === nextNum) return "next";
    return "fog";
  };

  // Build winding path through all nodes
  const pathD = quests.map((q, i) => {
    const prev = quests[i - 1];
    if (!prev) return `M ${q.mapPos.x} ${q.mapPos.y}`;
    const cx = (prev.mapPos.x + q.mapPos.x) / 2 + (i % 2 === 0 ? 6 : -6);
    const cy = (prev.mapPos.y + q.mapPos.y) / 2 + (i % 2 === 0 ? -4 : 4);
    return `Q ${cx} ${cy} ${q.mapPos.x} ${q.mapPos.y}`;
  }).join(" ");

  return (
    <div className="relative rounded-lg overflow-hidden" style={{
      background: `linear-gradient(180deg, ${t.bg1}, ${t.bg2})`,
      border: `1px solid ${t.accent}33`,
      boxShadow: `0 0 30px ${t.glow}`,
      aspectRatio: "3 / 4",
    }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
        {/* regions */}
        <defs>
          <radialGradient id="sea" cx="30%" cy="85%" r="60%">
            <stop offset="0%" stopColor={t.second} stopOpacity="0.25" />
            <stop offset="100%" stopColor="#02020a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="forest" cx="25%" cy="55%" r="35%">
            <stop offset="0%" stopColor="#2a5a3a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#02020a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mountain" cx="70%" cy="30%" r="45%">
            <stop offset="0%" stopColor="#4a3a5a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#02020a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="city" cx="86%" cy="8%" r="18%">
            <stop offset="0%" stopColor={t.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor="#02020a" stopOpacity="0" />
          </radialGradient>
          <filter id="fog">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#sea)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#forest)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#mountain)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#city)" />

        {/* coastline suggestion */}
        <path d="M 0 92 Q 15 86 30 88 T 60 84 T 100 80 L 100 100 L 0 100 Z"
          fill={t.second} fillOpacity="0.08" stroke={t.second} strokeOpacity="0.15" strokeWidth="0.2" vectorEffect="non-scaling-stroke" />

        {/* winding path */}
        <path d={pathD} fill="none" stroke={t.accent} strokeOpacity="0.35" strokeWidth="0.6"
          strokeDasharray="1.4 1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* LUNDINHOLD stamp */}
      <div className="absolute" style={{ left: "60%", top: "2%", width: "38%", textAlign: "center", pointerEvents: "none" }}>
        <div style={{
          color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "11px", fontWeight: 900,
          letterSpacing: "3px", textShadow: `0 0 10px ${t.glow}`,
          border: `1px solid ${t.accent}66`, padding: "3px 6px", background: "rgba(10,6,18,0.55)",
          transform: "rotate(-6deg)", display: "inline-block",
        }}>⚑ LUNDINHOLD</div>
      </div>

      {/* nodes */}
      {quests.map(q => {
        const st = stateFor(q);
        return (
          <MapNode key={q.num} q={q} state={st} t={t}
            onClick={() => {
              if (st === "fog") return;
              if (!muted) SFX.click();
              setActive(q.num);
            }} />
        );
      })}

      {/* popover */}
      {activeQ && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(0,0,0,0.55)" }} onClick={() => setActive(null)}>
          <div className="w-full p-4" onClick={e => e.stopPropagation()} style={{
            background: `linear-gradient(180deg, rgba(10,6,18,0.95), ${t.bg2})`,
            borderTop: `1px solid ${t.accent}66`,
            animation: "perkReveal 0.3s forwards",
          }}>
            {stateFor(activeQ) === "unlocked" ? (
              <>
                <div style={{ color: t.accent, fontSize: "9px", letterSpacing: "2px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                  {activeQ.act} · {activeQ.actName}
                </div>
                <div style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "18px", fontWeight: 900, marginTop: "4px" }}>
                  {String(activeQ.num).padStart(2, "0")} · {activeQ.title}
                </div>
                <div style={{ color: "#b8a88a", fontSize: "12px", fontStyle: "italic", lineHeight: 1.5, marginTop: "6px" }}>
                  {activeQ.flavor}
                </div>
                <button onClick={() => { onOpenQuest(activeQ.num); setActive(null); }}
                  className="mt-3 px-3 py-2 rounded text-xs font-black tracking-widest"
                  style={{ background: `${t.accent}22`, border: `1px solid ${t.accent}`, color: t.accent, fontFamily: "'Cinzel',serif" }}>
                  OPEN QUEST
                </button>
              </>
            ) : (
              <>
                <div style={{ color: "#8a7a9a", fontSize: "9px", letterSpacing: "2px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>
                  ??? · UNKNOWN
                </div>
                <div style={{ color: "#d4c8b0", fontFamily: "'Cinzel',serif", fontSize: "18px", fontWeight: 900, marginTop: "4px" }}>
                  Sealed Quest
                </div>
                <div style={{ color: "#8a7a9a", fontSize: "12px", fontStyle: "italic", lineHeight: 1.5, marginTop: "6px" }}>
                  En kod krävs för att avslöja denna quest. Vänta på Raid Leader.
                </div>
                <CodeInput code={activeQ.code} muted={muted} t={t}
                  onOk={() => { onUnlock(activeQ.num); setActive(null); }} />
              </>
            )}
            <button onClick={() => setActive(null)}
              className="mt-3 px-2 py-1 text-xs tracking-widest"
              style={{ color: "#8a7a9a", fontFamily: "'JetBrains Mono',monospace" }}>
              ✕ CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ----- Map node (single node on the map) -----
window.MapNode = function MapNode({ q, state, t, onClick }) {
  const isUnlocked = state === "unlocked";
  const isNext = state === "next";
  const isFog = state === "fog";
  const size = isUnlocked ? 36 : isNext ? 32 : 28;
  return (
    <button onClick={onClick}
      disabled={isFog}
      style={{
        position: "absolute",
        left: `calc(${q.mapPos.x}% - ${size/2}px)`,
        top: `calc(${q.mapPos.y}% - ${size/2}px)`,
        width: size + "px", height: size + "px",
        borderRadius: "50%",
        background: isUnlocked
          ? `radial-gradient(circle, ${t.accent}, ${t.accent}88)`
          : isNext
            ? `radial-gradient(circle, #2a1a3a, #0a0510)`
            : `radial-gradient(circle, #120820, #05020a)`,
        border: isUnlocked ? `2px solid ${t.accent}` : isNext ? `1.5px solid ${t.accent}66` : `1px solid rgba(80,60,120,0.2)`,
        boxShadow: isUnlocked ? `0 0 14px ${t.glow}` : "none",
        opacity: isFog ? 0.3 : 1,
        filter: isFog ? "blur(1.5px)" : "none",
        color: isUnlocked ? "#0a0508" : "#8a7a9a",
        fontFamily: "'Cinzel',serif", fontSize: "11px", fontWeight: 900,
        cursor: isFog ? "default" : "pointer",
        transition: "transform 0.2s",
        animation: isNext ? "mapPulse 2s ease-in-out infinite" : undefined,
      }}>
      {isUnlocked ? String(q.num).padStart(2, "0") : isNext ? "?" : ""}
    </button>
  );
};

// export nothing explicit — all attached to window
