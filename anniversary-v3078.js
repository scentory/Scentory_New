(()=>{
'use strict';
const START = new Date('2026-09-27T23:00:00+06:00').getTime();
const END = new Date('2026-10-04T23:59:59+06:00').getTime();
const EXCLUDED = new Set([
  'mykonos-inception-edp','hawas-chrome','hawas-fire-edp','rasasi-fattan-edp',
  'yusuf-bhai-men-212','yusuf-bhai-allure-homme-sport','supremacy-not-only-intense-edp',
  'afnan-turathi-blue-edp','afnan-modest-une-edp','dolce-gabbana-the-one-edp',
  'azzaro-the-most-wanted-edp-intense','ysl-y-edp','miami-blue-by-ard',
  'brandy-salvage-edp','brandy-after-swim-edp','brandy-inspiration-edp','brandy-ambre-leather-edp',
  'absolute-ice-by-atralia-edp','bade-e-al-oud-oud-for-glory','armaf-dunescape-edp',
  'atlantis-extrait-by-french-avenue-edp','mango-ice-by-gulf-orchid','lattafa-opulent-dubai-edp',
  'lattafa-maahir-legacy-edp','rave-plato-lattafa','dynasty-by-lattafa-edp','lattafa-khamrah-qahwa-edp',
  'lattafa-asad-edp','lattafa-haayati-edp','oud-al-layl-midnight-edp','daring-blue-edp'
]);
const ALREADY_SPECIAL = new Set(['azzaro-the-most-wanted-parfum','hawas-ice-freeze','bois-imperial-edp']);
const TWO_PERCENT = new Set(['dior-sauvage-edt','stronger-with-you-intensely-edp']);
const now=()=>Date.now();
const isActive=()=>now()>=START&&now()<=END;
const isVisible=()=>now()<=END;
const round5=n=>Math.max(5,Math.round(n/5)*5);
function salePrice(id,base){
  base=Number(base); if(!Number.isFinite(base)) return base;
  if(!isActive()||EXCLUDED.has(id)) return base;
  if(ALREADY_SPECIAL.has(id)) return base;
  const factor=TWO_PERCENT.has(id) ? 0.98 : 0.9525;
  let out=round5(base*factor);
  if(out>=base) out=Math.max(5,base-5);
  return out;
}
function eligible(p){
  if(!p||EXCLUDED.has(p.id)||['out','upcoming'].includes(p.status||'available')) return false;
  return Object.values(p.sizes||{}).some(s=>s&&s.available&&s.price!=null);
}
function applyToCatalogue(list){
  if(!Array.isArray(list)) return list;
  list.forEach(p=>{
    p._anniversaryEligible=eligible(p);
    p._anniversarySpecial=p._anniversaryEligible&&ALREADY_SPECIAL.has(p.id);
    p._anniversaryActive=p._anniversaryEligible&&isActive();
    if(!p._anniversaryActive) return;
    Object.values(p.sizes||{}).forEach(s=>{
      if(!s||s.price==null) return;
      const regular=Number(s.price);
      const offer=salePrice(p.id,regular);
      s._regularPrice=regular;
      s.price=offer;
    });
  });
  return list;
}
function offerMarkup(item){
  if(!item||item.price==null) return '';
  const current=Number(item.price);
  const regular=Number(item._regularPrice);
  if(Number.isFinite(regular)&&regular>current){
    return `<span class="anniv-price"><del>${regular.toLocaleString('en-BD')} Tk</del><strong>${current.toLocaleString('en-BD')} Tk</strong></span>`;
  }
  return `<span class="anniv-price anniv-price-special"><strong>${current.toLocaleString('en-BD')} Tk</strong></span>`;
}
function badge(p){
  if(!p?._anniversaryActive) return '';
  return `<span class="anniversary-offer-badge">${p._anniversarySpecial?'ANNIVERSARY SPECIAL':'1 YEAR OFFER'}</span>`;
}
function decorateProductPage(p){
  if(!p||!p._anniversaryActive) return;
  const h1=document.querySelector('h1');
  if(h1&&!document.querySelector('.product-anniversary-badge')){
    const b=document.createElement('span'); b.className='product-anniversary-badge';
    b.textContent=p._anniversarySpecial?'ANNIVERSARY SPECIAL':'1 YEAR OFFER';
    h1.before(b);
  }
  document.querySelectorAll('.product-size-btn[data-size]').forEach(btn=>{
    const item=p.sizes?.[btn.dataset.size]; const strong=btn.querySelector('strong');
    if(!item||!strong||item.price==null) return;
    const regular=Number(item._regularPrice), current=Number(item.price);
    if(Number.isFinite(regular)&&regular>current){
      strong.innerHTML=`<del class="product-og-price">${regular.toLocaleString('en-BD')} Tk</del><span class="product-offer-price">${current.toLocaleString('en-BD')} Tk</span>`;
    }else if(p._anniversarySpecial){
      strong.innerHTML=`<span class="product-offer-price">${current.toLocaleString('en-BD')} Tk</span>`;
    }
  });
}
function updateCountdown(){
  const wrap=document.getElementById('anniversaryCampaign'); if(!wrap) return;
  const title=document.getElementById('anniversaryCountdownLabel');
  const target=now()<START?START:END;
  if(now()>END){ wrap.hidden=true; return; }
  if(title) title.textContent=now()<START?'ANNIVERSARY OFFER STARTS IN':'ANNIVERSARY OFFER ENDS IN';
  let d=Math.max(0,target-now());
  const days=Math.floor(d/86400000); d%=86400000;
  const hrs=Math.floor(d/3600000); d%=3600000;
  const mins=Math.floor(d/60000); d%=60000;
  const secs=Math.floor(d/1000);
  const vals={Days:days,Hours:hrs,Minutes:mins,Seconds:secs};
  Object.entries(vals).forEach(([k,v])=>{const el=document.querySelector(`[data-countdown="${k.toLowerCase()}"]`);if(el)el.textContent=String(v).padStart(2,'0')});
  wrap.classList.toggle('anniversary-live',isActive());
}
function scheduleBoundaryReload(){
  const t=now(); const next=t<START?START:(t<=END?END+1000:null);
  if(next){const delay=next-t+750;if(delay>0&&delay<2147483000)setTimeout(()=>location.reload(),delay)}
}
window.ScentoryAnniversary={START,END,EXCLUDED,ALREADY_SPECIAL,TWO_PERCENT,isActive,isVisible,eligible,salePrice,applyToCatalogue,offerMarkup,badge,decorateProductPage};
document.addEventListener('DOMContentLoaded',()=>{updateCountdown();setInterval(updateCountdown,1000);scheduleBoundaryReload()});
})();