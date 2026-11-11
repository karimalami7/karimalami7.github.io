/* Karim ALAMI — CV site: partial loader + interactions */
(function () {
  "use strict";

  /* ----- Load HTML partials into [data-include] mount points ----- */
  function loadIncludes() {
    var mounts = Array.prototype.slice.call(document.querySelectorAll("[data-include]"));
    return Promise.all(mounts.map(function (mount) {
      var url = mount.getAttribute("data-include");
      return fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error("Could not load " + url + " (HTTP " + res.status + ")");
          return res.text();
        })
        .then(function (html) {
          var tpl = document.createElement("template");
          tpl.innerHTML = html.trim();
          mount.replaceWith(tpl.content);
        });
    }));
  }

  /* ----- Theme toggle (persisted) ----- */
  function initTheme() {
    var root = document.documentElement;
    document.getElementById("themeToggle").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ka-theme", next); } catch (e) { /* ignore */ }
    });
  }

  /* ----- Mobile menu ----- */
  function initMenu() {
    var burger = document.getElementById("navBurger");
    var links = document.querySelector(".nav-links");
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Scroll reveal ----- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ----- Print ----- */
  function initPrint() {
    document.getElementById("printBtn").addEventListener("click", function () {
      window.print();
    });
  }

  /* ----- Footer year ----- */
  function initYear() {
    document.getElementById("year").textContent = String(new Date().getFullYear());
  }

  loadIncludes()
    .then(function () {
      initTheme();
      initMenu();
      initReveal();
      initPrint();
      initYear();
    })
    .catch(function (err) {
      var p = document.createElement("p");
      p.style.cssText = "padding:40px;text-align:center;font-family:sans-serif;color:#c00";
      p.textContent = "Failed to load site content: " + err.message;
      document.body.appendChild(p);
      if (window.console) console.error(err);
    });
})();
