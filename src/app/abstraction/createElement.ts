const createElement = (tag: string, classList: Array<string>): HTMLElement => {
  const element = document.createElement(tag);
  if (classList[0].length > 0) element.classList.add(...classList);

  return element;
};

export default createElement;
