(()=>{
'use strict';
const START = new Date('2026-09-27T23:00:00+06:00').getTime();
const END = new Date('2026-10-04T23:59:59+06:00').getTime();
const EXCLUDED = new Set(["absolute-ice-by-atralia-edp","afnan-modest-une-edp","afnan-turathi-blue-edp","armaf-dunescape-edp","ateeq-nusuk-by-lattafa","atlantis-extrait-by-french-avenue-edp","azzaro-the-most-wanted-edp-intense","bade-e-al-oud-oud-for-glory","brandy-after-swim-edp","brandy-ambre-leather-edp","brandy-inspiration-edp","brandy-salvage-edp","daring-blue-edp","dolce-gabbana-the-one-edp","dynasty-by-lattafa-edp","hawas-chrome","hawas-fire-edp","hawas-lava-gold","hawas-thunder","lattafa-asad-edp","lattafa-haayati-edp","lattafa-khamrah-qahwa-edp","lattafa-maahir-legacy-edp","lattafa-opulent-dubai-edp","mango-ice-by-gulf-orchid","miami-blue-by-ard","mykonos-inception-edp","oud-al-layl-midnight-edp","rasasi-fattan-edp","rave-plato-lattafa","rayhaan-floriana","spectre-ghost-by-french-avenue","supremacy-not-only-intense-edp","versace-eros-flame-edp","ysl-y-edp","yusuf-bhai-allure-homme-sport","yusuf-bhai-men-212"]);
const ALREADY_SPECIAL = new Set(['azzaro-the-most-wanted-parfum','hawas-ice-freeze','bois-imperial-edp']);
const TWO_PERCENT = new Set(['dior-sauvage-edt','stronger-with-you-intensely-edp']);
const FROZEN_OFFERS={"dior-sauvage-edt":{"3ml":390,"5ml":615,"6ml":735,"10ml":1175,"15ml":1705},"azzaro-the-most-wanted-parfum":{"3ml":260,"5ml":399,"6ml":490,"10ml":749,"15ml":1049},"sanaya-by-junaid-edp":{"5ml":265,"6ml":325,"10ml":475,"15ml":665},"mykonos-dreamscape-edp":{"5ml":305,"6ml":380,"10ml":560,"15ml":800},"hawas-ice-freeze":{"5ml":290,"6ml":360,"10ml":540,"15ml":750},"hawas-for-him-edp":{"5ml":230,"6ml":275,"10ml":400,"15ml":550},"hawas-ice-edp":{"5ml":250,"6ml":305,"10ml":455,"15ml":630},"hawas-black-edp":{"5ml":240,"6ml":285,"10ml":430,"15ml":590},"hawas-tropical-edp":{"5ml":255,"6ml":315,"10ml":475,"15ml":640},"hawas-la-mer-edp":{"5ml":275,"6ml":345,"10ml":515,"15ml":715},"hawas-majestic-edp":{"5ml":285,"6ml":350,"10ml":535,"15ml":750},"hawas-kobra-edp":{"5ml":240,"6ml":285,"10ml":420,"15ml":570},"yusuf-bhai-wulong-cha":{"5ml":370,"6ml":450,"10ml":705,"15ml":1000},"yusuf-bhai-bois-imperial":{"5ml":295,"6ml":360,"10ml":535,"15ml":745},"riiffs-fareed-edp":{"5ml":230,"6ml":285,"10ml":410,"15ml":550},"riiffs-freeze-edp":{"5ml":285,"6ml":350,"10ml":535,"15ml":750},"reef-33-edp":{"5ml":295,"6ml":360,"10ml":535,"15ml":750},"thriller-iii-maison-x-cal-cologne":{"5ml":305,"6ml":370,"10ml":570,"15ml":800},"afnan-supremacy-collector-s-edition-edp":{"5ml":430,"6ml":525,"10ml":820,"15ml":1180},"afnan-9-pm-night-out-edp":{"5ml":410,"6ml":485,"10ml":760,"15ml":1115},"afnan-9-pm-edp":{"5ml":275,"6ml":335,"10ml":515,"15ml":715},"afnan-9-pm-rebel-edp":{"5ml":325,"6ml":390,"10ml":610,"15ml":855},"stronger-with-you-intensely-edp":{"3ml":410,"5ml":655,"6ml":785,"10ml":1255},"nautica-voyage-edt":{"5ml":200,"6ml":250,"10ml":345,"15ml":455},"212-men-by-carolina-herrera":{"5ml":420,"6ml":505,"10ml":800,"15ml":1145},"versace-eros-edt":{"5ml":380,"6ml":465,"10ml":725,"15ml":1020},"davidoff-cool-water-edt":{"5ml":210,"6ml":255,"10ml":380,"15ml":515},"burberry-touch-edt":{"5ml":285,"6ml":345,"10ml":515,"15ml":715},"bois-imperial-edp":{"3ml":470,"5ml":720,"6ml":870,"10ml":1390},"al-haramain-amber-oud-gold-edition":{"5ml":315,"6ml":380,"10ml":570,"15ml":790},"al-haramain-amber-oud-aqua-dubai":{"5ml":315,"6ml":380,"10ml":570,"15ml":790},"bujairami-sydney-hectic-edp":{"5ml":335,"6ml":410,"10ml":620,"15ml":895},"kaaf-by-ahmed-edp":{"5ml":265,"6ml":325,"10ml":485,"15ml":675},"blue-by-ahmed-edp":{"5ml":210,"6ml":255,"10ml":380,"15ml":515},"zeleny-by-ahmed-edp":{"5ml":210,"6ml":255,"10ml":380,"15ml":515},"marwa-arabian-prestige-edp":{"5ml":275,"6ml":325,"10ml":495,"15ml":685},"absolute-chill-atralia-edp":{"5ml":210,"6ml":255,"10ml":380,"15ml":525},"kayaan-midnight-edp":{"5ml":230,"6ml":275,"10ml":400,"15ml":550},"rayhaan-azul-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-cedrus-blanc-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-pacific-aloha-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-nocturno-elixir-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-pharaoh-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-italia-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-jungle-vibe-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-lion-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-tiger-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-wolf-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-aquatica-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-pacific-aura-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-tropical-vibe-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-obsidian-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-terra-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"rayhaan-elixir-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":505},"ajmal-kuro-edp":{"5ml":265,"6ml":325,"10ml":475,"15ml":655},"bade-e-al-oud-honor-glory":{"5ml":230,"6ml":285,"10ml":420,"15ml":570},"club-de-nuit-intense-man-pure-parfum":{"5ml":285,"6ml":350,"10ml":545,"15ml":750},"club-de-nuit-intense-overdose":{"5ml":400,"6ml":495,"10ml":770,"15ml":1105},"club-de-nuit-intenso-fuego":{"5ml":370,"6ml":450,"10ml":695,"15ml":980},"club-de-nuit-intesne-man-edp":{"5ml":255,"6ml":305,"10ml":455,"15ml":620},"club-de-nuit-intesne-man-edt":{"5ml":275,"6ml":325,"10ml":485,"15ml":665},"club-de-nuit-urban-man-elixir-edp":{"5ml":275,"6ml":325,"10ml":485,"15ml":675},"club-de-nuit-blue-iconic":{"5ml":305,"6ml":370,"10ml":560,"15ml":790},"aromatix-platine-blanc-extract":{"5ml":315,"6ml":380,"10ml":580,"15ml":820},"zenith-blue-by-french-avenue-edp":{"5ml":275,"6ml":335,"10ml":495,"15ml":695},"liquid-brun-by-french-avenue-edp":{"5ml":285,"6ml":350,"10ml":535,"15ml":745},"vulcan-feu-by-french-avenue-edp":{"5ml":285,"6ml":350,"10ml":535,"15ml":745},"naseem-by-gulf-orchid":{"5ml":200,"6ml":240,"10ml":345,"15ml":465},"lattafa-art-of-universe-edp":{"5ml":345,"6ml":410,"10ml":630,"15ml":895},"lattafa-yara-edp":{"5ml":210,"6ml":255,"10ml":370,"15ml":495},"rave-now-by-lattafa-edp":{"5ml":200,"6ml":240,"10ml":345,"15ml":465},"teriaq-intense-by-lattafa-edp":{"5ml":295,"6ml":360,"10ml":545,"15ml":760},"lattafa-asad-bourbon-edp":{"5ml":210,"6ml":255,"10ml":380,"15ml":525},"lattafa-fakhar-black-edp":{"5ml":220,"6ml":265,"10ml":390,"15ml":535},"lattafa-najdia-edp":{"5ml":180,"6ml":220,"10ml":315,"15ml":420},"khadlaj-karus-gold-absolu-edp":{"5ml":250,"6ml":305,"10ml":450,"15ml":620},"khadlaj-island-sun-edp":{"5ml":255,"6ml":305,"10ml":455,"15ml":630},"khadlaj-island-edp":{"5ml":240,"6ml":285,"10ml":430,"15ml":590},"khadlaj-island-dream-edp":{"5ml":240,"6ml":285,"10ml":430,"15ml":590},"qaed-al-fursan-edp":{"5ml":180,"6ml":220,"10ml":315,"15ml":410}};
const now=()=>Date.now();
const isActive=()=>now()>=START&&now()<=END;
const isVisible=()=>now()<=END;
const round5=n=>Math.max(5,Math.round(n/5)*5);
function salePrice(id,base,sizeKey){
  base=Number(base); if(!Number.isFinite(base)) return base;
  if(!isActive()) return base;
  const frozen=FROZEN_OFFERS[id]?.[sizeKey];
  return Number.isFinite(Number(frozen)) ? Number(frozen) : base;
}
function eligible(p){
  if(!p||!FROZEN_OFFERS[p.id]||['out','upcoming'].includes(p.status||'available')) return false;
  return Object.entries(FROZEN_OFFERS[p.id]).some(([sizeKey])=>{ const s=p.sizes?.[sizeKey]; return !!(s&&s.available&&s.price!=null); });
}
function applyToCatalogue(list){
  if(!Array.isArray(list)) return list;
  list.forEach(p=>{
    p._anniversaryEligible=eligible(p);
    p._anniversarySpecial=p._anniversaryEligible&&ALREADY_SPECIAL.has(p.id);
    p._anniversaryActive=p._anniversaryEligible&&isActive();
    if(!p._anniversaryActive) return;
    Object.entries(p.sizes||{}).forEach(([sizeKey,s])=>{
      if(!s||s.price==null) return;
      const regular=Number(s.price);
      const offer=salePrice(p.id,regular,sizeKey);
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