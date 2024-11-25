// scripts/buttonComponent.js
import { css, html, shadow } from "@calpoly/mustang";
import reset from "../styles/reset.css.js";

export class ButtonCustomComponent extends HTMLElement {
  static template = html`
    <template>
      <button id="customButton">
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
      fill: currentColor; /* Ensures the icon inherits the text color */
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

  static get observedAttributes() {
    return ["data-variant", "data-icon-only", "src"];
  }

  get src() {
    return this.getAttribute("src");
  }

  constructor() {
    super();
    shadow(this)
      .template(ButtonCustomComponent.template)
      .styles(reset.styles, ButtonCustomComponent.styles);
  }

  connectedCallback() {
    this.renderButton(); // Apply initial classes based on attributes
    // Uncomment and implement authentication observer if needed
    // this._authObserver.observe(({ user }) => {
    //   this._user = user;
    // });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "src" && newValue) {
      this.hydrate(newValue);
    } else {
      this.renderButton(); // Update classes when attributes change
    }
  }

  hydrate(url) {
    // fetch(url, { headers: this.authorization })
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((json) => this.renderButton(json))
      .catch((error) => {
        console.error(`Failed to fetch data from ${url}:`, error);
        this.renderError();
      });
  }

  renderButton(data = {}) {
    const button = this.shadowRoot.getElementById("customButton");

    // Apply classes based on variant
    const variant = data.variant || this.getAttribute("data-variant");
    const iconOnly = data.iconOnly || this.hasAttribute("data-icon-only");

    // Remove existing variant and icon-only classes
    button.classList.remove(
      "button-primary",
      "button-secondary",
      "button-destructive",
      "icon-only",
      "icon"
    );

    // Apply new classes based on current attributes
    if (iconOnly) {
      button.classList.add("icon-only", "icon");
    } else if (variant) {
      button.classList.add("button-type", `button-${variant}`);
    }
  }

  renderError() {
    const button = this.shadowRoot.getElementById("customButton");
    button.textContent = "Error loading button";
    button.classList.add("error");
  }
}

customElements.define("button-custom", ButtonCustomComponent);
