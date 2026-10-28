/* ============================================================
   XI:XI WORKSHOPS: THE ONLY FILE YOU EDIT TO OPEN REGISTRATION
   ------------------------------------------------------------
   For each workshop and language (ua / en):
     status: "soon"  = registration closed, button shows "Registration soon"
             "open"  = registration open, button opens the link below
     date:   text shown on the page, e.g. "Середа, 11 листопада"
     time:   text shown on the page, e.g. "11:00 ET · 10:00 CT"
     link:   PAID  = Stripe payment link (https://buy.stripe.com/...)
             FREE  = Google Form link (https://forms.gle/...)
   Individual sessions (i1, i2) also take  price: 125   (a number, no $).
   Nothing else on the site needs to change.
   ============================================================ */
window.XIXI = {
  announce: "https://instagram.com/xixistrategy",
  events: {
    f1: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    f2: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    f3: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    f4: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    f5: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    f6: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    m1: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    // P1: Ukrainian session is set for Nov 11. The English Saturday date is not confirmed yet.
    p1: { ua: { status: "open", date: "Середа, 11 листопада", time: "11:00 ET · 10:00 CT", link: "https://buy.stripe.com/3cIfZgeidceIfKW5MCaR200" }, en: { status: "soon", date: "", time: "", link: "" } },
    p2: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p3: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p4: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p5: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p6: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p7: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p8: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p9: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p10: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    p11: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    series: { ua: { status: "soon", date: "", time: "", link: "" }, en: { status: "soon", date: "", time: "", link: "" } },
    i1: { ua: { status: "soon", date: "", time: "", link: "", price: 125 }, en: { status: "soon", date: "", time: "", link: "", price: 125 } },
    i2: { ua: { status: "soon", date: "", time: "", link: "", price: 125 }, en: { status: "soon", date: "", time: "", link: "", price: 125 } },
  }
};
