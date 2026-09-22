/* XI:XI site shell & navigation controller */
(() => {
  'use strict';

  const LINKS = [
    ['services.html', 'Services'],
    ['insights.html', 'Insights'],
    ['story.html', 'About'],
    ['tools.html', 'Financial health check'],
    ['intake.html', 'Get started']
  ];

  const header = document.querySelector('.site-header');
  if (!header) return;

  // Resolve current filename and root base path
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';
  const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

  // Build navigation items
  const buildNavHTML = () =>
    LINKS.map(([url, text]) => {
      const isCurrent = currentFile === url;
      return `<a href="${url}"${isCurrent ? ' aria-current="page"' : ''}>${text}</a>`;
    }).join('');

  // Inject Header Elements
  const brandHTML = `<a class="brand-lockup" href="index.html" aria-label="XI:XI home"><img src="assets/logo-wordmark.svg" alt="XI:XI"></a>`;
  const desktopNavHTML = `<nav aria-label="Primary navigation">${buildNavHTML()}</nav>`;
  const ctaHTML = `<a class="button button-dark header-cta" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a>`;
  const toggleHTML = `<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-mobile-menu" aria-label="Open navigation"><span></span><span></span></button>`;

  header.innerHTML = brandHTML + desktopNavHTML + ctaHTML + toggleHTML;

  // Inject Mobile Navigation Panel
  const mobileMenu = document.createElement('nav');
  mobileMenu.id = 'site-mobile-menu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-label', 'Mobile navigation');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.innerHTML = buildNavHTML() + `<a class="button button-dark" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a>`;

  header.parentNode.insertBefore(mobileMenu, header.nextSibling);

  // Navigation Logic & State Handling
  const toggleBtn = header.querySelector('.menu-toggle');

  const setOpen = (open) => {
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      const firstLink = mobileMenu.querySelector('a');
      firstLink?.focus();
    } else {
      toggleBtn.focus();
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Global Keydown Handler (Escape to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  // Auto-close on resize back to desktop screen
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });

  // Dynamic Asset Injector
  const loadAsset = (kind, src) => {
    if (document.querySelector(`[data-xixi-${kind}]`)) return;

    const node = document.createElement(kind === 'css' ? 'link' : 'script');
    node.setAttribute(`data-xixi-${kind}`, 'true');

    if (kind === 'css') {
      node.rel = 'stylesheet';
      node.href = src;
    } else {
      node.src = src;
      node.defer = true;
    }

    document.head.appendChild(node);
  };

  loadAsset('css', 'assets/share.css');
  loadAsset('js', 'assets/share.js');
})();
