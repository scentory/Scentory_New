(()=>{
const icon={
home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.5 12 3.8l8.5 6.7v9.2a1.3 1.3 0 0 1-1.3 1.3H4.8a1.3 1.3 0 0 1-1.3-1.3z"/><path d="M9 21v-6.8h6V21"/></svg>',
discover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>',
find:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.5 4.5"/><path d="M8.2 10.8h5.2"/></svg>',
picks:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.2h13l-1 12H6.5z"/><path d="M9 8.2V6a3 3 0 0 1 6 0v2.2"/></svg>',
tools:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h3M11 12h9M4 18h8M16 18h4"/><circle cx="16" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="14" cy="18" r="2"/></svg>'};

const page=document.body.dataset.page||(document.body.dataset.productId?'product':'');
let active=page==='shop'||page==='product'?'discover':page==='order'?'picks':'home';
if(location.hash==='#find') active='find';
if(location.hash==='#discoveryStudio') active='tools';

// Final SCENTORY order: Discover · Find · Scentory · Tools · My Picks
const items=[
 ['discover','DISCOVER','shop.html',icon.discover],
 ['find','FIND','shop.html#find',icon.find],
 ['home','SCENTORY','index.html',icon.home],
 ['tools','TOOLS','index.html#discoveryStudio',icon.tools],
 ['picks','MY PICKS','order.html',icon.picks]
];

const dock=document.createElement('nav');
dock.className='scentory-liquid-dock';
dock.setAttribute('aria-label','Scentory quick navigation');
dock.innerHTML='<i class="scentory-liquid-indicator" aria-hidden="true"></i>'+items.map(([k,l,h,i])=>`<a class="scentory-dock-item ${active===k?'active':''}" data-dock="${k}" href="${h}">${i}<span>${l}</span>${k==='picks'?'<b class="scentory-dock-count" data-dock-count hidden>0</b>':''}</a>`).join('');
document.body.appendChild(dock);

const indicator=dock.querySelector('.scentory-liquid-indicator');
const links=[...dock.querySelectorAll('.scentory-dock-item')];
let currentIndex=Math.max(0,links.findIndex(a=>a.dataset.dock===active));
let running=null;

function geometry(index){
 const d=dock.getBoundingClientRect(), r=links[index].getBoundingClientRect();
 return {left:r.left-d.left, width:r.width};
}
function place(index){
 const g=geometry(index);
 indicator.style.left=g.left+'px';
 indicator.style.width=g.width+'px';
}
function setActive(index){
 links.forEach((a,i)=>a.classList.toggle('active',i===index));
 currentIndex=index;
}
function flowTo(targetIndex,done){
 if(targetIndex<0||targetIndex>=links.length){done?.();return}
 if(running){running.cancel();running=null}
 const from=geometry(currentIndex), to=geometry(targetIndex);
 if(targetIndex===currentIndex){
   indicator.animate([{transform:'scale(.94)',filter:'brightness(1.12)'},{transform:'scale(1)',filter:'brightness(1)'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});
   done?.();return;
 }
 const bridgeLeft=Math.min(from.left,to.left);
 const bridgeRight=Math.max(from.left+from.width,to.left+to.width);
 const bridgeWidth=bridgeRight-bridgeLeft;
 setActive(targetIndex);
 running=indicator.animate([
   {left:from.left+'px',width:from.width+'px',borderRadius:'21px',transform:'scaleX(1)',filter:'brightness(1)'},
   {left:bridgeLeft+'px',width:bridgeWidth+'px',borderRadius:'28px',transform:'scaleX(1.015)',filter:'brightness(1.14)',offset:.52},
   {left:to.left+'px',width:to.width+'px',borderRadius:'21px',transform:'scaleX(1)',filter:'brightness(1)'}
 ],{duration:390,easing:'cubic-bezier(.22,.88,.24,1)',fill:'forwards'});
 running.onfinish=()=>{running=null;place(targetIndex);done?.()};
 running.oncancel=()=>{running=null;place(currentIndex)};
}

requestAnimationFrame(()=>place(currentIndex));
addEventListener('resize',()=>requestAnimationFrame(()=>place(currentIndex)),{passive:true});

function count(){
 let c=[];try{c=JSON.parse(localStorage.getItem('scentoryCart')||'[]')}catch{}
 const n=c.reduce((s,x)=>s+(Number(x.qty)||1),0);
 dock.querySelectorAll('[data-dock-count]').forEach(b=>{b.textContent=n;b.hidden=!n});
}
count();addEventListener('storage',count);addEventListener('scentory-cart-change',count);

links.forEach((a,targetIndex)=>a.addEventListener('click',e=>{
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
 const key=a.dataset.dock;
 const href=a.getAttribute('href');
 const search=document.getElementById('searchInput');
 const studio=document.getElementById('discoveryStudio');

 // Same-page utility actions retain the liquid movement and never reload unnecessarily.
 if(key==='find'&&search){
   e.preventDefault();
   flowTo(targetIndex,()=>{search.scrollIntoView({block:'center',behavior:'smooth'});setTimeout(()=>search.focus({preventScroll:true}),260);history.replaceState(null,'',location.pathname+'#find')});
   return;
 }
 if(key==='tools'&&studio){
   e.preventDefault();
   flowTo(targetIndex,()=>{studio.scrollIntoView({block:'start',behavior:'smooth'});history.replaceState(null,'',location.pathname+'#discoveryStudio')});
   return;
 }

 // Give the liquid indicator time to visibly flow before same-site navigation.
 e.preventDefault();
 flowTo(targetIndex,()=>{location.href=href});
}));

if(location.hash==='#find')setTimeout(()=>{const input=document.getElementById('searchInput');if(input){input.scrollIntoView({block:'center',behavior:'auto'});input.focus({preventScroll:true})}},180);
if(location.hash==='#discoveryStudio')setTimeout(()=>document.getElementById('discoveryStudio')?.scrollIntoView({block:'start',behavior:'auto'}),180);
})();
