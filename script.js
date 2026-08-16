/* ================================================================
   SHARED SITE INTERACTIONS
   This file creates the shared header/footer and controls theme state,
   the mobile menu, smooth scrolling, reveals, and the rotating bio.
   ================================================================ */

(() => {
  "use strict";

  const root = document.documentElement;
  const page = document.body.dataset.page || "home";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const pages = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "experience", label: "Experience", href: "experience.html" },
    { key: "projects", label: "Projects", href: "projects.html" },
    { key: "skills", label: "Skills", href: "skills.html" },
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  function navLinks(className = "nav-link") {
    return pages
      .map(
        ({ key, label, href }) =>
          `<a class="${className}${page === key ? " active" : ""}" href="${href}"${page === key ? ' aria-current="page"' : ""}>${label}</a>`
      )
      .join("");
  }

  /* Shared navigation lives here so it is updated once for all five pages. */
  const headerMount = document.getElementById("site-header");
  if (headerMount) {
    headerMount.innerHTML = `
      <header class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-slate-50/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
        <nav class="page-shell flex h-16 items-center justify-between" aria-label="Primary navigation">
          <a href="index.html" class="group inline-flex items-center gap-2 font-bold tracking-tight text-slate-950 dark:text-white" aria-label="Konstantine Bakradze, home">
            <span class="flex size-8 items-center justify-center rounded-lg bg-slate-950 font-mono text-xs text-white transition group-hover:bg-teal-600 dark:bg-teal-500 dark:text-slate-950">KB</span>
            <span class="hidden sm:inline">Konstantine Bakradze</span>
          </a>
          <div class="hidden items-center gap-7 md:flex">${navLinks()}</div>
          <div class="flex items-center gap-2">
            <button class="theme-toggle flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white/70 text-lg transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900" type="button" aria-label="Switch to dark mode" aria-pressed="false" title="Change color theme"><span aria-hidden="true">◐</span></button>
            <button id="mobile-menu-button" class="flex size-10 items-center justify-center rounded-xl border border-slate-300 bg-white/70 font-mono text-lg text-slate-900 transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white md:hidden" type="button" aria-controls="mobile-menu" aria-expanded="false" aria-label="Open navigation menu"><span id="mobile-menu-icon" aria-hidden="true">≡</span></button>
          </div>
        </nav>
        <div id="mobile-menu" class="hidden border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div class="mx-auto grid max-w-6xl gap-1">${navLinks("mobile-nav-link rounded-lg px-3 py-3 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900")}</div>
        </div>
      </header>`;
  }

  const footerMount = document.getElementById("site-footer");
  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="py-8">
        <div class="page-shell flex flex-col gap-3 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© <span id="current-year"></span> Konstantine Bakradze. All rights reserved.</p>
          <p class="font-mono">Semantic HTML · Tailwind CSS · Vanilla JS</p>
        </div>
      </footer>`;
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem("kb-theme");
    } catch (_) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem("kb-theme", theme);
    } catch (_) {
      /* The visual toggle still works when storage is unavailable. */
    }
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#020617" : "#f8fafc");
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
      const icon = button.querySelector("span");
      if (icon) icon.textContent = isDark ? "☀" : "◐";
    });
  }

  applyTheme(getStoredTheme() || (systemTheme.matches ? "dark" : "light"));

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      storeTheme(nextTheme);
      applyTheme(nextTheme);
    });
  });

  systemTheme.addEventListener("change", (event) => {
    if (!getStoredTheme()) applyTheme(event.matches ? "dark" : "light");
  });

  const menuButton = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("mobile-menu-icon");

  function setMenu(open) {
    if (!menu || !menuButton) return;
    menu.classList.toggle("hidden", !open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (menuIcon) menuIcon.textContent = open ? "×" : "≡";
  }

  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenu(false);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    });
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  const bioElement = document.getElementById("dynamic-bio");
  const bioPhrases = [
    "reliable cloud services.",
    "event-driven integrations.",
    "automation that removes toil.",
    "observable production systems.",
  ];
  let bioIndex = 0;

  if (bioElement && !reducedMotion.matches) {
    bioElement.classList.add("transition-opacity", "duration-200");
    window.setInterval(() => {
      bioElement.classList.add("opacity-0");
      window.setTimeout(() => {
        bioIndex = (bioIndex + 1) % bioPhrases.length;
        bioElement.textContent = bioPhrases[bioIndex];
        bioElement.classList.remove("opacity-0");
      }, 220);
    }, 2800);
  }

  /* Prevent unfinished template links from opening misleading destinations. */
  document.querySelectorAll('a[href*="YOUR_"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
    link.setAttribute("title", "Replace this placeholder URL before publishing");
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
