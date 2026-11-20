/* 11:11 Strategy — site behaviour v2. No dependencies. Respects reduced motion. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function q(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }

  /* Header shadow, scroll progress and mobile booking dock */
  var header = document.querySelector(".v-header");
  var bar = document.querySelector(".v-progress span");
  var dock = document.querySelector(".v-dock");
  var hero = document.querySelector("[data-hero]");
  if (dock) document.body.classList.add("has-dock");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    }
    if (dock) {
      var limit = hero ? hero.offsetTop + hero.offsetHeight - 80 : 420;
      var nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 260;
      dock.classList.toggle("is-on", y > limit && !nearEnd);
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* Mobile menu */
  var btn = document.querySelector(".v-menu-btn");
  var drawer = document.getElementById("v-drawer");
  if (btn && drawer) {
    function setMenu(open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("v-menu-open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) { var first = drawer.querySelector("a"); if (first) first.focus(); }
    }
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && document.body.classList.contains("v-menu-open")) { setMenu(false); btn.focus(); } });
    q("a", drawer).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  }

  /* Reveal on scroll */
  var revealables = q("[data-reveal], .v-steps, .v-mark, [data-inview]");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* Count-up numbers: <strong data-count="50000" data-suffix="+">50,000+</strong> */
  function fmt(n, d) { return n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  var counters = q("[data-count]");
  function runCount(el) {
    var end = parseFloat(el.getAttribute("data-count"));
    var pre = el.getAttribute("data-prefix") || "";
    var suf = el.getAttribute("data-suffix") || "";
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var start = null, dur = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(end * eased, dec) + suf;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* Tie-out board: rows tick in, difference counts down to 0.00 */
  var board = document.querySelector("[data-board]");
  if (board) {
    var rows = q(".v-row", board);
    var diff = board.querySelector("[data-diff]");
    var startDiff = parseFloat(board.getAttribute("data-start") || "0");
    function finish() {
      rows.forEach(function (r) { r.classList.add("is-tied"); });
      if (diff) diff.textContent = "0.00";
    }
    if (reduce || !("IntersectionObserver" in window)) { finish(); }
    else {
      var played = false;
      function play() {
        if (played) return; played = true;
        var left = startDiff, perRow = startDiff / rows.length;
        rows.forEach(function (r, i) {
          window.setTimeout(function () {
            r.classList.add("is-tied");
            left = Math.max(0, left - perRow);
            if (diff) diff.textContent = (i === rows.length - 1 ? 0 : left).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          }, 500 + i * 650);
        });
      }
      var bio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { play(); bio.disconnect(); } });
      }, { threshold: 0.35 });
      bio.observe(board);
    }
  }

  /* Tabs (audience switcher) — WAI-ARIA tabs pattern */
  q("[role='tablist']").forEach(function (list) {
    var tabs = q("[role='tab']", list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t, false); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowDown" || k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (k === "ArrowUp" || k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === "Home") n = tabs[0];
        if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    /* Deep link: #for-brokers etc. selects that tab */
    function fromHash() {
      var hash = window.location.hash.replace("#", "");
      var match = tabs.filter(function (t) { return t.getAttribute("data-hash") === hash; })[0];
      if (match) { select(match, false); list.closest("section").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
  });

  /* Current year */
  q("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
})();
