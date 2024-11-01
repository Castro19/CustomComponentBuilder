import { css } from "@calpoly/mustang";

const styles = css`
  * {
    margin: 0;
    box-sizing: border-box;
  }

  body,
  html {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    background-color: var(--color-background);
    font-family: var(--font-family-sans-serif); /* Roboto as the body font */
    font-weight: var(--font-weight-normal);
  }

  /* General Magazine Page Styles */
  .magazine-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--page-width-large);
    max-width: 1200px;
    margin: auto; /* Center the wrapper itself within the viewport */
  }

  .magazine-page {
    min-height: var(--page-height);
    width: var(--page-width-small);
    min-width: var(--min-page-width); /* Minimum width */
    aspect-ratio: var(
      --aspect-ratio-page
    ); /* Maintains the magazine-like proportion */
    background-color: var(--color-gray-dark);
    box-shadow: var(--box-shadow-default), var(--box-shadow-inset);
    border: var(--border-width-thin) solid var(--color-border-light);
    padding: var(--spacing-sm);
    margin-top: var(--spacing-sm);
    position: relative; /* Allows positioning of internal elements */
    display: grid;
    grid-template-rows: auto 7fr 1fr auto; /* Title, content area, and footer */
  }
  .magazine-page-right {
    border-radius: var(
      --border-radius-large-right
    ); /* Rounded bottom-right corner */
  }

  /* Right Page Specific Grid Layout */
  .right-page-docs-grid {
    display: grid;
    grid-template-rows: 2fr 3fr; /* Two equal rows */
    gap: var(--spacing-xs);
    padding: var(--spacing-xs);
    overflow: auto;
    border: var(--border-width-thick) solid var(--color-border-dark);
  }

  /* Code Section Grid Item */
  .right-page-code-section {
    background-color: var(--color-gray-dark);
    border: var(--border-width-thin) solid var(--color-border-light);
    border-radius: var(--border-radius-small);
    overflow: hidden; /* Contains the scrollable content */
  }

  /* Instructions Section Grid Item */
  .right-page-instructions-section {
    background-color: var(--color-gray-dark);
    border: var(--border-width-thin) solid var(--color-border-light);
    border-radius: var(--border-radius-small);
    overflow: auto;
  }

  /* Instructions Styles */
  .instruction-step {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
  }

  .step-number {
    background-color: var(--color-gold);
    color: var(--color-black);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }

  .step-content h4 {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-bottom: var(--spacing-xs);
    color: var(--color-gold);
  }

  .step-content p {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-xs);
    line-height: 1.4;
  }

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
`;

export default { styles };
