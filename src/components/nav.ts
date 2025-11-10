export const nav = () => {
  // 1. grab your navbar and it's height
  const navbar = document.querySelector<HTMLElement>('.navbar1_component');
  if (!navbar) return;
  const navContainer = document.querySelector<HTMLElement>('.navbar1_container');
  if (!navContainer) return;
  const navHeight = navContainer.offsetHeight || 0;

  // 2. grab all your theme sections
  const themeSections = Array.from(
    document.querySelectorAll<HTMLElement>('section.u-theme-dark, section.u-theme-light')
  );
  if (!themeSections.length) return;

  // 3. on page-load, figure out which section “owns” the top of the viewport
  // find the first section where the top of the viewport is between the top and bottom
  let current = themeSections.find((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < navHeight) return rect.bottom >= navHeight;
    return rect.top >= navHeight;
  });
  // if none found (we’re scrolled past everything), use the last one
  if (!current) current = themeSections[themeSections.length - 1];
  setTheme(current.classList.contains('u-theme-light'));

  // 4. now observe each section’s TOP crossing at viewport-top
  const observer = new IntersectionObserver(
    (entries) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting);
      if (!intersecting.length) return;

      intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      const nextSection = intersecting[0].target as HTMLElement;
      const isLight = nextSection.classList.contains('u-theme-light');
      setTheme(isLight);
    },
    {
      root: null, // viewport
      rootMargin: `-${navHeight}px 0px -100% 0px`, // fire when the nav overlaps the section's top
      threshold: 0, // any intersection >0
    }
  );

  // kick off the observer
  themeSections.forEach((section) => observer.observe(section));

  // helper to set exactly one class
  function setTheme(isLight: boolean) {
    if (!navbar) return;
    navbar.classList.remove('is-light', 'is-dark');
    navbar.classList.add(isLight ? 'is-light' : 'is-dark');
  }
};
