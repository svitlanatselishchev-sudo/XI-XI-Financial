/* Google Analytics 4 for xixistrategy.com
   OFF until a Measurement ID is pasted below (Admin > Data streams > Web).
   Runs next to GoatCounter. Events sent:
     book_call_click     any link to cal.com/xixistrategy (or a book-call label)
     email_click         mailto: links
     phone_click         tel: links
     audience_tab_select owner / broker / CPA tabs on the home page
     cta_click           any other button that carries a GoatCounter label
     booking_confirmed   booked.html (Cal.com "Redirect on booking" target)
   Every click event carries: placement (hero, header, drawer, dock, footer
   or the section id) and label (the GoatCounter label or the link). */
(function () {
  var GA_ID = ''; // paste e.g. 'G-ABC123XYZ9' here to switch GA4 on
  if (!/^G-[A-Z0-9]{4,}$/.test(GA_ID)) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  // Page-level event (booked.html sets <meta name="ga-event" content="booking_confirmed">)
  var pe = document.querySelector('meta[name="ga-event"]');
  if (pe && pe.content) gtag('event', pe.content, { page_path: location.pathname });

  var AREAS = [['.v-dock', 'dock'], ['.v-drawer', 'drawer'], ['header', 'header'], ['footer', 'footer'], ['.v-hero', 'hero']];
  function placement(el) {
    for (var i = 0; i < AREAS.length; i++) if (el.closest(AREAS[i][0])) return AREAS[i][1];
    var sec = el.closest('section');
    return (sec && (sec.id || sec.getAttribute('aria-labelledby'))) || 'page';
  }

  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a, button') : null;
    if (!el) return;
    var label = el.getAttribute('data-goatcounter-click') || '';
    var href = el.getAttribute('href') || '';
    var name = null;
    if (/cal\.com\/xixistrategy/i.test(href) || label.indexOf('book-call') === 0) name = 'book_call_click';
    else if (href.indexOf('mailto:') === 0 || label === 'email') name = 'email_click';
    else if (href.indexOf('tel:') === 0 || label === 'phone') name = 'phone_click';
    else if (label.indexOf('tab-') === 0) name = 'audience_tab_select';
    else if (label) name = 'cta_click';
    if (!name) return;
    gtag('event', name, { placement: placement(el), label: (label || href).slice(0, 100) });
  }, true);
})();
