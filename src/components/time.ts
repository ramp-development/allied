import { getTimeInLondon } from '$utils/getTime';

export const time = () => {
  const elements = [...document.querySelectorAll<HTMLElement>('.london-time')];
  if (elements.length === 0) return;

  updateTimeElements(elements);
  setInterval(() => updateTimeElements(elements), 1000);

  function updateTimeElements(elements: HTMLElement[]) {
    const timeInLondon = getTimeInLondon();
    elements.forEach((element) => (element.textContent = timeInLondon));
  }
};
