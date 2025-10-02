export function parseNumber(input: string): number | '' {
  const trimmedInput = input.replace(/^0{2,}/, '');

  if (trimmedInput === '') {
    return '';
  }

  const num = Number(trimmedInput);

  if (isNaN(num) || !isFinite(num)) {
    return '';
  }

  if (num === 0) {
    return '';
  }

  return num;
}
