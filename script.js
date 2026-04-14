document.documentElement.classList.add("js");

const STORAGE_KEY = "fan-jiang-theme";
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleValue = document.querySelector(".theme-toggle-value");

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;

  if (themeToggleValue) {
    themeToggleValue.textContent = theme === "light" ? "Light" : "Dark";
  }
};

const storedTheme = localStorage.getItem(STORAGE_KEY);
const initialTheme = storedTheme || "dark";

applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
  });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 70}ms`;
  observer.observe(element);
});
