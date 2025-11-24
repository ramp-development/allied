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

  function animateCursor() {
    const ease = 0.5;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';

    const playIcon = document.querySelector<HTMLElement>('.lightbox-play-icon.active');
    if (playIcon) {
      playIcon.style.left = currentX - playIcon.offsetWidth / 2 + 6 + 'px';
      playIcon.style.top = currentY - playIcon.offsetHeight / 2 + 6 + 'px';
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    const playIcon = document.querySelector<HTMLElement>('.lightbox-play-icon.active');
    if (playIcon) playIcon.style.transform = 'scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = cursor.classList.contains('hidden') ? 'scale(0)' : 'scale(1)';
    const playIcon = document.querySelector<HTMLElement>('.lightbox-play-icon.active');
    if (playIcon) playIcon.style.transform = 'scale(1)';
  });

  const lightbox = document.querySelector('.w-lightbox');
  if (!lightbox) return;

  const playIcon = lightbox.querySelector('.lightbox-play-icon');
  if (!playIcon) return;

  lightbox.addEventListener('mouseenter', () => {
    cursor.classList.add('hidden');
    playIcon.classList.add('active');
  });

  lightbox.addEventListener('mouseleave', () => {
    cursor.classList.remove('hidden');
    playIcon.classList.remove('active');
  });
};
