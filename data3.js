// ===== THE ETERNAL BOND — CONTENT =====
// Everything is about Jonna. Mauritz's journey from UNWORTHY to BOUND TO JONNA.
// Tone: harder, rougher, WoW-raid-tough-talk. Read aloud to the party.

window.QUESTS = [
  {
    num: 1, act: "ACT I", actName: "THE CALL TO BOND",
    title: "Summons from the Guild",
    code: "LFGRAID",
    difficulty: "MANDATORY",
    xp: 100,
    tier: "rare",
    boss: null,
    flavor: "Stäng ner datorn. Spara inte. Där du är på väg spelar dina unfinished tasks ingen roll längre.",
    body: "I 347 dagar har du vaknat, jobbat, ätit, sovit. Levt som om ingenting närmade sig. Men något närmar sig. The Eternal Bond — ritualen som binder din själ till Jonnas. Permanent. Ingen Dispel. Ingen Fade. Ingen Hearthstone tillbaka.\n\nDitt guild har kallats. Vi har röstat. Beslutet är enhälligt: du är inte redo att bindas till henne. Inte som du står idag.\n\nDärför är vi här. Inte som vänner. Ditt Guild. Och detta är din sista kampanj som obunden. En serie trials genom ***REDACTED***, designade för att göra dig värdig Jonna. Eller krossa dig i försöket.",
    objective: "Drick upp. Se upp. All abord the hypetrain.",
    rules: [
      "Du får INTE veta vart vi ska",
      "Du får INTE kontakta Jonna utan Raid Leaders godkännande",
      "Du följer ordergivning utan diskussion",
      "Bryter du reglerna: −200 XP och vi berättar för Jonna om \"incidenten\""
    ],
    quote: "The Eternal Bond belongs to those who earn it. You have not. Yet."
  },
  {
    num: 2, act: "ACT I", actName: "THE CALL TO BOND",
    title: "Through the Portal",
    code: "BUFFPLS",
    difficulty: "MODERATE",
    xp: 50,
    tier: "common",
    boss: null,
    perk: "PRIEST'S BLESSING — Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE köpa en dryck åt dig. EN gång hela kampanjen. Välj rätt moment.",
    flavor: "Portalen vibrerar. Den bryr sig inte om att du är nervös.",
    body: "Vart den leder kan vi inte säga — det är emot Guild Protocol, paragraf 4: 'The Priest får inte veta.' Men vi kan säga så här: på andra sidan finns ett land där du inte kontrollerar något. Inte språket. Inte valutan. Inte schemat. Inte ens nästa måltid.\n\nDet är meningen. Jonna kommer att äga resten av ditt liv. Börja vänja dig vid att inte bestämma.\n\nEn healer som inte buffar sitt party är en healer som wipar sitt party. Innan du kliver igenom portalen har du en helig plikt.",
    objective: "Förse ditt party med provisions. Du köper dryck och snacks åt alla. Vad som än krävs för att att nå destinationen levande.",
    rules: [
      "Håll inte på och \"håll på\"",
      "Du betalar givetvis eftersom vi redan betalt fett mkt för den här skiten"
    ],
    quote: "Loading screen: Om du inte vet vart du ska, följ tanken."
  },
  {
    num: 3, act: "ACT I", actName: "THE CALL TO BOND",
    title: "The Inn",
    code: "RESTED",
    difficulty: "TRIVIAL",
    xp: 50,
    tier: "common",
    boss: null,
    perk: "HEALER'S PRIVILEGE — Du får checka in först.",
    flavor: "Du lever. Portalen spottade ut dig på andra sidan. Det är en bättre start än många raids får.",
    body: "Lukterna är annorlunda. Språket nästan begripligt. Valutan känns tveksamt legal. Men partyt har säkrat ett värdshus — kampanjens forward operating base.\n\nNjut av det här lugnet. Det varar inte. Ikväll börjar din första trial, och de kräver att du är utvilad, påklädd, och mentalt förberedd för saker Jonna aldrig kommer få höra om.",
    objective: "Checka in. Orientera. Förbered dig. Drick vatten — du kommer behöva det.",
    rules: [],
    quote: "Inn music playing. You feel rested. XP bar glows faintly."
  },
  {
    num: 4, act: "ACT I", actName: "THE CALL TO BOND",
    title: "Feast of the gods",
    code: "WARPIGS",
    difficulty: "HARD",
    xp: 150,
    tier: "epic",
    boss: { name: "The Feast of the GODS", hp: 100, flavor: "Eld. Kött. Öl mörkare än Death Knights humor." },
    flavor: "Din tid som lugn, ohotad Priest är officiellt över.",
    body: "Partyt eskorterar dig till en plats. Vi avslöjar inte namnet — det talar för sig självt när dörrarna öppnas. Här handlar det om eld, kött, och drycker som inte borde vara lagliga.\n\nMen mitt i kaoset har du en uppgift ingen öl räddar dig från. Inför hela ditt samlade party ska du STÅ UPP och berätta om var och en av oss. Inte 'han är snäll' — det kan en NPC säga. Berätta om hur vi lärde känna dig. Vad vi betyder för dig och ett minne vi har tillsammans. Du har valt att ha ditt party i olika lobbys och detta är din uppgift. Förena oss - ikväll.\n\nPartyt lyssnar. Partyt dömer. Partyt avgör om du får WORTHY-tituleringen eller inte.",
    objective: "Res dig. Tala. Gör det värdigt. Gör det så att vi tror dig.",
    rules: [
      "+50 XP om hela partyt höjer bägarna och ropar WORTHY",
      "−25 XP varje gång du kollar mobilen under kvällen",
      "Lägg undan telefonerna. En feast är en feast."
    ],
    quote: "Leeroy Jenkins höll aldrig tal om kärlek. Du är bättre än Leeroy. Bevisa det."
  },
  {
    num: 5, act: "ACT I", actName: "THE CALL TO BOND",
    title: "A Dark Presence Arrives",
    code: "SUMMON",
    difficulty: "UNPREDICTABLE",
    xp: 100,
    tier: "rare",
    boss: null,
    perk: "☠️ TOASTMASTER'S CURSE — Warlock Christian har ett speciellt dare/uppdrag som kan detoneras när som helst. Du kan inte neka. Du kan inte Dispela. Du kan inte Fade. Bitch.",
    flavor: "Du kände det, eller hur? Temperaturen sjönk. Ölskummet vibrerade som en seismograf för incoming doom.",
    body: "Sen hördes stegen. Tunga. Det karakteristiska ljudet av de spanska höfterna.\nToastie. Chrissy Chris. My boy. Wow, detta står inte ens i texten jag bara säger det från hjärtat. Du är fan sexyyyy. Yeah. Skål för Krabban!\n\nEn Warlock har anslutit till partyt.\n\nWarlocks är opålitliga, självcentrerade, och har en tendens att sacrificea partymedlemmar för personlig vinning. MEN — denna Warlock bär en titel: TOASTMASTER. Hans makt är specifik, begränsad, och exakt så skrämmande som det låter.\n\nHan är inte här för dig. Han är här för Jonna. Han vet att om ritualen ska hålla, måste någon testa dig hårdare än någon annan vågar.",
    objective: "Välkomna din nya allierade. Hela partyt skålar — en välkomstshot från samtliga. Guild Protocol.",
    rules: [
      "Toastmaster's Curse är nu aktiv",
      "Guildet måste se till att han kommer ikapp drickandet OMGÅENDE"
    ],
    quote: "You hear a faint whisper: 'I have candy.' You should not follow the Warlock. You will anyway."
  },
  {
    num: 6, act: "ACT II", actName: "TRIALS OF THE WORTHY",
    title: "Morning Resurrection",
    code: "REZPLZ",
    difficulty: "DEPENDS ON LAST NIGHT",
    xp: 50,
    tier: "common",
    boss: null,
    flavor: "Solen stiger. Din mana bar är tom. Din health bar flimrar rött.",
    body: "Det finns en ironi här. Du, en HEALER, som inte kan heala sig själv. Hela din karriär har du stått bakom andra och hållit dem vid liv. Kastat Renew på Warriors som rushat in. Desperate-castat Flash Heal på Mages som stått i AoE:n IGEN.\n\nOch nu ligger du här. I en säng du knappt minns. Med en smak i munnen som antyder att du åt något som inte borde existera.\n\nMen Jonna väntar. Hemma. I framtiden. Och en Priest som faller idag blir aldrig bunden till henne imorgon. En Priest FALLER INTE. En Priest RESER SIG.",
    objective: "Res dig. Hitta frukost. Överlev den. Hydra dig som ditt liv hänger på det — för det gör det.",
    rules: [
      "Fråga Philip om \"the magic potion\"",
      "+10 XP per glas vatten du dricker före kaffe"
    ],
    quote: "You are not prepared. — Illidan, som aldrig behövde hantera hotellfrukost med hangover."
  },
  {
    num: 7, act: "ACT II", actName: "TRIALS OF THE WORTHY",
    title: "The Trial of the Unknown",
    code: "SHADOW",
    difficulty: "[REDACTED]",
    xp: 200,
    tier: "epic",
    boss: { name: "The Unknown Trial", hp: 200, flavor: "Två prövningar. Båda testar om du förtjänar att stå bredvid Jonna." },
    flavor: "Du har healat. Buffat. Stått i bakre raden. Idag blir du DPS.",
    body: "*** REDACTED ***\n\n*** REDACTED ***\n\n*** REDACTED ***\n\n*** REDACTED ***",
    objective: "*** REDACTED ***",
    rules: ["◆", "Ingen rage-quit. Ingen AFK. Inga undantag."],
    quote: "Switching spec from Holy to Shadow. Please wait... please wait..."
  },
  {
    num: 8, act: "ACT II", actName: "TRIALS OF THE WORTHY",
    title: "The Island Grind",
    code: "GRIND",
    difficulty: "FARM",
    xp: 100,
    tier: "rare",
    boss: null,
    perk: "🍻 CHILL BUFF — Det här är inte ett test. Det är en paus. Party XP delas ut passivt för varje timme vi hänger. Inga krav, inga straff — bara att vara här.",
    flavor: "Solen står rätt. Havsvinden är lätt. Ingen rusar någonstans.",
    body: "En dag utan ett mission. En dag som söndag är till för. Hangars, lador, containrar, rök i luften.\n\nInga objectives. Ingen formation. Ingen Raid Leader som tjatar på tempo. Bara partyt, maten, drickan — och tid. Tid att sitta. Tid att prata. Tid att ingenting.\n\nDet är här du förstår varför vi är här. Inte för att pröva dig. För att vara bredvid dig innan du blir någon annans först prio.",
    objective: "Ingen. Lägg undan din mental checklist.",
    rules: [
      "Inga referenser till den jävla libanesiska burgaren i hötorgshallen. −5000 XP",
      "Critical träff: Få/köp merch från något ställe → +500 XP"
    ],
    quote: "No grind today. Just vibes."
  },
  {
    num: 9, act: "ACT II", actName: "TRIALS OF THE WORTHY",
    title: "Reinforcements from the Eastern Kingdoms",
    code: "LFGMORE",
    difficulty: "EMOTIONAL",
    xp: 150,
    tier: "epic",
    boss: null,
    flavor: "Minns du party-rostern? Minns du de tomma platserna?",
    body: "Hunter: 'Ej lokaliserad. Signal förlorad.'\nShaman: 'Ej lokaliserad. Signal förlorad.'\n\nVi ljög inte. Deras signal VAR förlorad. De befann sig i andra delar av riket, bortom räckhåll. Vi visste inte om de skulle hinna. Vi visste inte om portalen skulle hålla.\n\nMen den höll.\n\nDe är här nu. Din Hunter och din Shaman. De korsade länder och tidszoner för att stå vid din sida i kampanjens avgörande fas. För att Jonna förtjänar att du står där med ett komplett party. Inte ett halvt. Inte sju av nio. Nio.\n\nPartyt är nu at FULL STRENGTH. Och det är exakt vad du kommer att behöva.",
    objective: "Välkomna dina förlorade allierade med proper Guild Greeting: en gruppshot, alla nio. Raid Leader räknar ner.",
    rules: [
      "Raid difficulty ökar härifrån",
      "Alla nio måste vara med i shot:en. Ingen fusk-sprite."
    ],
    quote: "LFG complete. Nine souls. One destiny. Zero excuses."
  },
  {
    num: 10, act: "ACT II", actName: "TRIALS OF THE WORTHY",
    title: "Final Feast Before the Bond",
    code: "BONFIRE",
    difficulty: "LEGENDARY",
    xp: 300,
    tier: "legendary",
    boss: { name: "The Last Night Unbound", hp: 300, flavor: "Imorgon binds du till Jonna. Ikväll är den sista kvällen som din själ är din egen." },
    perk: "🔥 PRIEST'S LAST COMMAND — Du får ge ETT uppdrag till valfri partymedlem. Vad som helst. Ikväll. De kan inte neka. Välj med vishet — denna power är över vid soluppgången.",
    flavor: "Det här är det, Priest. Din sista kväll som obunden.",
    body: "Imorgon börjar resan hem. Efter det — The Eternal Bond. Jonna väntar. Resten av ditt liv väntar.\n\nMen ikväll sitter du vid ett bord med åtta människor som reste till ett annat land för att fira DIG. Åtta liv med egna jobb, egna planer, egna problem. De valde att vara HÄR. Med DIG. För att de tror på det du och Jonna ska göra.\n\nDet här är inte 'kul med grabbarna.' Det här är ett guild som säger: vi ser dig. Vi tror på dig. Vi skickar dig vidare till Jonna med hedern intakt. På riktigt.\n\nLyssna. Ta emot. Och när tiden är rätt — ge tillbaka.",
    objective: "Lyssna på talen. Tacka. Skåla. När det är din tur att tala om Jonna: gör det så att bordet gråter.",
    rules: [
      "+25 XP per tal som delas av en partymedlem",
      "+25 XP om du blir synbart rörd",
      "+50 XP om du gråter. Healers som gråter i raid är inte svaga. De är mänskliga.",
      "+100 XP om Jonnas namn sägs med den respekt det förtjänar"
    ],
    quote: "For the Horde. For the Alliance. For Jonna. For all of it."
  },
  {
    num: 11, act: "ACT III", actName: "RETURN TO JONNA",
    title: "Hearthstone Home",
    code: "GG",
    difficulty: "BITTERSWEET",
    xp: 0,
    tier: "legendary",
    boss: null,
    flavor: "Du har klarat det. Kampanjen är slut. Nu börjar The Eternal Bond.",
    body: "Tre akter. Elva quests. Hundratals XP. Minnen som inte går att Dispela.\n\nDu sov dåligt. Åt för mycket. Drack saker som förmodligen inte var lagliga i ditt hemland. Och du hade det bästa du haft sedan... ja. Sedan sist vi alla var samlade.\n\nNu trycker du på Hearthstone. Du reser hem. Till Jonna.\n\nHon väntar. Hon vet inte exakt vad vi gjorde — och hon behöver inte veta allt. Hon behöver bara veta en sak: du kom hem som en bättre version av dig själv. Värdig The Eternal Bond. Redo att bindas till henne. Permanent. Ingen Dispel. Ingen Fade.\n\nVi är klara här. Gå till henne.",
    objective: "Packa. Checka ut. Lämna inget bakom dig — varken i rummet eller i hjärtat. Gå hem till Jonna.",
    rules: [],
    quote: "You have been disconnected from the server. Reason: Jonna is calling."
  },
];

// ===== SIDE QUESTS — all Jonna-adjacent or party-power =====
window.SIDE_QUESTS = [
  { id: "sq1", unlocksAtLevel: 2, type: "CHALLENGE", title: "First Blood", description: "Beställ en dryck utan att kolla menyn. Peka. Säg 'that one.' Ingen ånger. Jonna hade gjort likadant.", xp: 25, code: "YOLO" },
  { id: "sq2", unlocksAtLevel: 3, type: "DECREE", title: "Law of the Disciple", description: "Inför EN regel som gäller hela guildet i 30 minuter. Regeln får inte kosta pengar. Bryt regeln själv: −50 XP.", xp: 50, code: "MYLAW" },
  { id: "sq3", unlocksAtLevel: 3, type: "JONNA", title: "Signal to the Bond", description: "Skicka Jonna ett meddelande som innehåller 'eternal bond' utan förklaring. Screenshotta hennes svar. Visa partyt.", xp: 75, code: "JONNA1" },
  { id: "sq4", unlocksAtLevel: 4, type: "CHALLENGE", title: "Battlecry", description: "Gå fram till en främling och säg 'For the Horde' med full conviction. Bonus om de svarar. Dubbel bonus om de svarar rätt.", xp: 50, code: "LOK" },
  { id: "sq5", unlocksAtLevel: 5, type: "GRIND", title: "Potion Master", description: "Drick tre shots under kvällen. En ljus. En mörk. En 'varför finns detta.' Rapportera varje till Raid Leader.", xp: 50, code: "3SHOTS" },
  { id: "sq6", unlocksAtLevel: 5, type: "JONNA", title: "Proof of Life", description: "Ta en selfie med valfri partymedlem. Båda gör 'epic raid victory'-ansiktet. Skicka till Jonna. Inget caption.", xp: 50, code: "SELFIE" },
  { id: "sq7", unlocksAtLevel: 6, type: "DECREE", title: "Archon's Mandate", description: "Välj en partymedlem. Den personen hämtar din nästa dryck/mat. Ingen förhandling. Ingen återlämning.", xp: 25, code: "FETCH" },
  { id: "sq8", unlocksAtLevel: 7, type: "GRIND", title: "Bard Mode", description: "Sjung minst 4 rader av valfri låt. Högt nog att minst 3 partymedlemmar hör. Bonus: WoW-relaterad. Dubbel bonus: om det är Jonnas favoritlåt.", xp: 75, code: "BARD" },
  { id: "sq9", unlocksAtLevel: 8, type: "CHALLENGE", title: "Inspect Element", description: "Ge en ärlig, specifik compliment till varje partymedlem. Inte 'du är cool'. Något specifikt. Alla åtta. Ingen får höra de andras.", xp: 100, code: "INSPECT" },
  { id: "sq10", unlocksAtLevel: 9, type: "JONNA", title: "Vow Draft", description: "Skriv ner EN mening. Den ska börja med 'Jonna, jag lovar...' och sluta med något sant. Läs upp för partyt. Spara för bröllopet.", xp: 100, code: "VOW" },
];

// ===== LEVELS + RANKS (synced journey: Unworthy → Bound to Jonna) =====
window.LEVELS = [
  { level: 1,  xp: 0,    title: "Acolyte",       rank: "UNWORTHY",              desc: "Jonna skulle inte ens ge dig en second glance." },
  { level: 2,  xp: 100,  title: "Novice",        rank: "UNBOUND",               desc: "Du existerar. Hon vet inte om det ännu." },
  { level: 3,  xp: 250,  title: "Disciple",      rank: "SEEN",                  desc: "Hon har noterat dig. Det är allt." },
  { level: 4,  xp: 400,  title: "Cleric",        rank: "NOTICED",               desc: "Ögonkontakt. 0.3 sekunder. Det räknas." },
  { level: 5,  xp: 600,  title: "High Priest",   rank: "WORTHY OF A GLANCE",    desc: "Hon ler mot någon. Det kanske är dig." },
  { level: 6,  xp: 800,  title: "Archon",        rank: "WORTHY OF A WORD",      desc: "Ni har pratat. Det gick okej." },
  { level: 7,  xp: 1000, title: "Prophet",       rank: "WORTHY OF A DATE",      desc: "Reservation för två. Inget fusk." },
  { level: 8,  xp: 1250, title: "Ascendant",     rank: "BONDABLE",              desc: "Själ detekterad. Kompatibel. Scanning complete." },
  { level: 9,  xp: 1500, title: "Exalted",       rank: "RING-BEARER",           desc: "Du köpte ringen. Vägen tillbaka är stängd." },
  { level: 10, xp: 1800, title: "Eternal",       rank: "BOUND TO JONNA",        desc: "The Eternal Bond. Permanent. No Dispel. No Fade." },
];

// ===== PERKS (ability unlocks) =====
window.PERKS_DATA = [
  { questNum: 2,  name: "PRIEST'S BLESSING",    desc: "Peka på valfri partymedlem och säg 'Blessing of the Priest.' De MÅSTE köpa en dryck åt dig. EN gång.", icon: "🙏" },
  { questNum: 3,  name: "HEALER'S PRIVILEGE",   desc: "Du väljer din säng först. Resten håller käften om det.", icon: "🛏️" },
  { questNum: 5,  name: "TOASTMASTER'S CURSE",  desc: "Warlock Christian kan detonera ETT dare när som helst. Du kan inte neka.", icon: "☠️" },
  { questNum: 8,  name: "PRIEST'S DECREE",      desc: "Du bestämmer vad minst 2 partymedlemmar äter. Inga protester.", icon: "👑" },
  { questNum: 10, name: "PRIEST'S LAST COMMAND", desc: "Du får ge ETT uppdrag till valfri partymedlem. Vad som helst.", icon: "🔥" },
];

// ===== PARTY =====
window.PARTY = [
  { name: "Mauritz",  cls: "Holy Priest",   icon: "✝️", role: "The one bound for Jonna",          hiddenUntilQuest: null, color: "#ffffff" },
  { name: "Gustaf",   cls: "Paladin",       icon: "⚔️", role: "Raid Leader · Best Man",          hiddenUntilQuest: null, color: "#F58CBA" },
  { name: "Philip",   cls: "Rogue",         icon: "🗡️", role: "Shadow Operative",                hiddenUntilQuest: null, color: "#FFF569" },
  { name: "Christian",cls: "Warlock",       icon: "🔥", role: "Toastmaster",                      hiddenUntilQuest: 5,    color: "#9482C9" },
  { name: "Olof",     cls: "Hunter",        icon: "🏹", role: "Reinforcement · Eastern Kingdom", hiddenUntilQuest: 9,    color: "#AAD372" },
  { name: "David",    cls: "Shaman",        icon: "🌿", role: "Reinforcement · Eastern Kingdom",  hiddenUntilQuest: 9,    color: "#0070DE" },
  { name: "Martin W", cls: "Warrior",       icon: "🛡️", role: "Tank",                             hiddenUntilQuest: null, color: "#C79C6E" },
  { name: "Filip",    cls: "Mage",          icon: "✨", role: "DPS · Arcane",                    hiddenUntilQuest: null, color: "#69CCF0" },
  { name: "Martin I", cls: "Death Knight",  icon: "💀", role: "Wildcard · Anti-Hero",            hiddenUntilQuest: null, color: "#C41F3B" },
];

// ===== LOOT TABLE — rolled on quest complete =====
// All loot is Jonna-flavored, silly, diegetic.
window.LOOT_TABLE = {
  common: [
    { name: "Crumpled Napkin of Regret",           flavor: "+1 WIS · 'Maybe I shouldn't have said that.'" },
    { name: "Half-Drunk Mineral Water",             flavor: "+5 HYDRATION · You will need this." },
    { name: "Receipt from the Merchant Quarter",    flavor: "Vintage 2026. Unreadable script." },
    { name: "Pocket Lint of Forgotten Memories",    flavor: "You had something to say. It's gone now." },
    { name: "Stray Snack Wrapper",                  flavor: "+2 SHAME · You didn't share." },
  ],
  rare: [
    { name: "Locket with Jonna's Photo",            flavor: "+10 WIS · Opens when you need to remember why." },
    { name: "Raid Leader's Approving Nod",          flavor: "+15 CHA · Rare. Do not waste." },
    { name: "Shot Glass of Courage",                flavor: "+20 STR · One-time use. Applies on consumption." },
    { name: "Guild Patch (Unstitched)",             flavor: "+8 to all. Needs to be sewn on. By Jonna." },
    { name: "Wedding Playlist Draft v3",            flavor: "+12 MEM · Song 7 makes you cry. You know which." },
  ],
  epic: [
    { name: "Jonna's Phone Number (Verified)",      flavor: "LEGENDARY BOND ITEM · Use once per campaign. Must be used wisely." },
    { name: "Scroll: 'Why I Chose Her'",             flavor: "+25 CHA · Read aloud when the party least expects it." },
    { name: "Ring-Bearer's Burden",                  flavor: "+30 WIS · Heavy in the pocket. Heavier in the soul." },
    { name: "Toastmaster's Blessing (Partial)",     flavor: "+20 LUCK · Does not stack with the Curse." },
    { name: "Signed Permission from Jonna's Mum",   flavor: "+40 CHA · Extremely rare drop. Extremely powerful." },
  ],
  legendary: [
    { name: "The Eternal Vow (Unspoken)",            flavor: "SET ITEM · Activates when worn in front of Jonna at the altar." },
    { name: "Heart of the Holy Priest",              flavor: "+100 to all. Already given to Jonna. You're just carrying it home." },
    { name: "Realm-First: The Eternal Bond",         flavor: "ACHIEVEMENT-BOUND · You are the first. You will not be the last." },
    { name: "Wedding Ring (Real)",                    flavor: "THE legendary. Do not lose. Do not pawn. Do not remove." },
  ],
};

// ===== RARITY COLORS (WoW-inspired, original palette) =====
window.RARITY = {
  common:    { color: "#c8c8c8", name: "COMMON",    glow: "rgba(200,200,200,0.3)" },
  rare:      { color: "#5ab0ff", name: "RARE",      glow: "rgba(90,176,255,0.5)" },
  epic:      { color: "#b26bff", name: "EPIC",      glow: "rgba(178,107,255,0.6)" },
  legendary: { color: "#ff9500", name: "LEGENDARY", glow: "rgba(255,149,0,0.7)" },
};

// ===== THEMES — warm amber (Safe) and cool blood-violet (Bold) =====
// Each is 10 steps from L1 (cold/dim) to L10 (blazing)
// SAFE — arcane neon → gold → hellfire. Each level gets a SECONDARY color for pops.
window.THEMES_SAFE = [
  { bg1: "#1c1040", bg2: "#0a0618", accent: "#b8a0ff", second: "#50e0ff", glow: "rgba(184,160,255,0.30)", card: "rgba(24,14,50,0.88)" },
  { bg1: "#1e0e48", bg2: "#0c0620", accent: "#c090ff", second: "#40d8ff", glow: "rgba(192,144,255,0.34)", card: "rgba(28,14,58,0.88)" },
  { bg1: "#220e50", bg2: "#0e0624", accent: "#d880ff", second: "#20ffc0", glow: "rgba(216,128,255,0.38)", card: "rgba(32,14,64,0.88)" },
  { bg1: "#2a1244", bg2: "#130620", accent: "#ffc040", second: "#d880ff", glow: "rgba(255,192,64,0.40)", card: "rgba(40,16,58,0.90)" },
  { bg1: "#32143c", bg2: "#160618", accent: "#ffd030", second: "#ff60c0", glow: "rgba(255,208,48,0.46)", card: "rgba(46,18,52,0.90)" },
  { bg1: "#3a142c", bg2: "#1a0614", accent: "#ffb020", second: "#ff3088", glow: "rgba(255,176,32,0.52)", card: "rgba(52,18,42,0.92)" },
  { bg1: "#420e20", bg2: "#1e040c", accent: "#ff8a20", second: "#ff2060", glow: "rgba(255,138,32,0.56)", card: "rgba(58,12,28,0.92)" },
  { bg1: "#4a0a14", bg2: "#220408", accent: "#ff6a10", second: "#ffd040", glow: "rgba(255,106,16,0.60)", card: "rgba(62,8,18,0.92)" },
  { bg1: "#4e0608", bg2: "#240204", accent: "#ff4010", second: "#ffc020", flicker: true, glow: "rgba(255,64,16,0.66)", card: "rgba(64,4,8,0.94)" },
  { bg1: "#500408", bg2: "#200204", accent: "#ff2040", second: "#ffe060", flicker: true, glow: "rgba(255,32,64,0.72)", card: "rgba(68,2,6,0.96)" },
];

// BOLD — cool dusk → blood. Cyan/magenta secondary for cyberpunk-esque contrast.
window.THEMES_BOLD = [
  { bg1: "#0c0a2c", bg2: "#04031c", accent: "#8a98ff", second: "#00e8ff", glow: "rgba(138,152,255,0.30)", card: "rgba(16,12,42,0.90)" },
  { bg1: "#0c0a38", bg2: "#04031e", accent: "#8070ff", second: "#00ffe0", glow: "rgba(128,112,255,0.34)", card: "rgba(16,12,50,0.90)" },
  { bg1: "#0a0a48", bg2: "#020222", accent: "#5a70ff", second: "#00ffa0", glow: "rgba(90,112,255,0.38)", card: "rgba(14,12,62,0.90)" },
  { bg1: "#06145a", bg2: "#020628", accent: "#2090ff", second: "#ff40a0", glow: "rgba(32,144,255,0.42)", card: "rgba(10,20,72,0.90)" },
  { bg1: "#041c5a", bg2: "#020828", accent: "#00c0ff", second: "#ff2080", glow: "rgba(0,192,255,0.48)", card: "rgba(8,28,72,0.92)" },
  { bg1: "#2a0a48", bg2: "#120424", accent: "#d040a0", second: "#00e8ff", glow: "rgba(208,64,160,0.52)", card: "rgba(38,14,58,0.92)" },
  { bg1: "#380624", bg2: "#1a0210", accent: "#ff3080", second: "#40e0ff", glow: "rgba(255,48,128,0.56)", card: "rgba(48,10,32,0.92)" },
  { bg1: "#3e0818", bg2: "#1c0308", accent: "#ff2050", second: "#ffc020", glow: "rgba(255,32,80,0.60)", card: "rgba(52,10,20,0.94)" },
  { bg1: "#40020c", bg2: "#1a0002", accent: "#ff1040", second: "#ffe060", flicker: true, glow: "rgba(255,16,64,0.66)", card: "rgba(54,2,10,0.94)" },
  { bg1: "#420108", bg2: "#1c0002", accent: "#ff0050", second: "#ffd040", flicker: true, glow: "rgba(255,0,80,0.72)", card: "rgba(58,0,8,0.96)" },
];

// ===== AUDIO (WebAudio synth — no assets) =====
window.SFX = (() => {
  let ctx = null;
  const ensure = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch {} } return ctx; };
  const tone = (freq, dur, type = "sine", gain = 0.15, startOffset = 0) => {
    const c = ensure(); if (!c) return;
    const t0 = c.currentTime + startOffset;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  };
  const sweep = (f1, f2, dur, type = "sine", gain = 0.12) => {
    const c = ensure(); if (!c) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, t0);
    osc.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(c.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  };
  return {
    unlock: () => { tone(523, 0.08, "triangle", 0.12); tone(784, 0.15, "triangle", 0.12, 0.06); },
    levelUp: () => {
      [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.25, "triangle", 0.14, i * 0.08));
      sweep(200, 1200, 0.5, "sawtooth", 0.04);
    },
    loot: (tier) => {
      const freqs = { common: [440, 660], rare: [523, 784, 1046], epic: [659, 988, 1318, 1760], legendary: [440, 659, 880, 1108, 1318, 1760] };
      (freqs[tier] || freqs.common).forEach((f, i) => tone(f, 0.22, "sine", 0.13, i * 0.06));
    },
    crit: () => { sweep(1800, 400, 0.2, "square", 0.08); },
    click: () => { tone(1200, 0.03, "triangle", 0.06); },
    error: () => { tone(180, 0.15, "sawtooth", 0.08); tone(140, 0.2, "sawtooth", 0.08, 0.05); },
    bossHit: () => { tone(80, 0.1, "square", 0.12); tone(60, 0.2, "square", 0.08, 0.02); },
  };
})();
