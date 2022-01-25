const createButton = (text: string, classList: Array<string>): HTMLButtonElement => {
  const element = document.createElement('button');
  element.classList.add(...classList);
  element.textContent = text;

  return element;
};

export default createButton;
