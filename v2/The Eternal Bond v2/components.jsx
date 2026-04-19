// ===== COMPONENTS =====
const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ----- storage -----
const SK = "eternal-bond-v3";
window.ebLoad = async () => {
  try {
    const v = localStorage.getItem(SK);
    if (v) {
      const d = JSON.parse(v);
      return { uq: [], csq: [], loot: [], variant: "safe", gc: false, dx: false, bs: 0, bossDmg: {}, muted: false, ...d };
    }
  } catch {}
  return { uq: [], csq: [], loot: [], variant: "safe", gc: false, dx: false, bs: 0, bossDmg: {}, muted: false };
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
            <span style={{ color: t.accent, fontSize: "10px", letterSpacing: "1.5px", fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>+{q.xp} XP</span>
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
          <div className="mb-4 rounded p-3" style={{ background: `${t.accent}10`, border: `1px solid ${t.accent}33` }}>
            <div style={{ color: t.accent, fontSize: "10px", letterSpacing: "2px", fontWeight: 900, marginBottom: "6px", fontFamily: "'JetBrains Mono',monospace" }}>▸ OBJECTIVE</div>
            <div style={{ color: "#f0e6d0", fontSize: "13px", lineHeight: 1.6, fontWeight: 500 }}>{q.objective}</div>
          </div>

          {/* rules */}
          {q.rules && q.rules.length > 0 && (
            <div className="mb-4">
              <div style={{ color: "#b8a88a", fontSize: "10px", letterSpacing: "2px", fontWeight: 700, marginBottom: "6px", fontFamily: "'JetBrains Mono',monospace" }}>▸ RULES & MODIFIERS</div>
              {q.rules.map((r, i) => (
                <div key={i} className="flex gap-2 mb-1.5" style={{ color: r.includes("−") ? "#ff6060" : r.includes("+") ? "#8aff8a" : "#b8a88a", fontSize: "12px", lineHeight: 1.5 }}>
                  <span style={{ color: t.accent, flexShrink: 0 }}>◆</span>
                  <span>{r}</span>
                </div>
              ))}
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
  const tc = { CHALLENGE: "#ff8040", DECREE: "#40a0ff", GRIND: "#b060e0", JONNA: "#ff5080" }[sq.type] || t.accent;
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
            <span style={{ color: t.accent, fontSize: "10px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>+{sq.xp} XP</span>
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

// ----- Perk overlay -----
window.PerkOverlay = function PerkOverlay({ perk, t, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onDismiss} style={{ background: "rgba(0,0,0,0.95)" }}>
      <div className="text-center px-8 max-w-sm" style={{ animation: "perkReveal 0.7s forwards" }}>
        <div style={{ color: "#5cb85c", fontSize: "10px", letterSpacing: "6px", marginBottom: "16px", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>◆ NEW ABILITY ◆</div>
        <div style={{ fontSize: "68px", marginBottom: "12px", animation: "perkIconPop 0.7s 0.3s both", filter: `drop-shadow(0 0 20px ${t.accent})` }}>{perk.icon}</div>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: "22px", fontWeight: 900,
          background: `linear-gradient(90deg, ${t.accent}66, ${t.accent}, ${t.accent}cc, ${t.accent}, ${t.accent}66)`,
          backgroundSize: "300% auto", backgroundClip: "text", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", animation: "perkShimmer 2.5s linear infinite",
          marginBottom: "16px", letterSpacing: "1px",
        }}>{perk.name}</div>
        <div className="rounded-lg p-4" style={{ background: `${t.accent}12`, border: `1px solid ${t.accent}55`, color: "#d4c8b0", fontSize: "13px", lineHeight: 1.6 }}>{perk.desc}</div>
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

// export nothing explicit — all attached to window
