(() => {
  const themeKey = "eduadaptTheme";
  const root = document.documentElement;

  function applyTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = selectedTheme;
    localStorage.setItem(themeKey, selectedTheme);

    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      const isSelected = button.dataset.themeChoice === selectedTheme;
      button.classList.toggle("active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function setupThemeControls() {
    document.querySelectorAll("[data-theme-choice]").forEach((button) => {
      button.addEventListener("click", () =>
        applyTheme(button.dataset.themeChoice),
      );
    });
    applyTheme(root.dataset.theme || localStorage.getItem(themeKey) || "dark");
  }

  applyTheme(localStorage.getItem(themeKey) || "dark");
  document.addEventListener("DOMContentLoaded", setupThemeControls);
})();
