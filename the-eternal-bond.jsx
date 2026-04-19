import { useState, useEffect, useCallback, useRef } from "react";

const QUESTS = [
  { num: 1, act: "ACT I", actName: "THE SUMMONING", title: "The Summoning of the Holy Priest", code: "LFGRAID", difficulty: "Mandatory", xp: 100, levelUp: "Novice Priest", perk: null, flavor: "Stäng ner det du gör. Spara inte. Det spelar ingen roll längre.", body: "I exakt 347 dagar har du levt ditt liv som om inget väntade. Du har gått till jobbet. Du har ätit lunch. Du har svarat på mail som ingen bryr sig om. Allt medan The Eternal Bond närmar sig — den mäktigaste ritualen en Priest kan genomgå. Bindandet av din själ till en annan. Permanent. Ingen Dispel. Ingen Fade.\n\nDitt guild har beslutat: du är inte redo. Inte ännu.\n\nDärför har vi kommit. Vi är ditt party — och detta är din sista kampanj. En serie prövningar genom okända länder, designade för att testa om du verkligen förtjänar The Eternal Bond.", objective: "Du har fem minuter. Packa det du behöver. Fråga inga frågor. Du får inga svar. Destinationen är klassificerad.", rules: ["Du får INTE veta vart vi ska", "Du får INTE kontakta Jonna förrän partyt ger dig clearance", "Du följer Raid Leaders instruktioner utan ifrågasättande", "Bryter du reglerna: −50 XP"], quote: "Every hero's journey begins with leaving the Auction House." },
  { num: 2, act: "ACT I", actName: "THE SUMMONING", title: "Through the Portal", code: "BUFFPLS", difficulty: "Moderate", xp: 50, levelUp: null, perk: "PRIEST'S BLESSING — Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE köpa en dryck åt dig. EN gång under hela kampanjen.", flavor: "Portalen surrar av uråldrig magi. På andra sidan väntar ett land av prövningar. Det finns ingen Hearthstone tillbaka.", body: "Vi kan inte berätta vart portalen leder — det strider mot Guild Protocol sektion 4, paragraf \"du får inte veta\". Det vi KAN säga: på andra sidan finns ett land du inte kontrollerar. Allierade du inte väntade dig. Och prövningar som kräver mer av dig än att stå i bakre raden och spamma Prayer of Healing.\n\nVarje healer vet att ett party som inte är buffat är ett party som wipar. Innan portalen öppnas har du en helig plikt.", objective: "Förse ditt party med provisions inför resan — du köper snacks åt alla. En Priest som inte sörjer för sitt party förtjänar inte sin titel.", rules: [], quote: "Loading screen tips: Om du inte vet vart du ska, följ tanken." },
  { num: 3, act: "ACT I", actName: "THE SUMMONING", title: "The Inn", code: "RESTED", difficulty: "Trivial (enjoy it while it lasts)", xp: 50, levelUp: null, perk: "HEALER PRIVILEGE — Du väljer din säng först. Resten av partyt tar vad som blir över och håller käften om det.", flavor: "Du har klivit genom portalen. Du lever. Det är en bra start.", body: "Runt dig breder ett nytt land ut sig. Lukterna är annorlunda. Språket nästan begripligt. Valutan suspekt. Men ditt party har säkrat ett värdshus — en bas för kampanjens kommande prövningar.\n\nNjut av lugnet. Det varar inte. Ikväll väntar din första riktiga Trial, och den kräver att du är utvilad, påklädd, och mentalt förberedd för saker du inte kan föreställa dig.", objective: "Checka in. Orientera dig. Förbered dig för kvällen.", rules: [], quote: "Inn music playing. You feel rested. Your XP bar glows faintly." },
  { num: 4, act: "ACT I", actName: "THE SUMMONING", title: "The Feast of the Absolute War Pigs", code: "WARPIGS", difficulty: "Hard", xp: 150, levelUp: null, perk: null, flavor: "Din tid som lugn, ohotad Priest är över.", body: "Ditt party eskorterar dig till en stor hall. Vi kan inte avslöja dess namn — det kommer tala för sig självt när dörrarna öppnas. Det handlar om eld. Om kött. Om drycker mörkare än Death Knights humor.\n\nMen mitt i festens kaos har du en uppgift som inget öl kan rädda dig från.", objective: "Du ska, inför ditt samlade party, berätta om den person du valt att binda din själ till. Inte 'jag älskar Jonna för att hon är snäll' — det kan en NPC säga. Berätta: varför Jonna? Vad var momentet?", rules: ["+50 XP om partyt höjer sina bägare och ropar WORTHY", "−25 XP varje gång du kollar mobilen under kvällen", "Pro tip: Lägg telefonerna i mitten av bordet. Först att ta sin betalar en runda."], quote: "Leeroy Jenkins drog aldrig in i en feast oförberedd. Okej, det gjorde han. Men du är bättre än Leeroy." },
  { num: 5, act: "ACT I", actName: "THE SUMMONING", title: "A Dark Presence Approaches", code: "SUMMON", difficulty: "Unpredictable", xp: 100, levelUp: null, perk: "☠️ TOASTMASTER'S CURSE — Warlock Christian har ETT uppdrag/dare som kan komma när som helst. Du kan inte neka. Du kan inte Dispela. Du kan inte Fade.", flavor: "Du kände det, eller hur? Temperaturen sjönk. Ölskummet vibrerade i ditt glas som en seismograf för incoming doom.", body: "Och sen — stegen. Tunga steg. Det karakteristiska ljudet av någon som inte bryr sig om att bli hörd, för de VET att de är farligare än allt i rummet.\n\nEn Warlock har anslutit sig till ditt party.\n\nWarlocks är opålitliga, självcentrerade, och har en tendens att sacrificea partymedlemmar för personlig vinning. MEN — denna Warlock kommer med en titel: Toastmaster. Hans makt är specifik, begränsad, och exakt lika skrämmande som det låter.", objective: "Välkomna din nya allierade. Hela partyt ska skåla — en välkomstshot krävs av samtliga. Det är Guild Protocol.", rules: [], quote: "You hear a faint whisper: 'I have candy.' You should not follow the Warlock. You will anyway." },
  { num: 6, act: "ACT II", actName: "THE TRIALS", title: "The Morning Resurrection", code: "REZPLZ", difficulty: "Depends on last night", xp: 50, levelUp: null, perk: null, flavor: "Solen stiger. Din mana bar är tom. Din health bar flimrar i rött.", body: "Det finns en ironisk skönhet i det här: du, en HEALER, som inte kan heala sig själv. Hela din karriär har du stått bakom andra och hållit dem vid liv. Du har kastat Renew på Warriors som rushat in utan plan. Du har desperatcastat Flash Heal på Mages som stått i AoE:n IGEN.\n\nOch nu ligger du här. I en säng du knappt minns att du la dig i. Med en smak i munnen som antyder att du åt något som inte borde existera.\n\nMen en Priest faller inte. En Priest RESER SIG.", objective: "Res dig. Hitta frukost. Överlev den.", rules: ["+25 XP om du är FÖRST upp och väcker resten av partyt"], quote: "You are not prepared. — Illidan, som aldrig behövde hantera en hotellfrukost med hangover." },
  { num: 7, act: "ACT II", actName: "THE TRIALS", title: "The Trial of the Unknown", code: "SHADOW", difficulty: "[REDACTED]", xp: 200, levelUp: null, perk: null, flavor: "Du har healat. Du har buffat. Du har stått i bakre raden. Idag blir du DPS.", body: "Ditt party har arrangerat inte EN utan TVÅ prövningar. Vi kan inte avslöja deras natur — det strider mot Guild Protocol och dessutom är det mycket roligare att se ditt ansikte.\n\nEn av prövningarna kräver strategi och ledarskap. Du kommer att styra. Ditt ord kommer att vara lag.\n\nDen andra kräver våld. Kontrollerat, organiserat, sanktionerat våld. Du har spenderat hela din karriär med att HEALA skador. Nu ska du ORSAKA dem.", objective: "Genomför båda prövningarna. Detaljer avslöjas vid ankomst. Lita på din Raid Leader.", rules: ["Bonusar och straff avslöjas on site"], quote: "Switching spec from Holy to Shadow. Please wait... please wait..." },
  { num: 8, act: "ACT II", actName: "THE TRIALS", title: "The Market of a Thousand Flavors", code: "OMNOM", difficulty: "Medium (your stomach may disagree)", xp: 100, levelUp: null, perk: "👑 PRIEST'S DECREE — Du bestämmer vad minst 2 partymedlemmar äter. De lyder. Inga protester.", flavor: "Lukterna blandas med havsvind. Röster ropar på språk du inte förstår. Eld flammar från riktningar du inte förväntar dig.", body: "Din quest har fört dig till en handelskvarterszon — ett Merchant Quarter — där mästare från jordens alla hörn samlats för att erbjuda saker din mage aldrig bett om men ditt hjärta inte kan motstå.\n\nDet här är en quest om TILLIT. Du har tillbringat hela ditt liv med att välja tryggt. Healers gör det — ni väljer det säkra, det beprövade. Men ibland, Priest, måste du välja det okända.", objective: "1) Ät något du ALDRIG ätit förut. Ingen fuskmat. 2) Beställ åt MINST 2 partymedlemmar utan att de får välja.", rules: [], quote: "Cooking skill increased to 376. But at what cost?" },
  { num: 9, act: "ACT II", actName: "THE TRIALS", title: "Reinforcements from the Eastern Kingdoms", code: "LFGMORE", difficulty: "Emotional", xp: 150, levelUp: null, perk: null, flavor: "Minns du party-rostern? Minns du de tomma platserna?", body: "Hunter: \"Ej lokaliserad. Signal förlorad.\" Shaman: \"Ej lokaliserad. Signal förlorad.\"\n\nVi ljög inte. Deras signal VAR förlorad. De befann sig i andra delar av riket, långt bortom räckhåll. Vi visste inte om de skulle hinna. Vi visste inte om portalen skulle hålla.\n\nMen den höll.\n\nDe är här nu. Din Hunter och din Shaman. De korsade länder och tidszoner för att stå vid din sida i kampanjens avgörande fas. Ditt party är nu vid FULL STRENGTH — och det är precis vad du kommer att behöva.", objective: "Välkomna dina förlorade allierade med en proper Guild Greeting: en gruppshot, alla nio.", rules: ["Raid difficulty ökar. Partyt är komplett."], quote: "LFG complete. Nine souls. One destiny. Zero excuses." },
  { num: 10, act: "ACT II", actName: "THE TRIALS", title: "The Final Feast Before the Eternal Bond", code: "BONFIRE", difficulty: "Legendary", xp: 300, levelUp: null, perk: "🔥 PRIEST'S LAST COMMAND — Du får ge ETT uppdrag till valfri partymedlem. Vad som helst. Ikväll.", flavor: "Det här är det, Priest. Din sista kväll som obunden.", body: "Imorgon börjar resan hem, och efter det — The Eternal Bond. Jonna väntar. Resten av ditt liv väntar.\n\nMen ikväll sitter du vid ett bord med åtta människor som reste till ett annat land för att fira DIG. Åtta helt separata liv med egna jobb, egna planer, egna problem. Och de valde att vara HÄR. Med DIG.\n\nDet är inte \"kul med grabbarna.\" Det är ett guild som säger: du betyder något för oss. På riktigt.", objective: "Lyssna. Ta emot. Och när tiden är rätt — ge tillbaka.", rules: ["+25 XP per tal som delas av en partymedlem", "+25 XP om du blir synbart rörd", "+50 XP om du gråter — healers som gråter i raids är inte svaga, de är mänskliga"], quote: "For the Horde. For the Alliance. For Jonna. For all of it." },
  { num: 11, act: "ACT III", actName: "THE RETURN", title: "Hearthstone", code: "GG", difficulty: "Bittersweet", xp: 0, levelUp: null, perk: null, flavor: "Du har klarat det.", body: "Tre akter. Elva quests. Hundratals XP. Minnen som inte går att Dispela.\n\nKampanjen är slut. Du sov dåligt, du åt för mycket, du drack saker som förmodligen inte var lagliga i ditt hemland, och du har haft det bästa du haft sedan... ja. Sedan sist vi alla var samlade.\n\nNu trycker du på Hearthstone. Du reser hem. Till ditt vanliga liv — fast ingenting är vanligt längre. Jonna väntar. The Eternal Bond väntar.", objective: "Packa ihop. Checka ut. Lämna inget bakom dig — varken i rummet eller i ditt hjärta.", rules: [], quote: "You have been disconnected from the server. Reason: real life is calling." },
];

const SIDE_QUESTS = [
  { id: "sq1", unlocksAtLevel: 2, type: "CHALLENGE", title: "First Blood", description: "Beställ en dryck utan att kolla menyn. Peka och säg 'that one'. Ingen ånger.", xp: 25, code: "YOLO" },
  { id: "sq2", unlocksAtLevel: 3, type: "GUILD RULE", title: "Decree of the Disciple", description: "Du får införa EN regel som gäller hela guildet i 30 minuter. Regeln kan inte innebära att någon måste spendera pengar.", xp: 50, code: "MYLAW" },
  { id: "sq3", unlocksAtLevel: 3, type: "GRIND", title: "Reputation Grind: Jonna", description: "Skicka ett meddelande till Jonna som innehåller orden 'eternal bond' utan att förklara varför. Screenshotta hennes svar.", xp: 50, code: "JONNA1" },
  { id: "sq4", unlocksAtLevel: 4, type: "CHALLENGE", title: "Battlecry", description: "Gå fram till en främling och säg 'For The Horde' med full conviction. Bonuspoäng om de svarar.", xp: 50, code: "LOK" },
  { id: "sq5", unlocksAtLevel: 5, type: "GRIND", title: "Potion Master", description: "Drick tre olika shots under kvällen. En av varje färg: ljus, mörk, och 'varför finns detta'. Rapportera till Raid Leader.", xp: 50, code: "3SHOTS" },
  { id: "sq6", unlocksAtLevel: 5, type: "CHALLENGE", title: "Screenshot of Destiny", description: "Ta en selfie med valfri partymedlem. Båda måste göra sitt bästa 'epic raid victory'-ansikte. Posta i gruppen.", xp: 25, code: "SELFIE" },
  { id: "sq7", unlocksAtLevel: 6, type: "GUILD RULE", title: "Archon's Mandate", description: "Välj en partymedlem. Den personen måste hämta dryck/mat åt dig nästa gång gruppen beställer. Ingen förhandling.", xp: 25, code: "FETCH" },
  { id: "sq8", unlocksAtLevel: 7, type: "GRIND", title: "Bard Mode: Activated", description: "Sjung minst 4 rader av valfri låt — högt nog att minst 3 partymedlemmar hör. Bonus: WoW-relaterad.", xp: 75, code: "BARD" },
  { id: "sq9", unlocksAtLevel: 8, type: "CHALLENGE", title: "Inspect Element", description: "Ge en ärlig, ofiltrerad compliment till varje partymedlem. Inte 'du är cool' — något specifikt. Alla åtta.", xp: 100, code: "INSPECT" },
  { id: "sq10", unlocksAtLevel: 9, type: "GUILD RULE", title: "Exalted Decree", description: "Du får byta namn på en partymedlem för resten av kvällen. Alla MÅSTE använda det nya namnet.", xp: 50, code: "RENAME" },
];

const LEVELS = [
  { level: 1, title: "Acolyte", xp: 0 },
  { level: 2, title: "Novice Priest", xp: 100 },
  { level: 3, title: "Disciple", xp: 250 },
  { level: 4, title: "Cleric", xp: 400 },
  { level: 5, title: "High Priest", xp: 600 },
  { level: 6, title: "Archon", xp: 800 },
  { level: 7, title: "Prophet", xp: 1000 },
  { level: 8, title: "Ascendant", xp: 1250 },
  { level: 9, title: "Exalted", xp: 1500 },
  { level: 10, title: "Eternal", xp: 1800 },
];

const RAID_RATINGS = [
  { min: 0, max: 799, text: "Undergeared. Jonna förtjänar bättre. Skämt. Kanske." },
  { min: 800, max: 1199, text: "Decent run. Du klarar dig... förmodligen." },
  { min: 1200, max: 1599, text: "Solid Priest. Jonna har valt med omsorg." },
  { min: 1600, max: 1799, text: "Legendary. The Eternal Bond is yours by right." },
  { min: 1800, max: 99999, text: "REALM FIRST. Aldrig har en Priest varit mer redo." },
];

const PARTY = [
  { name: "Mauritz", cls: "Holy Priest", icon: "✝️", role: "The one who heals must now be healed", hiddenUntilQuest: null },
  { name: "Gustaf", cls: "Paladin", icon: "⚔️", role: "Raid Leader · Best Man", hiddenUntilQuest: null },
  { name: "Philip", cls: "Rogue", icon: "🗡️", role: "Shadow Operative", hiddenUntilQuest: null },
  { name: "Christian", cls: "Warlock", icon: "🔥", role: "Toastmaster", hiddenUntilQuest: 5 },
  { name: "Olof", cls: "Hunter", icon: "🏹", role: "Reinforcement", hiddenUntilQuest: 9 },
  { name: "David", cls: "Shaman", icon: "🌿", role: "Reinforcement", hiddenUntilQuest: 9 },
  { name: "Martin W", cls: "Warrior", icon: "🛡️", role: "Tank", hiddenUntilQuest: null },
  { name: "Filip", cls: "Mage", icon: "✨", role: "DPS", hiddenUntilQuest: null },
  { name: "Martin I", cls: "Death Knight", icon: "💀", role: "Wildcard", hiddenUntilQuest: null },
];

const THEMES = [
  { bg1: "#1a1025", bg2: "#0d0a14", accent: "#8a6d2b", glow: "rgba(138,109,43,0.08)", card: "rgba(26,16,37,0.85)" },
  { bg1: "#1a1228", bg2: "#0d0a14", accent: "#9a7d3b", glow: "rgba(154,125,59,0.10)", card: "rgba(26,18,40,0.85)" },
  { bg1: "#1a1430", bg2: "#0f0b1a", accent: "#b08d4b", glow: "rgba(176,141,75,0.12)", card: "rgba(26,20,48,0.85)" },
  { bg1: "#1c1635", bg2: "#100c1e", accent: "#c9a84c", glow: "rgba(201,168,76,0.14)", card: "rgba(28,22,53,0.85)" },
  { bg1: "#1e183a", bg2: "#110e22", accent: "#d4b85c", glow: "rgba(212,184,92,0.16)", card: "rgba(30,24,58,0.85)" },
  { bg1: "#201a40", bg2: "#131028", accent: "#e0c86c", glow: "rgba(224,200,108,0.18)", card: "rgba(32,26,64,0.85)" },
  { bg1: "#251e48", bg2: "#16122e", accent: "#e8d48b", glow: "rgba(232,212,139,0.20)", card: "rgba(37,30,72,0.85)" },
  { bg1: "#2a2050", bg2: "#1a1435", accent: "#f0dfa0", glow: "rgba(240,223,160,0.22)", card: "rgba(42,32,80,0.85)" },
  { bg1: "#302458", bg2: "#1e163c", accent: "#f5e8b5", glow: "rgba(245,232,181,0.25)", card: "rgba(48,36,88,0.85)" },
  { bg1: "#382860", bg2: "#221a44", accent: "#fff0c8", glow: "rgba(255,240,200,0.30)", card: "rgba(56,40,96,0.85)" },
];

const SK = "eternal-bond-v2";
async function load() { try { const r = await window.storage.get(SK); if (r?.value) return JSON.parse(r.value); } catch {} return { uq: [], csq: [], bxp: 0, gc: false, dx: false }; }
async function save(s) { try { await window.storage.set(SK, JSON.stringify(s)); } catch {} }

function calcXP(s) {
  const qxp = s.uq.reduce((a, n) => a + (QUESTS.find(q => q.num === n)?.xp || 0), 0);
  const sxp = s.csq.reduce((a, id) => a + (SIDE_QUESTS.find(q => q.id === id)?.xp || 0), 0);
  const base = qxp + sxp + (s.bxp || 0);
  return s.dx ? Math.floor(base * 1.5) : base;
}
function getLvl(xp) { return LEVELS.reduce((b, l) => xp >= l.xp ? l : b, LEVELS[0]); }

function CodeInput({ onOk, code }) {
  const [v, setV] = useState("");
  const [e, setE] = useState(false);
  const MASTER = "GMMODE";
  const submit = () => { const val = v.toUpperCase().trim(); if (val === code || val === MASTER) { onOk(); setV(""); } else { setE(true); setTimeout(() => setE(false), 1500); } };
  return (
    <div className="flex gap-2 mt-3">
      <input type="text" value={v} onChange={ev => setV(ev.target.value)} onKeyDown={ev => ev.key === "Enter" && submit()} placeholder="Enter code..." className="flex-1 px-3 py-2 rounded text-sm outline-none" style={{ background: "rgba(20,14,32,0.9)", border: e ? "1px solid #cc4444" : "1px solid rgba(201,168,76,0.3)", color: "#f0e6d0", fontFamily: "monospace" }} autoFocus />
      <button onClick={submit} className="px-4 py-2 rounded text-xs font-bold" style={{ background: "linear-gradient(135deg, #8a6d2b, #c9a84c)", color: "#1a1025" }}>UNLOCK</button>
    </div>
  );
}

function QCard({ q, unlocked, onUnlock, t }) {
  const [sc, setSc] = useState(false);
  const [ex, setEx] = useState(false);
  if (!unlocked) return (
    <div className="mb-3 rounded-lg p-4" style={{ background: "rgba(30,20,51,0.85)", border: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", color: "#3d2d55", fontFamily: "'Cinzel',serif", fontSize: "16px" }}>{q.num}</div>
          <div><div style={{ color: "#4a3a5a", fontSize: "10px", letterSpacing: "1.5px" }}>{q.act} — {q.actName}</div><div style={{ color: "#3d2d55", fontFamily: "'Cinzel',serif", fontSize: "14px", fontWeight: 700 }}>🔒 LOCKED</div></div>
        </div>
        {!sc && <button onClick={() => setSc(true)} className="px-3 py-1.5 rounded text-xs font-bold" style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", color: "#8a6d2b" }}>CODE</button>}
      </div>
      {sc && <CodeInput code={q.code} onOk={() => onUnlock(q.num)} />}
    </div>
  );
  return (
    <div className="mb-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${t.accent}44`, boxShadow: `0 0 20px ${t.glow}` }}>
      <div className="px-4 py-3 cursor-pointer" style={{ background: `linear-gradient(135deg, ${t.accent}22, ${t.card})`, borderBottom: `1px solid ${t.accent}33` }} onClick={() => setEx(!ex)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: `${t.accent}20`, border: `2px solid ${t.accent}`, color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "16px" }}>{q.num}</div>
            <div><div style={{ color: "#b8a88a", fontSize: "10px", letterSpacing: "1.5px" }}>{q.act} — {q.actName}</div><div style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "14px", fontWeight: 700 }}>{q.title}</div></div>
          </div>
          <span style={{ color: t.accent }}>{ex ? "▾" : "▸"}</span>
        </div>
      </div>
      {ex && (
        <div className="px-4 py-4" style={{ background: "rgba(20,14,32,0.5)" }}>
          <div className="mb-3" style={{ color: "#6a5a7a", fontSize: "11px", letterSpacing: "1px" }}>DIFFICULTY: {q.difficulty}</div>
          <div className="rounded p-3 mb-4" style={{ background: "rgba(20,14,32,0.7)", borderLeft: `3px solid ${t.accent}` }}>
            <p style={{ color: t.accent, fontSize: "14px", fontStyle: "italic", lineHeight: 1.5 }}>{q.flavor}</p>
          </div>
          <div className="mb-4" style={{ color: "#d4c8b0", fontSize: "13px", lineHeight: 1.7 }}>
            {q.body.split("\n\n").map((p, i) => <p key={i} className="mb-3">{p}</p>)}
          </div>
          <div className="mb-4"><div style={{ color: t.accent, fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, marginBottom: "6px" }}>DIN QUEST</div><div style={{ color: "#f0e6d0", fontSize: "13px", lineHeight: 1.6 }}>{q.objective}</div></div>
          {q.rules.length > 0 && <div className="mb-4"><div style={{ color: t.accent, fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, marginBottom: "6px" }}>REGLER & BONUSAR</div>{q.rules.map((r, i) => <div key={i} className="flex gap-2 mb-1" style={{ color: r.includes("−") ? "#cc4444" : "#b8a88a", fontSize: "12px" }}><span style={{ color: t.accent }}>◆</span><span>{r}</span></div>)}</div>}
          {q.perk && <div className="rounded p-3 mb-4" style={{ background: "linear-gradient(135deg,rgba(92,184,92,0.1),rgba(201,168,76,0.1))", border: "1px solid rgba(92,184,92,0.3)" }}><div style={{ color: "#5cb85c", fontSize: "11px", letterSpacing: "1.5px", fontWeight: 700, marginBottom: "4px" }}>ABILITY UNLOCK</div><div style={{ color: "#d4c8b0", fontSize: "12px", lineHeight: 1.5 }}>{q.perk}</div></div>}
          <div className="rounded p-3 flex items-center justify-between" style={{ background: `${t.accent}0d`, border: `1px solid ${t.accent}33` }}>
            <span style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "14px", fontWeight: 700 }}>{q.xp > 0 ? `+${q.xp} XP` : "CAMPAIGN COMPLETE"}</span>
            {q.levelUp && <span style={{ color: "#5cb85c", fontSize: "11px", fontWeight: 700 }}>LEVEL UP → {q.levelUp}</span>}
          </div>
          <div className="mt-4 text-center" style={{ color: "#4a3a5a", fontSize: "11px", fontStyle: "italic" }}>"{q.quote}"</div>
        </div>
      )}
    </div>
  );
}

function SQCard({ sq, done, onDone, t }) {
  const [sc, setSc] = useState(false);
  const tc = { CHALLENGE: "#e07030", "GUILD RULE": "#30a0e0", GRIND: "#a050d0" }[sq.type] || "#c9a84c";
  return (
    <div className="mb-2 rounded-lg p-3" style={{ background: done ? "rgba(92,184,92,0.06)" : "rgba(30,20,51,0.6)", border: done ? "1px solid rgba(92,184,92,0.25)" : "1px solid rgba(201,168,76,0.1)", opacity: done ? 0.6 : 1 }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded font-bold" style={{ background: `${tc}15`, color: tc, fontSize: "9px", letterSpacing: "1px" }}>{sq.type}</span>
            <span style={{ color: "#5a4a6a", fontSize: "10px" }}>+{sq.xp} XP</span>
          </div>
          <div style={{ color: done ? "#5cb85c" : t.accent, fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 700 }}>{done ? "✓ " : ""}{sq.title}</div>
          <div style={{ color: "#b8a88a", fontSize: "12px", lineHeight: 1.5, marginTop: "4px" }}>{sq.description}</div>
        </div>
        {!done && !sc && <button onClick={() => setSc(true)} className="px-2 py-1 rounded text-xs font-bold shrink-0 mt-1" style={{ background: `${tc}12`, border: `1px solid ${tc}35`, color: tc }}>DONE</button>}
      </div>
      {sc && !done && <CodeInput code={sq.code} onOk={() => { onDone(sq.id); setSc(false); }} />}
    </div>
  );
}

export default function App() {
  const [s, setS] = useState({ uq: [], csq: [], bxp: 0, gc: false, dx: false });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("quests");
  const [lua, setLua] = useState(null);
  const plr = useRef(1);

  useEffect(() => { load().then(d => { setS(d); setLoading(false); }); }, []);

  useEffect(() => {
    const allR = PARTY.every(m => !m.hiddenUntilQuest || s.uq.includes(m.hiddenUntilQuest));
    if (allR && !s.dx && s.uq.length > 0) { const ns = { ...s, gc: true, dx: true }; setS(ns); save(ns); }
  }, [s.uq]);

  const xp = calcXP(s);
  const lvl = getLvl(xp);
  const nxt = LEVELS.find(l => l.xp > xp);
  const t = THEMES[lvl.level - 1];

  const chkLvl = useCallback((ns) => { const x = calcXP(ns); const nl = getLvl(x); if (nl.level > plr.current) { setLua(nl); plr.current = nl.level; setTimeout(() => setLua(null), 3000); } }, []);

  const unlockQ = useCallback(async (n) => { const ns = { ...s, uq: [...s.uq, n] }; setS(ns); await save(ns); chkLvl(ns); }, [s, chkLvl]);
  const doneS = useCallback(async (id) => { const ns = { ...s, csq: [...s.csq, id] }; setS(ns); await save(ns); chkLvl(ns); }, [s, chkLvl]);

  useEffect(() => { plr.current = lvl.level; }, []);

  const avSQ = SIDE_QUESTS.filter(sq => lvl.level >= sq.unlocksAtLevel);
  const pendSQ = avSQ.filter(sq => !s.csq.includes(sq.id));

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ background: "#1a1025" }}><div style={{ color: "#c9a84c", fontFamily: "'Cinzel',serif" }}>Loading campaign...</div></div>;

  return (
    <div className="min-h-screen transition-all duration-1000" style={{ background: `linear-gradient(180deg, ${t.bg1} 0%, ${t.bg2} 100%)`, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap');
@keyframes levelUp{0%{opacity:0;transform:scale(.5) translateY(20px)}20%{opacity:1;transform:scale(1.1) translateY(0)}80%{opacity:1;transform:scale(1) translateY(0)}100%{opacity:0;transform:scale(.9) translateY(-20px)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}`}</style>

      {lua && <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.9)", animation: "levelUp 3s forwards" }}><div className="text-center"><div style={{ color: "#e8d48b", fontSize: "14px", letterSpacing: "4px", marginBottom: "12px" }}>LEVEL UP</div><div style={{ fontFamily: "'Cinzel',serif", fontSize: "36px", fontWeight: 900, background: "linear-gradient(90deg,#8a6d2b,#e8d48b,#c9a84c,#e8d48b,#8a6d2b)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 2s linear infinite" }}>{lua.title}</div><div style={{ color: "#5cb85c", fontSize: "16px", marginTop: "8px" }}>Level {lua.level}</div></div></div>}

      <div className="px-4 pt-6 pb-4">
        <div className="text-center mb-1">
          <div style={{ color: t.accent, fontSize: "10px", letterSpacing: "4px", opacity: 0.7 }}>CAMPAIGN</div>
          <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "26px", fontWeight: 900, background: `linear-gradient(180deg, ${t.accent}, ${t.accent}88)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>THE ETERNAL<br/>BOND</h1>
          <div style={{ color: "#4a3a5a", fontSize: "11px", marginTop: "4px", fontStyle: "italic" }}>The Lands Beyond · April 2026</div>
        </div>

        <div className="mt-4 rounded-lg p-4 transition-all duration-1000" style={{ background: `linear-gradient(135deg, ${t.bg1}, ${t.card})`, border: `2px solid ${t.accent}44`, boxShadow: `0 0 40px ${t.glow}, inset 0 0 40px ${t.glow}` }}>
          <div className="text-center mb-3">
            <div style={{ color: "#b8a88a", fontSize: "10px", letterSpacing: "2px" }}>HOLY PRIEST MAURITZ</div>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: "22px", fontWeight: 700, color: t.accent, marginTop: "2px", textShadow: `0 0 20px ${t.glow}` }}>{lvl.title}</div>
            {s.dx && <div style={{ color: "#5cb85c", fontSize: "10px", marginTop: "4px", letterSpacing: "1px", animation: "pulse 2s infinite" }}>⚡ 1.5x XP MULTIPLIER ⚡</div>}
          </div>
          <div className="w-full">
            <div className="flex justify-between items-baseline mb-1">
              <span style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "13px", fontWeight: 700 }}>LEVEL {lvl.level}</span>
              <span style={{ color: "#b8a88a", fontSize: "12px" }}>{xp} / {nxt?.xp || "MAX"} XP</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: "12px", background: "rgba(20,14,32,0.8)", border: `1px solid ${t.accent}33` }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, Math.max(2, nxt ? ((xp - lvl.xp) / (nxt.xp - lvl.xp)) * 100 : 100))}%`, background: `linear-gradient(90deg, ${t.accent}88, ${t.accent}, ${t.accent}cc)`, boxShadow: `0 0 12px ${t.accent}66` }} />
            </div>
          </div>
          <div className="flex justify-between mt-3 px-1">
            {LEVELS.map(l => <div key={l.level} className="flex flex-col items-center" style={{ width: "20px" }}>
              <div className="w-3 h-3 rounded-full transition-all duration-500" style={{ background: lvl.level >= l.level ? t.accent : "rgba(20,14,32,0.8)", border: `1px solid ${lvl.level >= l.level ? t.accent : t.accent + "22"}`, boxShadow: lvl.level === l.level ? `0 0 8px ${t.accent}` : "none" }} />
              <span style={{ color: lvl.level >= l.level ? t.accent : "#2a1a3a", fontSize: "8px", marginTop: "2px", fontWeight: lvl.level === l.level ? 700 : 400 }}>{l.level}</span>
            </div>)}
          </div>
          <div className="flex justify-between mt-2" style={{ fontSize: "10px", color: "#5a4a6a" }}>
            <span>{s.uq.length}/{QUESTS.length} quests</span>
            <span>{s.csq.length}/{SIDE_QUESTS.length} side quests</span>
          </div>
        </div>
      </div>

      <div className="flex px-4 mb-4 gap-1">
        {[{ id: "quests", label: "QUESTS" }, { id: "side", label: "SIDE", badge: pendSQ.length || null }, { id: "party", label: "GUILD" }, { id: "rating", label: "RATING" }].map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className="flex-1 py-2 rounded text-xs font-bold tracking-wider relative" style={{ background: tab === tb.id ? `${t.accent}18` : "rgba(30,20,51,0.5)", border: tab === tb.id ? `1px solid ${t.accent}55` : "1px solid rgba(201,168,76,0.06)", color: tab === tb.id ? t.accent : "#4a3a5a" }}>
            {tb.label}
            {tb.badge && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#e07030", color: "#fff", fontSize: "9px", fontWeight: 700 }}>{tb.badge}</span>}
          </button>
        ))}
      </div>

      <div className="px-4 pb-8">
        {tab === "quests" && QUESTS.map(q => <QCard key={q.num} q={q} unlocked={s.uq.includes(q.num)} onUnlock={unlockQ} t={t} />)}

        {tab === "side" && (avSQ.length === 0 ? <div className="text-center py-8" style={{ color: "#4a3a5a" }}><div style={{ fontSize: "24px", marginBottom: "8px" }}>🔒</div><div style={{ fontFamily: "'Cinzel',serif", fontSize: "14px" }}>Side quests låses upp vid Level 2</div></div> : <>
          {avSQ.map(sq => <SQCard key={sq.id} sq={sq} done={s.csq.includes(sq.id)} onDone={doneS} t={t} />)}
          {SIDE_QUESTS.filter(sq => lvl.level < sq.unlocksAtLevel).length > 0 && <div className="text-center mt-4" style={{ color: "#4a3a5a", fontSize: "11px" }}>{SIDE_QUESTS.filter(sq => lvl.level < sq.unlocksAtLevel).length} fler side quests vid högre levels...</div>}
        </>)}

        {tab === "party" && <div className="space-y-2">
          {PARTY.map(m => {
            const hidden = m.hiddenUntilQuest && !s.uq.includes(m.hiddenUntilQuest);
            return <div key={m.name} className="rounded-lg p-3 flex items-center gap-3" style={{ background: hidden ? "rgba(20,14,32,0.5)" : "rgba(30,20,51,0.6)", border: `1px solid ${hidden ? "rgba(201,168,76,0.06)" : t.accent + "22"}`, opacity: hidden ? 0.4 : 1 }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ background: hidden ? "rgba(20,14,32,0.5)" : `${t.accent}12`, border: `2px solid ${hidden ? "#2a1a3a" : t.accent + "44"}` }}>
                {hidden ? <span style={{ color: "#3d2d55", fontSize: "18px" }}>?</span> : <span className="text-xl">{m.icon}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: hidden ? "#3d2d55" : t.accent, fontSize: "13px", fontWeight: 700, fontFamily: "'Cinzel',serif" }}>{hidden ? "???" : m.name}</div>
                <div style={{ color: hidden ? "#2a1a3a" : "#7a6a8a", fontSize: "11px" }}>{hidden ? "Signal förlorad..." : `${m.cls} · ${m.role}`}</div>
              </div>
              {hidden && <span style={{ color: "#cc4444", fontSize: "9px", letterSpacing: "1px" }}>MISSING</span>}
            </div>;
          })}
          {(() => {
            const all = PARTY.every(m => !m.hiddenUntilQuest || s.uq.includes(m.hiddenUntilQuest));
            return all ? <div className="rounded-lg p-4 text-center mt-3" style={{ background: `linear-gradient(135deg,rgba(92,184,92,0.1),${t.accent}10)`, border: "1px solid rgba(92,184,92,0.35)" }}><div style={{ color: "#5cb85c", fontFamily: "'Cinzel',serif", fontSize: "16px", fontWeight: 700 }}>⚔️ GUILD COMPLETE ⚔️</div><div style={{ color: "#b8a88a", fontSize: "11px", marginTop: "4px" }}>Alla nio samlade. 1.5x XP MULTIPLIER ACTIVE.</div></div> : <div className="rounded-lg p-3 text-center mt-3" style={{ background: "rgba(20,14,32,0.4)", border: "1px solid rgba(201,168,76,0.08)" }}><div style={{ color: "#4a3a5a", fontSize: "11px" }}>GUILD INCOMPLETE — {PARTY.filter(m => m.hiddenUntilQuest && !s.uq.includes(m.hiddenUntilQuest)).length} members missing</div></div>;
          })()}
        </div>}

        {tab === "rating" && <div className="rounded-lg p-4" style={{ background: t.card, border: `1px solid ${t.accent}22` }}>
          <div className="text-center mb-4"><div style={{ color: t.accent, fontFamily: "'Cinzel',serif", fontSize: "16px", fontWeight: 700 }}>RAID RATING</div><div style={{ color: "#4a3a5a", fontSize: "11px", marginTop: "4px" }}>Hur redo är Mauritz för The Eternal Bond?</div></div>
          {RAID_RATINGS.map((r, i) => { const a = xp >= r.min && xp <= r.max; return <div key={i} className="rounded p-3 mb-2" style={{ background: a ? `${t.accent}10` : "rgba(20,14,32,0.4)", border: a ? `1px solid ${t.accent}44` : "1px solid rgba(201,168,76,0.04)", opacity: a ? 1 : 0.35 }}><div className="flex justify-between items-baseline mb-1"><span style={{ color: a ? t.accent : "#4a3a5a", fontSize: "11px", fontWeight: 700 }}>{r.min}–{r.max < 99999 ? r.max : "∞"} XP</span>{a && <span style={{ color: "#5cb85c", fontSize: "10px", fontWeight: 700, animation: "pulse 2s infinite" }}>◆ CURRENT</span>}</div><div style={{ color: a ? "#d4c8b0" : "#2a1a3a", fontSize: "12px", fontStyle: "italic" }}>{r.text}</div></div>; })}
        </div>}
      </div>
    </div>
  );
}
