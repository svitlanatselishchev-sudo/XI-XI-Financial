/* 11:11 Strategy: Google Analytics 4 (visits + key clicks).
   One file for the whole site. To change the property, edit MEASUREMENT_ID only.
   Until a real ID (G-...) is set, this file does nothing. */
(function () {
  var MEASUREMENT_ID = 'G-XXXXXXXXXX';
  if (!/^G-[A-Z0-9]{6,12}$/.test(MEASUREMENT_ID) || MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  function send(name, link, extra) {
    var p = {
      link_url: link.href || '',
      link_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
      page_path: location.pathname
    };
    for (var k in extra) p[k] = extra[k];
    gtag('event', name, p);
  }

  /* Page reached after a booking on cal.com (redirect set in cal.com). */
  if (document.documentElement.hasAttribute('data-ga-booked')) {
    gtag('event', 'call_booked', { page_path: location.pathname });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var proto = (a.protocol || '').toLowerCase();
    var host = (a.hostname || '').toLowerCase();
    function onHost(h) { return host === h || host.slice(-(h.length + 1)) === '.' + h; }

    if (proto === 'mailto:') return send('email_click', a, {});
    if (proto === 'tel:') return send('phone_click', a, {});
    if (onHost('cal.com') && /^\/xixistrategy(\/|$)/i.test(a.pathname)) return send('book_call_click', a, {});
    if (onHost('linkedin.com')) return send('linkedin_click', a, {});
    if (a.hasAttribute('data-buy') || host === 'buy.stripe.com') {
      return send('workshop_register_click', a, { workshop_id: a.getAttribute('data-buy') || '' });
    }
    /* EN/UA switch on the workshop pages: a link between /workshops/ and /workshops/en/. */
    var here = location.pathname, there = a.pathname || '';
    if (a.host === location.host && /^\/workshops\//.test(here) && /^\/workshops\//.test(there)) {
      var hereEn = /^\/workshops\/en\//.test(here), thereEn = /^\/workshops\/en\//.test(there);
      if (hereEn !== thereEn) return send('language_switch', a, { to_language: thereEn ? 'en' : 'ua' });
    }
  }, true);
})();
