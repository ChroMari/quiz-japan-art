const createRange = (classList: Array<string>): HTMLInputElement => {
  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0';
  input.max = '10';
  input.value = '5';

  if (classList[0].length > 0) input.classList.add(...classList);

  return input;
};

export default createRange;
