export function capitalizeFirstLetter(word: string): string {
  const words = word.charAt(0).toUpperCase() + word.slice(1);
  const regex = /([A-Z])/g;
  return words.replace(regex, ' $1');
}
