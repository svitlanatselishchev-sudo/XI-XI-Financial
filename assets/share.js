/* XI:XI share control. Native share on supported devices; clipboard fallback elsewhere. */
(function(){
  'use strict';
  var icon='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"></circle><circle cx="6" cy="12" r="2.5"></circle><circle cx="18" cy="19" r="2.5"></circle><path d="m8.2 10.8 7.5-4.3M8.2 13.2l7.5 4.3"></path></svg>';
  function showToast(message){var old=document.querySelector('.share-toast');if(old)old.remove();var toast=document.createElement('div');toast.className='share-toast';toast.setAttribute('role','status');toast.textContent=message;document.body.appendChild(toast);window.setTimeout(function(){toast.remove();},2600);}
  function fallbackCopy(url){var field=document.createElement('textarea');field.value=url;field.setAttribute('readonly','');field.style.position='fixed';field.style.opacity='0';document.body.appendChild(field);field.select();try{document.execCommand('copy');showToast('Link copied — ready to send.');}catch(e){showToast('Copy this link: '+url);}field.remove();}
  function copy(url){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(url).then(function(){showToast('Link copied — ready to send.');}).catch(function(){fallbackCopy(url);});}else fallbackCopy(url);}
  function share(title,url){if(navigator.share){navigator.share({title:title,url:url}).catch(function(error){if(error.name!=='AbortError')copy(url);});}else copy(url);}
  function init(){
    document.querySelectorAll('[data-share], [data-shareable], .service-card, .card[data-shareable], .article-share-target').forEach(function(target){
      if(target.querySelector('.share-control'))return;
      target.classList.add('share-ready');
      var button=document.createElement('button');button.type='button';button.className='share-control';button.innerHTML=icon+'<span>Share</span>';button.setAttribute('aria-label','Share '+(target.getAttribute('data-share-title')||document.title));
      button.addEventListener('click',function(event){event.preventDefault();event.stopPropagation();var link=target.getAttribute('data-share-url')||window.location.href;var title=target.getAttribute('data-share-title')||document.title;share(title,new URL(link,window.location.href).href);});
      target.insertBefore(button,target.firstChild);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
