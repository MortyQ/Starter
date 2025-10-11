import plugin from "tailwindcss/plugin";

/**
 * Creates a Tailwind CSS plugin for theme management with CSS custom properties
 *
 * @param themes - Object containing theme definitions
 * @returns Tailwind CSS plugin
 *
 * @example
 * ```js
 * createThemes({
 *   light: {
 *     primary: '#3b82f6',
 *     'base-100': '#ffffff'
 *   },
 *   dark: {
 *     primary: '#60a5fa',
 *     'base-100': '#1f2937'
 *   }
 * })
 * ```
 */
export function createThemes(themes: Record<string, Record<string, string>>) {
  return plugin(
    function ({ addBase, addUtilities }) {
      // Add CSS custom properties for each theme
      const themeStyles: Record<string, Record<string, string>> = {};

      Object.entries(themes).forEach(([themeName, themeColors]) => {
        const selector = themeName === "light" ? ":root" : `[data-theme="${themeName}"]`;

        themeStyles[selector] = {};

        Object.entries(themeColors).forEach(([colorName, colorValue]) => {
          themeStyles[selector][`--color-${colorName}`] = colorValue;
        });
      });

      addBase(themeStyles);

      // Generate utility classes for theme colors
      const colorUtilities: Record<string, Record<string, string>> = {};

      // Get all unique color names across themes
      const allColorNames = new Set<string>();
      Object.values(themes).forEach((theme) => {
        Object.keys(theme).forEach((colorName) => allColorNames.add(colorName));
      });

      allColorNames.forEach((colorName) => {
        const cssVarName = `var(--color-${colorName})`;

        // Text colors
        colorUtilities[`.text-${colorName}`] = {
          color: cssVarName,
        };

        // Background colors
        colorUtilities[`.bg-${colorName}`] = {
          backgroundColor: cssVarName,
        };

        // Border colors
        colorUtilities[`.border-${colorName}`] = {
          borderColor: cssVarName,
        };

        // Ring colors
        colorUtilities[`.ring-${colorName}`] = {
          "--tw-ring-color": cssVarName,
        };
      });

      addUtilities(colorUtilities);
    },
    {
      theme: {
        extend: {
          // Extend theme with CSS custom properties
          colors: Object.keys(themes.light || {}).reduce(
            (acc, colorName) => {
              acc[colorName] = `var(--color-${colorName})`;
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
      },
    },
  );
}
