(()=>{
const icon={
home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 10.5 12 3.8l8.5 6.7v9.2a1.3 1.3 0 0 1-1.3 1.3H4.8a1.3 1.3 0 0 1-1.3-1.3z"/><path d="M9 21v-6.8h6V21"/></svg>',
discover:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>',
find:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.5 4.5"/><path d="M8.2 10.8h5.2"/></svg>',
picks:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.2h13l-1 12H6.5z"/><path d="M9 8.2V6a3 3 0 0 1 6 0v2.2"/></svg>',
tools:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h10M18 6h2M4 12h3M11 12h9M4 18h8M16 18h4"/><circle cx="16" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="14" cy="18" r="2"/></svg>'};
const page=document.body.dataset.page||(document.body.dataset.productId?'product':'');
const active=page==='home'?'home':page==='shop'?'discover':page==='order'?'picks':'';
const items=[['home','SCENTORY','index.html',icon.home],['discover','DISCOVER','shop.html',icon.discover],['find','FIND','shop.html#find',icon.find],['picks','MY PICKS','order.html',icon.picks],['tools','TOOLS','index.html#discoveryStudio',icon.tools]];
const dock=document.createElement('nav');dock.className='scentory-liquid-dock';dock.setAttribute('aria-label','Scentory quick navigation');
dock.innerHTML=items.map(([k,l,h,i])=>`<a class="scentory-dock-item ${active===k?'active':''}" data-dock="${k}" href="${h}">${i}<span>${l}</span>${k==='picks'?'<b class="scentory-dock-count" data-dock-count hidden>0</b>':''}</a>`).join('');
document.body.appendChild(dock);
function count(){let c=[];try{c=JSON.parse(localStorage.getItem('scentoryCart')||'[]')}catch{}const n=c.reduce((s,x)=>s+(Number(x.qty)||1),0);dock.querySelectorAll('[data-dock-count]').forEach(b=>{b.textContent=n;b.hidden=!n})}count();addEventListener('storage',count);addEventListener('scentory-cart-change',count);
const find=dock.querySelector('[data-dock="find"]');find?.addEventListener('click',e=>{const input=document.getElementById('searchInput');if(input){e.preventDefault();input.scrollIntoView({block:'center'});setTimeout(()=>input.focus(),30);history.replaceState(null,'',location.pathname+'#find')}});
if(location.hash==='#find'){setTimeout(()=>{const input=document.getElementById('searchInput');if(input){input.scrollIntoView({block:'center'});input.focus()}},250)}
})();