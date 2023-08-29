export const handleThemeChange = (theme: string) => {
  if (theme === "system") {
    localStorage.removeItem("theme");
  } else {
    localStorage.theme = theme;
  }

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  if (
    localStorage.theme === "white" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: white)").matches)
  ) {
    document.documentElement.classList.add("white");
  } else {
    document.documentElement.classList.remove("white");
  }

  if (
    localStorage.theme === "system" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: system)").matches)
  ) {
    document.documentElement.classList.add("system");
  } else {
    document.documentElement.classList.remove("system");
  }
};

export const getCurrentTheme = () => {
  if (localStorage.theme === "dark") {
    return "dark";
  } else if (localStorage.theme === "white") {
    return "white";
  } else if (localStorage.theme === "system") {
    return "system";
  } else {
    return "system";
  }
};
