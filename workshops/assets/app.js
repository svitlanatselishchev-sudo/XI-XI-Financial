/* Reads window.XIXI (assets/site-data.js) and updates buttons, dates and chips. */
(function(){
  var C = window.XIXI || {events:{}};
  var lang = document.documentElement.getAttribute('data-wl') || 'ua';
  var chipTxt = {ua:{open:'Запис відкрито',soon:'Скоро'}, en:{open:'Open',soon:'Soon'}}[lang];
  var priceTbd = {ua:'Ціна скоро',en:'Price soon'}[lang];
  function ev(id){ var e=(C.events||{})[id]; return e && e[lang] ? e[lang] : {}; }
  function isOpen(e){ return e.status==='open' && e.link && e.link.indexOf('REPLACE')<0 && (e.price===undefined || e.price); }
  function q(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }

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
