import { isHslContrastBlack } from './colorUtils';
import colors from './colors';
import { COLOR, COLOR_TYPE } from './constants.js';

//https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

const toHSLObject = hslStr => {
  const [h, s, l] = hslStr.match(/\d+/g).map(Number);
  return { h, s, l };
};

const STORAGE_KEY = "TAILWIND_UI_THEME"

export const setThemeType = (type, color) => {
  if (!colors[color]) return;
  for (const [k, v] of Object.entries(colors[color])) {
    const hsl = toHSLObject(v);
    document.documentElement.style.setProperty(`--color-${type}-${k}`, `${hsl.h}deg ${hsl.s}% ${hsl.l}%`);
    document.documentElement.style.setProperty(`--color-${type}text-${k}`, isHslContrastBlack(hsl) ? "0deg 0% 0%" : "0deg 100% 100%");
  }
};

export const defaultTheme = { primary: COLOR.BLUE, secondary: COLOR.BLUE, tertiary: COLOR.GREEN, danger: COLOR.RED, warn: COLOR.AMBER, success: COLOR.GREEN, bg: COLOR.NEUTRAL };

export function getThemeFromStorage() {
  const colorsString = localStorage.getItem(STORAGE_KEY);
  if (!colorsString) return;
  const colors = JSON.parse(colorsString);
  return colors;
}

export function setThemeInStorage(theme) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

export const getTheme = theme => theme || getThemeFromStorage() || defaultTheme;

export function setPageTheme(theme) {
  theme = getTheme(theme);
  setThemeType(COLOR_TYPE.PRIMARY, theme.primary);
  setThemeType(COLOR_TYPE.SECONDARY, theme.secondary);
  setThemeType(COLOR_TYPE.TERTIARY, theme.tertiary);
  setThemeType(COLOR_TYPE.DANGER, theme.danger);
  setThemeType(COLOR_TYPE.WARN, theme.warn);
  setThemeType(COLOR_TYPE.SUCCESS, theme.success);
  setThemeType(COLOR_TYPE.BG, theme.bg);
}

