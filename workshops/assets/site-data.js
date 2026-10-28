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
    p2: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/28E9ASb61baE9my2aSaR201" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/28E9ASb61baE9my2aSaR201" } },
    p3: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/8x28wOgql0w0eGScb0aR202" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/8x28wOgql0w0eGScb0aR202" } },
    p4: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/dRm5kCeidguY0Q21wmaR203" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/dRm5kCeidguY0Q21wmaR203" } },
    p5: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/7sYeVc7TPemQcyKdf4aR204" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/7sYeVc7TPemQcyKdf4aR204" } },
    p6: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/6oUcN4b610w06am1wmaR205" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/6oUcN4b610w06am1wmaR205" } },
    p7: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/bJe14m0rn5q56i1wmaR209" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/bJe14m0rn5q56i1wmaR209" } },
    p8: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/7sY14mca57YsaqCgrgaR206" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/7sY14mca57YsaqCgrgaR206" } },
    p9: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/dRm9AS1vr92weGS7UKaR207" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/dRm9AS1vr92weGS7UKaR207" } },
    p10: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/9B628q7TP6UoeGS0siaR208" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/9B628q7TP6UoeGS0siaR208" } },
    p11: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/4gM5kCgql1A48iucb0aR20a" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/4gM5kCgql1A48iucb0aR20a" } },
    series: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/28E8w03Dz31cdC0ej8aR20b" }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/28E8w03Dz31cdC0ej8aR20b" } },
    i1: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/5kQ7sKde94MggP07UKaR20c", price: 125 }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/5kQ7sKde94MggP07UKaR20c", price: 125 } },
    i2: { ua: { status: "open", date: "", time: "", link: "https://buy.stripe.com/aFa6oG2zv92w8iucb0aR20d", price: 125 }, en: { status: "open", date: "", time: "", link: "https://buy.stripe.com/aFa6oG2zv92w8iucb0aR20d", price: 125 } },
  }
};
