/* ============================================================
   BLOOM — lifestyle PWA core. Data stored locally on device.
   ============================================================ */
const pad=n=>String(n).padStart(2,'0');
const dstr=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const todayStr=()=>dstr(new Date());
const fmt=n=>Math.round(n);
const titleCase=s=>s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());

/* ---------- Food database (broad, all cuisines) ---------- */
const FOOD_DB=[
  {name:"Chicken breast (grilled)",serv:"100 g",cal:165,p:31,c:0,f:3.6},
  {name:"Chicken thigh (cooked)",serv:"100 g",cal:209,p:26,c:0,f:10.9},
  {name:"Ground beef 90/10 (cooked)",serv:"100 g",cal:217,p:26,c:0,f:12},
  {name:"Ground turkey (cooked)",serv:"100 g",cal:203,p:27,c:0,f:10},
  {name:"Pork chop (cooked)",serv:"100 g",cal:231,p:26,c:0,f:14},
  {name:"Salmon (baked)",serv:"100 g",cal:206,p:22,c:0,f:13},
  {name:"Cod (baked)",serv:"100 g",cal:105,p:23,c:0,f:0.9},
  {name:"Tilapia (baked)",serv:"100 g",cal:129,p:26,c:0,f:2.7},
  {name:"Tuna (canned in water)",serv:"1 can",cal:142,p:33,c:0,f:1},
  {name:"Sardines (canned)",serv:"1 can",cal:191,p:23,c:0,f:11},
  {name:"Shrimp (cooked)",serv:"100 g",cal:99,p:24,c:0.2,f:0.3},
  {name:"Eggs (large)",serv:"1 egg",cal:72,p:6.3,c:0.4,f:5},
  {name:"Egg whites",serv:"1 cup",cal:117,p:26,c:1.6,f:0.4},
  {name:"Greek yogurt (nonfat)",serv:"1 cup",cal:130,p:22,c:9,f:0.7},
  {name:"Cottage cheese (low-fat)",serv:"1 cup",cal:163,p:28,c:6,f:2.3},
  {name:"Feta cheese",serv:"1 oz",cal:75,p:4,c:1.2,f:6},
  {name:"Cheddar cheese",serv:"1 oz",cal:113,p:7,c:0.4,f:9},
  {name:"Mozzarella cheese",serv:"1 oz",cal:85,p:6,c:1,f:6},
  {name:"String cheese",serv:"1 stick",cal:80,p:7,c:1,f:6},
  {name:"Tofu (firm)",serv:"100 g",cal:144,p:17,c:3,f:9},
  {name:"Edamame",serv:"1 cup",cal:188,p:18,c:14,f:8},
  {name:"Lentils (cooked)",serv:"1 cup",cal:230,p:18,c:40,f:0.8},
  {name:"Chickpeas (cooked)",serv:"1 cup",cal:269,p:14.5,c:45,f:4.2},
  {name:"Black beans (cooked)",serv:"1 cup",cal:227,p:15,c:41,f:0.9},
  {name:"Hummus",serv:"2 tbsp",cal:70,p:2,c:6,f:5},
  {name:"Oats (dry)",serv:"1/2 cup",cal:150,p:5,c:27,f:3},
  {name:"Granola",serv:"1/2 cup",cal:200,p:5,c:36,f:6},
  {name:"Cereal (whole grain)",serv:"1 cup",cal:150,p:4,c:33,f:1.5},
  {name:"Quinoa (cooked)",serv:"1 cup",cal:222,p:8,c:39,f:3.6},
  {name:"Farro (cooked)",serv:"1 cup",cal:200,p:7,c:44,f:1.5},
  {name:"Bulgur (cooked)",serv:"1 cup",cal:151,p:5.6,c:34,f:0.4},
  {name:"Couscous (cooked)",serv:"1 cup",cal:176,p:6,c:36,f:0.3},
  {name:"Brown rice (cooked)",serv:"1 cup",cal:218,p:5,c:46,f:1.6},
  {name:"White rice (cooked)",serv:"1 cup",cal:205,p:4.3,c:45,f:0.4},
  {name:"Pasta (cooked)",serv:"1 cup",cal:221,p:8,c:43,f:1.3},
  {name:"Whole grain pasta (cooked)",serv:"1 cup",cal:180,p:8,c:37,f:1.5},
  {name:"Whole wheat bread",serv:"1 slice",cal:80,p:4,c:14,f:1},
  {name:"White bread",serv:"1 slice",cal:75,p:2.6,c:14,f:1},
  {name:"Bagel (plain)",serv:"1 bagel",cal:245,p:10,c:48,f:1.5},
  {name:"English muffin",serv:"1 muffin",cal:134,p:5,c:26,f:1},
  {name:"Whole wheat pita",serv:"1 pita",cal:170,p:6,c:35,f:1.7},
  {name:"Flour tortilla",serv:"1 tortilla",cal:140,p:4,c:24,f:3.5},
  {name:"Crackers",serv:"6 crackers",cal:90,p:2,c:15,f:2.5},
  {name:"Rice cakes",serv:"2 cakes",cal:70,p:1.4,c:15,f:0.6},
  {name:"Sweet potato (baked)",serv:"1 medium",cal:103,p:2.3,c:24,f:0.2},
  {name:"Potato (baked)",serv:"1 medium",cal:161,p:4.3,c:37,f:0.2},
  {name:"Spinach (raw)",serv:"1 cup",cal:7,p:0.9,c:1.1,f:0.1},
  {name:"Kale (cooked)",serv:"1 cup",cal:36,p:2.9,c:6,f:0.5},
  {name:"Broccoli (cooked)",serv:"1 cup",cal:55,p:3.7,c:11,f:0.6},
  {name:"Green beans (cooked)",serv:"1 cup",cal:44,p:2.4,c:10,f:0.3},
  {name:"Mixed vegetables",serv:"1 cup",cal:59,p:2.6,c:12,f:0.3},
  {name:"Bell pepper",serv:"1 medium",cal:31,p:1,c:7,f:0.3},
  {name:"Tomato",serv:"1 medium",cal:22,p:1.1,c:4.8,f:0.2},
  {name:"Cherry tomatoes",serv:"1 cup",cal:27,p:1.3,c:6,f:0.3},
  {name:"Cucumber",serv:"1 cup",cal:16,p:0.7,c:3.8,f:0.1},
  {name:"Eggplant (cooked)",serv:"1 cup",cal:35,p:0.8,c:8.6,f:0.2},
  {name:"Zucchini (cooked)",serv:"1 cup",cal:27,p:2,c:5,f:0.5},
  {name:"Carrots (raw)",serv:"1 cup",cal:52,p:1.2,c:12,f:0.3},
  {name:"Corn",serv:"1 cup",cal:143,p:5,c:31,f:2.2},
  {name:"Avocado",serv:"1/2 fruit",cal:120,p:1.5,c:6,f:11},
  {name:"Olives",serv:"10 olives",cal:50,p:0.4,c:2.7,f:4.6},
  {name:"Olive oil",serv:"1 tbsp",cal:119,p:0,c:0,f:14},
  {name:"Almonds",serv:"1 oz (23)",cal:164,p:6,c:6,f:14},
  {name:"Walnuts",serv:"1 oz",cal:185,p:4.3,c:3.9,f:18.5},
  {name:"Pistachios",serv:"1 oz",cal:159,p:5.7,c:8,f:12.8},
  {name:"Cashews",serv:"1 oz",cal:157,p:5,c:9,f:12},
  {name:"Peanut butter",serv:"2 tbsp",cal:188,p:8,c:6,f:16},
  {name:"Banana",serv:"1 medium",cal:105,p:1.3,c:27,f:0.4},
  {name:"Apple",serv:"1 medium",cal:95,p:0.5,c:25,f:0.3},
  {name:"Orange",serv:"1 medium",cal:62,p:1.2,c:15,f:0.2},
  {name:"Blueberries",serv:"1 cup",cal:84,p:1.1,c:21,f:0.5},
  {name:"Strawberries",serv:"1 cup",cal:49,p:1,c:12,f:0.5},
  {name:"Grapes",serv:"1 cup",cal:104,p:1.1,c:27,f:0.2},
  {name:"Milk 2%",serv:"1 cup",cal:122,p:8,c:12,f:4.8},
  {name:"Protein shake (whey)",serv:"1 scoop",cal:120,p:24,c:3,f:1.5},
  {name:"Protein bar",serv:"1 bar",cal:200,p:20,c:22,f:7},
  {name:"Turkey breast (deli)",serv:"2 oz",cal:60,p:11,c:2,f:1},
  {name:"Ham (deli)",serv:"2 oz",cal:73,p:10,c:1.5,f:3},
  {name:"Honey",serv:"1 tbsp",cal:64,p:0,c:17,f:0}
];
function dbLookup(name){
  const n=name.toLowerCase().trim();
  return FOOD_DB.find(f=>f.name.toLowerCase()===n)
      || FOOD_DB.find(f=>f.name.toLowerCase().includes(n)||n.includes(f.name.toLowerCase().split(' (')[0]));
}
/* starter kitchen — a broad, everyday set */
const STARTER_PANTRY=[
  "Greek yogurt (nonfat)","Eggs (large)","Chicken breast (grilled)","Ground beef 90/10 (cooked)","Salmon (baked)",
  "Tuna (canned in water)","Black beans (cooked)","Quinoa (cooked)","Brown rice (cooked)","Pasta (cooked)",
  "Whole wheat bread","Flour tortilla","Cheddar cheese","Olive oil","Peanut butter","Spinach (raw)","Broccoli",
  "Tomato","Bell pepper","Avocado","Almonds","Banana","Apple","Blueberries","Oats (dry)","Milk 2%"
].map(nm=>{const d=dbLookup(nm);return {name:d.name,serv:d.serv,cal:d.cal,p:d.p,c:d.c,f:d.f,qty:6};});

/* ---------- Food categorization ---------- */
function foodCat(f){
  const n=f.name.toLowerCase();
  const pDens=f.cal?(f.p*4)/f.cal:0, cDens=f.cal?(f.c*4)/f.cal:0, fDens=f.cal?(f.f*9)/f.cal:0;
  if(/apple|banana|orange|berr|grape|melon|peach|pear|fig|fruit/.test(n))return 'fruit';
  if(/oat|granola|cereal|pancake/.test(n))return 'breakfast';
  if(/spinach|kale|broccoli|pepper|tomato|cucumber|carrot|zucchini|eggplant|salad|greens|lettuce|onion|green bean|mixed veg|corn|veg/.test(n))return 'veg';
  if(/chicken|salmon|tuna|beef|turkey|pork|shrimp|tofu|fish|cod|tilapia|sardine|edamame|egg|yogurt|cottage|protein|bean|lentil|chickpea|ham|deli/.test(n))return 'protein';
  if(/rice|quinoa|pasta|noodle|farro|bulgur|couscous|bread|pita|potato|tortilla|bagel|muffin|grain|cracker|rice cake/.test(n))return 'grain';
  if(/oil|almond|walnut|pistachio|cashew|peanut|nut|avocado|olive|butter|cheese/.test(n))return 'fat';
  if(pDens>=0.35&&f.p>=8)return 'protein';
  if(fDens>=0.5)return 'fat';
  if(cDens>=0.5)return 'grain';
  return 'veg';
}

/* ---------- Meal templates (all cuisines) ---------- */
const R={
  mainprot:s=>s.cat==='protein'&&!/yogurt|cottage|egg|milk|shake|hummus/.test(s.n),
  fish:s=>/salmon|cod|tuna|sardine|shrimp|mackerel|trout|fish|tilapia/.test(s.n),
  eggs:s=>/egg/.test(s.n),
  yogurt:s=>/yogurt|cottage/.test(s.n),
  legume:s=>/lentil|chickpea|bean|edamame/.test(s.n),
  grain:s=>s.cat==='grain',
  pasta:s=>/pasta|noodle|spaghetti|macaroni/.test(s.n),
  bread:s=>/bread|pita|toast|bagel|tortilla|wrap|bun|roll|muffin/.test(s.n),
  oats:s=>/oat|granola|cereal/.test(s.n),
  veg:s=>s.cat==='veg',
  fruit:s=>s.cat==='fruit',
  nuts:s=>/almond|walnut|pistachio|cashew|pecan|peanut|nut|seed/.test(s.n),
  pb:s=>/peanut butter|almond butter|nut butter/.test(s.n),
  cheese:s=>/cheese|feta|mozzarella/.test(s.n),
  hummus:s=>/hummus/.test(s.n),
  avocado:s=>/avocado/.test(s.n),
  oil:s=>/oil/.test(s.n),
  crackers:s=>/cracker|rice cake|pretzel|chip/.test(s.n),
  shake:s=>/shake|whey|milk/.test(s.n),
  anyprot:s=>s.cat==='protein'&&!/hummus/.test(s.n)
};
const MEAL_TEMPLATES=[
  // breakfast
  {id:'yogurt_bowl',name:'Yogurt & Berry Bowl',emoji:'🍓',type:'breakfast',roles:[{m:R.yogurt,base:1,req:true},{m:R.fruit,base:1,req:true},{m:R.nuts,base:1},{m:R.oats,base:1}]},
  {id:'scramble',name:'Veggie Egg Scramble',emoji:'🍳',type:'breakfast',roles:[{m:R.eggs,base:2,req:true},{m:R.veg,base:1,req:true},{m:R.cheese,base:1},{m:R.bread,base:1}]},
  {id:'oatmeal',name:'Oatmeal & Fruit Bowl',emoji:'🥣',type:'breakfast',roles:[{m:R.oats,base:1,req:true},{m:R.fruit,base:1},{m:R.nuts,base:1},{m:R.yogurt,base:1}]},
  {id:'pb_oats',name:'Peanut Butter Banana Oatmeal',emoji:'🍌',type:'breakfast',roles:[{m:R.oats,base:1,req:true},{m:R.pb,base:1,req:true},{m:R.fruit,base:1}]},
  {id:'avotoast',name:'Avocado Toast & Eggs',emoji:'🥑',type:'breakfast',roles:[{m:R.bread,base:2,req:true},{m:R.avocado,base:1,req:true},{m:R.eggs,base:2}]},
  {id:'bagel_egg',name:'Breakfast Sandwich',emoji:'🥯',type:'breakfast',roles:[{m:R.bread,base:1,req:true},{m:R.eggs,base:2,req:true},{m:R.cheese,base:1}]},
  {id:'cereal',name:'Cereal & Fruit',emoji:'🥛',type:'breakfast',roles:[{m:R.oats,base:1,req:true},{m:R.shake,base:1},{m:R.fruit,base:1}]},
  // mains
  {id:'protein_bowl',name:'Protein & Grain Bowl',emoji:'🍚',type:'main',roles:[{m:R.mainprot,base:1,req:true},{m:R.grain,base:1,req:true},{m:R.veg,base:1,req:true},{m:R.oil,base:1},{m:R.cheese,base:1}]},
  {id:'fish_plate',name:'Baked Fish Plate',emoji:'🐟',type:'main',roles:[{m:R.fish,base:1,req:true},{m:R.grain,base:1},{m:R.veg,base:1,req:true},{m:R.oil,base:1}]},
  {id:'legume_bowl',name:'Grain & Bean Bowl',emoji:'🫘',type:'main',roles:[{m:R.legume,base:1,req:true},{m:R.grain,base:1},{m:R.veg,base:1,req:true},{m:R.oil,base:1}]},
  {id:'stirfry',name:'Veggie Stir-Fry',emoji:'🥘',type:'main',roles:[{m:R.mainprot,base:1,req:true},{m:R.veg,base:2,req:true},{m:R.grain,base:1}]},
  {id:'pasta',name:'Pasta with Protein',emoji:'🍝',type:'main',roles:[{m:R.pasta,base:1,req:true},{m:R.anyprot,base:1,req:true},{m:R.veg,base:1},{m:R.cheese,base:1}]},
  {id:'burrito',name:'Burrito Bowl',emoji:'🌯',type:'main',roles:[{m:R.mainprot,base:1,req:true},{m:R.grain,base:1,req:true},{m:R.legume,base:1},{m:R.cheese,base:1},{m:R.veg,base:1}]},
  {id:'sandwich',name:'Protein Sandwich',emoji:'🥪',type:'main',roles:[{m:R.bread,base:2,req:true},{m:R.anyprot,base:1,req:true},{m:R.cheese,base:1},{m:R.veg,base:1}]},
  {id:'salad_main',name:'Big Protein Salad',emoji:'🥗',type:'main',roles:[{m:R.veg,base:2,req:true},{m:R.anyprot,base:1,req:true},{m:R.cheese,base:1},{m:R.oil,base:1}]},
  {id:'wrap',name:'Loaded Wrap',emoji:'🌮',type:'main',roles:[{m:R.bread,base:1,req:true},{m:R.anyprot,base:1,req:true},{m:R.veg,base:1},{m:R.cheese,base:1}]},
  // snacks
  {id:'fruit_nuts',name:'Fruit & Nuts',emoji:'🍎',type:'snack',roles:[{m:R.fruit,base:1,req:true},{m:R.nuts,base:1,req:true}]},
  {id:'yogurt_fruit',name:'Yogurt & Fruit',emoji:'🍏',type:'snack',roles:[{m:R.yogurt,base:1,req:true},{m:R.fruit,base:1}]},
  {id:'pb_toast',name:'Peanut Butter Toast',emoji:'🍞',type:'snack',roles:[{m:R.bread,base:1,req:true},{m:R.pb,base:1,req:true}]},
  {id:'apple_pb',name:'Apple & Peanut Butter',emoji:'🍎',type:'snack',roles:[{m:R.fruit,base:1,req:true},{m:R.pb,base:1,req:true}]},
  {id:'cheese_crackers',name:'Cheese & Crackers',emoji:'🧀',type:'snack',roles:[{m:R.cheese,base:1,req:true},{m:R.crackers,base:1,req:true}]},
  {id:'hummus_veg',name:'Hummus & Veggies',emoji:'🥕',type:'snack',roles:[{m:R.hummus,base:1,req:true},{m:R.veg,base:1,req:true}]},
  {id:'cheese_fruit',name:'Cheese & Fruit',emoji:'🧀',type:'snack',roles:[{m:R.cheese,base:1,req:true},{m:R.fruit,base:1,req:true}]},
  {id:'shake',name:'Protein Shake',emoji:'🥤',type:'snack',roles:[{m:R.shake,base:1,req:true},{m:R.fruit,base:1}]},
  {id:'protein_bar',name:'Protein Bar & Fruit',emoji:'🍫',type:'snack',roles:[{m:s=>/protein bar/.test(s.n),base:1,req:true},{m:R.fruit,base:1}]}
];
const SLOTMETA={breakfast:{l:'Breakfast',e:'🍳'},snack1:{l:'Morning Snack',e:'🍎'},lunch:{l:'Lunch',e:'🥗'},snack2:{l:'Afternoon Snack',e:'🥜'},dinner:{l:'Dinner',e:'🍽️'},snack3:{l:'Evening Snack',e:'🌙'}};
const SLOT_ORDER=['breakfast','snack1','lunch','snack2','dinner','snack3'];

/* ---------- Workouts ---------- */
const WORKOUTS={
  strength:[
    {id:"s1",title:"Upper Body Push",sub:"Push-ups · Shoulder press · Tricep dips",emoji:"💪"},
    {id:"s2",title:"Lower Body & Glutes",sub:"Squats · Lunges · Glute bridges",emoji:"🦵"},
    {id:"s3",title:"Core & Abs",sub:"Plank · Crunches · Russian twists",emoji:"✨"},
    {id:"s4",title:"Full Body Dumbbell",sub:"Rows · Goblet squats · Curls",emoji:"🏋️"},
    {id:"s5",title:"Back & Biceps",sub:"Rows · Pull-aparts · Curls",emoji:"🌟"}
  ],
  cardio:[
    {id:"c1",title:"Brisk Walk",sub:"20–30 min · easy pace",emoji:"🚶‍♀️"},
    {id:"c2",title:"Jog / Run",sub:"15–25 min · steady",emoji:"🏃‍♀️"},
    {id:"c3",title:"HIIT Burst",sub:"15 min · 30s on / 30s off",emoji:"🔥"},
    {id:"c4",title:"Cycling",sub:"20–40 min · bike or stationary",emoji:"🚴‍♀️"},
    {id:"c5",title:"Dance Cardio",sub:"20 min · fun & sweaty",emoji:"💃"}
  ]
};

/* ---------- Baby activity library ---------- */
const BABY_BANDS=[
  {min:0,max:6,label:"0–6 months",acts:[
    {t:"Tummy time play",e:"🤸",w:"Builds neck & core strength"},{t:"Talk & narrate your day",e:"🗣️",w:"Early language exposure"},
    {t:"High-contrast book or cards",e:"⬛",w:"Visual development"},{t:"Gentle rattle tracking",e:"🔔",w:"Eye tracking & hearing"},
    {t:"Skin-to-skin cuddles",e:"🤱",w:"Bonding & regulation"},{t:"Sing lullabies",e:"🎵",w:"Soothing & rhythm"},
    {t:"Mirror time",e:"🪞",w:"Self-recognition"},{t:"Reach for a dangling toy",e:"🧸",w:"Hand-eye coordination"}]},
  {min:6,max:12,label:"6–12 months",acts:[
    {t:"Peekaboo",e:"🙈",w:"Object permanence"},{t:"Stack & knock soft blocks",e:"🧱",w:"Cause & effect"},
    {t:"Practice sitting & reaching",e:"🪑",w:"Balance & core"},{t:"Finger foods to self-feed",e:"🍌",w:"Pincer grasp"},
    {t:"Read a board book together",e:"📖",w:"Language & focus"},{t:"Roll a ball back & forth",e:"⚽",w:"Turn-taking & motor"},
    {t:"Name objects as you point",e:"👉",w:"Vocabulary"},{t:"Bang pots & make sounds",e:"🥁",w:"Cause & effect, joy"}]},
  {min:12,max:15,label:"12–15 months",acts:[
    {t:"Stack 2–3 soft blocks",e:"🧱",w:"Fine motor & cause-effect"},{t:"Name body parts together",e:"👃",w:"Language & body awareness"},
    {t:"Read a picture book & point",e:"📖",w:"Vocabulary & attention"},{t:"Fill & dump containers",e:"🪣",w:"Spatial skills & motor"},
    {t:"Practice walking to you",e:"🚶",w:"Gross motor & confidence"},{t:"Roll or toss a soft ball",e:"⚽",w:"Coordination & turn-taking"},
    {t:"Dance to music together",e:"🎵",w:"Rhythm & bonding"},{t:"Scribble with chunky crayons",e:"🖍️",w:"Pre-writing grip"},
    {t:"Hide a toy & find it",e:"🔍",w:"Object permanence"},{t:"Self-feed finger foods",e:"🍌",w:"Independence & pincer grasp"}]},
  {min:15,max:18,label:"15–18 months",acts:[
    {t:"Imitate simple words",e:"🗣️",w:"Expressive language"},{t:"Point to pictures when named",e:"🖼️",w:"Receptive language"},
    {t:"Push/pull a toy while walking",e:"🛒",w:"Gross motor"},{t:"Nest & stack cups",e:"🥤",w:"Size & sequencing"},
    {t:"Make animal sounds together",e:"🐮",w:"Sound play & language"},{t:"Simple shape sorter",e:"🔺",w:"Problem solving"},
    {t:"Blow bubbles & chase them",e:"🫧",w:"Tracking & joy"},{t:"Help turn book pages",e:"📚",w:"Fine motor & routines"},
    {t:"Hand you objects on request",e:"🤲",w:"Following directions"},{t:"Climb on/off a low cushion",e:"🛋️",w:"Coordination & balance"}]},
  {min:18,max:24,label:"18–24 months",acts:[
    {t:"Pretend play (feed a doll)",e:"🍼",w:"Imagination & empathy"},{t:"Try two-word phrases",e:"💬",w:"Sentence building"},
    {t:"Sort objects by color",e:"🌈",w:"Categorizing"},{t:"Kick a ball forward",e:"⚽",w:"Gross motor"},
    {t:"Put a toy in its bin",e:"🧺",w:"Simple chores & routine"},{t:"Draw lines & circles",e:"✏️",w:"Pre-writing"},
    {t:"Build a 4–6 block tower",e:"🧱",w:"Fine motor & focus"},{t:"Name familiar objects",e:"🔑",w:"Vocabulary"},
    {t:"Songs with hand motions",e:"🎶",w:"Memory & coordination"},{t:"Jump with both feet",e:"🦘",w:"Balance & strength"}]},
  {min:24,max:36,label:"2–3 years",acts:[
    {t:"Match shapes & colors",e:"🟦",w:"Visual matching"},{t:"Count objects to 3–5",e:"🔢",w:"Early math"},
    {t:"Two-to-three word sentences",e:"🗨️",w:"Language growth"},{t:"Simple 3–4 piece puzzle",e:"🧩",w:"Problem solving"},
    {t:"Throw & catch a large ball",e:"🤾",w:"Coordination"},{t:"Pretend cooking play",e:"🍳",w:"Imaginative play"},
    {t:"Sort big vs small",e:"🪣",w:"Comparing concepts"},{t:"Listen to a short story",e:"📖",w:"Attention & vocab"},
    {t:"Stand on one foot",e:"🦩",w:"Balance"},{t:"Follow a 2-step instruction",e:"📋",w:"Memory & listening"}]}
];

/* ---------- Reflection prompts ---------- */
const REVIEW_PROMPTS=[
  "What's one thing your body did for you this week that you're grateful for?",
  "Where did you feel most energized this week — and what made that possible?",
  "What drained you this week, and what's one small boundary that could protect your energy next week?",
  "How did you nourish yourself this week — with food, rest, or movement? What felt good?",
  "What's a moment this week you felt proud of, even a tiny one?",
  "How did you handle stress this week? What helped you reset?",
  "What did your sleep and rest look like, and how did it affect the rest of your days?",
  "Which relationships or moments filled your cup this week?",
  "What's one habit you want to be gentler about, and one you want to lean into next week?",
  "If next week could feel one specific way, what word would you choose — and what would help you get there?",
  "What did movement feel like in your body this week? Playful, hard, skipped, energizing?",
  "What's something you learned about yourself this week?"
];

/* ---------- State ---------- */
const DEFAULT_STATE={
  profile:{name:"",goals:{cal:2000,p:120,c:220,f:70},waterGoal:64,sonName:"Lucas",sonDob:"2025-04-17",openaiKey:""},
  foodLog:{}, workoutLog:{}, events:[], favMeals:[], water:{}, babyLog:{},
  pantry:[], mealPlan:{}, reviews:{}, games:{}
};
let state=load();
let view={month:new Date().getMonth(),year:new Date().getFullYear(),workoutTab:"strength",date:todayStr()};
function load(){
  try{const s=JSON.parse(localStorage.getItem("bloom_state"));
    if(!s)return structuredClone(DEFAULT_STATE);
    return {...structuredClone(DEFAULT_STATE),...s,profile:{...DEFAULT_STATE.profile,...(s.profile||{}),goals:{...DEFAULT_STATE.profile.goals,...((s.profile||{}).goals||{})}}};}
  catch(e){return structuredClone(DEFAULT_STATE);}
}
function save(){localStorage.setItem("bloom_state",JSON.stringify(state));}

/* ---------- Navigation ---------- */
function go(screen){
  if(typeof stopActiveGame==='function')stopActiveGame();
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.querySelectorAll(".nav button").forEach(b=>b.classList.remove("active"));
  document.getElementById("screen-"+screen).classList.add("active");
  document.getElementById("nav-"+screen).classList.add("active");
  window.scrollTo(0,0);
  if(screen==="today")renderToday();
  if(screen==="plan")renderPlanScreen();
  if(screen==="kitchen")renderKitchen();
  if(screen==="workouts")renderWorkouts();
  if(screen==="calendar")renderCalendar();
  if(screen==="baby")renderBaby();
  if(screen==="review")renderReview();
  if(screen==="games"&&typeof renderGames==='function')renderGames();
}

/* ---------- Date navigator ---------- */
function dateNavHTML(){
  const isToday=view.date===todayStr();
  const d=new Date(view.date+"T00:00");
  const lbl=d.toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});
  return `<button class="arr" onclick="shiftDate(-1)">‹</button>
    <div class="lbl">${lbl}<small>${isToday?'TODAY':'tap to jump to today'}</small></div>
    <button class="arr" onclick="shiftDate(1)">›</button>`;
}
function paintDateNavs(){
  ["planDateNav","moveDateNav","babyDateNav"].forEach(id=>{const el=document.getElementById(id);if(el){el.innerHTML=dateNavHTML();el.onclick=e=>{if(e.target.classList.contains('lbl')||e.target.tagName==='SMALL'){jumpToday();}};}});
}
function shiftDate(n){const d=new Date(view.date+"T00:00");d.setDate(d.getDate()+n);view.date=dstr(d);refreshDated();}
function jumpToday(){view.date=todayStr();refreshDated();}
function refreshDated(){
  const active=document.querySelector(".screen.active").id;
  paintDateNavs();
  if(active==="screen-plan")renderPlanScreen();
  if(active==="screen-workouts")renderWorkouts();
  if(active==="screen-baby")renderBaby();
}

/* ---------- TODAY ---------- */
function renderToday(){
  const h=new Date().getHours();
  const name=state.profile.name?", "+state.profile.name:"";
  document.getElementById("greet").textContent=(h<12?"Good morning":h<18?"Good afternoon":"Good evening")+name;
  renderMondayBanner();
  const streak=calcStreak();
  document.getElementById("streakDays").textContent=streak;
  document.getElementById("streakMsg").textContent=streak===0?"Let's get moving today! 💪":streak<3?"Great start — keep it going! 🌱":streak<7?"You're on a roll! 🌸":"Incredible consistency! 👑";
  renderRings(todayStr());
  renderTodayPlan();
  renderWater("waterToday",todayStr());
  renderTodayWorkouts();
  renderTodayBaby();
  renderTodayEvents();
}
function dayTotals(date){
  const log=state.foodLog[date]||[];
  return log.reduce((a,f)=>({cal:a.cal+f.cal*f.qty,p:a.p+f.p*f.qty,c:a.c+f.c*f.qty,f:a.f+f.f*f.qty}),{cal:0,p:0,c:0,f:0});
}
function ring(label,val,goal,color,unit){
  const pct=Math.min(100,goal?(val/goal)*100:0);
  const r=25,circ=2*Math.PI*r,off=circ-(pct/100)*circ;
  return `<div class="ring-wrap"><div class="ring"><svg width="60" height="60">
    <circle cx="30" cy="30" r="${r}" stroke="#ffe6f2" stroke-width="7" fill="none"/>
    <circle cx="30" cy="30" r="${r}" stroke="${color}" stroke-width="7" fill="none" stroke-dasharray="${circ}" stroke-dashoffset="${off}" stroke-linecap="round"/>
    </svg><div class="val">${fmt(val)}${unit}</div></div>
    <div class="ring-label">${label}</div><div class="ring-sub">/ ${goal}${unit}</div></div>`;
}
function renderRings(date){
  const t=dayTotals(date),g=state.profile.goals;
  document.getElementById("macroRings").innerHTML=
    ring("Calories",t.cal,g.cal,"var(--pink-500)","")+ring("Protein",t.p,g.p,"var(--mint)","g")+
    ring("Carbs",t.c,g.c,"var(--lav)","g")+ring("Fat",t.f,g.f,"var(--peach)","g");
}
function renderTodayPlan(){
  const plan=state.mealPlan[todayStr()];
  const box=document.getElementById("todayPlan");
  if(!state.pantry.length){
    box.innerHTML=`<div class="empty-state" style="padding:14px"><div class="big">🥫</div>Add what's in your kitchen to auto-build a plan.
      <div style="margin-top:10px"><button class="btn-mini" onclick="go('kitchen')">Set up kitchen</button></div></div>`;return;
  }
  if(!plan||!plan.meals||!plan.meals.length){
    box.innerHTML=`<div class="item"><div><div style="font-weight:800;color:var(--plum)">No plan yet for today</div><div class="meta">Auto-build from your kitchen</div></div><button class="btn-mini" onclick="go('plan')">Open 🍽️</button></div>`;return;
  }
  const done=plan.meals.filter(m=>m.done).length;
  box.innerHTML=`<div class="item"><div><div style="font-weight:800;color:var(--plum)">${done} of ${plan.meals.length} meals eaten</div>
    <div class="meta">Planned: ${fmt(planTotals(plan).cal)} cal · ${fmt(planTotals(plan).p)}g protein</div></div>
    <button class="btn-mini" onclick="go('plan')">Open 🍽️</button></div>`;
}
function renderTodayWorkouts(){
  const done=state.workoutLog[todayStr()]||[];const all=[...WORKOUTS.strength,...WORKOUTS.cardio];
  let html=done.map(id=>{const w=all.find(x=>x.id===id);if(!w)return"";
    return `<div class="check-card done"><div class="check-box">✓</div><div><div class="title">${w.emoji} ${w.title}</div><div class="sub">Completed today 🎉</div></div></div>`;}).join("");
  html+=`<button class="btn-ghost" style="margin-top:6px" onclick="go('workouts')">${done.length?"Add another workout ✨":"Pick today's workout 💖"}</button>`;
  document.getElementById("todayWorkouts").innerHTML=html;
}
function renderTodayBaby(){
  const acts=babyActivities(todayStr());const done=state.babyLog[todayStr()]||[];
  const n=acts.filter(a=>done.includes(a.id)).length;
  document.getElementById("todayBaby").innerHTML=`<div class="item"><div><div style="font-weight:800;color:var(--plum)">${n} of ${acts.length} done today</div>
    <div class="meta">${babyAgeLabel()} • play & learn together</div></div><button class="btn-mini" onclick="go('baby')">Open 🧸</button></div>`;
}
function renderTodayEvents(){
  const evs=state.events.filter(e=>e.date===todayStr()).sort((a,b)=>(a.time||"").localeCompare(b.time||""));
  document.getElementById("todayEvents").innerHTML=evs.length?evs.map(e=>`
    <div class="item"><div><span class="ev-tag ${e.type}">${e.type}</span>
      <div style="font-weight:800;color:var(--plum);margin-top:4px">${e.title}</div>${e.address?`<div class="meta">📍 ${e.address}</div>`:''}</div>
    <div class="meta">${e.time||"All day"}</div></div>`).join("")
    :`<div class="empty-state"><div class="big">🗓️</div>Nothing scheduled today.</div>`;
}
function renderMondayBanner(){
  const box=document.getElementById("mondayBanner");if(!box)return;
  const isMon=new Date().getDay()===1, wk=weekStart(todayStr());
  const done=state.reviews[wk]&&state.reviews[wk].reflection;
  box.innerHTML=(isMon&&!done)?`<div class="banner"><div class="big">🌱 Happy Monday${state.profile.name?', '+state.profile.name:''}!</div>
    <div class="sub">A fresh week is here. Take a moment for your weekly reflection — I'll share some encouragement for the week ahead.</div>
    <button onclick="go('review')">Start weekly review →</button></div>`:"";
}
function renderTodayLight(){renderRings(todayStr());renderTodayPlan();}

/* ---------- MEAL PLAN ---------- */
function planTotals(plan){
  return (plan.meals||[]).reduce((a,m)=>{(m.comps||[]).forEach(c=>{a.cal+=c.cal*c.servings;a.p+=c.p*c.servings;a.c+=c.c*c.servings;a.f+=c.f*c.servings;});return a;},{cal:0,p:0,c:0,f:0});
}
function isFavMeal(name){return (state.favMeals||[]).some(f=>f.name===name);}
function mealTotals(m){return m.comps.reduce((a,c)=>({cal:a.cal+c.cal*c.servings,p:a.p+c.p*c.servings,c:a.c+c.c*c.servings,f:a.f+c.f*c.servings}),{cal:0,p:0,c:0,f:0});}

function generatePlan(date){
  const G=state.profile.goals; const targCal=G.cal||2000, targP=G.p||120, fatGoal=G.f||70;
  const stock=state.pantry.filter(x=>(x.qty||0)>0&&(x.cal||x.p||x.c||x.f)).map(x=>({
    name:x.name,n:x.name.toLowerCase(),serv:x.serv||'1 serving',cal:x.cal,p:x.p,c:x.c,f:x.f,
    cat:foodCat(x),pDens:x.cal?(x.p*4)/x.cal:0,avail:Math.max(1,Math.floor(x.qty))}));
  if(!stock.length)return {gen:Date.now(),meals:[]};
  const dayIdx=Math.floor(new Date(date+'T00:00').getTime()/86400000);
  const rotate=arr=>arr.length?arr.slice(dayIdx%arr.length).concat(arr.slice(0,dayIdx%arr.length)):arr;
  const bestCand=(cands,used)=>cands.slice().sort((a,b)=>((used.has(a.name)?1:0)-(used.has(b.name)?1:0))||(b.pDens-a.pDens))[0];
  function buildFromTpl(tpl,used){
    const comps=[];
    for(const role of tpl.roles){
      const cands=stock.filter(s=>s.avail>=role.base&&role.m(s)&&!comps.some(c=>c.s===s));
      if(!cands.length){if(role.req)return null;else continue;}
      comps.push({s:bestCand(cands,used),servings:role.base,role});
    }
    const gotReq=tpl.roles.filter(r=>r.req).every(r=>comps.some(c=>c.role===r));
    return gotReq?{tpl,comps}:null;
  }
  function buildFromFav(fav){
    const comps=[];
    for(const fc of fav.comps){
      const s=stock.find(x=>x.name.toLowerCase()===fc.name.toLowerCase()&&x.avail>=1);
      if(!s)return null;
      comps.push({s,servings:Math.min(fc.servings||1,s.avail)});
    }
    return {tpl:{id:fav.id,name:fav.name,emoji:fav.emoji||'⭐',type:fav.type},comps};
  }
  const used=new Set(), usedTpl=new Set(), meals=[];
  const commit=(meal,slot)=>{ if(!meal)return false;
    meal.comps.forEach(c=>{c.s.avail-=c.servings;used.add(c.s.name);});
    usedTpl.add(meal.tpl.id);meal.slot=slot;meals.push(meal);return true;};
  function pickSlot(slot,type){
    const favs=(state.favMeals||[]).filter(f=>f.type===type&&!usedTpl.has(f.id));
    for(const f of favs){const m=buildFromFav(f);if(m)return commit(m,slot);}
    for(const t of rotate(MEAL_TEMPLATES.filter(t=>t.type===type&&!usedTpl.has(t.id)))){const m=buildFromTpl(t,used);if(m)return commit(m,slot);}
    for(const t of rotate(MEAL_TEMPLATES.filter(t=>t.type===type))){const m=buildFromTpl(t,used);if(m)return commit(m,slot);}
    return false;
  }
  pickSlot('breakfast','breakfast');pickSlot('lunch','main');pickSlot('dinner','main');pickSlot('snack1','snack');pickSlot('snack2','snack');
  if(!meals.length)return {gen:Date.now(),meals:[]};
  const allComps=()=>meals.flatMap(m=>m.comps);
  const totals=()=>allComps().reduce((a,c)=>({cal:a.cal+c.s.cal*c.servings,p:a.p+c.s.p*c.servings,c:a.c+c.s.c*c.servings,f:a.f+c.s.f*c.servings}),{cal:0,p:0,c:0,f:0});
  const CAP=3; let guard=0;
  while(totals().p<targP && guard++<120){
    const cands=allComps().filter(c=>c.s.cat==='protein'&&c.servings<CAP&&c.s.avail>0);
    if(!cands.length)break;
    const pick=cands.sort((a,b)=>b.s.pDens-a.s.pDens)[0];
    if(totals().cal+pick.s.cal>targCal+160&&totals().p>=targP*0.85)break;
    pick.servings++;pick.s.avail--;
  }
  guard=0;
  while(totals().cal<targCal-100&&guard++<160){
    const T=totals();
    const cands=allComps().filter(c=>c.s.cat!=='protein'&&c.servings<CAP&&c.s.avail>0&&T.cal+c.s.cal<=targCal+120);
    if(!cands.length){ if(pickSlot('snack3','snack'))continue; else break; }
    const pick=cands.sort((a,b)=>{const fa=(T.f<fatGoal*0.85&&a.s.cat==='fat')?-1:0, fb=(T.f<fatGoal*0.85&&b.s.cat==='fat')?-1:0;return (fa-fb)||(a.servings-b.servings)||(b.s.cal-a.s.cal);})[0];
    pick.servings++;pick.s.avail--;
  }
  return {gen:Date.now(),meals:meals.map((m,i)=>({
    id:'m'+Date.now()+'_'+i, slot:m.slot, name:m.tpl.name, emoji:m.tpl.emoji, type:m.tpl.type, tplId:m.tpl.id, done:false,
    comps:m.comps.map(c=>({name:c.s.name,serv:c.s.serv,cal:c.s.cal,p:c.s.p,c:c.s.c,f:c.s.f,servings:c.servings}))}))};
}
function ensurePlan(date){ if(!state.mealPlan[date]||!state.mealPlan[date].meals){state.mealPlan[date]=generatePlan(date);save();} return state.mealPlan[date]; }
function regeneratePlan(){
  if(!state.pantry.length){toast("Add kitchen items first 🥫");go('kitchen');return;}
  state.mealPlan[view.date]=generatePlan(view.date);
  syncPlanToLog(view.date);save();renderPlanScreen();
  if(view.date===todayStr())renderTodayLight();
  toast("Fresh plan ready 🍽️");
}
function renderPlanScreen(){
  paintDateNavs();
  const g=state.profile.goals;
  document.getElementById("planGoalCal").textContent=g.cal;
  document.getElementById("planGoalP").textContent=g.p;
  if(!state.pantry.length){
    document.getElementById("planSummary").innerHTML=`<div class="empty-state"><div class="big">🥫</div>Your kitchen is empty. Add what you have on hand and I'll build a plan that hits your targets.</div><button class="btn" onclick="go('kitchen')">🥫 Set up my kitchen</button>`;
    document.getElementById("planList").innerHTML="";return;
  }
  const plan=ensurePlan(view.date), t=planTotals(plan);
  document.getElementById("planSummary").innerHTML=`<div class="rings">${
    ring("Calories",t.cal,g.cal,"var(--pink-500)","")+ring("Protein",t.p,g.p,"var(--mint)","g")+
    ring("Carbs",t.c,g.c,"var(--lav)","g")+ring("Fat",t.f,g.f,"var(--peach)","g")}</div>`;
  const ordered=plan.meals.slice().sort((a,b)=>SLOT_ORDER.indexOf(a.slot)-SLOT_ORDER.indexOf(b.slot));
  let html=ordered.map(m=>{
    const mt=mealTotals(m), meta=SLOTMETA[m.slot]||{l:'Meal',e:'🍽️'}, fav=isFavMeal(m.name);
    const ings=m.comps.map(c=>`<div class="ing-line"><span>${c.servings>1?c.servings+' × ':''}${c.serv} ${c.name}</span><span class="ing-mac">${fmt(c.cal*c.servings)} cal</span></div>`).join("");
    return `<div class="card meal-card ${m.done?'done':''}">
      <div class="meal-hd"><div class="cb" onclick="toggleMealDone('${m.id}')">${m.done?'✓':''}</div>
        <div style="flex:1;min-width:0"><div class="meal-title">${m.emoji} ${m.name}</div>
          <div class="meal-slot">${meta.e} ${meta.l} · ${fmt(mt.cal)} cal · ${fmt(mt.p)}g protein</div></div>
        <div style="display:flex;gap:2px;flex-shrink:0">
          <button class="micon star ${fav?'on':''}" onclick="toggleFavMeal('${m.id}')" title="Keep in rotation">${fav?'★':'☆'}</button>
          <button class="micon" onclick="rerollMeal('${m.id}')" title="Swap this meal">🔄</button></div></div>
      <div class="ing">${ings}</div></div>`;
  }).join("");
  if(!plan.meals.length)html=`<div class="card empty-state"><div class="big">🤔</div>Couldn't build meals from the current kitchen — add a protein or two (chicken, eggs, yogurt, fish, beans), a grain (rice, pasta, bread), and some veg/fruit.</div>`;
  document.getElementById("planList").innerHTML=html;
}
function toggleMealDone(id){
  const plan=state.mealPlan[view.date];if(!plan)return;
  const m=plan.meals.find(x=>x.id===id);if(!m)return;
  m.done=!m.done; if(m.done)celebrate();
  syncPlanToLog(view.date);save();renderPlanScreen();
  if(view.date===todayStr())renderTodayLight();
}
function toggleFavMeal(id){
  const plan=state.mealPlan[view.date];if(!plan)return;
  const m=plan.meals.find(x=>x.id===id);if(!m)return;
  state.favMeals=state.favMeals||[];
  const i=state.favMeals.findIndex(f=>f.name===m.name);
  if(i>-1){state.favMeals.splice(i,1);toast("Removed from rotation");}
  else{state.favMeals.push({id:m.tplId||('fav_'+Date.now()),name:m.name,emoji:m.emoji,type:m.type,
    comps:m.comps.map(c=>({name:c.name,serv:c.serv,cal:c.cal,p:c.p,c:c.c,f:c.f,servings:c.servings}))});
    toast("★ Added to your rotation — I'll bring it back often");}
  save();renderPlanScreen();
}
function rerollMeal(id){
  const plan=state.mealPlan[view.date];if(!plan)return;
  const idx=plan.meals.findIndex(x=>x.id===id);if(idx<0)return;
  const m=plan.meals[idx];
  const spent={};
  plan.meals.forEach((mm,k)=>{if(k!==idx)mm.comps.forEach(c=>{spent[c.name.toLowerCase()]=(spent[c.name.toLowerCase()]||0)+c.servings;});});
  const stock=state.pantry.filter(x=>(x.qty||0)>0&&(x.cal||x.p||x.c||x.f)).map(x=>({
    name:x.name,n:x.name.toLowerCase(),serv:x.serv||'1 serving',cal:x.cal,p:x.p,c:x.c,f:x.f,
    cat:foodCat(x),pDens:x.cal?(x.p*4)/x.cal:0,avail:Math.max(0,Math.floor(x.qty)-(spent[x.name.toLowerCase()]||0))}));
  const tpls=MEAL_TEMPLATES.filter(t=>t.type===m.type&&t.id!==m.tplId);
  const start=Math.floor(Math.random()*Math.max(1,tpls.length));
  const order=tpls.slice(start).concat(tpls.slice(0,start));
  const bestCand=cands=>cands.slice().sort((a,b)=>b.pDens-a.pDens)[0];
  let built=null;
  for(const t of order){
    const comps=[];let ok=true;
    for(const role of t.roles){
      const cands=stock.filter(s=>s.avail>=role.base&&role.m(s)&&!comps.some(c=>c.s===s));
      if(!cands.length){if(role.req){ok=false;break;}else continue;}
      comps.push({s:bestCand(cands),servings:role.base});
    }
    if(ok&&comps.length)built={tpl:t,comps};
    if(built)break;
  }
  if(!built){toast("No other meal fits your kitchen for this slot 🤔");return;}
  plan.meals[idx]={id:m.id,slot:m.slot,name:built.tpl.name,emoji:built.tpl.emoji,type:built.tpl.type,tplId:built.tpl.id,done:false,
    comps:built.comps.map(c=>({name:c.s.name,serv:c.s.serv,cal:c.s.cal,p:c.s.p,c:c.s.c,f:c.s.f,servings:c.servings}))};
  syncPlanToLog(view.date);save();renderPlanScreen();
  if(view.date===todayStr())renderTodayLight();
  toast("Swapped 🔄");
}
function syncPlanToLog(date){
  const plan=state.mealPlan[date];if(!plan)return;
  const manual=(state.foodLog[date]||[]).filter(f=>!f.planItem);
  const fromPlan=[];
  (plan.meals||[]).filter(m=>m.done).forEach(m=>m.comps.forEach(c=>fromPlan.push({name:c.name,serv:c.serv,cal:c.cal,p:c.p,c:c.c,f:c.f,qty:c.servings,meal:m.slot,planItem:m.id})));
  state.foodLog[date]=[...manual,...fromPlan];
}

/* ---------- KITCHEN TAB ---------- */
function renderKitchen(){
  const dl=document.getElementById("foodDL");
  if(dl&&!dl.dataset.filled){dl.innerHTML=FOOD_DB.map(f=>`<option value="${f.name}">`).join("");dl.dataset.filled="1";}
  document.getElementById("kitchenCount").textContent=state.pantry.length?`(${state.pantry.length} item${state.pantry.length!==1?'s':''})`:"";
  renderPantryList();
}
function pantryAutofill(){
  const nm=document.getElementById("pa_name").value;const d=dbLookup(nm);
  if(d){document.getElementById("pa_serv").value=d.serv;document.getElementById("pa_cal").value=d.cal;
    document.getElementById("pa_p").value=d.p;document.getElementById("pa_c").value=d.c;document.getElementById("pa_f").value=d.f;}
}
function addPantryItem(){
  const g=id=>document.getElementById(id).value;
  const name=g("pa_name").trim();if(!name){toast("Add a food name 🥫");return;}
  let cal=+g("pa_cal"),p=+g("pa_p"),c=+g("pa_c"),f=+g("pa_f"),serv=g("pa_serv").trim();
  if(!cal&&!p&&!c&&!f){const d=dbLookup(name);if(d){cal=d.cal;p=d.p;c=d.c;f=d.f;serv=serv||d.serv;}}
  upsertPantry({name,serv:serv||"1 serving",cal,p,c,f,qty:Math.max(1,+g("pa_qty")||1)});
  toast("Added "+name+" 🥫");renderKitchen();
  ["pa_name","pa_serv","pa_cal","pa_p","pa_c","pa_f"].forEach(id=>{const e=document.getElementById(id);if(e)e.value="";});
  document.getElementById("pa_qty").value=4;
}
function upsertPantry(item){
  const i=state.pantry.findIndex(x=>x.name.toLowerCase()===item.name.toLowerCase());
  if(i>-1)state.pantry[i]={...state.pantry[i],...item}; else state.pantry.push(item);
  save();
}
function parseQtyLine(line){
  let m=line.match(/^(.*?)[\s,|]*[x×]\s*(\d+(?:\.\d+)?)\s*$/i)||line.match(/^(.*?)[,|]\s*(\d+(?:\.\d+)?)\s*$/)||line.match(/^(.*?)\s+(\d+(?:\.\d+)?)\s*$/);
  if(m)return {name:m[1].trim(),qty:+m[2]};
  return {name:line.trim(),qty:4};
}
function importBulk(){
  const raw=document.getElementById("pa_bulk").value.split("\n").map(l=>l.trim()).filter(Boolean);
  let added=0,unknown=0;
  raw.forEach(line=>{const {name,qty}=parseQtyLine(line);if(!name)return;const d=dbLookup(name);
    if(d){upsertPantry({name:d.name,serv:d.serv,cal:d.cal,p:d.p,c:d.c,f:d.f,qty});added++;}
    else{upsertPantry({name:titleCase(name),serv:"1 serving",cal:0,p:0,c:0,f:0,qty});unknown++;}});
  document.getElementById("pa_bulk").value="";renderKitchen();
  toast(`Imported ${added+unknown} item${added+unknown!==1?'s':''}${unknown?` · ${unknown} need macros`:''} 🥫`);
}
function importCSV(ev){
  const file=ev.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const lines=e.target.result.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);let added=0;
    lines.forEach((line,idx)=>{const cols=line.split(",").map(s=>s.trim());
      if(idx===0&&/name/i.test(cols[0])&&isNaN(+cols[1]))return;
      const [name,qty,cal,p,c,f,serv]=cols;if(!name)return;
      let item={name:titleCase(name),qty:Math.max(1,+qty||4),cal:+cal||0,p:+p||0,c:+c||0,f:+f||0,serv:serv||"1 serving"};
      if(!item.cal&&!item.p){const d=dbLookup(name);if(d)item={...item,cal:d.cal,p:d.p,c:d.c,f:d.f,serv:d.serv};}
      upsertPantry(item);added++;});
    renderKitchen();toast(`Imported ${added} from CSV 🥫`);
  };
  reader.readAsText(file);
}
function loadStarter(){STARTER_PANTRY.forEach(it=>upsertPantry({...it}));renderKitchen();toast("Starter kitchen loaded 🧺");}
function renderPantryList(){
  const box=document.getElementById("pantryList");if(!box)return;
  if(!state.pantry.length){box.innerHTML=`<p class="muted" style="font-size:.8rem;padding:8px 2px">Nothing here yet — add items above, or load a starter kitchen.</p>`;return;}
  box.innerHTML=state.pantry.map((x,i)=>{const noMac=!(x.cal||x.p||x.c||x.f);
    return `<div class="item"><div style="min-width:0"><div style="font-weight:700;color:var(--plum)">${x.name}</div>
        <div class="meta">${x.serv} · ${noMac?'<span style="color:var(--pink-600)">tap – then re-add to set macros</span>':fmt(x.cal)+' cal · P'+fmt(x.p)+' C'+fmt(x.c)+' F'+fmt(x.f)}</div></div>
      <div style="display:flex;gap:4px;align-items:center">
        <button class="btn-mini" onclick="pantryQty(${i},1)">+</button>
        <span style="font-weight:800;color:var(--plum);min-width:20px;text-align:center">${x.qty}</span>
        <button class="btn-mini" onclick="pantryQty(${i},-1)">–</button>
        <button class="x" onclick="delPantry(${i})">×</button></div></div>`;}).join("");
}
function pantryQty(i,d){state.pantry[i].qty=Math.max(0,(state.pantry[i].qty||0)+d);if(state.pantry[i].qty===0)state.pantry.splice(i,1);save();renderKitchen();}
function delPantry(i){state.pantry.splice(i,1);save();renderKitchen();}

/* ---------- WATER ---------- */
function renderWater(containerId,date){
  const goal=state.profile.waterGoal||64,cupSize=8,cups=Math.ceil(goal/cupSize);
  const oz=state.water[date]||0,filled=Math.round(oz/cupSize);
  let cupHtml="";for(let i=0;i<cups;i++)cupHtml+=`<span class="cup ${i<filled?'full':''}" onclick="setWater('${date}',${(i+1)*cupSize})">🥤</span>`;
  document.getElementById(containerId).innerHTML=`<div class="water-stat">${oz} / ${goal} oz</div><div class="water-cups">${cupHtml}</div>
     <div class="row"><button class="btn-mini" onclick="addWater('${date}',8)">+8 oz</button><button class="btn-mini" onclick="addWater('${date}',16)">+16 oz</button><button class="btn-mini" onclick="addWater('${date}',-8)">–8 oz</button></div>`;
}
function addWater(date,oz){state.water[date]=Math.max(0,(state.water[date]||0)+oz);save();renderWater("waterToday",todayStr());}
function setWater(date,oz){const cur=state.water[date]||0;state.water[date]=(cur===oz)?oz-8:oz;if(state.water[date]<0)state.water[date]=0;save();renderWater("waterToday",date);}

/* ---------- WORKOUTS ---------- */
function setWorkoutTab(t){view.workoutTab=t;
  document.getElementById("seg-strength").classList.toggle("active",t==="strength");
  document.getElementById("seg-cardio").classList.toggle("active",t==="cardio");
  document.getElementById("workoutTitle").textContent=t==="strength"?"🏋️ Strength Workouts":"🏃‍♀️ Cardio Workouts";
  renderWorkouts();
}
function renderWorkouts(){
  paintDateNavs();
  const list=WORKOUTS[view.workoutTab],done=state.workoutLog[view.date]||[];
  document.getElementById("workoutList").innerHTML=list.map(w=>{const isDone=done.includes(w.id);
    return `<div class="check-card ${isDone?'done':''}" onclick="toggleWorkout('${w.id}')"><div class="check-box">${isDone?'✓':''}</div>
      <div style="flex:1"><div class="title">${w.emoji} ${w.title}</div><div class="sub">${w.sub}</div></div></div>`;}).join("");
  renderWeekDots();
}
function toggleWorkout(id){
  const d=view.date;state.workoutLog[d]=state.workoutLog[d]||[];
  const i=state.workoutLog[d].indexOf(id);
  if(i>-1)state.workoutLog[d].splice(i,1);else{state.workoutLog[d].push(id);celebrate();toast("Workout done! 🎉");}
  save();renderWorkouts();
}
function renderWeekDots(){
  const days=[],now=new Date();
  for(let i=6;i>=0;i--){const dt=new Date(now);dt.setDate(now.getDate()-i);const ds=dstr(dt);const has=(state.workoutLog[ds]||[]).length>0;
    days.push(`<div><div style="font-size:.66rem;font-weight:800;color:var(--ink-soft)">${['S','M','T','W','T','F','S'][dt.getDay()]}</div>
      <div style="width:34px;height:34px;border-radius:50%;margin:6px auto 0;display:grid;place-items:center;font-size:1.1rem;background:${has?'linear-gradient(135deg,var(--mint),var(--pink-400))':'var(--pink-100)'}">${has?'✓':''}</div></div>`);}
  document.getElementById("weekDots").innerHTML=days.join("");
}
function calcStreak(){let s=0;const now=new Date();
  for(let i=0;i<365;i++){const dt=new Date(now);dt.setDate(now.getDate()-i);const ds=dstr(dt);
    if((state.workoutLog[ds]||[]).length>0)s++;else if(i===0)continue;else break;}
  return s;}

/* ---------- CALENDAR ---------- */
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
function changeMonth(d){view.month+=d;if(view.month<0){view.month=11;view.year--;}if(view.month>11){view.month=0;view.year++;}renderCalendar();}
function renderCalendar(){
  document.getElementById("calMonth").textContent=MONTHS[view.month]+" "+view.year;
  const first=new Date(view.year,view.month,1).getDay(),days=new Date(view.year,view.month+1,0).getDate();
  let html=["S","M","T","W","T","F","S"].map(d=>`<div class="cal-dow">${d}</div>`).join("");
  for(let i=0;i<first;i++)html+=`<div class="cal-cell empty"></div>`;
  for(let d=1;d<=days;d++){const ds=`${view.year}-${pad(view.month+1)}-${pad(d)}`;
    const evs=state.events.filter(e=>e.date===ds);
    const dots=[...new Set(evs.map(e=>e.type))].map(t=>`<span class="dot ${t}"></span>`).join("");
    html+=`<div class="cal-cell ${ds===todayStr()?'today':''} ${evs.length?'has':''}" onclick="openDay('${ds}')">${d}<div class="dots">${dots}</div></div>`;}
  document.getElementById("calGrid").innerHTML=html;renderUpcoming();
}
function renderUpcoming(){
  const t=todayStr();
  const evs=state.events.filter(e=>e.date>=t).sort((a,b)=>(a.date+(a.time||"")).localeCompare(b.date+(b.time||""))).slice(0,6);
  document.getElementById("upcomingList").innerHTML=evs.length?evs.map(e=>`
    <div class="item"><div style="min-width:0"><span class="ev-tag ${e.type}">${e.type}</span>
      <div style="font-weight:800;color:var(--plum);margin-top:4px">${e.title}</div>
      <div class="meta">${prettyDate(e.date)} ${e.time?'· '+e.time:''}${e.address?' · 📍 '+e.address:''}</div></div>
      <button class="x" onclick="delEvent('${e.id}')">×</button></div>`).join(""):`<div class="empty-state"><div class="big">🗓️</div>No upcoming events.</div>`;
}
function prettyDate(ds){const d=new Date(ds+"T00:00");return d.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});}
function openDay(ds){
  const evs=state.events.filter(e=>e.date===ds).sort((a,b)=>(a.time||"").localeCompare(b.time||""));
  showModal(`<div class="grab"></div><h3>${prettyDate(ds)}</h3>${evs.length?evs.map(e=>eventDetail(e)).join(""):'<p class="muted" style="text-align:center;padding:14px">Nothing scheduled.</p>'}
    <button class="btn" style="margin-top:14px" onclick="openEvent('${ds}')">➕ Add event this day</button>`);
}
function eventDetail(e){
  const links=[];
  if(e.address)links.push(`<a class="linkbtn map" target="_blank" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(e.address)}">🧭 Directions & ETA</a>`);
  links.push(`<a class="linkbtn gcal" target="_blank" href="${gcalLink(e)}">📅 Add to Google Calendar</a>`);
  return `<div class="item" style="flex-direction:column;align-items:stretch;gap:6px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start">
      <div><span class="ev-tag ${e.type}">${e.type}</span><div style="font-weight:800;color:var(--plum);margin-top:4px">${e.title}</div>
        <div class="meta">${e.time||'All day'}${e.leadMins?' · leave reminder '+e.leadMins+' min before':''}</div>${e.address?`<div class="meta">📍 ${e.address}</div>`:''}</div>
      <button class="x" onclick="delEvent('${e.id}')">×</button></div><div>${links.join("")}</div></div>`;
}
function gcalLink(e){
  const start=(e.date.replace(/-/g,''))+(e.time?'T'+e.time.replace(':','')+'00':'');let endStr;
  if(e.time){const [hh,mm]=e.time.split(':').map(Number);const dt=new Date(e.date+'T'+e.time);dt.setHours(hh+1);endStr=e.date.replace(/-/g,'')+'T'+pad(dt.getHours())+pad(mm)+'00';}
  else endStr=e.date.replace(/-/g,'');
  const dates=e.time?`${start}/${endStr}`:`${start}/${start}`;
  const params=new URLSearchParams({action:'TEMPLATE',text:e.title,dates,details:'Added from Bloom 🌸',location:e.address||''});
  return 'https://calendar.google.com/calendar/render?'+params.toString();
}
function openEvent(ds){
  ds=ds||view.date||todayStr();
  showModal(`<div class="grab"></div><h3>Add event 🗓️</h3>
    <label>What is it?</label><input id="ev_title" placeholder="Work shift / Dr. appointment…"/>
    <label style="margin-top:10px">Type</label>
    <select id="ev_type"><option value="work">Work shift</option><option value="appt">Appointment</option><option value="health">Health / Doctor</option><option value="personal">Personal</option></select>
    <div class="row" style="margin-top:10px"><div><label>Date</label><input id="ev_date" type="date" value="${ds}"/></div><div><label>Time</label><input id="ev_time" type="time"/></div></div>
    <label style="margin-top:10px">Address (optional — enables directions & ETA)</label><input id="ev_addr" placeholder="123 Main St, Phoenix, AZ"/>
    <label style="margin-top:10px">Remind me to leave (minutes before)</label><input id="ev_lead" type="number" inputmode="numeric" value="30"/>
    <button class="btn" style="margin-top:16px" onclick="saveEvent()">Save 💖</button>
    <p class="muted" style="font-size:.74rem;margin-top:10px">Tip: after saving, tap the event and "Add to Google Calendar" for Google's native "time to leave" alert with live ETA. 🚗</p>`);
}
function saveEvent(){
  const g=id=>document.getElementById(id).value;
  const title=g("ev_title");if(!title){toast("Add a title first 💕");return;}
  state.events.push({id:Date.now()+"",title,type:g("ev_type"),date:g("ev_date"),time:g("ev_time"),address:g("ev_addr"),leadMins:+g("ev_lead")||0});
  save();closeModal();toast("Event added 🗓️");renderCalendar();renderToday();scheduleReminders();
}
function delEvent(id){state.events=state.events.filter(e=>e.id!==id);save();closeModal();renderCalendar();renderToday();}

/* ---------- BABY ---------- */
function ageMonthsAt(ds){
  const dob=new Date(state.profile.sonDob+"T00:00"),on=new Date(ds+"T00:00");
  let m=(on.getFullYear()-dob.getFullYear())*12+(on.getMonth()-dob.getMonth());
  if(on.getDate()<dob.getDate())m--;return Math.max(0,m);
}
function babyAgeLabel(){const m=ageMonthsAt(todayStr());if(m<24)return `${m} month${m===1?'':'s'} old`;const y=Math.floor(m/12),r=m%12;return `${y} yr${r?' '+r+' mo':''} old`;}
function bandFor(m){return BABY_BANDS.find(b=>m>=b.min&&m<b.max)||BABY_BANDS[BABY_BANDS.length-1];}
function babyActivities(ds){
  const m=ageMonthsAt(ds),band=bandFor(m),dayIndex=Math.floor(new Date(ds+"T00:00").getTime()/86400000);
  const n=Math.min(4,band.acts.length),picks=[];
  for(let i=0;i<n;i++){const a=band.acts[(dayIndex+i)%band.acts.length];picks.push({...a,id:band.label+":"+((dayIndex+i)%band.acts.length)});}
  return picks;
}
function renderBaby(){
  paintDateNavs();
  const m=ageMonthsAt(view.date),band=bandFor(m);
  document.getElementById("babyAge").innerHTML=`<div class="em">🧸</div><div><div class="big">${state.profile.sonName}</div><div class="lbl">${m} months • ${band.label} activities</div></div>`;
  const acts=babyActivities(view.date),done=state.babyLog[view.date]||[];
  document.getElementById("babyList").innerHTML=acts.map(a=>{const isDone=done.includes(a.id);
    return `<div class="check-card ${isDone?'done':''}" onclick="toggleBaby('${a.id.replace(/'/g,"\\'")}')"><div class="check-box">${isDone?'✓':''}</div>
      <div style="flex:1"><div class="title">${a.e} ${a.t}</div><div class="why">${a.w}</div></div></div>`;}).join("");
}
function toggleBaby(id){
  const d=view.date;state.babyLog[d]=state.babyLog[d]||[];
  const i=state.babyLog[d].indexOf(id);
  if(i>-1)state.babyLog[d].splice(i,1);else{state.babyLog[d].push(id);celebrate();toast("Yay! Great play time 💕");}
  save();renderBaby();
}

/* ---------- WEEKLY REVIEW ---------- */
function weekStart(ds){const d=new Date(ds+"T00:00");const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return dstr(d);}
function weekIndex(ds){return Math.floor(new Date(weekStart(ds)+"T00:00").getTime()/(7*86400000));}
function promptForWeek(ds){return REVIEW_PROMPTS[weekIndex(ds)%REVIEW_PROMPTS.length];}
const MOODS=[{e:"😞",v:1},{e:"😕",v:2},{e:"😐",v:3},{e:"🙂",v:4},{e:"😄",v:5}];
let reviewMood=0;
function renderReview(){
  const wk=weekStart(todayStr()),existing=state.reviews[wk]||{};
  document.getElementById("reviewWeekLbl").textContent=prettyDate(wk);
  document.getElementById("reviewPrompt").textContent=existing.prompt||promptForWeek(todayStr());
  document.getElementById("reviewText").value=existing.reflection||"";
  reviewMood=existing.mood||0;
  document.getElementById("moodRow").innerHTML=MOODS.map(m=>`<button class="${m.v===reviewMood?'on':''}" onclick="setMood(${m.v})">${m.e}</button>`).join("");
  document.getElementById("coachOut").innerHTML=existing.response?coachHTML(existing.response):"";
  renderPastReviews();
}
function setMood(v){reviewMood=v;document.querySelectorAll("#moodRow button").forEach((b,i)=>b.classList.toggle("on",MOODS[i].v===v));}
function coachHTML(resp){
  return `<div class="coach-box"><div class="hd">🌸 Your Bloom coach</div><p>${resp.message}</p>
    ${resp.suggestions&&resp.suggestions.length?`<div style="font-weight:800;color:#2f8f6f;font-size:.82rem;margin-bottom:2px">For next week:</div><ul>${resp.suggestions.map(s=>`<li>${s}</li>`).join("")}</ul>`:""}
    ${resp.source==='ai'?`<p class="muted" style="font-size:.68rem;margin:10px 0 0">✨ Generated with OpenAI</p>`:``}</div>`;
}
async function submitReview(){
  const wk=weekStart(todayStr());
  const text=document.getElementById("reviewText").value.trim();
  if(!text){toast("Write a little reflection first 💗");return;}
  const prompt=document.getElementById("reviewPrompt").textContent;
  state.reviews[wk]={prompt,reflection:text,mood:reviewMood,date:todayStr()};save();
  document.getElementById("coachOut").innerHTML=`<div class="coach-box"><div class="hd">🌸 Your Bloom coach</div><p class="muted">Thinking about your week… 💭</p></div>`;
  let resp;
  if(state.profile.openaiKey){try{resp=await aiCoach(text,prompt,reviewMood);}catch(e){resp=localCoach(text,reviewMood);}}
  else resp=localCoach(text,reviewMood);
  state.reviews[wk].response=resp;save();
  document.getElementById("coachOut").innerHTML=coachHTML(resp);celebrate();renderPastReviews();
}
function weekStats(){
  let workouts=0,proteinHit=0,waterHit=0;const now=new Date();
  for(let i=0;i<7;i++){const dt=new Date(now);dt.setDate(now.getDate()-i);const ds=dstr(dt);
    if((state.workoutLog[ds]||[]).length)workouts++;
    const t=dayTotals(ds);
    if(t.p>=(state.profile.goals.p||120)*0.9)proteinHit++;
    if((state.water[ds]||0)>=(state.profile.waterGoal||64)*0.9)waterHit++;}
  return {workouts,proteinHit,waterHit,streak:calcStreak()};
}
function localCoach(text,mood){
  const s=weekStats(),t=text.toLowerCase();
  const low=/tired|exhaust|stress|overwhelm|hard|struggl|anxious|sad|burnt|burned|rough|difficult|drain/.test(t)||(mood&&mood<=2);
  const high=/proud|great|good|energ|happy|strong|accomplish|win|progress|excited/.test(t)||mood>=4;
  let open;
  if(low)open=`Thank you for being honest about a heavier week — naming it takes real strength, and showing up here still counts. Be as kind to yourself as you'd be to a friend. 💗`;
  else if(high)open=`I love the energy in this reflection${state.profile.name?', '+state.profile.name:''} — you should genuinely feel good about where your head's at this week. 🌸`;
  else open=`Thanks for taking a few minutes to check in with yourself${state.profile.name?', '+state.profile.name:''}. That habit alone is quietly powerful. 🌱`;
  const wins=[];
  if(s.workouts>0)wins.push(`you moved your body on ${s.workouts} day${s.workouts>1?'s':''}`);
  if(s.streak>=3)wins.push(`you're on a ${s.streak}-day movement streak`);
  if(s.proteinHit>=3)wins.push(`you hit your protein target ${s.proteinHit} day${s.proteinHit>1?'s':''}`);
  if(s.waterHit>=4)wins.push(`your hydration was solid`);
  const winLine=wins.length?` Looking at your week: ${wins.slice(0,3).join(', ')} — that's real, keep it in view. `:` Even the small steps you took this week matter. `;
  const sug=[];
  if(s.workouts<3)sug.push(`Aim for 3 movement days — even a 20-minute walk counts. Pick the days now and add them to your calendar.`);
  else sug.push(`Keep your movement rhythm going; maybe swap one session for something playful you enjoy.`);
  if(s.proteinHit<4)sug.push(`Front-load protein: lean on eggs, Greek yogurt, chicken, and beans in your plan so ${state.profile.goals.p||120}g feels effortless.`);
  else sug.push(`Your protein game is strong — keep it up and let your meal plan do the planning for you.`);
  if(s.waterHit<4)sug.push(`Add one more glass of water in the morning — tie it to a habit you already have, like coffee.`);
  if(low)sug.push(`Protect one small pocket of rest this week that's just yours — no guilt attached.`);
  else sug.push(`Pick one thing from this reflection you want to carry forward and make it your gentle focus.`);
  return {message:open+winLine,suggestions:sug.slice(0,3),source:'local'};
}
async function aiCoach(text,prompt,mood){
  const s=weekStats();
  const sys=`You are a warm, encouraging health & wellness coach inside a personal app. Respond to the user's weekly reflection with gentle, sincere encouragement (no toxic positivity), then give 2-3 specific, doable suggestions for next week. Keep it personal and concise. Return ONLY JSON: {"message":"...","suggestions":["...","..."]}`;
  const ctx=`Prompt they answered: "${prompt}". Mood (1-5): ${mood||'n/a'}. This week's data: ${s.workouts} workout days, protein target hit ${s.proteinHit}/7 days, hydration good ${s.waterHit}/7 days, movement streak ${s.streak} days. Their reflection: "${text}"`;
  const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+state.profile.openaiKey},
    body:JSON.stringify({model:"gpt-4o-mini",temperature:0.8,response_format:{type:"json_object"},messages:[{role:"system",content:sys},{role:"user",content:ctx}]})});
  if(!r.ok)throw new Error("openai");
  const j=await r.json(),parsed=JSON.parse(j.choices[0].message.content);
  return {message:parsed.message,suggestions:parsed.suggestions||[],source:'ai'};
}
function renderPastReviews(){
  const wks=Object.keys(state.reviews).filter(w=>state.reviews[w].reflection).sort().reverse();
  const card=document.getElementById("pastReviewsCard"),cur=weekStart(todayStr()),past=wks.filter(w=>w!==cur);
  if(!past.length){card.style.display="none";return;}
  card.style.display="";
  document.getElementById("pastReviews").innerHTML=past.slice(0,8).map(w=>{const r=state.reviews[w],moodE=r.mood?MOODS[r.mood-1].e+' ':'';
    return `<div class="review-past"><div class="wk">${moodE}Week of ${prettyDate(w)}</div>
      <div class="muted" style="font-size:.8rem;margin:4px 0">${r.reflection.length>140?r.reflection.slice(0,140)+'…':r.reflection}</div>
      ${r.response?`<div style="font-size:.78rem;color:#2f8f6f">🌸 ${r.response.message.length>120?r.response.message.slice(0,120)+'…':r.response.message}</div>`:""}</div>`;}).join("");
}

/* ---------- SETTINGS ---------- */
function openSettings(){
  const g=state.profile.goals,p=state.profile;
  showModal(`<div class="grab"></div><h3>Settings ⚙️</h3>
    <label>Your name</label><input id="set_name" value="${p.name||''}" placeholder="Your name"/>
    <h3 style="font-size:1rem;margin:18px 0 10px">Daily goals 🎯</h3>
    <div class="row"><div><label>Calories</label><input id="set_cal" type="number" value="${g.cal}"/></div><div><label>Protein (g)</label><input id="set_p" type="number" value="${g.p}"/></div></div>
    <div class="row" style="margin-top:10px"><div><label>Carbs (g)</label><input id="set_c" type="number" value="${g.c}"/></div><div><label>Fat (g)</label><input id="set_f" type="number" value="${g.f}"/></div></div>
    <label style="margin-top:10px">Water goal (oz)</label><input id="set_water" type="number" value="${p.waterGoal}"/>
    <h3 style="font-size:1rem;margin:18px 0 10px">Kitchen 🥫</h3>
    <button class="btn-ghost" onclick="closeModal();go('kitchen')">🥫 Open my kitchen (${state.pantry.length} items)</button>
    <h3 style="font-size:1rem;margin:18px 0 10px">Little one 🧸</h3>
    <div class="row"><div><label>Name</label><input id="set_son" value="${p.sonName}"/></div><div><label>Birthday</label><input id="set_dob" type="date" value="${p.sonDob}"/></div></div>
    <h3 style="font-size:1rem;margin:18px 0 10px">AI coach ✨ (optional)</h3>
    <label>OpenAI API key — for live weekly encouragement</label><input id="set_openai" value="${p.openaiKey||''}" placeholder="sk-… (leave blank to use the built-in coach)"/>
    <p class="muted" style="font-size:.72rem;margin:6px 0 0">Optional. Without a key, Bloom's built-in coach still writes personalized encouragement offline.</p>
    <button class="btn" style="margin-top:16px" onclick="enableNotifications()">🔔 Enable reminders</button>
    <button class="btn" style="margin-top:10px" onclick="saveSettings()">Save 💖</button>
    <button class="btn-ghost" style="margin-top:10px" onclick="resetData()">Reset all data</button>`);
}
function saveSettings(){
  const g=id=>document.getElementById(id).value;
  state.profile.name=g("set_name");
  state.profile.goals={cal:+g("set_cal")||2000,p:+g("set_p")||120,c:+g("set_c")||220,f:+g("set_f")||70};
  state.profile.waterGoal=+g("set_water")||64;
  state.profile.sonName=g("set_son")||"Lucas";
  state.profile.sonDob=g("set_dob")||"2025-04-17";
  state.profile.openaiKey=g("set_openai").trim();
  save();closeModal();toast("Saved 💖");renderToday();
}
function resetData(){if(confirm("Erase all your Bloom data on this device?")){localStorage.removeItem("bloom_state");state=load();closeModal();go('today');}}

/* ---------- Notifications ---------- */
function enableNotifications(){
  if(!("Notification" in window)){toast("Notifications not supported here");return;}
  Notification.requestPermission().then(p=>{toast(p==="granted"?"Reminders on 🔔":"Reminders blocked");scheduleReminders();scheduleMondayPrompt();});
}
let reminderTimers=[];
function scheduleReminders(){
  reminderTimers.forEach(t=>clearTimeout(t));reminderTimers=[];
  if(!("Notification" in window)||Notification.permission!=="granted")return;
  const now=Date.now();
  state.events.filter(e=>e.date===todayStr()&&e.time).forEach(e=>{
    const evTime=new Date(e.date+"T"+e.time).getTime(),leaveAt=evTime-(e.leadMins||0)*60000;
    if(leaveAt>now&&leaveAt-now<24*3600*1000)reminderTimers.push(setTimeout(()=>{new Notification("🌸 Time to head out",{body:`${e.title} at ${e.time}${e.address?' · '+e.address:''}`});},leaveAt-now));
  });
}
let mondayTimer;
function scheduleMondayPrompt(){
  if(mondayTimer)clearTimeout(mondayTimer);
  if(!("Notification" in window)||Notification.permission!=="granted")return;
  const now=new Date(),next=new Date(now),daysToMon=((1-now.getDay())+7)%7;
  next.setDate(now.getDate()+daysToMon);next.setHours(9,0,0,0);
  if(next.getTime()<=now.getTime())next.setDate(next.getDate()+7);
  const ms=next.getTime()-now.getTime();
  if(ms<7*24*3600*1000)mondayTimer=setTimeout(()=>{const wk=weekStart(todayStr());
    if(!(state.reviews[wk]&&state.reviews[wk].reflection))new Notification("🌱 Weekly reflection time",{body:"A fresh week is here — take a few minutes for your Bloom weekly review."});
    scheduleMondayPrompt();},ms);
}

/* ---------- Modal + toast + confetti ---------- */
function showModal(html){document.getElementById("modalBody").innerHTML=html;document.getElementById("modalBg").classList.add("show");}
function closeModal(){document.getElementById("modalBg").classList.remove("show");}
let toastT;
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),1800);}
function celebrate(){
  const c=document.getElementById("confetti");c.style.display="block";c.width=innerWidth;c.height=innerHeight;
  const ctx=c.getContext("2d");const colors=["#ff7eb3","#ffb3d6","#c9a7f0","#7be0c3","#ffc59b","#fff"];
  const parts=Array.from({length:90},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*0.5,r:4+Math.random()*6,col:colors[Math.floor(Math.random()*colors.length)],vy:2+Math.random()*4,vx:-2+Math.random()*4,a:1}));
  let frame=0;
  (function anim(){ctx.clearRect(0,0,c.width,c.height);frame++;
    parts.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.vy+=0.05;if(frame>60)p.a-=0.02;ctx.globalAlpha=Math.max(0,p.a);ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill();});
    if(frame<120)requestAnimationFrame(anim);else{c.style.display="none";ctx.clearRect(0,0,c.width,c.height);}})();
}

/* ---------- Boot ---------- */
go('today');
scheduleReminders();
scheduleMondayPrompt();
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js',{updateViaCache:'none'}).then(reg=>{reg.update();}).catch(()=>{});
  let _reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(_reloaded)return;_reloaded=true;location.reload();});
}
