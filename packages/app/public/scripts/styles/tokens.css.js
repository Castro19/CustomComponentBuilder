import { css } from "@calpoly/mustang";

export const tokens = css`
  :root {
    /* Colors */
    --color-background: #000000;
    --color-gray-dark: #3d3d3d;
    --color-gold: #cda434;
    --color-white: #ffffff;
    --color-border-dark: rgba(48, 48, 48, 0.8);
    --color-border-light: rgba(255, 255, 255, 0.2);
    --color-shadow-light: rgba(255, 255, 255, 0.1);
    --color-shadow-dark: rgba(0, 0, 0, 0.6);

    /* Typography */
    --font-family-serif: "Playfair Display", serif;
    --font-family-sans-serif: "Roboto", Arial, sans-serif;
    --font-family-monospace: "Roboto Mono", "Courier New", monospace;
    --font-size-xl: 4em;
    --font-size-lg: 3em;
    --font-size-md: 1.5em;
    --font-size-base: 1em;
    --font-size-sm: 0.9em;
    --font-weight-normal: 400;
    --font-weight-bold: 700;

    /* Spacing */
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 20px;
    --spacing-lg: 30px;

    /* Borders */
    --border-width-thin: 1px;
    --border-width-thick: 3px;
    --border-radius-small: 8px;
    --border-radius-large-right: 8px 8px 64px 8px;
    --border-radius-large-left: 8px 8px 8px 64px;

    /* Shadows */
    --box-shadow-default: 5px 10px 20px var(--color-shadow-dark);
    --box-shadow-inset: 0 0 10px var(--color-shadow-light) inset;

    /* Layout */
    --page-width-small: 45vw;
    --page-width-large: 90vw;
    --page-height: 90vh;
    --page-height-small-screen: 50vh;
    --min-page-width: 300px;
    --aspect-ratio-page: 3 / 4;

    /* Shared Component Tokens */
    --font-family-default: "Roboto", Arial, sans-serif;
    --font-family-mono: "Roboto Mono", "Courier New", monospace;
    --font-size-default: 16px;
    --font-weight-normal: 400;
    --font-weight-bold: 600;

    /* Shared Colors */
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-destructive: #dc3545;
    --color-white: #ffffff;
    --color-black: #000000;

    /* Shared Border Tokens */
    --border-radius-small: 4px;
    --border-radius-medium: 8px;
    --border-radius-large: 12px;

    /* Shared Box Shadow */
    --box-shadow-light: 0px 2px 4px rgba(0, 0, 0, 0.1);
    --box-shadow-medium: 0px 4px 6px rgba(0, 0, 0, 0.1);

    /* Shared Padding and Margins */
    --padding-small: 8px;
    --padding-medium: 12px;
    --padding-large: 16px;

    body.light-mode {
      --color-background: #e4e4e4;
      --color-gray-dark: #929292;
      --color-gold: #ffce47;
      --color-white: #000000;
      --color-border-dark: rgba(48, 48, 48, 0.8);
      --color-border-light: rgba(255, 255, 255, 0.2);
      --color-shadow-light: rgba(0, 0, 0, 0.1);
      --color-shadow-dark: rgba(0, 0, 0, 0.6);
    }

    /* Button Types (Variants) */
    --button-primary-background: #007bff;
    --button-primary-color: #fff;
    --button-secondary-background: #6c757d;
    --button-secondary-color: #fff;
    --button-destructive-background: #dc3545;
    --button-destructive-color: #fff;

    /* Button Borders */
    --button-border-radius: 4px;
    --button-border-width: 1px;
    --button-border-style: solid;
    --button-primary-border-color: #007bff;
    --button-secondary-border-color: #6c757d;
    --button-destructive-border-color: #dc3545;

    /* Button Colors */
    --button-primary-hover-background: #0056b3;
    --button-secondary-hover-background: #5a6268;
    --button-destructive-hover-background: #c82333;

    /* Font Customizations */
    --button-font-family: "Arial", sans-serif;
    --button-font-size: 12px;
    --button-font-weight: 600; /* Bold */
    --button-font-style: normal;

    /* Box Shadow */
    --button-box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    /* Button Padding */
    --button-padding: 12px 24px;
  }
`;
