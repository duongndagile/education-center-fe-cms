import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        darkBlue: { value: "#051469" },
        subSidebar: { value: "#F8F9FC" },
        lightBlue: { value: "#1E3095" },
        cobaltBlue: { value: "#1E64DC" },
        white: { value: "#FFFFFF" },
        black: { value: "#000000" },
        borderMain: { value: "#E1E6EC" },
        bgActive: { value: "#DDF1FB " },
        blueTint: {
          1: { value: "#57B8EB" },
          2: { value: "#76C9EF" },
          3: { value: "#97D5F2" },
          4: { value: "#BDE3F6" },
          5: { value: "#D0E7F6" },
          6: { value: "#DDF1FB" },
          7: { value: "#EEF8FD" },
        },
        blue: {
          azure: { value: "#0070c0" },
          main: { value: "#051469" },
          centerButton: { value: "#364286" },
        },
        green: {
          base: { value: "#28794E" },
          light: { value: "#F0FFF4" },
          cyan: { value: "#baf8ff" },
        },
        orange: {
          dark: { value: "#C84C00" },
          base: { value: "#E7660D" },
          light: { value: "#FFEFDE" },
        },
        red: {
          base: { value: "#DA291C" },
          light: { value: "#FFF5F5" },
        },
        gray: {
          1: { value: "#121619" },
          2: { value: "#21272A" },
          3: { value: "#343A3F" },
          4: { value: "#565C63" },
          5: { value: "#6C747E" },
          6: { value: "#808892" },
          7: { value: "#B9C1C9" },
          8: { value: "#D6D8E1" },
          9: { value: "#E1E6EC" },
          10: { value: "#EBEFF5" },
          11: { value: "#F3F6FB" },
          12: { value: "#F8F9FC" },
          13: { value: "#F1F2F7" },
          14: { value: "#E1E6EC" },
          15: { value: "#1E40AF" },
        },
      },
      fonts: {
        body: { value: "Inter, sans-serif" },
        heading: { value: "Inter, sans-serif" },
      },
      fontSizes: {
        semiSmall: { value: "0.875rem" },
      },
      cursor: {
        button: { value: "pointer" },
      },
      breakpoints: {
        sm: { value: "360px" },
        md: { value: "600px" },
        lg: { value: "960px" },
        xl: { value: "1280px" },
      },
      sizes: {
        container: {
          sm: { value: "390px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1130px" },
          "2xl": { value: "1280px" },
          "3xl": { value: "1340px" },
        },
        0.25: { value: "0.0625rem" },
        15: { value: "3.75rem" },
        15.625: { value: "15.625rem" },
        60.1875: { value: "60.1875rem" },
        74.375: { value: "74.375rem" },
        90: { value: "90rem" },
      },
      spacing: {
        0: { value: 0 },
        30: { value: "1.875rem" },
        71: { value: "4.4375rem" },
        "50%": { value: "50%" },
      },
      radii: {
        2: { value: "0.5rem" },
        5: { value: "1.25rem" },
      },
      opacity: {
        50: { value: 0.5 },
        80: { value: 0.8 },
      },
      shadows: {
        sm: {
          value:
            "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
        },
      },
      borders: {
        sidebar: { value: "0.0625rem solid  {colors.gray.11}" },
      },
      borderWidths: {
        thin: { value: "1px" },
        light: { value: "0.5px" },
        md: { value: "2px" },
      },
      borderStyles: {
        solid: { value: "solid" },
        dotted: { value: "dotted" },
      },
      lineHeights: {
        1.75: { value: "1.75rem" },
      },
    },
  },
  cssVarsPrefix: "bo",
  globalCss: {
    "html, body": {
      margin: "var(--bo-spacing-0)",
      padding: "var(--bo-spacing-0)",
    },
  },
  strictTokens: true,
});

export default createSystem(defaultConfig, config);
