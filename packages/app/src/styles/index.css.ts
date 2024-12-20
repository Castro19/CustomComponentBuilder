/* Global Styles */
/* Front Page Wrapper Styles */
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
    flex-direction: column;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    background-color: var(--color-background);
    font-family: var(--font-family-sans-serif); /* Roboto as the body font */
    font-weight: var(--font-weight-normal);
  }

  #lightModeLabel {
    position: absolute;
    top: 20px; /* Adjust to align vertically */
    right: 20px; /* Adjust to align horizontally */
    /* Optional styling */
    font-size: var(--font-size-md);
    cursor: pointer;
    color: var(--color-white);
  }

  #lightModeLabel input[type="checkbox"] {
    margin-right: 5px; /* Space between checkbox and label text */
  }

  svg.icon {
    display: inline;
    vertical-align: top;
    fill: var(--color-white);
  }

  .header-title {
    font-size: var(--font-size-sm);
    color: var(--color-gold);
  }

  /* Title Styling */
  .title {
    font-size: var(
      --font-size-xl
    ); /* Adjust font size to fit the page nicely */
    color: var(--color-gold);
    text-align: center; /* Center the title horizontally */
    margin: var(--spacing-md) 0; /* Space around the title */
  }
  /* General Magazine Page Styles */
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

  /* Left and Right Page Specific Border Radius */
  .magazine-page-right {
    border-radius: var(
      --border-radius-large-right
    ); /* Rounded bottom-right corner */
  }

  .magazine-page-left {
    border-radius: var(
      --border-radius-large-left
    ); /* Rounded bottom-left corner */
  }

  /* Magazine Wrapper to Align Two Pages Side by Side */
  .magazine-wrapper {
    display: flex;
    flex: 1; /* Allow main content to grow and fill available space */
    justify-content: center;
    align-items: center;
    width: var(--page-width-large);
    max-width: 1200px;
    margin: auto; /* Center the wrapper itself within the viewport */
  }

  /* Page Number Styling */
  .page-number-left,
  .page-number-right {
    position: absolute;
    top: var(--spacing-xs);
    font-size: var(--font-size-md);
    color: var(--color-gold);
  }

  .page-number-left {
    left: var(--spacing-xs); /* Position at the top-left corner */
  }

  .page-number-right {
    right: var(--spacing-xs); /* Position at the top-right corner */
  }

  /* Footer Container Styles for Arrows */
  .footer-container {
    display: flex;
    justify-self: center;
    position: absolute;
    bottom: var(--spacing-xs);
    width: 90%;
  }
  .footer-container-left-page {
    justify-content: flex-start; /* Arrow at left bottom corner */
  }
  .footer-container-right-page {
    justify-content: flex-end; /* Arrow at right bottom corner */
  }
  /* Arrow Styling */
  .arrow {
    align-self: center; /* Vertically center the arrow */
  }

  .arrow-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .arrow-left {
    transform: scaleX(-1); /* Flip the left arrow */
  }

  .arrow-right {
    justify-self: flex-end; /* Position the right arrow on the far right */
  }

  /* Monospace Font for Code Snippets */
  code,
  pre {
    font-family: var(--font-family-monospace); /* Use Roboto Mono for code */
    font-weight: var(--font-weight-normal);
  }

  .credits-list li {
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-md);
    color: var(--color-white);
  }

  .magazine-credits {
    max-height: 95vh;
  }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .magazine-wrapper {
      flex-direction: column;
      width: var(--page-width-large);
      align-items: center;
      min-height: 100vh;
      overflow-y: auto;
    }

    .magazine-page {
      height: var(--page-height-small-screen);
      width: var(--page-width-large);
      grid-template-rows: auto 3fr 1fr auto;
    }
  }

  @media (max-width: 768px) {
    .page-number-left,
    .page-number-right {
      font-size: var(--font-size-base);
    }
    .title {
      font-size: var(--font-size-lg); /* Smaller font size for titles */
    }
    .arrow {
      width: 30px;
    }
  }
`;

export default { styles };
