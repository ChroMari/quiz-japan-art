const createImg = (src: string, text: string, classList: Array<string>): HTMLImageElement => {
  const img = document.createElement('img');
  if (classList[0].length > 1) img.classList.add(...classList);
  img.src = src;
  img.alt = text;

  return img;
};

export default createImg;
