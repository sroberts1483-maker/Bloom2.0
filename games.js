/* ============================================================
   BLOOM — Games module. Self-contained, offline, touch-friendly.
   Each start(stage,ctrls,scoreEl) returns {stop()}.
   ============================================================ */
function hiScore(id,val){state.games=state.games||{};if(val>(state.games[id]||0)){state.games[id]=val;save();}}
function swipe(el,cb){
  let sx,sy;
  el.addEventListener('touchstart',e=>{const t=e.touches[0];sx=t.clientX;sy=t.clientY;},{passive:true});
  el.addEventListener('touchend',e=>{const t=e.changedTouches[0];const dx=t.clientX-sx,dy=t.clientY-sy;
    if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;cb(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));});
}

/* ---------------- TETRIS ---------------- */
function startTetris(stage,ctrls,scoreEl){
  const COLS=10,ROWS=18;
  const cvs=document.createElement('canvas');
  const W=Math.min(280,stage.clientWidth||280),cell=Math.floor(W/COLS);
  cvs.width=cell*COLS;cvs.height=cell*ROWS;cvs.style.cssText='background:#fff0f6;border-radius:12px;display:block;margin:0 auto;touch-action:none';
  stage.appendChild(cvs);const ctx=cvs.getContext('2d');
  const colors=['#ff7eb3','#c9a7f0','#7be0c3','#ffc59b','#9ad4f5','#ff5fa2','#8ab661'];
  const SHAPES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
  let grid=Array.from({length:ROWS},()=>Array(COLS).fill(0)),piece,px,py,score=0,over=false,drop;
  function newPiece(){const i=Math.floor(Math.random()*SHAPES.length);piece={m:SHAPES[i],c:i+1};px=Math.floor((COLS-piece.m[0].length)/2);py=0;if(collide(piece.m,px,py))over=true;}
  function collide(m,x,y){for(let r=0;r<m.length;r++)for(let c=0;c<m[r].length;c++){if(m[r][c]){const nx=x+c,ny=y+r;if(nx<0||nx>=COLS||ny>=ROWS)return true;if(ny>=0&&grid[ny][nx])return true;}}return false;}
  function merge(){piece.m.forEach((row,r)=>row.forEach((v,c)=>{if(v&&py+r>=0)grid[py+r][px+c]=piece.c;}));}
  function clearLines(){let n=0;for(let r=ROWS-1;r>=0;r--){if(grid[r].every(v=>v)){grid.splice(r,1);grid.unshift(Array(COLS).fill(0));n++;r++;}}if(n){score+=[0,40,100,300,1200][n];hiScore('tetris',score);}}
  function rotate(){const m=piece.m,nm=m[0].map((_,i)=>m.map(row=>row[i]).reverse());if(!collide(nm,px,py))piece.m=nm;}
  function move(dx){if(!collide(piece.m,px+dx,py))px+=dx;}
  function tick(){if(over)return;if(!collide(piece.m,px,py+1))py++;else{merge();clearLines();newPiece();}draw();}
  function hardDrop(){if(over)return;while(!collide(piece.m,px,py+1))py++;merge();clearLines();newPiece();draw();}
  function rr(c,r){ctx.fillRect(c*cell+1,r*cell+1,cell-2,cell-2);}
  function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)if(grid[r][c]){ctx.fillStyle=colors[grid[r][c]-1];rr(c,r);}
    if(!over&&piece)piece.m.forEach((row,r)=>row.forEach((v,c)=>{if(v){ctx.fillStyle=colors[piece.c-1];rr(px+c,py+r);}}));
    scoreEl.textContent=score+' pts';
    if(over){ctx.fillStyle='rgba(122,75,107,.85)';ctx.fillRect(0,cvs.height/2-30,cvs.width,60);ctx.fillStyle='#fff';ctx.font='bold 18px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',cvs.width/2,cvs.height/2+6);}
  }
  newPiece();draw();drop=setInterval(tick,600);
  const key=e=>{if(over)return;const k=e.key;if(k==='ArrowLeft'){move(-1);draw();}else if(k==='ArrowRight'){move(1);draw();}else if(k==='ArrowUp'){rotate();draw();}else if(k==='ArrowDown'){tick();}else if(k===' '){e.preventDefault();hardDrop();}};
  document.addEventListener('keydown',key);
  ctrls.innerHTML=`<div class="gpad"><button data-a="l">◀</button><button data-a="rot">⟳</button><button data-a="r">▶</button><button data-a="down">▼</button><button data-a="drop">⤓</button><button data-a="new">↺</button></div>`;
  ctrls.querySelectorAll('button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
    if(a==='new'){grid=Array.from({length:ROWS},()=>Array(COLS).fill(0));score=0;over=false;newPiece();draw();return;}
    if(over)return;if(a==='l')move(-1);if(a==='r')move(1);if(a==='rot')rotate();if(a==='down')tick();if(a==='drop')hardDrop();draw();});
  return {stop(){clearInterval(drop);document.removeEventListener('keydown',key);}};
}

/* ---------------- JUMP (flappy-style) ---------------- */
function startJump(stage,ctrls,scoreEl){
  const cvs=document.createElement('canvas');const W=Math.min(300,stage.clientWidth||300),H=420;
  cvs.width=W;cvs.height=H;cvs.style.cssText='background:linear-gradient(#bfe9ff,#eaf7ff);border-radius:12px;display:block;margin:0 auto;touch-action:none';
  stage.appendChild(cvs);const ctx=cvs.getContext('2d');
  let by,vy,pipes,score,over,started,raf,frame;
  const GR=0.5,FL=-7,GAP=135,PW=52,BX=64,BR=13;
  function reset(){by=H/2;vy=0;pipes=[];score=0;over=false;started=false;frame=0;}
  function flap(){if(over){reset();return;}started=true;vy=FL;}
  function step(){frame++;
    if(started&&!over){vy+=GR;by+=vy;
      if(frame%92===0)pipes.push({x:W,top:40+Math.random()*(H-GAP-120)});
      pipes.forEach(p=>p.x-=2.4);pipes=pipes.filter(p=>p.x+PW>0);
      pipes.forEach(p=>{if(!p.scored&&p.x+PW<BX){p.scored=true;score++;hiScore('jump',score);}});
      if(by+BR>H||by-BR<0)over=true;
      pipes.forEach(p=>{if(BX+BR>p.x&&BX-BR<p.x+PW&&(by-BR<p.top||by+BR>p.top+GAP))over=true;});}
    draw();raf=requestAnimationFrame(step);
  }
  function draw(){ctx.clearRect(0,0,W,H);
    ctx.fillStyle='#7be0c3';pipes.forEach(p=>{ctx.fillRect(p.x,0,PW,p.top);ctx.fillRect(p.x,p.top+GAP,PW,H-p.top-GAP);});
    ctx.fillStyle='#ff5fa2';ctx.beginPath();ctx.arc(BX,by,BR,0,7);ctx.fill();
    ctx.fillStyle='#7a4b6b';ctx.font='bold 22px sans-serif';ctx.textAlign='center';ctx.fillText(score,W/2,42);
    if(!started){ctx.font='bold 15px sans-serif';ctx.fillText('Tap to flap 🐤',W/2,H/2-30);}
    if(over){ctx.fillStyle='rgba(122,75,107,.82)';ctx.fillRect(0,H/2-34,W,68);ctx.fillStyle='#fff';ctx.font='bold 17px sans-serif';ctx.fillText('Game Over — tap',W/2,H/2+6);}
    scoreEl.textContent=score+' pts';
  }
  const tap=e=>{e.preventDefault();flap();};
  cvs.addEventListener('click',tap);cvs.addEventListener('touchstart',tap,{passive:false});
  const key=e=>{if(e.key===' '||e.key==='ArrowUp'){e.preventDefault();flap();}};
  document.addEventListener('keydown',key);
  ctrls.innerHTML=`<button class="btn" style="max-width:200px;margin:0 auto" id="flapBtn">🐤 Flap</button>`;
  ctrls.querySelector('#flapBtn').onclick=flap;
  reset();step();
  return {stop(){cancelAnimationFrame(raf);document.removeEventListener('keydown',key);}};
}

/* ---------------- SNAKE ---------------- */
function startSnake(stage,ctrls,scoreEl){
  const N=15;const cvs=document.createElement('canvas');const W=Math.min(300,stage.clientWidth||300),cell=Math.floor(W/N);
  cvs.width=cell*N;cvs.height=cell*N;cvs.style.cssText='background:#fff0f6;border-radius:12px;display:block;margin:0 auto;touch-action:none';
  stage.appendChild(cvs);const ctx=cvs.getContext('2d');
  let snake,dir,nd,food,score,over,timer;
  function reset(){snake=[{x:7,y:7}];dir={x:1,y:0};nd=dir;score=0;over=false;placeFood();draw();}
  function placeFood(){do{food={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)};}while(snake.some(s=>s.x===food.x&&s.y===food.y));}
  function tick(){if(over)return;dir=nd;const h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(s=>s.x===h.x&&s.y===h.y)){over=true;draw();return;}
    snake.unshift(h);if(h.x===food.x&&h.y===food.y){score++;hiScore('snake',score);placeFood();}else snake.pop();draw();}
  function draw(){ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.fillStyle='#ff5fa2';ctx.fillRect(food.x*cell+2,food.y*cell+2,cell-4,cell-4);
    snake.forEach((s,i)=>{ctx.fillStyle=i===0?'#7a4b6b':'#c9a7f0';ctx.fillRect(s.x*cell+1,s.y*cell+1,cell-2,cell-2);});
    scoreEl.textContent=score+' pts';
    if(over){ctx.fillStyle='rgba(122,75,107,.82)';ctx.fillRect(0,cvs.height/2-28,cvs.width,56);ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',cvs.width/2,cvs.height/2+5);}
  }
  function setDir(d){if(d==='up'&&dir.y===0)nd={x:0,y:-1};if(d==='down'&&dir.y===0)nd={x:0,y:1};if(d==='left'&&dir.x===0)nd={x:-1,y:0};if(d==='right'&&dir.x===0)nd={x:1,y:0};}
  const key=e=>{const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};if(m[e.key]){e.preventDefault();setDir(m[e.key]);}};
  document.addEventListener('keydown',key);swipe(cvs,setDir);
  ctrls.innerHTML=`<div class="gpad"><button data-d="left">◀</button><button data-d="up">▲</button><button data-d="down">▼</button><button data-d="right">▶</button><button data-d="new">↺</button></div>`;
  ctrls.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.d==='new')reset();else setDir(b.dataset.d);});
  reset();timer=setInterval(tick,145);
  return {stop(){clearInterval(timer);document.removeEventListener('keydown',key);}};
}

/* ---------------- 2048 ---------------- */
function start2048(stage,ctrls,scoreEl){
  let grid,score;
  const wrap=document.createElement('div');wrap.className='b2048';wrap.style.touchAction='none';stage.appendChild(wrap);
  function reset(){grid=Array.from({length:4},()=>Array(4).fill(0));score=0;add();add();draw();}
  function add(){const e=[];grid.forEach((r,i)=>r.forEach((v,j)=>{if(!v)e.push([i,j]);}));if(!e.length)return;const [i,j]=e[Math.floor(Math.random()*e.length)];grid[i][j]=Math.random()<0.9?2:4;}
  function slide(row){let a=row.filter(v=>v);for(let i=0;i<a.length-1;i++){if(a[i]===a[i+1]){a[i]*=2;score+=a[i];a.splice(i+1,1);}}while(a.length<4)a.push(0);return a;}
  function rot(n){for(let k=0;k<n;k++)grid=grid[0].map((_,c)=>grid.map(r=>r[c]).reverse());}
  function move(dir){const before=JSON.stringify(grid);
    if(dir==='up')rot(3);if(dir==='down')rot(1);if(dir==='right')rot(2);
    grid=grid.map(slide);
    if(dir==='up')rot(1);if(dir==='down')rot(3);if(dir==='right')rot(2);
    if(JSON.stringify(grid)!==before)add();
    hiScore('g2048',score);draw();
  }
  function draw(){wrap.innerHTML='';grid.forEach(r=>r.forEach(v=>{const c=document.createElement('div');c.className='t2048';c.textContent=v||'';c.dataset.v=v;wrap.appendChild(c);}));scoreEl.textContent=score+' pts';}
  const key=e=>{const m={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};if(m[e.key]){e.preventDefault();move(m[e.key]);}};
  document.addEventListener('keydown',key);swipe(wrap,move);
  ctrls.innerHTML=`<div class="gpad"><button data-d="left">◀</button><button data-d="up">▲</button><button data-d="down">▼</button><button data-d="right">▶</button><button data-d="new">↺</button></div>`;
  ctrls.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.d==='new')reset();else move(b.dataset.d);});
  reset();
  return {stop(){document.removeEventListener('keydown',key);}};
}

/* ---------------- MEMORY MATCH ---------------- */
function startMemory(stage,ctrls,scoreEl){
  const emojis=['🌸','🍓','🐤','🎀','🦋','🍰','🌈','⭐'];
  let deck,first,lock,moves,matched;
  function reset(){deck=[...emojis,...emojis].map((e,i)=>({e,flip:false,done:false})).sort(()=>Math.random()-0.5);first=null;lock=false;moves=0;matched=0;draw();}
  function draw(){stage.innerHTML='<div class="memgrid"></div>';const g=stage.querySelector('.memgrid');
    deck.forEach((c,idx)=>{const el=document.createElement('button');el.className='memcard'+((c.flip||c.done)?' up':'')+(c.done?' done':'');el.textContent=(c.flip||c.done)?c.e:'';el.onclick=()=>flip(idx);g.appendChild(el);});
    scoreEl.textContent=matched===emojis.length?('Done! '+moves+' moves 🎉'):(moves+' moves');
  }
  function flip(idx){if(lock)return;const c=deck[idx];if(c.flip||c.done)return;c.flip=true;
    if(first===null){first=idx;draw();return;}
    moves++;draw();const a=deck[first],b=deck[idx];
    if(a.e===b.e){a.done=b.done=true;matched++;first=null;draw();if(matched===emojis.length)celebrate();}
    else{lock=true;setTimeout(()=>{a.flip=b.flip=false;first=null;lock=false;draw();},700);}
  }
  ctrls.innerHTML=`<button class="btn-ghost" style="max-width:170px;margin:0 auto" id="memNew">↺ New game</button>`;
  ctrls.querySelector('#memNew').onclick=reset;reset();
  return {stop(){}};
}

/* ---------------- TIC-TAC-TOE ---------------- */
function startTicTac(stage,ctrls,scoreEl){
  let bd,over,turn;
  const WIN=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function reset(){bd=Array(9).fill('');over=false;turn='X';scoreEl.textContent='Your move';draw();}
  function winner(b){for(const[a,c,d]of WIN)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];return b.every(x=>x)?'tie':null;}
  function draw(){stage.innerHTML='<div class="ttt"></div>';const g=stage.querySelector('.ttt');
    bd.forEach((v,i)=>{const el=document.createElement('button');el.className='tttc';el.textContent=v;el.onclick=()=>play(i);g.appendChild(el);});}
  function play(i){if(over||bd[i]||turn!=='X')return;bd[i]='X';let w=winner(bd);if(w)return end(w);turn='O';scoreEl.textContent='…';draw();
    setTimeout(()=>{aiMove();let w2=winner(bd);if(w2)end(w2);else{turn='X';scoreEl.textContent='Your move';draw();}},350);}
  function aiMove(){const empty=bd.map((v,i)=>v?null:i).filter(v=>v!==null);
    const tryFor=p=>{for(const i of empty){const c=[...bd];c[i]=p;if(winner(c)===p)return i;}return -1;};
    let i=tryFor('O');if(i<0)i=tryFor('X');if(i<0&&bd[4]==='')i=4;if(i<0&&empty.length)i=empty[Math.floor(Math.random()*empty.length)];if(i>=0)bd[i]='O';}
  function end(w){over=true;scoreEl.textContent=w==='tie'?"It's a tie!":(w==='X'?'You win! 🎉':'AI wins 🤖');if(w==='X')celebrate();draw();}
  ctrls.innerHTML=`<button class="btn-ghost" style="max-width:170px;margin:0 auto" id="tttNew">↺ New game</button>`;
  ctrls.querySelector('#tttNew').onclick=reset;reset();
  return {stop(){}};
}

/* ---------------- WORD SEARCH ---------------- */
function startWordSearch(stage,ctrls,scoreEl){
  const BANK=[['BLOOM','HEALTH','WATER','SLEEP','WALK','FRUIT'],['APPLE','PROTEIN','MOVE','REST','SMILE','FRESH'],
              ['YOGA','ENERGY','LUCAS','FAMILY','GROW','PEACE'],['SNACK','LOVE','GARDEN','HAPPY','CALM','GOAL']];
  const N=10;let gridL,words,found,sel;const foundCells={};
  function place(w){const dirs=[[0,1],[1,0],[1,1],[1,-1]];for(let t=0;t<80;t++){const d=dirs[Math.floor(Math.random()*dirs.length)];
    const r0=Math.floor(Math.random()*N),c0=Math.floor(Math.random()*N),re=r0+d[0]*(w.length-1),ce=c0+d[1]*(w.length-1);
    if(re<0||re>=N||ce<0||ce>=N)continue;let ok=true;for(let k=0;k<w.length;k++){const r=r0+d[0]*k,c=c0+d[1]*k;if(gridL[r][c]&&gridL[r][c]!==w[k]){ok=false;break;}}
    if(ok){for(let k=0;k<w.length;k++)gridL[r0+d[0]*k][c0+d[1]*k]=w[k];return true;}}return false;}
  function reset(){const set=BANK[Math.floor(Math.random()*BANK.length)].filter(w=>w.length<=N).slice(0,6);
    gridL=Array.from({length:N},()=>Array(N).fill(''));words=[];found=[];sel=[];Object.keys(foundCells).forEach(k=>delete foundCells[k]);
    set.forEach(w=>{if(place(w))words.push(w);});
    for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!gridL[r][c])gridL[r][c]=String.fromCharCode(65+Math.floor(Math.random()*26));draw();}
  function draw(){
    stage.innerHTML=`<div class="wsgrid" style="grid-template-columns:repeat(${N},1fr)"></div><div class="wswords">${words.map(w=>`<span class="wsw ${found.includes(w)?'got':''}">${w}</span>`).join('')}</div>`;
    const g=stage.querySelector('.wsgrid');
    for(let r=0;r<N;r++)for(let c=0;c<N;c++){const el=document.createElement('button');el.className='wsc';el.textContent=gridL[r][c];
      if(sel.some(s=>s.r===r&&s.c===c))el.classList.add('sel');
      if(Object.values(foundCells).some(cells=>cells.some(s=>s.r===r&&s.c===c)))el.classList.add('fnd');
      el.onclick=()=>tap(r,c);g.appendChild(el);}
    scoreEl.textContent=(found.length===words.length&&words.length)?'All found! 🎉':found.length+'/'+words.length;
  }
  function lineCells(a,b){if(!((a.r===b.r)||(a.c===b.c)||(Math.abs(b.r-a.r)===Math.abs(b.c-a.c))))return null;
    const dr=Math.sign(b.r-a.r),dc=Math.sign(b.c-a.c),len=Math.max(Math.abs(b.r-a.r),Math.abs(b.c-a.c))+1,cells=[];
    for(let k=0;k<len;k++)cells.push({r:a.r+dr*k,c:a.c+dc*k});return cells;}
  function tap(r,c){
    if(sel.length===0){sel=[{r,c}];draw();return;}
    const a=sel[0],line=lineCells(a,{r,c});
    if(line){const str=line.map(s=>gridL[s.r][s.c]).join(''),rev=str.split('').reverse().join('');
      const w=words.find(w=>(w===str||w===rev)&&!found.includes(w));
      if(w){found.push(w);foundCells[w]=line;if(found.length===words.length)celebrate();}}
    sel=[];draw();
  }
  ctrls.innerHTML=`<button class="btn-ghost" style="max-width:170px;margin:0 auto" id="wsNew">↺ New puzzle</button>
    <p class="muted" style="font-size:.72rem;text-align:center;margin:10px 0 0">Tap the first and last letter of a word to select it.</p>`;
  ctrls.querySelector('#wsNew').onclick=reset;reset();
  return {stop(){}};
}

/* ---------------- HUB ---------------- */
const GAMES=[
  {id:'tetris',name:'Tetris',emoji:'🧱',start:startTetris},
  {id:'jump',name:'Bloom Jump',emoji:'🐤',start:startJump},
  {id:'snake',name:'Snake',emoji:'🐍',start:startSnake},
  {id:'g2048',name:'2048',emoji:'🔢',start:start2048},
  {id:'memory',name:'Memory Match',emoji:'🧠',start:startMemory},
  {id:'tictac',name:'Tic-Tac-Toe',emoji:'⭕',start:startTicTac},
  {id:'wordsearch',name:'Word Search',emoji:'🔤',start:startWordSearch}
];
let activeGame=null;
function stopActiveGame(){if(activeGame){try{activeGame.stop&&activeGame.stop();}catch(e){}activeGame=null;}}
function renderGames(){
  stopActiveGame();
  const root=document.getElementById('gamesRoot');if(!root)return;
  root.innerHTML=`<div class="card"><h2>🎮 Games</h2>
    <p class="muted" style="font-size:.82rem;margin:-6px 0 12px">A little break — tap a game to play. Best scores save on this device.</p>
    <div class="game-grid">${GAMES.map(g=>`<button class="game-card" onclick="openGame('${g.id}')">
      <div class="ge">${g.emoji}</div><div class="gn">${g.name}</div>
      <div class="gh">${(state.games&&state.games[g.id])?'Best: '+state.games[g.id]:'Tap to play'}</div></button>`).join('')}</div></div>`;
}
function openGame(id){
  stopActiveGame();
  const g=GAMES.find(x=>x.id===id);if(!g)return;
  const root=document.getElementById('gamesRoot');
  root.innerHTML=`<div class="card"><div class="game-top"><button class="btn-mini" id="gameBack">‹ Games</button>
      <b>${g.emoji} ${g.name}</b><span id="gameScore" class="pill">0</span></div>
    <div id="gameStage" class="game-stage"></div><div id="gameCtrls"></div></div>`;
  document.getElementById('gameBack').onclick=()=>{stopActiveGame();renderGames();};
  try{activeGame=g.start(document.getElementById('gameStage'),document.getElementById('gameCtrls'),document.getElementById('gameScore'));}
  catch(e){document.getElementById('gameStage').innerHTML='<p class="muted">Couldn\'t start this game.</p>';}
}
