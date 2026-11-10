
(() => {
  'use strict';
  const start = Date.parse('2026-11-11T00:00:00+06:00');
  const end = Date.parse('2026-11-13T00:00:00+06:00');
  const campaign = {"club-de-nuit-elite":{"3ml":280,"6ml":490,"10ml":760,"15ml":1070},"dior-sauvage-edt":{"3ml":430,"6ml":795,"10ml":1260,"15ml":1830},"valentino-uomo-born-in-roma-intense-edp":{"3ml":449,"6ml":825,"10ml":1310,"15ml":1905},"good-girl-by-carolina-herrera":{"3ml":399,"6ml":720,"10ml":1135,"15ml":1650},"azzaro-the-most-wanted-parfum":{"3ml":350,"6ml":645,"10ml":1015,"15ml":1460},"jpg-le-male-le-parfum":{"3ml":310,"6ml":560,"10ml":865,"15ml":1235},"sanaya-by-junaid-edp":{"3ml":210,"6ml":360,"10ml":530,"15ml":720},"hawas-ice-freeze":{"3ml":220,"6ml":380,"10ml":590,"15ml":810},"hawas-thunder":{"3ml":220,"6ml":390,"10ml":580,"15ml":840},"hawas-for-him-edp":{"3ml":190,"6ml":320,"10ml":475,"15ml":635},"hawas-lava-gold":{"3ml":210,"6ml":370,"10ml":550,"15ml":750},"hawas-ice-edp":{"3ml":199,"6ml":340,"10ml":490,"15ml":675},"hawas-black-edp":{"3ml":199,"6ml":340,"10ml":490,"15ml":675},"hawas-diva-edp":{"3ml":199,"6ml":340,"10ml":490,"15ml":675},"hawas-tropical-edp":{"3ml":199,"6ml":340,"10ml":510,"15ml":690},"hawas-kobra-edp":{"3ml":190,"6ml":320,"10ml":475,"15ml":635},"yusuf-bhai-wulong-cha":{"3ml":280,"6ml":490,"10ml":760,"15ml":1140},"yusuf-bhai-bois-imperial":{"3ml":220,"6ml":390,"10ml":585,"15ml":850},"riiffs-fareed-edp":{"3ml":180,"6ml":300,"10ml":445,"15ml":595},"riiffs-freeze-edp":{"3ml":220,"6ml":390,"10ml":585,"15ml":805},"afnan-9-pm-night-out-edp":{"3ml":300,"6ml":540,"10ml":835,"15ml":1195},"dolce-gabbana-the-one-edp":{"3ml":320,"6ml":585,"10ml":910},"stronger-with-you-intensely-edp":{"3ml":460,"6ml":855,"10ml":1375},"ysl-y-edp":{"3ml":470,"6ml":880,"10ml":1415},"nautica-voyage-edt":{"3ml":160,"6ml":265,"10ml":370,"15ml":490},"212-men-by-carolina-herrera":{"3ml":310,"6ml":560,"10ml":865,"15ml":1235},"versace-eros-edt":{"3ml":290,"6ml":510,"10ml":795,"15ml":1130},"davidoff-cool-water-edt":{"3ml":170,"6ml":295,"10ml":415,"15ml":560},"burberry-touch-edt":{"3ml":220,"6ml":380,"10ml":570,"15ml":785},"al-haramain-amber-oud-gold-edition":{"3ml":230,"6ml":405,"10ml":605,"15ml":845},"al-haramain-amber-oud-aqua-dubai":{"3ml":230,"6ml":405,"10ml":605,"15ml":845},"bujairami-sydney-hectic-edp":{"3ml":260,"6ml":465,"10ml":710,"15ml":1050},"marwa-arabian-prestige-edp":{"3ml":210,"6ml":360,"10ml":540,"15ml":740},"absolute-chill-atralia-edp":{"3ml":180,"6ml":295,"10ml":415,"15ml":560},"rayhaan-vantage":{"3ml":190,"6ml":330,"10ml":485,"15ml":690},"rayhaan-vanilla-vibe-edp":{"3ml":190,"6ml":320,"10ml":455,"15ml":625},"rayhaan-cedrus-blanc-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":580},"rayhaan-pacific-aloha-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-nocturno-elixir-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-jungle-vibe-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-pacific-aura-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-tropical-vibe-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-obsidian-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":580},"rayhaan-terra-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"rayhaan-elixir-edp":{"3ml":170,"6ml":285,"10ml":405,"15ml":550},"ajmal-kuro-edp":{"3ml":190,"6ml":330,"10ml":485,"15ml":665},"bade-e-al-oud-oud-for-glory":{"3ml":190,"6ml":320,"10ml":475,"15ml":635},"armaf-dunescape-edp":{"3ml":220,"6ml":380,"10ml":570,"15ml":775},"club-de-nuit-intense-man-pure-parfum":{"3ml":230,"6ml":405,"10ml":605,"15ml":845},"club-de-nuit-intense-overdose":{"3ml":280,"6ml":510,"10ml":785,"15ml":1120},"club-de-nuit-intenso-fuego":{"3ml":290,"6ml":520,"10ml":795,"15ml":1200},"club-de-nuit-intesne-man-edp":{"3ml":200,"6ml":340,"10ml":510,"15ml":690},"amber-empire-by-french-avenue":{"3ml":230,"6ml":395,"10ml":605,"15ml":880},"zenith-blue-by-french-avenue-edp":{"3ml":220,"6ml":380,"10ml":570,"15ml":785},"liquid-brun-by-french-avenue-edp":{"3ml":220,"6ml":390,"10ml":585,"15ml":805},"lattafa-yara-edp":{"3ml":190,"6ml":320,"10ml":475,"15ml":670},"rave-now-by-lattafa-edp":{"3ml":160,"6ml":265,"10ml":380,"15ml":500},"teriaq-intense-by-lattafa-edp":{"3ml":250,"6ml":445,"10ml":665,"15ml":950},"dynasty-by-lattafa-edp":{"3ml":200,"6ml":340,"10ml":490,"15ml":675},"lattafa-asad-bourbon-edp":{"3ml":180,"6ml":300,"10ml":445,"15ml":595},"lattafa-fakhar-black-edp":{"3ml":180,"6ml":300,"10ml":435,"15ml":580},"lattafa-asad-edp":{"3ml":180,"6ml":300,"10ml":445,"15ml":595},"khadlaj-island-edp":{"3ml":190,"6ml":320,"10ml":475,"15ml":680}};
  const active = () => Date.now() >= start && Date.now() < end;
  const money = n => `${Number(n).toLocaleString('en-BD')} Tk`;
  function applyToCatalogue(catalogue) {
    if (!active()) return catalogue;
    for (const product of catalogue) {
      const sizes = campaign[product.id];
      if (!sizes) continue;
      product._saleActive = true;
      for (const [ml, price] of Object.entries(sizes)) {
        const size = product.sizes?.[ml];
        if (!size || size.price == null) continue;
        const regular = Number(size.price);
        size._regularPrice = regular;
        size.price = price;
        if (product.prices) product.prices[ml.replace('ml', ' ML')] = price;
      }
    }
    return catalogue;
  }
  function priceMarkup(size) {
    if (!size || size.price == null) return 'N/A';
    const current = money(size.price);
    return active() && Number(size._regularPrice) > Number(size.price)
      ? `<span class="sale-price-stack"><span class="sale-regular-line">Regular <del class="sale-old-price">${money(size._regularPrice)}</del></span><span class="sale-current-line">Sale <span class="sale-new-price">${current}</span></span><span class="sale-saving">Save ${money(Number(size._regularPrice) - Number(size.price))}</span></span>`
      : current;
  }
  function badge(product) {
    return active() && product?._saleActive ? '<span class="sale-badge">11:11 Sale</span>' : '';
  }
  function updateProductPage(product) {
    if (!active() || !product?._saleActive) return;
    const title = document.querySelector('article h1');
    title?.insertAdjacentHTML('afterend', badge(product));
    document.querySelectorAll('.product-size-btn[data-size]').forEach(button => {
      const item = product.sizes?.[button.dataset.size];
      const price = button.querySelector('strong');
      if (item && price) price.innerHTML = priceMarkup(item);
    });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(node => {
      try {
        const data = JSON.parse(node.textContent);
        if (data['@type'] !== 'Product' || data.sku !== product.id) return;
        for (const offer of data.offers || []) {
          const match = /(?:^|\s)(3|6|10|15) ML(?:\s|$)/.exec(offer.name || '');
          const item = match && product.sizes?.[match[1] + 'ml'];
          if (item) offer.price = item.price;
        }
        node.textContent = JSON.stringify(data);
      } catch (_) {}
    });
  }
  window.SaleCampaign = { active, applyToCatalogue, priceMarkup, badge, updateProductPage };
  // Refresh pages left open across either boundary so carts, tiles and structured offers agree.
  const initialState = active();
  const boundary = setInterval(() => {
    if (active() !== initialState) { clearInterval(boundary); location.reload(); }
    if (Date.now() >= end) clearInterval(boundary);
  }, 1000);
})();
