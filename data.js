// ===== THE ETERNAL BOND — CONTENT =====
// Everything is about Jonna. Mauritz's journey from UNWORTHY to BOUND TO JONNA.
// Tone: harder, rougher, WoW-raid-tough-talk. Read aloud to the party.

window.QUESTS = [
  {
    num: 1, act: "ACT I", actName: "THE SUMMONING",
    title: "The Summoning of the Holy Priest",
    code: "LFGRAID",
    difficulty: "Mandatory",
    xp: 100,
    tier: "rare",
    boss: null,
    flavor: "Stäng ner det du gör. Spara inte. Det spelar ingen roll längre.",
    body: "I exakt 12,636 dagar har du levt ditt liv som om inget väntade. Du har gått till jobbet. Du har ätit lunch. Du har svarat på mail som ingen bryr sig om. Allt medan 'The Eternal Bond' närmar sig - den mäktigaste ritualen en Priest som du kan genomgå. Bindandet av din själ till en annan. Permanent. Ingen Dispel. Ingen ragequit.\n\nVi - din GUILD - har sett på från avstånd. Men vi har nu beslutat att du är inte redo. Inte än.\n\nDärför har vi samlats här idag. Vi är ditt party - och detta är din sista kampanj. En serie prövningar genom [***REDACTED***], designade för att testa om du verkligen är värdig 'The Eternal Bond'.",
    objective: "Drick upp. Se upp. All abord the hypetrain.",
    rules: [
      "Du får INTE veta vart vi ska eller vad vi ska göra",
      "Du får INTE kontakta Jonna förrän partyt ger dig clearance",
      "Du följer Raid Leaders instruktioner utan ifrågasättande",
      "Bryter du reglerna: −500 XP"
    ],
    quote: "Every hero's journey begins with leaving the Auction House.",
    mapPos: { x: 14, y: 88 }
  },
  {
    num: 2, act: "ACT I", actName: "THE SUMMONING",
    title: "Through the Portal",
    code: "BUFFPLS",
    difficulty: "Moderate",
    xp: 50,
    tier: "common",
    boss: null,
    perk: "PRIEST'S BLESSING — Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE följa med och hjälpa dig bära. Denna perk gäller endast innan portalen öppnas.",
    flavor: "Portalen surrar av uråldrig magi. På andra sidan väntar ett land av prövningar. Det finns ingen Hearthstone tillbaka.",
    body: "Vi kan inte berätta vart portalen leder - det strider mot Guild Protocol sektion 4, paragraf 32: \"du får inte veta\". Det vi KAN säga: på andra sidan finns en server du inte kontrollerar och prövningar som kräver mer av dig än att flame:a noobs i chatten. Nej, här krävs det att du steppar upp till och bevisar att du är värdig ditt destiny.\n\nEn healer som inte buffar sitt party är en healer som wipar sitt party. Innan portalen öppnas har du en helig plikt.",
    objective: "Förse ditt party med provisions (DRYCK OCH SNACKS) inför resan. En Priest som inte sörjer för sitt party förtjänar inte sin titel.",
    rules: [
      "Du betalar givetvis, medveten om att vi har lagt ut fett med deg på detta"
    ],
    quote: "Loading screen tips: Om du inte vet vart du ska, följ tanken.",
    mapPos: { x: 28, y: 78 }
  },
  {
    num: 3, act: "ACT I", actName: "THE SUMMONING",
    title: "The Inn",
    code: "RESTED",
    difficulty: "Trivial (enjoy it while it lasts)",
    xp: 50,
    tier: "common",
    boss: null,
    perk: "HEALER PRIVILEGE — Du får önska vem du vill sova med. Men om din kärleksförklaring inte blir besvarad får du -1400 XP i \"Reputation\".",
    flavor: "Du har klivit genom portalen. Du lever. Det är troligen en bra start.",
    body: "Runt dig breder ett nytt land ut sig. Lukterna är annorlunda. Språket nästan begripligt. Valutan suspekt. Men ditt party har säkrat ett värdshus och bas för kampanjens kommande prövningar.\n\nNjut av lugnet. Det varar inte. Ikväll väntar din första prövning, och den kräver att du är utvilad, påklädd, och mentalt förberedd för saker du inte kan föreställa dig.",
    objective: "Checka in. Orientera dig. Förbered dig för kvällen.",
    rules: [
      "Inga smygsamtal till Jonna",
      "Raid Leader utser tid och plats för guildens återsamlande. Kom i tid!"
    ],
    quote: "Inn music playing. You feel rested. Your XP bar glows faintly.",
    mapPos: { x: 18, y: 64 }
  },
  {
    num: 4, act: "ACT I", actName: "THE SUMMONING",
    title: "Reinforcements from the Eastern Kingdoms",
    code: "LFGMORE",
    difficulty: "Emotional",
    xp: 150,
    tier: "epic",
    boss: null,
    flavor: "Minns du party-rostern? Minns du de tomma platserna?",
    body: "Hunter: \"Ej lokaliserad. Signal förlorad.\"\nShaman: \"Ej lokaliserad. Signal förlorad.\"\n\nVi ljög inte. Deras signal VAR förlorad. De befann sig i andra delar av riket, långt bortom räckhåll. Vi visste inte om de skulle hinna. Vi visste inte om portalen skulle hålla.\n\nMen den höll.\n\nDe är här nu. Din Hunter och din Shaman. De korsade länder och tidszoner för att stå vid din sida i kampanjens avgörande fas. Ditt party växer — men det är inte komplett än. Något saknas fortfarande. Någon.",
    objective: "Välkomna dina förlorade allierade med en proper Guild Greeting: en gruppshot.",
    rules: [
      "Raid difficulty ökar."
    ],
    quote: "LFG partial. Momentum rising. Zero excuses.",
    mapPos: { x: 40, y: 58 }
  },
  {
    num: 5, act: "ACT I", actName: "THE SUMMONING",
    title: "The Feast of Gods",
    code: "WARPIGS",
    difficulty: "Hard",
    xp: 150,
    tier: "epic",
    boss: { name: "The Feast of the GODS", hp: 100, flavor: "Eld. Kött. Öl mörkare än Death Knights humor." },
    flavor: "Gudarna ler mot oss och blessar oss med kött och kall öl.",
    body: "Ditt party eskorterar dig till en grand hall. Vi kan inte avslöja dess namn, det kommer tala för sig självt när dörrarna öppnas.\n\nMen mitt i festens kaos har du en uppgift som ingen healing kan rädda dig från.",
    objective: "Du ska, inför ditt samlade party, berätta om den person du valt att binda din själ till. Inte 'jag älskar Jonna för att hon är snäll' — det kan en NPC säga. Berätta och utelämna inget!",
    rules: [
      "+50 XP om partyt höjer sina bägare och ropar WORTHY",
      "−25 XP varje gång du kollar mobilen under kvällen",
      "+150 XP om du även berättar hur du känner alla i partyt — detta är första gången vi ses"
    ],
    quote: "Leeroy Jenkins drog aldrig in i en feast oförberedd. Okej, det gjorde han. Men du är bättre än Leeroy.",
    mapPos: { x: 32, y: 46 }
  },
  {
    num: 6, act: "ACT I", actName: "THE SUMMONING",
    title: "A Dark Presence Approaches",
    code: "SUMMON",
    difficulty: "Unpredictable",
    xp: 100,
    tier: "rare",
    boss: null,
    perk: "☠️ TOASTMASTER'S CURSE — Warlock Christian har ETT uppdrag/dare som kan komma när som helst. Du kan inte neka. Du kan inte Dispela. Du kan inte Fade.",
    flavor: "Du kände det, eller hur? Temperaturen sjönk. Ölskummet vibrerade i ditt glas som en seismograf för incoming doom.",
    body: "Och sen - stegen. Tunga steg. De klapprande spanska höfterna.\n\nEn Warlock har anslutit sig till ditt party.\n\nWarlocks är opålitliga, och har en tendens att sacrificea partymedlemmar för personlig vinning. MEN - denna Warlock kommer med en titel: Toastmaster. Hans makt är specifik, begränsad, och exakt lika skrämmande som det låter.",
    objective: "Välkomna din nya allierade. Hela partyt ska skåla - en välkomstshot krävs av samtliga. Det är Guild Protocol.",
    rules: [],
    quote: "You hear a faint whisper: 'I have candy.' You should not follow the Warlock. You will anyway.",
    mapPos: { x: 54, y: 40 }
  },
  {
    num: 7, act: "ACT II", actName: "THE TRIALS",
    title: "The Morning Resurrection",
    code: "REZPLZ",
    difficulty: "Depends on last night",
    xp: 50,
    tier: "common",
    boss: null,
    flavor: "Solen stiger. Din mana bar är tom. Din health bar flimrar i rött.",
    body: "Det finns en ironisk skönhet i det här: du, en HEALER, som inte kan heala dig själv. Hela din karriär har du stått bakom andra och hållit dem vid liv. Du har kastat Renew på Warriors som rushat in utan plan. Du har desperatcastat Flash Heal på Mages som stått i AoE:n IGEN.\n\nOch nu ligger du här. I en säng du knappt minns att du la dig i. Med en smak i munnen som antyder att du åt något som inte borde existera.\n\nMen en Priest faller inte. En Priest RESER SIG.",
    objective: "Res dig. Hitta frukost. Överlev den.",
    rules: [
      "+25 XP om du är FÖRST upp och väcker resten av partyt"
    ],
    quote: "You are not prepared. — Illidan, som aldrig behövde hantera en hotellfrukost med hangover.",
    mapPos: { x: 42, y: 30 }
  },
  {
    num: 8, act: "ACT II", actName: "THE TRIALS",
    title: "The Trial of the Unknown",
    code: "SHADOW",
    difficulty: "[REDACTED]",
    xp: 200,
    tier: "epic",
    boss: { name: "The Unknown Trial", hp: 200, flavor: "Två prövningar. Båda testar om du förtjänar att stå bredvid Jonna." },
    flavor: "Du har healat. Du har buffat. Du har stått i bakre raden. Idag blir du DPS.",
    body: "Det är dags för din första raid. Den kommer kräva både strategi, ledarskap, våld och en hel del tur.",
    objective: "Genomför alla prövningarna. Detaljer avslöjas on site. Lita på din Raid Leader.",
    rules: [
      "Bonusar och straff avslöjas on site"
    ],
    quote: "Switching spec from Holy to Shadow. Please wait... please wait...",
    mapPos: { x: 64, y: 28 }
  },
  {
    num: 9, act: "ACT II", actName: "THE TRIALS",
    title: "The Market of a Thousand Flavors",
    code: "OMNOM",
    difficulty: "Medium (your stomach may disagree)",
    xp: 100,
    tier: "rare",
    boss: null,
    flavor: "Lukterna blandas med havsvind. Röster ropar på språk du inte förstår. Eld flammar från riktningar du inte förväntar dig.",
    body: "Din quest har fört dig till en handelskvarterszon — ett Merchant Quarter — där mästare från jordens alla hörn samlats för att erbjuda saker din mage aldrig bett om men ditt hjärta inte kan motstå.\n\nDet här är en quest om TILLIT. Du har tillbringat hela ditt liv med att välja tryggt. Healers gör det — ni väljer det säkra, det beprövade. Men ibland, Priest, måste du välja det okända.",
    objective: "Free-for-all",
    rules: [],
    quote: "Cooking skill increased to 376. But at what cost?",
    mapPos: { x: 52, y: 18 }
  },
  {
    num: 10, act: "ACT II", actName: "THE TRIALS",
    title: "The Final Feast Before the Eternal Bond",
    code: "BONFIRE",
    difficulty: "Legendary",
    xp: 300,
    tier: "legendary",
    boss: { name: "The Last Night Unbound", hp: 300, flavor: "Imorgon binds du till Jonna. Ikväll är den sista kvällen som din själ är din egen." },
    perk: "🔥 PRIEST'S LAST COMMAND — Du får ge ETT uppdrag till valfri partymedlem. Vad som helst. Ikväll. De kan inte neka.",
    flavor: "Det här är det, Priest. Din sista kväll som obunden.",
    body: "Imorgon börjar resan hem, och efter det — The Eternal Bond. Jonna väntar. Resten av ditt liv väntar.\n\nMen ikväll sitter du vid ett bord med åtta människor som reste till ett annat land för att fira DIG. Åtta helt separata liv med egna jobb, egna planer, egna problem. Och de valde att vara HÄR. Med DIG.\n\nDet är inte 'kul med grabbarna.' Det är ett guild som säger: du betyder något för oss. På riktigt.",
    objective: "Enjoy!",
    rules: [
      "Varje skål MÅSTE avslutas med antingen 'For the Horde' eller 'For Jonna'",
      "+25 XP om du håller tal till en partymedlem",
      "+25 XP om du blir synbart rörd"
    ],
    quote: "For the Horde. For the Alliance. For Jonna.",
    mapPos: { x: 74, y: 14 }
  },
  {
    num: 11, act: "ACT III", actName: "THE RETURN",
    title: "Hearthstone",
    code: "GG",
    difficulty: "Bittersweet",
    xp: 0,
    tier: "legendary",
    boss: null,
    flavor: "Du har klarat det.",
    body: "Tre akter. Elva quests. Hundratals XP. Minnen som inte går att Dispela.\n\nKampanjen är slut. Du sov dåligt, du åt för mycket, du drack saker som förmodligen inte var lagliga i ditt hemland, och du har haft det bästa du haft sedan... ja. Sedan sist vi alla var samlade (aldrig).\n\nNu trycker du på Hearthstone. Du reser hem. Till ditt vanliga liv — fast ingenting är vanligt längre. Jonna väntar. The Eternal Bond väntar.",
    objective: "Packa ihop. Checka ut. Lämna inget bakom dig — varken i rummet eller i ditt hjärta.",
    rules: [],
    quote: "You have been disconnected from the server. Reason: real life is calling.",
    mapPos: { x: 86, y: 8 }
  },
];

// ===== SIDE QUESTS — all Jonna-adjacent or party-power =====
window.SIDE_QUESTS = [
  { id: "sq1", unlocksAtLevel: 2, type: "CHALLENGE", title: "First Blood", description: "Beställ en dryck utan att kolla menyn. Peka och säg 'that one'. Ingen ånger.", xp: 25, code: "YOLO" },
  { id: "sq2", unlocksAtLevel: 3, type: "GUILD RULE", title: "Decree of the Disciple", description: "Du får införa EN regel som gäller hela guildet i 30 minuter. Regeln kan inte innebära att någon måste spendera pengar.", xp: 50, code: "MYLAW" },
  { id: "sq3", unlocksAtLevel: 3, type: "GRIND", title: "Reputation Grind: Jonna", description: "Skicka ett meddelande till Jonna som innehåller orden 'eternal bond' utan att förklara varför. Screenshotta hennes svar.", xp: 50, code: "JONNA1" },
  { id: "sq4", unlocksAtLevel: 4, type: "CHALLENGE", title: "Battlecry", description: "Gå fram till en främling och säg 'For The Horde' med full conviction. Bonuspoäng om de svarar.", xp: 50, code: "LOK" },
  { id: "sq5", unlocksAtLevel: 5, type: "GRIND", title: "Potion Master", description: "Drick tre olika shots under kvällen. En av varje färg: ljus, mörk, och 'varför finns detta'. Rapportera till Raid Leader.", xp: 50, code: "3SHOTS" },
  { id: "sq6", unlocksAtLevel: 5, type: "CHALLENGE", title: "Blurred Memories of Destiny", description: "Ta en selfie med valfri partymedlem. Båda måste göra sitt bästa 'epic raid victory'-ansikte.", xp: 25, code: "SELFIE" },
  { id: "sq7", unlocksAtLevel: 6, type: "GUILD RULE", title: "Archon's Mandate", description: "Välj en partymedlem. Den personen måste hämta dryck/mat åt dig nästa gång gruppen beställer. Ingen förhandling.", xp: 25, code: "FETCH" },
  { id: "sq8", unlocksAtLevel: 7, type: "GRIND", title: "Bard Mode: Activated", description: "Gå fram till DJ:n och be om att få rappa en 50cent låt. 10.000 XP om du klarar det.", xp: 75, code: "BARD" },
  { id: "sq9", unlocksAtLevel: 8, type: "CHALLENGE", title: "Inspect Element", description: "Ge en ärlig, ofiltrerad compliment till varje partymedlem. Inte 'du är cool' — något specifikt. Alla åtta.", xp: 100, code: "INSPECT" },
  { id: "sq10", unlocksAtLevel: 9, type: "GUILD RULE", title: "Exalted Decree", description: "Du får byta namn på en partymedlem för resten av kvällen. Alla MÅSTE använda det nya namnet.", xp: 50, code: "RENAME" },
  { id: "sq11", unlocksAtLevel: 2, type: "CHALLENGE", title: "Eternal Bond Proxy", description: "Hitta ett gift par på baren och berätta om The Eternal Bond. Få deras välsignelse.", xp: 75, code: "PROXY" },
  { id: "sq12", unlocksAtLevel: 3, type: "CHALLENGE", title: "My 600lb Buffet", description: "Beställ mer mat än du kan äta. Fotografera tallriken. Skicka bilden helt okommenterat till en kontakt som guildet väljer åt dig. Inget förklarande. Ingen uppföljning.", xp: 50, code: "BUFFET" },
  { id: "sq13", unlocksAtLevel: 4, type: "CHALLENGE", title: "/dance IRL", description: "Dansa ensam på dansgolvet i minst 30 sekunder utan musikens hjälp. Vittnesmål krävs.", xp: 50, code: "DANCE" },
  { id: "sq14", unlocksAtLevel: 5, type: "GRIND", title: "AFK Detection", description: "Om Raid Leader inte ser dig på 10 minuter = AFK-kick och -50 XP. Undviks genom att vara synlig. +50 XP bonus om du aktivt checkar in.", xp: 50, code: "AFK" },
  { id: "sq15", unlocksAtLevel: 6, type: "CHALLENGE", title: "Server Transfer", description: "Flytta runt bordet tre gånger under kvällen. Skäl: 'I'm exploring the dungeon.'", xp: 25, code: "XFER" },
  { id: "sq16", unlocksAtLevel: 7, type: "CHALLENGE", title: "Achievement: Talks to Strangers", description: "Prata med en lokal invånare i minst 2 minuter om vad som helst. Avsluta med att få dem att ropa 'FOR THE HORDE' så högt att guildet hör det.", xp: 75, code: "HORDE" },
];

// ===== LEVELS + RANKS =====
window.LEVELS = [
  { level: 1,  xp: 0,    title: "Acolyte",    rank: "Unworthy",               desc: "Inte ens din mamma är imponerad." },
  { level: 2,  xp: 100,  title: "Novice",     rank: "Barely Tolerated",       desc: "Guildet accepterar dig. Motvilligt." },
  { level: 3,  xp: 250,  title: "Disciple",   rank: "Questionably Adequate",  desc: "Du existerar. Det är en start." },
  { level: 4,  xp: 400,  title: "Cleric",     rank: "Grudgingly Accepted",    desc: "Ingen är imponerad. Ännu." },
  { level: 5,  xp: 600,  title: "High Priest",rank: "Almost Decent",          desc: "Svagt. Men märkbart." },
  { level: 6,  xp: 800,  title: "Archon",     rank: "Shows Promise",          desc: "Det rör sig... kanske." },
  { level: 7,  xp: 1000, title: "Prophet",    rank: "Respectable",            desc: "Jonna nickar. Osäkert, men ändå." },
  { level: 8,  xp: 1250, title: "Ascendant",  rank: "Battle-Hardened",        desc: "Du förtjänar din plats i guildet." },
  { level: 9,  xp: 1500, title: "Exalted",    rank: "Worthy of Eternal Bond", desc: "Realm First. Inga ord räcker till." },
  { level: 10, xp: 1800, title: "Eternal",    rank: "BOUND TO JONNA",         desc: "The Eternal Bond. Permanent. No Dispel. No Fade." },
];

// ===== PERKS & CURSES (ability unlocks / debuffs) =====
window.PERKS_DATA = [
  { questNum: 2,  type: "perk",  name: "PRIEST'S BLESSING",    desc: "Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE följa med och hjälpa dig bära. Denna perk gäller endast innan portalen öppnas.", icon: "🙏" },
  { questNum: 3,  type: "perk",  name: "HEALER PRIVILEGE",     desc: "Du får önska vem du vill sova med. Men om din kärleksförklaring inte blir besvarad får du -1400 XP i \"Reputation\".", icon: "🛏️" },
  { questNum: 5,  type: "curse", name: "CURSE OF THE VINBALLE", desc: "Det är bröllopsnatt och du är för full för att fullborda äktenskapet. För att rädda dig från förbannelsen: genast leta upp en shot och dricka den.", icon: "🍷" },
  { questNum: 6,  type: "perk",  name: "SHOTS FIRED",          desc: "Guildet är komplett. SHOTS FIRED Unlocked. Du får välja vad vi ska shota, en gång.", icon: "🎯" },
  { questNum: 6,  type: "curse", name: "TOASTMASTER'S EXTENDED CONTRACT", desc: "Christian kan nu detonera ETT dare PER ACT (3 totalt), inte bara en gång. Warlock buffed.", icon: "☠️" },
  { questNum: 7,  type: "perk",  name: "EARLY BIRD",           desc: "Du vaknade tidigt. Early bird rabatt på XP: +10% i 3 timmar!", icon: "💤" },
  { questNum: 10, type: "perk",  name: "PRIEST'S LAST COMMAND", desc: "Du får ge ETT uppdrag till valfri partymedlem. Vad som helst.", icon: "🔥" },
  { questNum: 10, type: "curse", name: "HANGOVER PROPHECY",    desc: "Du VET att du kommer ångra dig imorgon. Enda sättet att häva: drick ett glas vatten nu. Nu.", icon: "🤕" },
];

// ===== PARTY =====
window.PARTY = [
  { name: "Mauritz",  cls: "Holy Priest",   icon: "✝️", role: "The one who heals must now be healed", hiddenUntilQuest: null, color: "#ffffff" },
  { name: "Gustaf",   cls: "Paladin",       icon: "⚔️", role: "Raid Leader · Best Man",               hiddenUntilQuest: null, color: "#F58CBA" },
  { name: "Philip",   cls: "Rogue",         icon: "🗡️", role: "Shadow Operative",                     hiddenUntilQuest: null, color: "#FFF569" },
  { name: "Christian",cls: "Warlock",       icon: "🔥", role: "Toastmaster",                          hiddenUntilQuest: 6,    color: "#9482C9" },
  { name: "Olof",     cls: "Hunter",        icon: "🏹", role: "Reinforcement",                        hiddenUntilQuest: 4,    color: "#AAD372" },
  { name: "David",    cls: "Shaman",        icon: "🌿", role: "Reinforcement",                        hiddenUntilQuest: 4,    color: "#0070DE" },
  { name: "Martin W", cls: "Warrior",       icon: "🛡️", role: "Tank",                                 hiddenUntilQuest: null, color: "#C79C6E" },
  { name: "Filip",    cls: "Mage",          icon: "✨", role: "DPS",                                  hiddenUntilQuest: null, color: "#69CCF0" },
  { name: "Martin I", cls: "Death Knight",  icon: "💀", role: "Wildcard",                             hiddenUntilQuest: null, color: "#C41F3B" },
];

// ===== LOOT TABLE — rolled on quest complete =====
window.LOOT_TABLE = {
  common: [
    { name: "Common Järpe",                         flavor: "En helt vanlig järpe. Gör ingenting.", repeatable: true },
    { name: "Half-Drunk Mineral Water",             flavor: "+5 HYDRATION · You will need this." },
    { name: "Receipt from the Merchant Quarter",    flavor: "Vintage 2026. Unreadable script." },
    { name: "Pocket Lint of Forgotten Memories",    flavor: "You had something to say. It's gone now." },
    { name: "Stray Snack Wrapper",                  flavor: "+2 SHAME · You didn't share." },
    { name: "Pepsi Potion (Maximus)",               flavor: "+50 STAMINA · En sötsliskig magisk dryck som ger dig extra kraft när du känner dig skör." },
    { name: "Mystery Brown Cloth",                  flavor: "-5 WISDOM · Gardin eller lakan? Vem bryr sig." },
    { name: "Järpe of Wisdom",                      flavor: "+3 HP · Djupfryst. Märke: Picard. Salmonella probability: high." },
    { name: "Guild Chat Log (Redacted)",            flavor: "+1 LORE · 94% är memes. De andra 6% är roast." },
    { name: "Discount Hearthstone",                 flavor: "Du kan teleportera dig 3 meter i valfri riktning en gång. Denna bugg är inte fixad sedan 2009." },
  ],
  rare: [
    { name: "Locket with Jonna's Photo",            flavor: "+10 WIS · Opens when you need to remember why." },
    { name: "Raid Leader's Approving Nod",          flavor: "+15 CHA · Rare. Do not waste." },
    { name: "Shot Glass of Courage",                flavor: "+20 STR · One-time use. Applies on consumption." },
    { name: "Guild Patch (Unstitched)",             flavor: "+8 to all. Needs to be sewn on. By Jonna." },
    { name: "Wedding Playlist Draft v3",            flavor: "+12 MEM · Song 7 makes you cry. You know which." },
    { name: "Crystals Cigar",                       flavor: "-340 EYESIGHT · En stark doft fyller rummet. Du känner dig cool men röken gör att du inte ser något." },
    { name: "Enchanted Snus",                       flavor: "+12 REPUTATION · Du tar en riktig god snus och gainar 12 REPUTATION." },
    { name: "Jonna's Cooking Buff",                 flavor: "+30 HP · Jonna lagar din favoriträtt och du får en temporär HP bonus. Succé!" },
    { name: "Bröllop Invitation (Hand delivered)",  flavor: "+80 CHARM · En fin inbjudan tryckt på 180g naturpapper. Designad av Jonna." },
    { name: "Job Application (Denied)",             flavor: "-200 LINKEDIN · Dom ringde från Avalanche. Du fick inte jobbet. Sry!" },
  ],
  epic: [
    { name: "Jonna's Phone Number (Verified)",      flavor: "LEGENDARY BOND ITEM · Use once per campaign. Must be used wisely." },
    { name: "Ring-Bearer's Burden",                  flavor: "+30 WIS · Heavy in the pocket. Heavier in the soul." },
    { name: "Toastmaster's Blessing (Partial)",     flavor: "+20 LUCK · Does not stack with the Curse." },
    { name: "Signed Permission from Jonna's Mum",   flavor: "+40 CHA · Extremely rare drop. Extremely powerful." },
    { name: "My 600lb Life S3E4 Quote",             flavor: "+45 WISDOM · 'If I don't change now, I never will.'" },
    { name: "Jonna's Veto Power (Framed)",          flavor: "+50 CHARM · Du erkänner att Jonna alltid har rätt och får 50 CHARM." },
    { name: "50 Cent Knowledge",                    flavor: "-30.000 REPUTATION · 50 Cent ser en video på dig när du rappar 'In Da Club' - felfritt. Han försöker kontakta dig men eftersom du inte har sociala medier så ger han upp." },
    { name: "YouTube History (Leaked)",             flavor: "+500 SHAME · Jonna ser din Youtube-historik. RIP. 500 shame per minut." },
  ],
  legendary: [
    { name: "The Eternal Vow (Unspoken)",            flavor: "SET ITEM · Activates when worn in front of Jonna at the altar." },
    { name: "Heart of the Holy Priest",              flavor: "+100 to all. Already given to Jonna. You're just carrying it home." },
    { name: "Realm-First: The Eternal Bond",         flavor: "ACHIEVEMENT-BOUND · You are the first. You will not be the last." },
    { name: "Wedding Ring (Real)",                    flavor: "THE legendary. Do not lose. Do not pawn. Do not remove." },
    { name: "Heartstone of Nacka",                    flavor: "CITY KEY ITEM · Jonnas föräldrar tillåter dig att gifta dig med Jonna." },
    { name: "Jonna Says YES",                         flavor: "+999 LOVE · Utan tvekan det finaste paret vi vet. Tyst! Det är inte vi som gråter nu, det regnar." },
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
