(function(){
  var links=[['services.html','Services'],['insights.html','Insights'],['story.html','About'],['tools.html','Financial health check'],['intake.html','Get started']];
  var current=location.pathname.split('/').pop()||'index.html';
  var header=document.querySelector('.site-header');
  if(!header)return;
  var brand='<a class="brand-lockup" href="index.html" aria-label="XI:XI home"><img src="assets/logo-wordmark.svg" alt="XI:XI"></a>';
  var nav='<nav aria-label="Primary navigation">'+links.map(function(l){return '<a href="'+l[0]+'"'+(current===l[0]?' aria-current="page"':'')+'>'+l[1]+'</a>';}).join('')+'</nav>';
  header.innerHTML=brand+nav+'<a class="button button-dark header-cta" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-mobile-menu" aria-label="Open navigation"><span></span><span></span></button>';
  var mobile=document.createElement('nav');
  mobile.id='site-mobile-menu'; mobile.className='mobile-menu'; mobile.setAttribute('aria-label','Mobile navigation'); mobile.setAttribute('aria-hidden','true');
  mobile.innerHTML=links.map(function(l){return '<a href="'+l[0]+'"'+(current===l[0]?' aria-current="page"':'')+'>'+l[1]+'</a>';}).join('')+'<a class="button button-dark" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a>';
  header.parentNode.insertBefore(mobile,header.nextSibling);
  var toggle=header.querySelector('.menu-toggle');
  function setOpen(open){mobile.classList.toggle('is-open',open);mobile.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open);}
  toggle.addEventListener('click',function(){setOpen(toggle.getAttribute('aria-expanded')!=='true');});
  mobile.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setOpen(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false);});
  window.addEventListener('resize',function(){if(window.innerWidth>900)setOpen(false);});

  function loadAsset(kind,src){
    if(document.querySelector('[data-xixi-'+kind+']'))return;
    var node=document.createElement(kind==='css'?'link':'script');
    node.setAttribute('data-xixi-'+kind,'true');
    if(kind==='css'){node.rel='stylesheet';node.href=src;}else{node.src=src;node.defer=true;}
    document.head.appendChild(node);
  }
  loadAsset('css','assets/share.css');
  loadAsset('js','assets/share.js');
})();
