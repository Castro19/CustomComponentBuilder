import { css } from "@calpoly/mustang";

const styles = css`
  /* Base button styles */
  .button-type {
    font-family: var(--button-font-family);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    font-style: var(--button-font-style);
    padding: var(--button-padding);
    border-radius: var(--button-border-radius);
    border-width: var(--button-border-width);
    border-style: var(--button-border-style);
    box-shadow: var(--button-box-shadow);
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  /* Button Variants */
  .button-primary {
    background-color: var(--button-primary-background);
    color: var(--button-primary-color);
    border-color: var(--button-primary-border-color);
  }

  .button-primary:hover {
    background-color: var(--button-primary-hover-background);
  }

  /* Similarly for other button variants */
  .button-secondary {
    background-color: var(--button-secondary-background);
    color: var(--button-secondary-color);
    border-color: var(--button-secondary-border-color);
  }

  .button-secondary:hover {
    background-color: var(--button-secondary-hover-background);
  }

  .button-destructive {
    background-color: var(--button-destructive-background);
    color: var(--button-destructive-color);
    border-color: var(--button-destructive-border-color);
  }

  .button-destructive:hover {
    background-color: var(--button-destructive-hover-background);
  }
`;

export default { styles };
