(()=>{
'use strict';
const input=document.getElementById('searchInput'),box=document.getElementById('searchSuggestions');
if(!input||!box)return;
let list=[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function available(p){return !['out','upcoming'].includes(p.status||'available')&&Object.values(p.sizes||{}).some(s=>s?.available&&s.price!=null)}
function start(p){const v=Object.values(p.sizes||{}).filter(s=>s?.available&&s.price!=null).map(s=>Number(s.price)).filter(Number.isFinite);return v.length?Math.min(...v):null}
function hide(){box.classList.remove('show');box.innerHTML='';input.setAttribute('aria-expanded','false')}
function render(){const q=input.value.trim().toLowerCase();if(!q)return hide();const m=list.filter(p=>`${p.name} ${p.id}`.toLowerCase().includes(q)).slice(0,10);if(!m.length){box.innerHTML='<div class="search-suggestion-empty">No perfume found</div>';box.classList.add('show');return}box.innerHTML=m.map(p=>{const pr=start(p);return `<button type="button" class="search-suggestion" data-id="${esc(p.id)}"><img src="${esc(p.image)}" alt=""><span><b>${esc(p.name)}</b><small>${available(p)?(pr!=null?'From '+pr.toLocaleString('en-BD')+' Tk':'Available'):(p.status==='upcoming'?'Upcoming':'Out of stock')}</small></span><em>View</em></button>`}).join('');box.classList.add('show');input.setAttribute('aria-expanded','true');box.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>location.href=encodeURIComponent(b.dataset.id)+'.html')}
fetch('perfumes.json?v=3078',{cache:'no-store'}).then(r=>r.json()).then(x=>{list=x;window.ScentoryAnniversary?.applyToCatalogue(list)}).catch(()=>{});
input.addEventListener('input',render);input.addEventListener('focus',render);input.addEventListener('keydown',e=>{if(e.key==='Escape'){hide();input.blur()}if(e.key==='Enter'){const b=box.querySelector('[data-id]');if(b){e.preventDefault();b.click()}}});document.addEventListener('click',e=>{if(!e.target.closest('.product-global-search'))hide()});
})();