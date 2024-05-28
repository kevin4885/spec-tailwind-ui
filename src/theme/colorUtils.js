export function hexPart(c) {
  return `0${c.toString(16)}`.slice(-2);
}

export function hexToRgb(hex) {
  const color = `#${hex.replace(/#/gi, "")}`;
  const components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (!components) {
    return null;
  }

  return {
    r: parseInt(components[1], 16),
    g: parseInt(components[2], 16),
    b: parseInt(components[3], 16),
  };
}

export function rgbToHex({ r, g, b }) {
  return `#${hexPart(r)}${hexPart(g)}${hexPart(b)}`;
}

export function luminance({ r, g, b }) {
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;
  const GAMMA = 2.4;

  var a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export function rgbContrast(rgb1, rgb2) {
  var lum1 = luminance(rgb1);
  var lum2 = luminance(rgb2);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function isRgbContrastBlack(rgb) {
  const w = rgbContrast(rgb, { r: 255, g: 255, b: 255 });
  const b = rgbContrast(rgb, { r: 0, g: 0, b: 0 });
  return b > w + 8;
}

export function isHslContrastBlack(hsl) {
  return isRgbContrastBlack(hslToRgb(hsl));
}

export function hslTextToObject(hslStr) {
  const [h, s, l] = hslStr.match(/\d+/g).map(Number);
  return { h, s, l };
}

export function hslContrast(hsl1, hsl2) {
  return rgbContrast(hslToRgb(hsl1), hslToRgb(hsl2));
}

export const hexToHsl = hex => {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb);
};

export const hslToHex = ({ h, s, l }) => {
  const rgb = hslToRgb({ h, s, l });
  return rgbToHex(rgb);
};

export const toHSLObject = hslStr => {
  const [h, s, l] = hslStr.match(/\d+/g).map(Number);
  return { h, s, l };
};

export const hslToRgb = ({ h, s, l }) => {
  s /= 100;
  l /= 100;
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;
  let [R, G, B] = (0 <= h && h < 60 && [C, X, 0]) || (60 <= h && h < 120 && [X, C, 0]) || (120 <= h && h < 180 && [0, C, X]) || (180 <= h && h < 240 && [0, X, C]) || (240 <= h && h < 300 && [X, 0, C]) || (300 <= h && h < 360 && [C, 0, X]);
  [R, G, B] = [(R + m) * 255, (G + m) * 255, (B + m) * 255];
  return { r: Math.round(R), g: Math.round(G), b: Math.round(B) };
};

export function rgbToHsl({ r, g, b }) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l };
}


