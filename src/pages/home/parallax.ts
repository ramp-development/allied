import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const parallax = () => {
  gsap.registerPlugin(ScrollTrigger);

  function initDropParallax() {
    const dropWrappers = document.querySelectorAll<HTMLElement>('.drop-wrapper');

    ScrollTrigger.killAll();
    const tl = gsap.timeline();

    dropWrappers.forEach((wrapper, index) => {
      const speed = 0.25 + (index % 4) * 0.05;
      const direction = index % 2 === 0 ? 1 : -1;
      gsap.set(wrapper, { y: 0 });

      tl.to(
        wrapper,
        {
          y: `${direction * 50}%`,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: speed,
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
            markers: false,
          },
        },
        0
      );
    });
  }

  setTimeout(initDropParallax, 100);
  window.addEventListener('resize', () => ScrollTrigger.refresh());
  new ResizeObserver(() => ScrollTrigger.refresh()).observe(document.body);

  const observer = new MutationObserver((mutations) => {
    let needsRefresh = false;
    mutations.forEach((m: MutationRecord) => {
      m.addedNodes.forEach((n) => {
        if (
          (n as HTMLElement).classList?.contains('drop-wrapper') ||
          ((n as HTMLElement).querySelectorAll &&
            (n as HTMLElement).querySelectorAll('.drop-wrapper').length > 0)
        ) {
          needsRefresh = true;
        }
      });
    });
    if (needsRefresh) {
      initDropParallax();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
};
