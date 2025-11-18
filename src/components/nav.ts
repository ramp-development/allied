export const nav = () => {
  // Get the navbar, it's container and it's height
  const navbar = document.querySelector<HTMLElement>('.navbar1_component');
  const navContainer = navbar?.querySelector<HTMLElement>('.navbar1_container');
  if (!navbar || !navContainer) return;

  const navHeight = navContainer.offsetHeight || 0;

  // Get all theme sections
  const themeSections = [
    ...document.querySelectorAll<HTMLElement>('section.u-theme-light, section.u-theme-dark'),
  ];
  if (!themeSections.length) return;

  // Get the current section on page load
  let current = themeSections.find((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < navHeight) return rect.bottom >= navHeight;
    return rect.top >= navHeight;
  });

  // If no section found, use the last one
  if (!current) current = themeSections[themeSections.length - 1];
  const initialTheme = getSectionTheme(current);
  setNavTheme(navbar, initialTheme);

  // Create an observer to track the intersection of the sections with the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (!intersecting.length) return;

      intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const nextSection = intersecting[0].target as HTMLElement;
      const theme = getSectionTheme(nextSection);
      setNavTheme(navbar, theme);
    },
    {
      root: null, // viewport
      rootMargin: `-${navHeight}px 0px -100% 0px`, // fire when the nav overlaps the section's top
      threshold: 0, // any intersection >0
    }
  );

  // Observe each section
  themeSections.forEach((section) => observer.observe(section));

  // Helper to set the theme of the navbar
  function setNavTheme(nav: HTMLElement, theme: 'light' | 'dark') {
    nav.classList.remove('u-theme-light', 'u-theme-dark');
    nav.classList.add(`u-theme-${theme}`);
  }

  // Helper to get the theme of a section
  function getSectionTheme(section: HTMLElement): 'light' | 'dark' {
    if (section.classList.contains('u-theme-light')) return 'light';
    return 'dark';
  }
};
