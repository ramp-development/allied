export const cursor = () => {
  if (!window.matchMedia('(min-width: 992px)').matches) return;

  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  cursor.style.opacity = '0';
  document.body.appendChild(cursor);

  // update initial mouseX and mouseY to match the mouse position and fallback to 0 if not

  let mouseX = 0,
    mouseY = 0,
    currentX = 0,
    currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - 6;
    mouseY = e.clientY - 6;
    cursor.style.opacity = '1';
  });

  const lightbox = document.querySelector<HTMLElement>('.w-lightbox');
  const playIcon = lightbox?.querySelector<HTMLElement>('.lightbox-play-icon');
  if (playIcon) {
    playIcon.style.width = `${playIcon.offsetWidth}px`;
    playIcon.style.height = `${playIcon.offsetHeight}px`;
  }

  let isMouseInLightbox = false;
  let lightboxMouseX = 0;
  let lightboxMouseY = 0;
  let currentLightboxX = 0;
  let currentLightboxY = 0;

  function animateCursor() {
    const ease = 0.5;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';

    if (playIcon && lightbox) {
      // Only update position when mouse is inside lightbox
      if (isMouseInLightbox) {
        currentLightboxX += (lightboxMouseX - currentLightboxX) * ease;
        currentLightboxY += (lightboxMouseY - currentLightboxY) * ease;
        playIcon.style.left = currentLightboxX - playIcon.offsetWidth / 2 + 'px';
        playIcon.style.top = currentLightboxY - playIcon.offsetHeight / 2 + 'px';
      }
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    if (playIcon) playIcon.style.transform = 'scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = cursor.classList.contains('hidden') ? 'scale(0)' : 'scale(1)';
    if (playIcon) playIcon.style.transform = 'scale(1)';
  });

  if (!lightbox || !playIcon) return;

  lightbox.addEventListener('mousemove', (e) => {
    const rect = lightbox.getBoundingClientRect();
    lightboxMouseX = e.clientX - rect.left;
    lightboxMouseY = e.clientY - rect.top;
  });

  lightbox.addEventListener('mouseenter', () => {
    cursor.classList.add('hidden');
    playIcon.classList.add('active');
    isMouseInLightbox = true;
    // Initialize position to current mouse position relative to lightbox - set immediately (no ease)
    const rect = lightbox.getBoundingClientRect();
    lightboxMouseX = mouseX + 6 - rect.left;
    lightboxMouseY = mouseY + 6 - rect.top;
    currentLightboxX = lightboxMouseX;
    currentLightboxY = lightboxMouseY;
    // Temporarily disable transition for immediate positioning
    const originalTransition = playIcon.style.transition;
    playIcon.style.transition = 'none';
    // Set position and opacity to 0 immediately
    playIcon.style.left = currentLightboxX - playIcon.offsetWidth / 2 + 'px';
    playIcon.style.top = currentLightboxY - playIcon.offsetHeight / 2 + 'px';
    playIcon.style.opacity = '0';
    // Re-enable transition after a frame
    requestAnimationFrame(() => {
      playIcon.style.transition = originalTransition;
      // Set opacity to 1, which will animate from 0 to 1
      playIcon.style.opacity = '1';
    });
  });

  lightbox.addEventListener('mouseleave', () => {
    cursor.classList.remove('hidden');
    playIcon.classList.remove('active');
    isMouseInLightbox = false;
    // Temporarily disable transition for immediate reset
    const originalTransition = playIcon.style.transition;
    playIcon.style.transition = 'none';
    // Set opacity to 0 immediately
    playIcon.style.opacity = '0';
    // Reset to original position by clearing inline styles (immediate, no ease)
    playIcon.style.removeProperty('left');
    playIcon.style.removeProperty('top');
    // Re-enable transition after a frame
    requestAnimationFrame(() => {
      playIcon.style.transition = originalTransition;
      // Set opacity to 1, which will animate from 0 to 1
      playIcon.style.opacity = '1';
    });
    // Reset position variables
    currentLightboxX = 0;
    currentLightboxY = 0;
  });
};
