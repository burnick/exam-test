/**
 * Convert hex colors  with alpha number options to rgb string
 * @param hex
 * @param alpha
 * @returns string
 */

const hexToRgb = (hex: string, alpha: number) => {
  const red = parseInt(hex.slice(1, 3), 16),
    green = parseInt(hex.slice(3, 5), 16),
    blue = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
  }
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
};

export default hexToRgb;
