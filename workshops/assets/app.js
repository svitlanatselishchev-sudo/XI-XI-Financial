/* Reads window.XIXI (assets/site-data.js) and updates buttons, dates and chips. */
(function(){
  var C = window.XIXI || {events:{}};
  var lang = document.documentElement.getAttribute('data-wl') || 'ua';
  var chipTxt = {ua:{open:'Запис відкрито',soon:'Скоро'}, en:{open:'Open',soon:'Soon'}}[lang];
  var priceTbd = {ua:'Ціна скоро',en:'Price soon'}[lang];
  function ev(id){ var e=(C.events||{})[id]; return e && e[lang] ? e[lang] : {}; }
  function isOpen(e){ return e.status==='open' && e.link && e.link.indexOf('REPLACE')<0 && (e.price===undefined || e.price); }
  function q(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  /* Menu: inject "Workshops" and "SMArt Club" into the top bar on every page.
     Links are built relative to the workshops root so they work at any depth. */
  (function(){
    var nav = document.querySelector('.top nav');
    if(!nav || nav.querySelector('[data-menu]')) return;
    var path = window.location.pathname;
    var marker = path.indexOf('/workshops/') >= 0 ? '/workshops/' : (path.indexOf('/xixi-workshop/') >= 0 ? '/xixi-workshop/' : null);
    if(!marker) return;
    var rest = path.slice(path.indexOf(marker) + marker.length);
    var dirDepth = Math.max(0, rest.split('/').length - 1);
    var prefix = ''; for(var i = 0; i < dirDepth; i++) prefix += '../';
    var langPrefix = lang === 'en' ? 'en/' : '';
    var mk = function(href, label, key){
      var a = document.createElement('a');
      a.href = href; a.textContent = label; a.setAttribute('data-menu', key);
      return a;
    };
    var workshops = mk((prefix + langPrefix) || './', lang === 'en' ? 'Workshops' : 'Воркшопи', 'workshops');
    var smart = mk(prefix + langPrefix + 'smart-club.html', 'SMArt Club', 'smart');
    if(/(smart-club|womens-circle)\.html$/.test(path)) smart.classList.add('here');
    else if(/(^|\/)(en\/)?(index\.html)?$/.test(rest) && dirDepth <= 1 && !/\/w\//.test(rest)) workshops.classList.add('here');
    else if(/(^|\/)w\/(f|m)\d+\.html$/.test(rest)) smart.classList.add('here');
    else if(/(^|\/)w\//.test(rest)) workshops.classList.add('here');
    var main = mk('https://xixistrategy.com/', lang === 'en' ? 'Main site' : 'Головний сайт', 'main');
    var langLink = nav.querySelector('.lang');
    nav.insertBefore(workshops, langLink || null);
    nav.insertBefore(smart, langLink || null);
    nav.insertBefore(main, langLink || null);
  })();

  q('[data-buy]').forEach(function(a){
    var id=a.getAttribute('data-buy'), e=ev(id);
    if(isOpen(e)){
      var label=a.getAttribute('data-open');
      if(e.price){ label=label.replace('$'+'{price}','$'+e.price); }
      a.textContent=label; a.href=e.link; a.classList.remove('off'); a.removeAttribute('aria-disabled');
      a.target='_blank'; a.rel='noopener';
    } else {
      a.textContent=a.getAttribute('data-soon'); a.removeAttribute('href');
      a.classList.add('off'); a.setAttribute('aria-disabled','true');
    }
  });
  q('[data-note]').forEach(function(p){
    var e=ev(p.getAttribute('data-note')); if(isOpen(e)) p.style.display='none';
  });
  q('[data-date]').forEach(function(n){ var e=ev(n.getAttribute('data-date')); if(e.date) n.textContent=e.date; });
  q('[data-time]').forEach(function(n){ var e=ev(n.getAttribute('data-time')); if(e.time) n.textContent=e.time; });
  q('[data-price]').forEach(function(n){ var e=ev(n.getAttribute('data-price')); n.textContent = e.price ? '$'+e.price : priceTbd; });
  q('[data-chip]').forEach(function(n){
    var e=ev(n.getAttribute('data-chip')), on=isOpen(e);
    n.textContent = on ? chipTxt.open : chipTxt.soon; n.classList.toggle('open', on);
  });
})();
