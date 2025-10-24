import plugin from "tailwindcss/plugin";

/**
 * Converts HEX color to RGB channels string (e.g., "255 128 0")
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    console.warn(`Invalid HEX color: ${hex}`);
    return hex;
  }
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

/**
 * Creates a Tailwind CSS plugin for theme management with CSS custom properties
 * Supports opacity modifiers like bg-primary/50
 */
export function createThemes(themes: Record<string, Record<string, string>>) {
  return plugin(
    function ({ addBase }) {
      const themeStyles: Record<string, Record<string, string>> = {};

      Object.entries(themes).forEach(([themeName, themeColors]) => {
        const selector = themeName === "light" ? ":root" : `[data-theme="${themeName}"]`;
        themeStyles[selector] = {};

        Object.entries(themeColors).forEach(([colorName, colorValue]) => {
          // Convert HEX to RGB channels for opacity support
          themeStyles[selector][`--color-${colorName}`] = hexToRgb(colorValue);
        });
      });

      addBase(themeStyles);
    },
    {
      theme: {
        extend: {
          colors: Object.keys(themes.light || {}).reduce(
            (acc, colorName) => {
              // Use rgb() with <alpha-value> placeholder for opacity modifiers
              acc[colorName] = `rgb(var(--color-${colorName}) / <alpha-value>)`;
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      },
    },
  );
}
