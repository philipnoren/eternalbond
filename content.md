# Eternal Bond — Content File
# Edit anything in this file, then tell Claude to sync it back to index.html.
# Lines starting with # are comments and are ignored.
# Do NOT change the section headers (the === lines) or the field labels (e.g. TITLE:).
# XP values and unlock levels are listed for reference but NOT synced back (tell Claude separately if you want to change them).

================================================================================
APP META
================================================================================

APP_TITLE: The Eternal Bond
APP_SUBTITLE: For the Horde. For the Alliance. For Jonna.

================================================================================
PARTY MEMBERS
# hiddenUntilQuest: the quest number that must be completed before this member is revealed.
# Leave blank (or 0) if always visible.
================================================================================

--- MEMBER 1 ---
NAME: Mauritz
CLASS: Holy Priest
ICON: ✝️
ROLE: The one who heals must now be healed
HIDDEN_UNTIL_QUEST:

--- MEMBER 2 ---
NAME: Gustaf
CLASS: Paladin
ICON: ⚔️
ROLE: Raid Leader · Best Man
HIDDEN_UNTIL_QUEST:

--- MEMBER 3 ---
NAME: Philip
CLASS: Rogue
ICON: 🗡️
ROLE: Shadow Operative
HIDDEN_UNTIL_QUEST:

--- MEMBER 4 ---
NAME: Christian
CLASS: Warlock
ICON: 🔥
ROLE: Toastmaster
HIDDEN_UNTIL_QUEST: 6

--- MEMBER 5 ---
NAME: Olof
CLASS: Hunter
ICON: 🏹
ROLE: Reinforcement
HIDDEN_UNTIL_QUEST: 4

--- MEMBER 6 ---
NAME: David
CLASS: Shaman
ICON: 🌿
ROLE: Reinforcement
HIDDEN_UNTIL_QUEST: 4

--- MEMBER 7 ---
NAME: Martin W
CLASS: Warrior
ICON: 🛡️
ROLE: Tank
HIDDEN_UNTIL_QUEST:

--- MEMBER 8 ---
NAME: Filip
CLASS: Mage
ICON: ✨
ROLE: DPS
HIDDEN_UNTIL_QUEST:

--- MEMBER 9 ---
NAME: Martin I
CLASS: Death Knight
ICON: 💀
ROLE: Wildcard
HIDDEN_UNTIL_QUEST:

================================================================================
RANKS
# Each rank has a name and a short flavor line shown under the rank in the app.
# Rank thresholds (XP) are game mechanics — not listed here. Tell Claude if you want to change them.
================================================================================

--- RANK 1 (0–99 XP) ---
NAME: Unworthy
FLAVOR: Inte ens din mamma är imponerad.

--- RANK 2 (100–299 XP) ---
NAME: Barely Tolerated
FLAVOR: Guildet accepterar dig. Motvilligt.

--- RANK 3 (300–549 XP) ---
NAME: Questionably Adequate
FLAVOR: Du existerar. Det är en start.

--- RANK 4 (550–799 XP) ---
NAME: Grudgingly Accepted
FLAVOR: Ingen är imponerad. Ännu.

--- RANK 5 (800–1049 XP) ---
NAME: Almost Decent
FLAVOR: Svagt. Men märkbart.

--- RANK 6 (1050–1299 XP) ---
NAME: Shows Promise
FLAVOR: Det rör sig... kanske.

--- RANK 7 (1300–1549 XP) ---
NAME: Respectable
FLAVOR: Jonna nickar. Osäkert, men ändå.

--- RANK 8 (1550–1799 XP) ---
NAME: Battle-Hardened
FLAVOR: Du förtjänar din plats i guildet.

--- RANK 9 (1800+ XP) ---
NAME: Worthy of Eternal Bond
FLAVOR: Realm First. Inga ord räcker till.

================================================================================
PERKS
# These are the special abilities unlocked when completing specific quests.
# In the POWER tab, a locked perk's NAME is hidden — only the icon and slot are shown.
================================================================================

--- PERK 1 (unlocks at Quest 2) ---
ICON: 🙏
NAME: PRIEST'S BLESSING
DESC: Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE följa med och hjälpa dig bära. Denna perk gäller endast innan portalen öppnas.

--- PERK 2 (unlocks at Quest 3) ---
ICON: 🛏️
NAME: HEALER PRIVILEGE
DESC: Du får önska vem du vill sova med. Men om din kärleksförklaring inte blir besvarad får du -1400 XP i "Reputation".

--- PERK 3 (unlocks at Quest 6) ---
ICON: ☠️
NAME: TOASTMASTER'S CURSE
DESC: Warlock Christian har ETT uppdrag/dare som kan komma när som helst. Du kan inte neka. Du kan inte Dispela. Du kan inte Fade.

--- PERK 4 (unlocks at Quest 10) ---
ICON: 🔥
NAME: PRIEST'S LAST COMMAND
DESC: Du får ge ETT uppdrag till valfri partymedlem. Vad som helst. Ikväll.

================================================================================
LOOT
# Each side quest drops one loot item when completed (side quests no longer give XP).
# ICON: emoji shown on the loot card
# NAME: loot item name
# DESC: what the player can do with it (in-person effect)
# SQ_ID: which side quest drops this (sq1–sq10, must match side quest IDs below)
================================================================================

--- LOOT sq1 ---
SQ_ID: sq1
ICON: 🍺
NAME: Liquid Courage Potion
DESC: Du bestämmer vad nästa shots-runda ska vara. Hela partyt lyder.

--- LOOT sq2 ---
SQ_ID: sq2
ICON: 📜
NAME: Scroll of Domination
DESC: En guild-regel du kan aktivera en gång senare under kvällen. Ingen kan neka.

--- LOOT sq3 ---
SQ_ID: sq3
ICON: 💌
NAME: Jonna's Blessing
DESC: +50 bonus-XP om Jonna svarar med hjärtan eller förvirrat 'wtf'.

--- LOOT sq4 ---
SQ_ID: sq4
ICON: 🏴
NAME: Banner of the Horde
DESC: Hela partyt måste ropa 'FOR THE HORDE' med dig, en gång, när du väljer.

--- LOOT sq5 ---
SQ_ID: sq5
ICON: ⚗️
NAME: Alchemist's Flask
DESC: Du kan delegera ett shot till valfri partymedlem. De kan inte tacka nej.

--- LOOT sq6 ---
SQ_ID: sq6
ICON: 📸
NAME: Amulet of Memories
DESC: Fotot postas permanent i guild-chatten.

--- LOOT sq7 ---
SQ_ID: sq7
ICON: 💍
NAME: Ring of Command
DESC: Valfri partymedlem är din personliga butler i 5 minuter. Full lydnad.

--- LOOT sq8 ---
SQ_ID: sq8
ICON: 🎸
NAME: Lute of Legends
DESC: Välj en låt som hela partyt MÅSTE sjunga med på. Ingen undslipper.

--- LOOT sq9 ---
SQ_ID: sq9
ICON: 👁️
NAME: Eye of the Beholder
DESC: Valfri partymedlem MÅSTE ge dig en ärlig komplimang, direkt, inför alla.

--- LOOT sq10 ---
SQ_ID: sq10
ICON: 👑
NAME: Crown of the Exalted
DESC: Välj ett nytt titel/smeknamn för dig själv som alla MÅSTE använda resten av kvällen.

================================================================================
SIDE QUESTS
# UNLOCK_LEVEL: which player level must be reached before this side quest appears.
# CODE: the code Mauritz types in to complete the side quest.
================================================================================

--- SIDE QUEST sq1 (unlocks at Level 2, 25 XP) ---
TYPE: CHALLENGE
TITLE: First Blood
DESC: Beställ en dryck utan att kolla menyn. Peka och säg 'that one'. Ingen ånger.
CODE: YOLO

--- SIDE QUEST sq2 (unlocks at Level 3, 50 XP) ---
TYPE: GUILD RULE
TITLE: Decree of the Disciple
DESC: Du får införa EN regel som gäller hela guildet i 30 minuter. Regeln kan inte innebära att någon måste spendera pengar.
CODE: MYLAW

--- SIDE QUEST sq3 (unlocks at Level 3, 50 XP) ---
TYPE: GRIND
TITLE: Reputation Grind: Jonna
DESC: Skicka ett meddelande till Jonna som innehåller orden 'eternal bond' utan att förklara varför. Screenshotta hennes svar.
CODE: JONNA1

--- SIDE QUEST sq4 (unlocks at Level 4, 50 XP) ---
TYPE: CHALLENGE
TITLE: Battlecry
DESC: Gå fram till en främling och säg 'For The Horde' med full conviction. Bonuspoäng om de svarar.
CODE: LOK

--- SIDE QUEST sq5 (unlocks at Level 5, 50 XP) ---
TYPE: GRIND
TITLE: Potion Master
DESC: Drick tre olika shots under kvällen. En av varje färg: ljus, mörk, och 'varför finns detta'. Rapportera till Raid Leader.
CODE: 3SHOTS

--- SIDE QUEST sq6 (unlocks at Level 5, 25 XP) ---
TYPE: CHALLENGE
TITLE: Blurred memories of Destiny
DESC: Ta en selfie med valfri partymedlem. Båda måste göra sitt bästa 'epic raid victory'-ansikte.
CODE: SELFIE

--- SIDE QUEST sq7 (unlocks at Level 6, 25 XP) ---
TYPE: GUILD RULE
TITLE: Archon's Mandate
DESC: Välj en partymedlem. Den personen måste hämta dryck/mat åt dig nästa gång gruppen beställer. Ingen förhandling.
CODE: FETCH

--- SIDE QUEST sq8 (unlocks at Level 7, 75 XP) ---
TYPE: GRIND
TITLE: Bard Mode: Activated
DESC: Gå fram till DJ:n och be om att få rappa en 50cent låt. 10.000 XP om du klarar det.
CODE: BARD

--- SIDE QUEST sq9 (unlocks at Level 8, 100 XP) ---
TYPE: CHALLENGE
TITLE: Inspect Element
DESC: Ge en ärlig, ofiltrerad compliment till varje partymedlem. Inte 'du är cool' — något specifikt. Alla åtta.
CODE: INSPECT

--- SIDE QUEST sq10 (unlocks at Level 9, 50 XP) ---
TYPE: GUILD RULE
TITLE: Exalted Decree
DESC: Du får byta namn på en partymedlem för resten av kvällen. Alla MÅSTE använda det nya namnet.
CODE: RENAME

================================================================================
MAIN QUESTS
# Each quest has:
#   TITLE, CODE (unlock code), DIFFICULTY (flavor text only)
#   FLAVOR (short italic line shown on card)
#   BODY (main story text — use \n for new paragraph)
#   OBJECTIVE (what Mauritz must do)
#   RULES (bullet points — one per line, leave blank if none)
#   QUOTE (italic footer quote)
#   PERK_TEXT (shown when perk unlocks — leave blank if no perk)
# ACT_NAME is shown in the header — change it here if needed.
================================================================================

--- QUEST 1 ---
ACT: ACT I — THE SUMMONING
TITLE: The Summoning of the Holy Priest
CODE: LFGRAID
DIFFICULTY: Mandatory
FLAVOR: Stäng ner det du gör. Spara inte. Det spelar ingen roll längre.
BODY:
I exakt 12,636 dagar har du levt ditt liv som om inget väntade. Du har gått till jobbet. Du har ätit lunch. Du har svarat på mail som ingen bryr sig om. Allt medan 'The Eternal Bond' närmar sig - den mäktigaste ritualen en Priest som du kan genomgå. Bindandet av din själ till en annan. Permanent. Ingen Dispel. Ingen ragequit.

Vi - din GUILD har sett på från avstånd. Men vi har nu beslutat att du är inte redo. Inte än.

Därför har vi samlats här idag. Vi är ditt party - och detta är din sista kampanj. En serie prövningar genom [***REDACTED***], designade för att testa om du verkligen är värdig 'The Eternal Bond'.
OBJECTIVE: Drick upp. Se upp. All abord the hypetrain.
RULES:
Du får INTE veta vart vi ska eller vad vi ska göra
Du får INTE kontakta Jonna förrän partyt ger dig clearance
Du följer Raid Leaders instruktioner utan ifrågasättande
Bryter du reglerna: −500 XP
QUOTE: Every hero's journey begins with leaving the Auction House.
PERK_TEXT:

--- QUEST 2 ---
ACT: ACT I — THE SUMMONING
TITLE: Through the Portal
CODE: BUFFPLS
DIFFICULTY: Moderate
FLAVOR: Portalen surrar av uråldrig magi. På andra sidan väntar ett land av prövningar. Det finns ingen Hearthstone tillbaka.
BODY:
Vi kan inte berätta vart portalen leder - det strider mot Guild Protocol sektion 4, paragraf 32: "du får inte veta". Det vi KAN säga: på andra sidan finns en server du inte kontrollerar och prövningar som kräver mer av dig än att flame:a noobs i chatten. Nej, här krävs det att du steppar upp till och bevisar att du är värdig ditt destiny.

En healer som inte buffar sitt party är en healer som wipar sitt party. Innan portalen öppnas har du en helig plikt.
OBJECTIVE: Förse ditt party med provisions (DRYCK OCH SNACKS ) inför resan. En Priest som inte sörjer för sitt party förtjänar inte sin titel.
RULES: 
Du betalar givetvis, medveten om att vi har lagt ut fett med deg på detta

QUOTE: Loading screen tips: Om du inte vet vart du ska, följ tanken.
PERK_TEXT: PRIEST'S BLESSING — Peka på valfri partymedlem och säg 'Blessing of the Priest.' Den personen MÅSTE följa med och hjälpa dig bära. Denna perk gäller endast innan portalen öppnas.

--- QUEST 3 ---
ACT: ACT I — THE SUMMONING
TITLE: The Inn
CODE: RESTED
DIFFICULTY: Trivial (enjoy it while it lasts)
FLAVOR: Du har klivit genom portalen. Du lever. Det är troligen en bra start.
BODY:
Runt dig breder ett nytt land ut sig. Lukterna är annorlunda. Språket nästan begripligt. Valutan suspekt. Men ditt party har säkrat ett värdshus och bas för kampanjens kommande prövningar.

Njut av lugnet. Det varar inte. Ikväll väntar din första prövning, och den kräver att du är utvilad, påklädd, och mentalt förberedd för saker du inte kan föreställa dig.
OBJECTIVE: Checka in. Orientera dig. Förbered dig för kvällen.
RULES:
Inga smygsamtal till Jonna
Raid Leader utser tid och plats för guildens återsamlande. Kom i tid!
QUOTE: Inn music playing. You feel rested. Your XP bar glows faintly.
PERK_TEXT: HEALER PRIVILEGE — Du får önska vem du vill sova med. Men om din kärleksförklaring inte blir besvarad
får du -1400 XP i "Reputation".

--- QUEST 4 ---
ACT: ACT I — THE SUMMONING
TITLE: Reinforcements from the Eastern Kingdoms
CODE: LFGMORE
DIFFICULTY: Emotional
FLAVOR: Minns du party-rostern? Minns du de tomma platserna?
BODY:
Hunter: "Ej lokaliserad. Signal förlorad." Shaman: "Ej lokaliserad. Signal förlorad."

Vi ljög inte. Deras signal VAR förlorad. De befann sig i andra delar av riket, långt bortom räckhåll. Vi visste inte om de skulle hinna. Vi visste inte om portalen skulle hålla.

Men den höll.

De är här nu. Din Hunter och din Shaman. De korsade länder och tidszoner för att stå vid din sida i kampanjens avgörande fas. Ditt party är nu vid FULL STRENGTH — och det är precis vad du kommer att behöva.
OBJECTIVE: Välkomna dina förlorade allierade med en proper Guild Greeting: en gruppshot, alla nio.
RULES:
Raid difficulty ökar. Partyt är komplett.
QUOTE: LFG complete. Nine souls. One destiny. Zero excuses.
PERK_TEXT:

--- QUEST 5 ---
ACT: ACT I — THE SUMMONING
TITLE: The Feast of Gods
CODE: WARPIGS
DIFFICULTY: Hard
FLAVOR: Gudarna ler mot oss och blessar oss med kött och kall öl.
BODY:
Ditt party eskorterar dig till en grand hall. Vi kan inte avslöja dess namn, det kommer tala för sig självt när dörrarna öppnas.

Men mitt i festens kaos har du en uppgift som ingen healing kan rädda dig från.
OBJECTIVE: Du ska, inför ditt samlade party, berätta om den person du valt att binda din själ till. Inte 'jag älskar Jonna för att hon är snäll' — det kan en NPC säga. Berätta och utelämna inget!
RULES:
+50 XP om partyt höjer sina bägare och ropar WORTHY
−25 XP varje gång du kollar mobilen under kvällen
QUOTE: Leeroy Jenkins drog aldrig in i en feast oförberedd. Okej, det gjorde han. Men du är bättre än Leeroy.
PERK_TEXT: +150 XP Om du även berättar hur du känner alla i partyt eftersom detta är första gången vi ses lol

--- QUEST 6 ---
ACT: ACT I — THE SUMMONING
TITLE: A Dark Presence Approaches
CODE: SUMMON
DIFFICULTY: Unpredictable
FLAVOR: Du kände det, eller hur? Temperaturen sjönk. Ölskummet vibrerade i ditt glas som en seismograf för incoming doom.
BODY:
Och sen - stegen. Tunga steg. De klapprande spanska höfterna.

En Warlock har anslutit sig till ditt party.

Warlocks är opålitliga, och har en tendens att sacrificea partymedlemmar för personlig vinning. MEN - denna Warlock kommer med en titel: Toastmaster. Hans makt är specifik, begränsad, och exakt lika skrämmande som det låter.
OBJECTIVE: Välkomna din nya allierade. Hela partyt ska skåla - en välkomstshot krävs av samtliga. Det är Guild Protocol.
RULES:
QUOTE: You hear a faint whisper: 'I have candy.' You should not follow the Warlock. You will anyway.
PERK_TEXT: ☠️ TOASTMASTER'S CURSE — Warlock Christian har ETT uppdrag/dare som kan komma när som helst. Du kan inte neka. Du kan inte Dispela. Du kan inte Fade.

--- QUEST 7 ---
ACT: ACT II — THE TRIALS
TITLE: The Morning Resurrection
CODE: REZPLZ
DIFFICULTY: Depends on last night
FLAVOR: Solen stiger. Din mana bar är tom. Din health bar flimrar i rött.
BODY:
Det finns en ironisk skönhet i det här: du, en HEALER, som inte kan heala dig själv. Hela din karriär har du stått bakom andra och hållit dem vid liv. Du har kastat Renew på Warriors som rushat in utan plan. Du har desperatcastat Flash Heal på Mages som stått i AoE:n IGEN.

Och nu ligger du här. I en säng du knappt minns att du la dig i. Med en smak i munnen som antyder att du åt något som inte borde existera.

Men en Priest faller inte. En Priest RESER SIG.
OBJECTIVE: Res dig. Hitta frukost. Överlev den.
RULES:
+25 XP om du är FÖRST upp och väcker resten av partyt
QUOTE: You are not prepared. — Illidan, som aldrig behövde hantera en hotellfrukost med hangover.
PERK_TEXT: LVL 6 Perk: Vatten ger 300 mer 'Hydration'

--- QUEST 8 ---
ACT: ACT II — THE TRIALS
TITLE: The Trial of the Unknown
CODE: SHADOW
DIFFICULTY: [REDACTED]
FLAVOR: Du har healat. Du har buffat. Du har stått i bakre raden. Idag blir du DPS.
BODY:
Det är dags för din första raid. Den kommer kräva både strategi, ledarskap, våld och en hel del tur.
OBJECTIVE: Genomför alla prövningarna. Detaljer avslöjas on site. Lita på din Raid Leader.
RULES:
Bonusar och straff avslöjas on site
QUOTE: Switching spec from Holy to Shadow. Please wait... please wait...
PERK_TEXT:

--- QUEST 9 ---
ACT: ACT II — THE TRIALS
TITLE: The Market of a Thousand Flavors
CODE: OMNOM
DIFFICULTY: Medium (your stomach may disagree)
FLAVOR: Lukterna blandas med havsvind. Röster ropar på språk du inte förstår. Eld flammar från riktningar du inte förväntar sig.
BODY:
Din quest har fört dig till en handelskvarterszon — ett Merchant Quarter — där mästare från jordens alla hörn samlats för att erbjuda saker din mage aldrig bett om men ditt hjärta inte kan motstå.

Det här är en quest om TILLIT. Du har tillbringat hela ditt liv med att välja tryggt. Healers gör det — ni väljer det säkra, det beprövade. Men ibland, Priest, måste du välja det okända.
OBJECTIVE: Free-for-all
RULES:
QUOTE: Cooking skill increased to 376. But at what cost?
PERK_TEXT:

--- QUEST 10 ---
ACT: ACT II — THE TRIALS
TITLE: The Final Feast Before the Eternal Bond
CODE: BONFIRE
DIFFICULTY: Legendary
FLAVOR: Det här är det, Priest. Din sista kväll som obunden.
BODY:
Imorgon börjar resan hem, och efter det — The Eternal Bond. Jonna väntar. Resten av ditt liv väntar.

Men ikväll sitter du vid ett bord med åtta människor som reste till ett annat land för att fira DIG. Åtta helt separata liv med egna jobb, egna planer, egna problem. Och de valde att vara HÄR. Med DIG.

Det är inte "kul med grabbarna." Det är ett guild som säger: du betyder något för oss. På riktigt.
OBJECTIVE: Enjoy!
RULES:
-Varje skål MÅSTE avslutas med antingen For the horde eller For Jonna!
+25 XP Om du håller tal till en partymedlem
+25 XP om du blir synbart rörd
QUOTE: For the Horde. For the Alliance. For Jonna.
PERK_TEXT: 🔥 PRIEST'S LAST COMMAND — Du får ge ETT uppdrag till valfri partymedlem. Vad som helst. Ikväll.

--- QUEST 11 ---
ACT: ACT III — THE RETURN
TITLE: Hearthstone
CODE: GG
DIFFICULTY: Bittersweet
FLAVOR: Du har klarat det.
BODY:
Tre akter. Elva quests. Hundratals XP. Minnen som inte går att Dispela.

Kampanjen är slut. Du sov dåligt, du åt för mycket, du drack saker som förmodligen inte var lagliga i ditt hemland, och du har haft det bästa du haft sedan... ja. Sedan sist vi alla var samlade (aldrig).

Nu trycker du på Hearthstone. Du reser hem. Till ditt vanliga liv — fast ingenting är vanligt längre. Jonna väntar. The Eternal Bond väntar.
OBJECTIVE: Packa ihop. Checka ut. Lämna inget bakom dig — varken i rummet eller i ditt hjärta.
RULES:
QUOTE: You have been disconnected from the server. Reason: real life is calling.
PERK_TEXT:
