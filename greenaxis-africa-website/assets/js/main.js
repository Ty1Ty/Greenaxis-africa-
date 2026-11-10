/* GreenAxis Africa Limited - site scripts (no dependencies) */
(function () {
  var d = document, w = window;
  d.documentElement.className += " js";
  w.dataLayer = w.dataLayer || [];

  function track(name, params) {
    var p = params || {};
    w.dataLayer.push(Object.assign({ event: name }, p));
    if (typeof w.gtag === "function") { w.gtag("event", name, p); }
  }

  function ready(fn) {
    if (d.readyState !== "loading") { fn(); } else { d.addEventListener("DOMContentLoaded", fn); }
  }

  ready(function () {
    // Mobile navigation
    var btn = d.querySelector(".nav-toggle"), nav = d.getElementById("menu");
    if (btn && nav) {
      btn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      d.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("open")) { btn.click(); btn.focus(); }
      });
    }

    // Footer year
    var y = String(new Date().getFullYear());
    d.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = y; });

    // Scroll reveal
    var items = d.querySelectorAll(".reveal");
    if ("IntersectionObserver" in w) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      items.forEach(function (el) { io.observe(el); });
      setTimeout(function () { items.forEach(function (el) { el.classList.add("in"); }); }, 4000);
    } else {
      items.forEach(function (el) { el.classList.add("in"); });
    }

    // Conversion tracking for calls, WhatsApp and quote clicks
    d.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("[data-track]") : null;
      if (a) { track(a.getAttribute("data-track"), { link_url: a.getAttribute("href"), page_path: location.pathname }); }
    });

    // Forms: record the page and preselect service from ?service=
    d.querySelectorAll("form[data-form]").forEach(function (f) {
      var pg = f.querySelector('input[name="page"]');
      if (pg) { pg.value = location.pathname; }
      f.addEventListener("submit", function () { track("form_submit", { form_name: f.getAttribute("data-form") }); });
    });
    var q = new URLSearchParams(location.search).get("service");
    if (q) {
      d.querySelectorAll('select[name="service"]').forEach(function (s) {
        Array.prototype.forEach.call(s.options, function (o) { if (o.value.toLowerCase() === q.toLowerCase()) { s.value = o.value; } });
      });
    }

    // Thank-you page conversion event
    if (d.body.getAttribute("data-conversion")) { track(d.body.getAttribute("data-conversion"), { page_path: location.pathname }); }
  });
})();
