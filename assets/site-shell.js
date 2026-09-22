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

  // Resolve current page and compute path depth for relative routing
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  // Build navigation items with correct aria-current state
  const buildNavHTML = () =>
    LINKS.map(([url, text]) => {
      const isCurrent = currentFile === url;
      return `<a href="${url}"${isCurrent ? ' aria-current="page"' : ''}>${text}</a>`;
    }).join('');

  // Inject Header Elements into HTML Structure
  const brandHTML = `<a class="brand-lockup" href="index.html" aria-label="XI:XI home"><img src="assets/logo-wordmark.svg" alt="XI:XI" width="180" height="32"></a>`;
  const desktopNavHTML = `<nav class="nav-menu" aria-label="Primary navigation">${buildNavHTML()}</nav>`;
  const ctaHTML = `<a class="button button-dark header-cta" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a>`;
  const toggleHTML = `<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-mobile-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>`;

  header.innerHTML = brandHTML + desktopNavHTML + ctaHTML + toggleHTML;

  // Inject Mobile Navigation Overlay
  const mobileMenu = document.createElement('nav');
  mobileMenu.id = 'site-mobile-menu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('aria-label', 'Mobile navigation');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.innerHTML = buildNavHTML() + `<div class="mobile-cta-wrap"><a class="button button-dark" href="https://cal.com/xix-lana" target="_blank" rel="noopener">Book a call</a></div>`;

  header.parentNode.insertBefore(mobileMenu, header.nextSibling);

  // Navigation Logic & Accessibility Focus Trap
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
    } else if (document.activeElement && mobileMenu.contains(document.activeElement)) {
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

  // Global Keydown Handler (Escape Key Close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  // Auto-close menu when expanding window to desktop layout
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  // Dynamic Shared Asset Injector (Guards against duplicate scripts/styles)
  const loadAsset = (kind, src) => {
    if (document.querySelector(`[data-xixi-${kind}="${src}"]`)) return;

    const node = document.createElement(kind === 'css' ? 'link' : 'script');
    node.setAttribute(`data-xixi-${kind}`, src);

    if (kind === 'css') {
      node.rel = 'stylesheet';
      node.href = src;
    } else {
      node.src = src;
      node.defer = true;
    }

    document.head.appendChild(node);
  };

  // Load shared module assets across secondary pages
  loadAsset('css', 'assets/share.css');
  loadAsset('js', 'assets/share.js');
})();
