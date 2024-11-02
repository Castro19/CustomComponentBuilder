// scripts/codeInstructions.js
import { css, html, shadow } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";

console.log("BUTTON COMPONENT");
export class ButtonCustomComponent extends HTMLElement {
  static template = html`
    <template>
      <button id="buttonComponent">
        <slot name="icon"></slot>
        <slot name="button-text"></slot>
        <slot name="icon-label"></slot>
        <slot></slot>
      </button>
    </template>
  `;

  static styles = css`
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
      width: 100%;
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

    .icon-only {
      background: rgba(0, 0, 0, 0);
      border: 0;
    }
    .icon {
      filter: brightness(0) invert(1); /* Makes the icon white */
    }
    .icon-label {
      font-size: 14px;
      color: var(--color-white);
    }
    @media (max-width: 1024px) {
      .button-type {
        font-size: var(--font-size-xs); /* Smaller font size */
      }
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(ButtonCustomComponent.template)
      .styles(reset.styles, ButtonCustomComponent.styles);
  }

  // Code that runs once button is on the Document
  connectedCallback() {
    const variant = this.getAttribute("data-variant");
    const iconOnly = this.hasAttribute("data-icon-only");

    if (iconOnly) {
      this.shadowRoot
        .getElementById("buttonComponent")
        .classList.add("icon-only", "icon");
    } else if (variant) {
      this.shadowRoot
        .getElementById("buttonComponent")
        .classList.add("button-type", `button-${variant}`);
    }
  }
}
