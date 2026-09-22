showToast('Link copied to clipboard');
      } else {
        // Fallback for older browsers / non-HTTPS contexts
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
          showToast('Link copied to clipboard');
        } else {
          showToast('Unable to copy link');
        }
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Unable to copy link');
    }
  }

  /**
   * Handles button click: attempts Web Share API first, falls back to clipboard copy.
   * @param {Event} e 
   */
  async function handleShare(e) {
    const button = e.currentTarget;
    const url = button.dataset.shareUrl || window.location.href;
    const title = button.dataset.shareTitle || document.title;
    const text = button.dataset.shareText || '';

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        // Ignore AbortError caused by user canceling the share sheet
        if (err.name !== 'AbortError') {
          console.error('Web Share failed:', err);
          await copyToClipboard(url);
        }
      }
    } else {
      await copyToClipboard(url);
    }
  }

  /**
   * Initializes share controls across all .share-ready containers or explicit elements.
   */
  function initShareControls() {
    const targets = document.querySelectorAll('.share-ready, [data-share-target]');

    targets.forEach((target) => {
      if (target.querySelector('.share-control')) return; // Avoid duplicate injection

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'share-control';
      button.setAttribute('aria-label', 'Share article');
      button.innerHTML = `${ICON_SVG}<span>Share</span>`;

      // Inherit data attributes if defined on container
      if (target.dataset.shareUrl) button.dataset.shareUrl = target.dataset.shareUrl;
      if (target.dataset.shareTitle) button.dataset.shareTitle = target.dataset.shareTitle;
      if (target.dataset.shareText) button.dataset.shareText = target.dataset.shareText;

      button.addEventListener('click', handleShare);
      target.appendChild(button);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShareControls);
  } else {
    initShareControls();
  }
})();
