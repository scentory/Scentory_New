
(() => {
  'use strict';
  // All times are absolute Asia/Dhaka instants; visitors' device time zones do not shift the sale.
  const starts = Date.parse('2026-11-11T00:01:00+06:00');
  const endsExclusive = Date.parse('2026-12-13T00:00:00+06:00');
  const now = Date.now();
  if (now >= endsExclusive) return;

  const banner = document.createElement('aside');
  banner.className = 'sale-clock';
  banner.setAttribute('aria-label', '11:11 sale countdown');
  banner.innerHTML = '<span class="sale-clock__name">11:11 Sale</span><span class="sale-clock__caption"></span><time class="sale-clock__time"></time>';
  const header = document.querySelector('.topbar, .phead');
  if (header) header.insertAdjacentElement('afterend', banner);
  else document.body.prepend(banner);

  const caption = banner.querySelector('.sale-clock__caption');
  const clock = banner.querySelector('.sale-clock__time');
  let overlay = null;
  let previousFocus = null;
  let previousOverflow = '';

  function format(ms) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const rest = seconds % 60;
    return `${days}d ${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(rest).padStart(2,'0')}s`;
  }

  function close() {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = previousOverflow;
    previousFocus?.focus?.();
  }

  function openPoster() {
    if (overlay) return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    overlay = document.createElement('div');
    overlay.className = 'sale-overlay';
    overlay.innerHTML = '<div class="sale-dialog" role="dialog" aria-modal="true" aria-label="11:11 sale poster"><button class="sale-dialog__close" type="button" aria-label="Close sale poster">×</button><img class="sale-dialog__image" src="sale-11-11-2026.jpg" alt="11:11 sale poster: independent perfume decants" width="1536" height="1536"><div class="sale-dialog__actions"><span>Offer period: 11 Nov to 12 Dec</span><a href="shop.html">Explore perfumes</a></div></div>';
    document.body.append(overlay);
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.sale-dialog__close').addEventListener('click', close);
    overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
    overlay.querySelector('.sale-dialog__close').focus();
  }

  document.addEventListener('keydown', event => {
    if (!overlay) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const controls = [...overlay.querySelectorAll('button, a')];
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
    }
  });

  function tick() {
    const time = Date.now();
    if (time >= endsExclusive) { banner.remove(); close(); clearInterval(interval); return; }
    const beforeSale = time < starts;
    caption.textContent = beforeSale ? 'Starts in' : 'Ends in';
    clock.textContent = format((beforeSale ? starts : endsExclusive) - time);
    clock.setAttribute('datetime', new Date(beforeSale ? starts : endsExclusive).toISOString());
    if (!beforeSale && !overlay && !shown) maybeOpen();
  }

  let shown = false;
  function maybeOpen() {
    shown = true;
    let internal = false;
    try { internal = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (_) {}
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('sale1111-2026-seen') === '1'; } catch (_) {}
    if (internal && alreadySeen) return;
    try { sessionStorage.setItem('sale1111-2026-seen', '1'); } catch (_) {}
    openPoster();
  }
  let interval = null;
  tick();
  interval = setInterval(tick, 1000);
})();
