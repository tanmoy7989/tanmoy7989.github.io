/**
 * Internal theme builder — reads theme_colors.json and produces DaisyUI themes.
 * To change site colors, edit theme_colors.json only.
 */
import themeColors from './theme_colors.json' with { type: 'json' };

const THEME_PREFIX = 'tsanyal';

function resolveAccentHex({ accent, colors }) {
  const hex = colors[accent];
  if (!hex) {
    const names = Object.keys(colors).join(', ');
    throw new Error(
      `theme_colors.json: unknown accent "${accent}". Available names: ${names}`
    );
  }
  return hex;
}

const accentHex = resolveAccentHex(themeColors);

export const siteTheme = {
  accent: accentHex,
  accentName: themeColors.accent,
  colors: themeColors.colors,
  lightThemeName: `${THEME_PREFIX}-light`,
  darkThemeName: `${THEME_PREFIX}-dark`,
};

/** Build DaisyUI light + dark themes from the resolved accent hex. */
export function buildDaisyThemes(accent = accentHex) {
  return {
    [siteTheme.lightThemeName]: {
      primary: accent,
      'primary-content': '#ffffff',
      secondary: accent,
      'secondary-content': '#ffffff',
      accent,
      'accent-content': '#ffffff',
      neutral: '#1f2937',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#f3f4f6',
      'base-content': '#1f2937',
    },
    [siteTheme.darkThemeName]: {
      primary: accent,
      'primary-content': '#ffffff',
      secondary: accent,
      'secondary-content': '#ffffff',
      accent,
      'accent-content': '#111827',
      neutral: '#e5e7eb',
      'base-100': '#111827',
      'base-200': '#1f2937',
      'base-300': '#374151',
      'base-content': '#f9fafb',
    },
  };
}
