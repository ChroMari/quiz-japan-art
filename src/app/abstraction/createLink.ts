const createLink = (text: string, src: string, classList: Array<string>): HTMLElement => {
  const element = document.createElement('a');
  element.classList.add(...classList);
  element.textContent = text;
  element.href = src;

  return element;
};

export default createLink;
