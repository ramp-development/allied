import { gsap } from 'gsap';

export const textLoop = () => {
  const components = [...document.querySelectorAll<HTMLElement>('[data-text-loop="component"]')];
  if (components.length === 0) return;

  components.forEach((component) => {
    setInterval(() => {
      animateTextLoop(component);
    }, 3000);
  });

  function animateTextLoop(component: HTMLElement) {
    const texts = [...component.querySelectorAll<HTMLElement>('[data-text-loop="text"]')];
    if (texts.length === 0) return;

    let nextIndex = 0;
    const currentIndex = texts.findIndex((text) => text.classList.contains('is-current'));
    if (currentIndex !== texts.length - 1) {
      nextIndex = currentIndex + 1;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        texts[currentIndex].classList.remove('is-current');
        texts[nextIndex].classList.remove('is-next');
        texts[currentIndex].classList.add('is-next');
        texts[nextIndex].classList.add('is-current');
      },
    });

    tl.to(component, {
      width: `${texts[nextIndex].offsetWidth}px`,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    tl.to(
      texts[currentIndex],
      {
        transform: `translateY(-100%)`,
        duration: 1,
        ease: 'power2.inOut',
        clearProps: true,
      },
      '<'
    );

    tl.to(
      texts[nextIndex],
      {
        transform: `translateY(-100%)`,
        duration: 1,
        ease: 'power2.inOut',
        clearProps: true,
      },
      '<'
    );

    component.dataset.textLoopIndex = nextIndex.toString();
  }
};
