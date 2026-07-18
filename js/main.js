/* Local Lawn Mowing & Maintenance — front-end interactions
   Vanilla JS, no dependencies. Safe to load on every page. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- Sticky header shadow on scroll ---- */
    var header = document.querySelector(".header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* ---- Mobile nav toggle ---- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* ---- Scroll reveal ---- */
    var revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealItems.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealItems.forEach(function (el) { io.observe(el); });
    } else {
      revealItems.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---- Animated stat counters ---- */
    var counters = document.querySelectorAll("[data-count]");
    if ("IntersectionObserver" in window && counters.length) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-count"));
          var suffix = el.getAttribute("data-suffix") || "";
          var prefix = el.getAttribute("data-prefix") || "";
          var dur = 1400, start = null;
          var step = function (ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cio.observe(el); });
    }

    /* ---- Before / after compare slider ---- */
    document.querySelectorAll(".compare").forEach(function (root) {
      var after = root.querySelector(".compare-after");
      var handle = root.querySelector(".compare-handle");
      var range = root.querySelector(".compare-range");
      if (!after || !handle || !range) return;
      var apply = function (v) {
        after.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
        handle.style.left = v + "%";
      };
      range.addEventListener("input", function () { apply(range.value); });
      apply(range.value);
    });

    /* ---- Quote form (demo submit → success state) ---- */
    document.querySelectorAll("form[data-quote-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var wrap = form.closest("[data-form-wrap]") || form.parentNode;
        var success = wrap.querySelector("[data-form-success]");
        if (success) {
          form.classList.add("is-hidden");
          success.classList.remove("is-hidden");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

    /* ---- Footer year ---- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

  });
})();
