import { isHslContrastBlack } from './colorUtils';
import colors from './colors';
import { COLOR, COLOR_TYPE } from './constants.js';

//https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color

const toHSLObject = hslStr => {
  const [h, s, l] = hslStr.match(/\d+/g).map(Number);
  return { h, s, l };
};

const STORAGE_KEY = "TAILWIND_UI_THEME"

export const setThemeType = (type, color, clrs) => {
  if (!clrs[color]) return;
  for (const [k, v] of Object.entries(clrs[color])) {
    const hsl = toHSLObject(v);
    document.documentElement.style.setProperty(`--color-${type}-${k}`, `${hsl.h}deg ${hsl.s}% ${hsl.l}%`);
    document.documentElement.style.setProperty(`--color-${type}text-${k}`, isHslContrastBlack(hsl) ? "0deg 0% 0%" : "0deg 100% 100%");
  }
};

export const defaultTheme = { primary: COLOR.BLUE, secondary: COLOR.BLUE, tertiary: COLOR.GREEN, danger: COLOR.RED, warn: COLOR.AMBER, success: COLOR.GREEN, bg: COLOR.NEUTRAL };

export function getThemeFromStorage() {
  if (typeof(localStorage) === "undefined")  return;
  const colorsString = localStorage.getItem(STORAGE_KEY);
  if (!colorsString) return;
  return JSON.parse(colorsString);
}

export function setThemeInStorage(theme) {
  if (typeof(localStorage) !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }
}

export const getTheme = theme => theme || getThemeFromStorage() || defaultTheme;

function setPageColorVars(clrs) {
  for (const [c, o] of Object.entries(clrs)) {
    for (const [k, v] of Object.entries(o)) {
      const hsl = toHSLObject(v);
      document.documentElement.style.setProperty(`--color-${c}-${k}`, `${hsl.h}deg ${hsl.s}% ${hsl.l}%`);
    }
  }
}

export function setPageTheme(theme, customColors) {
  const clrs = customColors || colors;
  setPageColorVars(clrs);
  theme = getTheme(theme);
  setThemeType(COLOR_TYPE.PRIMARY, theme.primary, clrs);
  setThemeType(COLOR_TYPE.SECONDARY, theme.secondary, clrs);
  setThemeType(COLOR_TYPE.TERTIARY, theme.tertiary, clrs);
  setThemeType(COLOR_TYPE.DANGER, theme.danger, clrs);
  setThemeType(COLOR_TYPE.WARN, theme.warn, clrs);
  setThemeType(COLOR_TYPE.SUCCESS, theme.success, clrs);
  setThemeType(COLOR_TYPE.BG, theme.bg, clrs);
}

