export type Theme = 'light' | 'dark';
export type AccentColor = 'blue' | 'purple' | 'pink' | 'red' | 'yellow' | 'green' | 'bw' | 'tan';

export const colorMap: Record<AccentColor, string> = {
  blue: '#0066FF',
  purple: '#9933FF',
  pink: '#FF00FF',
  red: '#FF0000',
  yellow: '#FFDD00',
  green: '#00CC44',
  bw: '#767676',
  tan: '#E8DCC8',
};

export const colorMapDarkMode: Record<AccentColor, string> = {
  blue: '#0066FF',
  purple: '#9933FF',
  pink: '#FF00FF',
  red: '#FF0000',
  yellow: '#FFDD00',
  green: '#00CC44',
  bw: '#666666',
  tan: '#E8DCC8',
};

export const getBadgeTextColor = (accentColor: AccentColor, theme: Theme): string => {
  if (accentColor === 'bw') return theme === 'dark' ? '#ffffff' : '#000000';
  if (accentColor === 'yellow' || accentColor === 'tan') return '#000000';
  return '#ffffff';
};

export const getCardBackground = (theme: Theme): string =>
  theme === 'dark' ? 'rgba(26, 26, 26, 0.3)' : 'rgba(255, 255, 255, 0.3)';

export const getPrimaryColor = (accentColor: AccentColor, theme: Theme): string => {
  const basePrimaryColor = theme === 'dark' ? colorMapDarkMode[accentColor] : colorMap[accentColor];
  return accentColor === 'bw' && theme === 'dark' ? '#ffffff' : basePrimaryColor;
};

export const getButtonPrimaryColor = (accentColor: AccentColor, theme: Theme): string =>
  theme === 'dark' ? colorMapDarkMode[accentColor] : colorMap[accentColor];

export const getBadgeBackground = (accentColor: AccentColor, theme: Theme): string =>
  accentColor === 'bw' && theme === 'dark' ? '#404040' : getPrimaryColor(accentColor, theme);

export const getTextColor = (theme: Theme): string =>
  theme === 'dark' ? '#ffffff' : '#1d1d1f';

export const getSecondaryTextColor = (theme: Theme): string =>
  theme === 'dark' ? '#a1a1a6' : '#86868b';

export const getBackgroundColor = (theme: Theme): string =>
  theme === 'dark' ? '#000000' : '#ffffff';

export const getDialogBackground = (theme: Theme): string =>
  theme === 'dark' ? '#3a3a3a' : '#ffffff';

export const getDividerColor = (theme: Theme): string =>
  theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';

export const getChipBackground = (theme: Theme): string =>
  theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
