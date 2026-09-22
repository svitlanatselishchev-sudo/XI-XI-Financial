/* XI:XI share control. Native share on supported devices; clipboard fallback elsewhere. */
(() => {
  'use strict';

  const ICON_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.3M8.2 13.2l7.5 4.3"/></svg>`;

  /**
   * Displays a temporary toast message at the bottom of the screen.
   * @param {string} message 
   */
  function showToast(message) {
    document.querySelector('.share-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  /**
   * Copies text to the clipboard with legacy fallback support.
   * @param {string} url 
   */
  async function copyToClipboard(url) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        input.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      showToast('Link copied — ready to send.');
    } catch {
      showToast(`Copy this link: ${url}`);
    }
  }

  /**
   * Triggers native Web Share API or falls back to clipboard copying.
   * @param {string} title 
   * @param {string} url 
   */
  async function share(title, url) {
    const fullUrl = new URL(url, window.location.href).href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: fullUrl });
      } catch (error) {
        if (error.name !== 'AbortError') {
          await copyToClipboard(fullUrl);
        }
      }
    } else {
      await copyToClipboard(fullUrl);
    }
  }

  /**
   * Mounts share buttons inside target containers.
   */
  function injectShareButtons() {
    const selector = '[data-share], [data-shareable], .service-card, .card[data-shareable], .article-share-target';
    const targets = document.querySelectorAll(selector);

    targets.forEach((target) => {
      if (target.querySelector('.share-control')) return;

      target.classList.add('share-ready');

      const title = target.getAttribute('data-share-title') || document.title;
      const button = document.createElement('button');
      
      button.type = 'button';
      button.className = 'share-control';
      button.setAttribute('aria-label', `Share ${title}`);
      button.innerHTML = `${ICON_SVG}<span>Share</span>`;

      target.insertBefore(button, target.firstChild);
    });
  }

  // Global Event Listener (Delegation)
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.share-control');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const target = button.closest('[data-share], [data-shareable], .service-card, .card[data-shareable], .article-share-target') || button.parentElement;
    const url = target?.getAttribute('data-share-url') || window.location.href;
    const title = target?.getAttribute('data-share-title') || document.title;

    share(title, url);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShareButtons);
  } else {
    injectShareButtons();
  }
})();
