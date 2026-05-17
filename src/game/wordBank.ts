// Massive categorized desi/Nepali/Urdu/South Asian word bank
export type Category =
  | "Desi Slang"
  | "Food & Drinks"
  | "College Life"
  | "Insults & Roasts"
  | "Tech & Crypto"
  | "Gaming & Esports"
  | "Bollywood & Drama"
  | "Cricket & Sports"
  | "Internet Culture"
  | "Romance & Relationships"
  | "Transport & City"
  | "Festivals & Events"
  | "Desi Parents"
  | "Hostel & Nightlife"
  | "Chaotic Vibes";

export const WORD_BANK: Record<Category, string[]> = {
  "Desi Slang": [
    "bhai", "yaar", "scene", "bakchodi", "jhakaas", "mast", "bawal", "lafda", "jugad", "setting", "vibe", "senti", "kaand", "faltu", "chill", "fattu", "gunda", "tapri", "jhol", "jhyaap", "bindaas", "jhakkas", "pagal", "chomu", "baklol", "nalla", "sus", "op", "noob", "pro", "bekaar", "jhola", "sutta", "adda", "pataka", "patakaaadmi", "jhilmil", "jhappad", "thappad", "jhagda", "raita", "kachra", "kalesh", "khatarnak", "zabardast", "jhatt", "jhap", "jhool", "jhunda", "jhamp", "jhikjhik", "jhapad", "jhand", "fokat", "jhamaela", "hungama", "chakachak", "jhilmila", "jhakas", "panga", "jhattu", "chadarmod", "bhasad", "raula", "bhaukali", "shana", "shehzaada", "nibba", "nibbi", "jhantu", "bakaiti", "bakchod", "jholaachhap", "chaalu", "harami", "kamina", "ulta", "seedha", "thikcha", "ramro", "khatra", "jhamela", "batti", "bijuli", "raksi", "bhaiya", "bhailog", "bhaisaab", "yaaro", "yaarlog", "brocode", "broski", "bhidu", "apun", "apunich", "itembaazi", "paglet", "pagalpanti", "lafandar", "bawalMachine", "jhakkasEnergy", "vibey", "vibing", "vibekiller", "sceneOn", "sceneOff", "fullPower", "fullTension", "lowkey", "highkey", "seedhaSadha", "ultaChor", "jhakasMode", "ultraInstinct", "beastMode", "crazyFellow", "pagalScientist"
  ],
  "Food & Drinks": [
    "chai", "chiya", "momo", "panipuri", "golgappa", "chatpata", "chiyaPasal", "pasal", "khaja", "khana", "thali", "paratha", "chaiwala", "chaiya", "seviyan", "biryani", "samosa", "jalebi", "lassi", "falooda", "kachori", "vadaPav", "bhurji", "anda", "roti", "naan", "achar", "chatni", "puri", "alu", "bhindi", "paneer", "rajma", "chawal", "daal", "khichdi", "maggi", "kurkure", "waiwai", "frooti", "maaza", "sting", "redbull", "chaibiskut", "chiyaguff", "momoLover", "panipuriGang", "momoSteam", "friedMomo", "cMomo", "jholMomo", "buffMomo", "vegMomo", "chickenMomo", "panipuriShot", "spicyChat", "streetMaggie", "cheeseMaggi", "masalaMaggi", "chaiTapri", "kulhadChai", "elaichiChai", "milkTea", "blackTea", "sukuti", "selRoti", "yomari", "chatamari", "thukpa", "laphing", "bara", "choila", "sekuwa", "biryaniLover", "nihari", "haleem", "parathaRoll", "frankie", "shawarma", "falafel", "sizzler", "burgerWala", "pizzaParty", "canteenSamosa", "kurkureAddict", "waiwaiSoup", "fuchka", "jhalmuri", "chaatCorner", "pavBhaji", "misalPav", "poha", "upma", "idli", "vada", "uttapam", "rasgulla", "gulabJamun", "rabdi", "kulfi", "iceGola", "faloodaSpecial", "roadsideTea"
  ],
  "College Life": [
    "padhaku", "topper", "backbencher", "proxy", "bunk", "attendance", "viva", "assignment", "internal", "practical", "copycheck", "examhall", "invigilator", "cheatcode", "massbunk", "canteen", "proxyKing", "assignmentCopy", "nightStudy", "examFear", "vivaTension", "internalMarks", "massBunkers", "lateSubmission", "teacherPet", "strictTeacher", "labAssistant", "projectDemo", "seminarHall", "presentationDay", "collegeCrush", "corridorWalk", "campusLove", "librarySleep", "attendanceShort", "resultDay", "backpaper", "supplee", "engineeringLife", "medicalPrep", "jeeAspirant", "neetAspirant", "ceePrep", "ioePrep", "codingClub", "roboticsClub", "startupCell", "placementDrive", "internshipHunt", "linkedinFlex", "resumeBuild", "portfolioSite", "collegeKeede"
  ],
  "Insults & Roasts": [
    "lodu", "chutiya", "bhosdi", "bevakoof", "gadha", "ullu", "namuna", "jhapali", "khopdi", "akalmand", "bewda", "nashedi", "gadheda", "ulluKaPattha", "namunaPiece", "chomuDeluxe", "clownAadmi", "buddhu", "halkaPlayer", "jhantuCoder", "wifiChor", "lagMachine", "susKiAulad", "fattuLegend", "confusionKaBadshah", "cringeFactory", "attentionSeeker", "keyboardWarrior", "micTod", "reelKaKeeda", "bakwasGenerator", "fakeSigma", "wannabeGangster", "hostelKaDon", "proxyKaKing", "sastaHero", "sastaShahrukh", "budgetBatman", "androidCameraQuality", "potatoAim", "freefireLegend69", "rankedKaBhoot", "messFoodSurvivor"
  ],
  "Tech & Crypto": [
    "startup", "hackathon", "coding", "debugging", "deploy", "serverCrash", "commitPush", "mergeConflict", "docker", "linux", "terminal", "vscode", "prisma", "laravel", "symfony", "yii", "react", "nextjs", "nodejs", "express", "mongodb", "postgres", "redis", "socketio", "blockchain", "solana", "ethereum", "zkproof", "crypto", "shitcoin", "rugpull", "airdrops", "memecoin", "trader", "holder", "paperhands", "diamondhands", "bullrun", "bearmarket", "fomo", "fud", "apein", "pumpdump", "aiDoctor", "robotics", "neuralnet", "quantum", "qubits", "machineLearning", "visionAI", "cybersecurity", "ethicalHacker", "whitehat", "blackhat", "scriptkiddie", "phishing", "rat", "payload", "exploit", "kernel", "assembly", "bios", "firmware", "rootaccess", "sudo", "terminalwizard", "hackerman", "jholaCoder", "techBaba", "cryptoBhai", "startupBhaiya", "founderMode", "hustlerMode", "grindset", "hackMode", "jholaCoderX", "chaiPowered", "lateNightCoder", "sleepDeprived", "aiOverlord", "robotBhai", "futureTech", "matrixScene", "quantumBhai", "darkModeEnjoyer", "startupFail", "startupSuccess", "investorPitch", "angelInvestor", "bootstrapMode", "viralLaunch", "productHunt", "serverScaling", "cloudHosting", "apiFail", "corsError", "nullPointer", "syntaxError", "productionBug", "hotfixDeploy", "shipIt", "scrumMeeting", "standupCall", "remoteWork", "workFromHome", "officePolitics", "chaiBreakMeeting", "hrRound", "techRound", "systemDesign", "leetcodeGrind", "competitiveCoding", "hackathonWinner", "spardhaChampion", "zKYC", "blockchainBro", "solanaDev", "ethereumMaxi", "smartContract", "walletConnect", "seedPhrase", "nftBro", "minting", "staking", "validator", "nodeOperator", "onchain", "offchain", "layerTwo", "zkRollup"
  ],
  "Gaming & Esports": [
    "lanparty", "cybercafe", "pubg", "freefire", "valorant", "csgo", "rankpush", "clutch", "camping", "loot", "revive", "headshot", "squadwipe", "botplayer", "camper", "rushkar", "zone", "revivekar", "bhidja", "flick", "spray", "recoil", "lag", "ping", "internetgaya", "wifiDown", "routerreset", "lightGayo", "loadshedding", "bijuliGayo", "serverDown", "battiGul", "rageQuit", "tilted", "serverLag", "fpsDrop", "headphoneGang", "rgbSetup", "budgetSetup", "beastPc", "potatoPc", "cyberCafeKing", "rankPusher", "tryhard", "sweatyPlayer", "campMaster", "sniperGod", "sprayControl", "oneTap", "wallbang", "quickscope", "spinbot", "hardCarry", "supportPlayer", "midPlayer", "clutchGod", "thrower", "feeder", "smurf", "boosted", "queueDodge", "afkPlayer", "matchFixing", "rgbWarrior", "gpuHunter", "ramMonster", "thermalThrottle", "batterySaver", "gamingLaptop", "potatoInternet", "fiberNet", "jioFiber", "worldlink", "ntfiber", "routerResetAgain"
  ],
  "Bollywood & Drama": [
    "andaaz", "tevar", "aukaat", "izzat", "sharam", "sanskaar", "nakhra", "drama", "natak", "filmy", "hero", "villain", "item", "masala", "interval", "blockbuster", "flop", "superhit", "housefull", "singleScreen", "multiplex", "bollywood", "kollywood", "tollywood", "lollywood", "nepwood", "clownMoment", "absoluteCinema", "peakComedy", "filmyScene", "heroEntry", "villainArc", "redFlag", "greenFlag", "yellowFlag", "softHeart", "cinematicMoment", "peakFiction", "amvCreator", "cosplayScene", "comicConGuy"
  ],
  "Cricket & Sports": [
    "cricket", "ipl", "umpire", "sixer", "four", "wicket", "gullyCricket", "bat", "ball", "fielder", "captain", "runout", "stumping", "googly", "yorker", "bouncer", "commentary", "stadium", "cheer", "fanwar", "rcb", "csk", "mi", "kkr", "srh", "rr", "lsg", "gt", "pbks", "delhiCapitals", "virat", "rohit", "dhoni", "bumrah", "surya", "hardik", "jadeja", "rashid", "babar", "rizwan", "kohliFans", "thala", "kingKohli", "maaro", "chodna", "pelna", "fadna", "kootna", "lapetna", "ghusna", "nikalna"
  ],
  "Internet Culture": [
    "cringe", "sigma", "gyatt", "moyeMoye", "skibidi", "reels", "viral", "meme", "template", "roast", "ratio", "cancel", "simp", "edgelord", "wannabe", "influencer", "creator", "contentbaaz", "editbaaz", "transition", "filter", "snap", "streak", "seenzone", "ghosted", "brainrot", "memeLord", "reelKa14", "commentWar", "fanboy", "fangirl", "stan", "anti", "hater", "legendary", "historic", "massiveL", "massiveW", "ultraProMax", "memeAddict", "animeKa14", "otakuBhai", "waifuHunter", "senpaiNoticeMe", "animeEdit", "streamSniper", "chatSpammer", "modAbuse", "banHammer", "rageCompilation", "clipFarmer", "reactionChannel", "memeTemplate", "instagramKa14", "snapchatFilter", "beRealMoment", "statusLagao", "storyDalo", "reelBanao", "viralKarDo", "trendChaluHai", "algorithmBhai", "commentSectionWar", "likeBhejo", "shareKaro", "subscribeKarlo", "bellIconDabao", "sadPosting", "lateNightThoughts", "existentialCrisis", "lifeUpdate", "quarterLifeCrisis", "moneyNahiHai", "salaryKabAayegi"
  ],
  "Romance & Relationships": [
    "friendzone", "situationship", "breakup", "patchup", "proposal", "crush", "ishq", "pyaar", "diljale", "romeo", "majnu", "laila", "juliet", "shaadi", "baraat", "mehendi", "sangeet", "pandit", "maulvi", "mandap", "sehra", "lehenga", "kurta", "sherwani", "jhumka", "payal", "weddingSeason", "baraatiDance", "nagadaBeat", "djNight", "sangeetPerformance"
  ],
  "Transport & City": [
    "bato", "gaadi", "tempo", "micro", "pathao", "indrive", "rickshaw", "auto", "buspark", "thamel", "chappal", "hawaiChappal", "kachha", "baniyan", "jugnu", "machhar", "chipkali", "bandar", "kutta", "billi", "bakra", "bhains", "bakri", "murga", "microbusChaos", "trafficJam", "hornPlease", "nightMarket"
  ],
  "Festivals & Events": [
    "asoj", "dashain", "tihar", "holi", "eid", "iftar", "festivalLights", "patangBattle", "diwaliVibes", "holiColors", "dashainMood", "tiharLights", "eidMubarakScene", "iftarParty", "sehriTime", "stageFear", "karaokeNight", "birthdayTreat", "cakeSmash"
  ],
  "Desi Parents": [
    "sanskari", "beizzati", "izzatLootLi", "jhagralu", "nakhrewali", "socialBatteryLow", "extrovertEnergy", "introvertMode", "ambivertScene", "sigmaMale", "alphaBetaGamma", "motivationGuru"
  ],
  "Hostel & Nightlife": [
    "hostel", "roommate", "hostelLife", "messFood", "ragging", "freshers", "farewell", "hostelGang", "squadGoals", "bakchodGang", "susBanda", "nibbaArmy", "jholaGang", "nightout", "lanNight", "raksiMood", "jhyaapMood", "lateNightAdda", "sadakchaap", "streetSmart", "hostelMess", "nightOwl", "hostelPhilosopher", "canteenPolitician", "nightcanteenSurvivor"
  ],
  "Chaotic Vibes": [
    "ulteSeedhe", "jhakaMarna", "ultaPulta", "phodna", "bhasadMachana", "sceneBanana", "settingKarna", "jugadLagana", "bakaitiKarna", "chillMaar", "suttaBreak", "chaiBreak", "faltuScene", "boreHora", "majedaar", "jhilmilScene", "mastMauj", "fullJugad", "ultraSus", "silentKiller", "hiddenImpostor", "voteOut", "emergencyMeeting", "fakeAlibi", "chaaluBanda", "seedhaBanda", "innocentAct", "fakeConfidence", "randomBakwas", "micSpam", "vcChaos", "screamer", "rageMic", "keyboardSmash", "internetPotato", "wifiKaand", "andarKiBaat", "secretScene", "undercover", "ultimateBakchod", "kyaSceneHai", "sceneKhatam", "sceneOnHai", "fullMauj", "fullBakchodi", "mastChalRaha", "kaafiSusHai", "iskaVibeOffHai", "yePakkaImpostorHai", "voteIsko", "bhaiSunna", "arreYaar", "areyBhai", "khatamTataByeBye", "abTohGaya", "iskaGameOver", "fullClownery", "ultaBolRahaHai", "confidenceFakeHai", "bahutBolRahaHai", "silentKillerLagtaHai", "yeOverExplainKarRaha", "pakkaJhoothBolRaha", "iskaMicMuteKaro", "serverKaandHoGaya", "wifiNeDhokaDiya", "hostelNetGaya", "lightChaliGayi", "matchRiggedHai", "aiBhiConfusedHai", "chaosMachGaya", "publicPagalHoGayi", "chaoticNeutral", "susEnergy", "hyperActive", "rageMonster", "panicButton", "brainLag", "mindFreeze", "chaosGoblin", "npcBehavior", "mainCharacter", "sideCharacter", "plotTwist", "vibeCheck", "energyDown", "energyHigh", "moodOff", "moodOn", "friendshipGoals", "betrayalArc", "trustIssues", "chaoticFriend", "funnyGuy", "silentGuy", "rageGuy", "suspiciousGuy", "innocentFace", "fakeSmile", "bakchodiUnlimited", "ultimateSusness", "jholaVibes", "vibeManipulator", "chaosEngineer", "micDestroyer", "memeEconomist", "wifiNecromancer", "proxySpecialist", "assignmentDealer", "labEscapeArtist", "attendanceMagician", "deadlineDodger", "sleepScheduleDestroyer", "emotionDamage", "mentalLag", "ultraConfusion", "hyperBakwas", "fakeInnocence", "dramaticReveal", "betrayalMoment", "friendshipEnded", "newBestie", "publicExecution", "socialDeductionGod", "voiceChatChaos", "lobbyTerrorist", "panicReporter", "emergencyButtonSpammer", "ultimateManipulator"
  ]
};

export const CATEGORIES = Object.keys(WORD_BANK) as Category[];

export function getRandomWord(usedWords: Set<string>, preferredCategories: string[] = []): { word: string; category: Category } {
  let cats = [...CATEGORIES].sort(() => Math.random() - 0.5);
  
  // If multiple categories selected, randomly pick one of them to prioritize
  if (preferredCategories && preferredCategories.length > 0) {
    const validPrefs = preferredCategories.filter(c => CATEGORIES.includes(c as Category)) as Category[];
    if (validPrefs.length > 0) {
      // Prioritize the selected categories randomly, then append the rest as fallback
      const shuffledPrefs = validPrefs.sort(() => Math.random() - 0.5);
      cats = [...shuffledPrefs, ...cats.filter(c => !shuffledPrefs.includes(c))];
    }
  }

  for (const cat of cats) {
    const pool = WORD_BANK[cat].filter((w) => !usedWords.has(w));
    if (pool.length > 0) {
      return { word: pool[Math.floor(Math.random() * pool.length)], category: cat };
    }
  }
  // exhausted — reset and just pull entirely randomly from the preferred list if available
  let cat: Category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  if (preferredCategories && preferredCategories.length > 0) {
    const validPrefs = preferredCategories.filter(c => CATEGORIES.includes(c as Category)) as Category[];
    if (validPrefs.length > 0) {
      cat = validPrefs[Math.floor(Math.random() * validPrefs.length)];
    }
  }
  const pool = WORD_BANK[cat];
  return { word: pool[Math.floor(Math.random() * pool.length)], category: cat };
}

// Chaos events / meme dialogues used to spice up rounds
export const CHAOS_EVENTS: string[] = [
  "⚡ Chaos: Sabse pehle bola tha woh ab last mein bolega!",
  "🔥 Emergency: Sirf ek word mein clue do!",
  "🎭 Twist: Apne pados wale ki tarah bolne ki koshish karo!",
  "🚨 Sus alert: Sabse zyada confident wala suspect!",
  "💣 Bomb: Impostor ko ek bonus clue suggest karne ka chance!",
  "🤡 Roast round: Pehle sabko ek roast line bolni hai!",
  "📵 Silent round: Sirf emoji se clue do!",
  "🎤 Bollywood mode: Clue dialogue jaisa bolna hai!",
];

export const ROAST_LINES: string[] = [
  "Bhai confidence fake hai iska 💀",
  "Ye banda over explain kar raha hai, pakka sus",
  "Scene gadbad hai, vote karo yaar",
  "Iska clue toh ChatGPT se copy laga",
  "Hostel wala banda lagta hai, kuch nahi pata",
  "Aaj toh pakka fatega isska",
  "Khana dekh ke hi pata chal gaya tha",
  "Full bakchodi chal rahi hai isski",
];

