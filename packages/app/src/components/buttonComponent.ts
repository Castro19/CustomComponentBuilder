// scripts/buttonComponent.js
import { css, html, shadow } from "@calpoly/mustang";
import { reset } from "../styles/reset.css.ts";
import { ButtonConfig } from "server/models";

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
      .styles([reset, ButtonCustomComponent.styles]);
  }

  connectedCallback() {
    if (this.src) {
      this.hydrate(this.src);
    } else {
      //   this.renderButton();
    }
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === "src" && newValue) {
      this.hydrate(newValue);
    } else {
      //   this.renderButton();
    }
  }
  // _authObserver = new Observer(this, "blazing:auth");
  // get authorization() {
  //   return (
  //     this._user?.authenticated && {
  //       Authorization: `Bearer ${this._user.token}`,
  //     }
  //   );
  // }

  hydrate(url: string) {
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

  renderButton(data: ButtonConfig) {
    const button = this.shadowRoot?.getElementById("buttonComponent");
    if (!button || !data) {
      return;
    }
    // Set attributes based on data or existing attributes
    const variant = data.variant || this.getAttribute("data-variant");
    const iconOnly = data.iconOnly || this.hasAttribute("data-icon-only");

    // Apply classes based on variant
    button.className = ""; // Reset classes
    if (iconOnly) {
      button.classList.add("icon-only", "icon");
    } else if (variant) {
      button.classList.add("button-type", `button-${variant}`);
    }

    // Create and append slots
    const icon = data.icon || this.getAttribute("data-icon");
    const text = data.text || this.getAttribute("data-text");
    const iconLabel = data.iconLabel || this.getAttribute("data-icon-label");
    if (icon) {
      const iconElement = document.createElement("svg");
      iconElement.setAttribute("slot", "icon");
      iconElement.classList.add("icon");
      const useElement = document.createElement("use");
      useElement.setAttribute("href", icon);
      iconElement.appendChild(useElement);
      button.appendChild(iconElement);
    }

    if (text) {
      const textElement = document.createElement("span");
      textElement.setAttribute("slot", "button-text");
      textElement.textContent = text;
      button.appendChild(textElement);
    }

    if (iconLabel) {
      const labelElement = document.createElement("p");
      labelElement.setAttribute("slot", "icon-label");
      labelElement.textContent = iconLabel;
      button.appendChild(labelElement);
    }
  }

  renderError() {
    const button = this.shadowRoot?.getElementById("buttonComponent");
    if (!button) {
      return;
    }
    button.textContent = "Error loading button";
    button.classList.add("error");
  }
}
