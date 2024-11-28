// scripts/buttonComponent.ts
import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";
import { ButtonConfig } from "server/models";

@customElement("button-custom")
export class ButtonCustomComponent extends LitElement {
  @property({ type: String, attribute: "data-variant" }) dataVariant = "";
  @property({ type: Boolean, attribute: "data-icon-only" }) dataIconOnly =
    false;
  @property({ type: String }) src = "";
  @property({ type: String, attribute: "data-icon" }) dataIcon = "";
  @property({ type: String, attribute: "data-text" }) dataText = "";
  @property({ type: String, attribute: "data-icon-label" }) dataIconLabel = "";

  static styles = [
    css`
      ${reset}
    `,
    css`
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
        width: 64px;
        height: 64px;
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
    `,
  ];

  @state()
  private buttonConfig: ButtonConfig | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this.hydrate(this.src);
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("src") && this.src) {
      this.hydrate(this.src);
    }
  }

  async hydrate(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const json = await res.json();
      this.buttonConfig = json;
      this.applyConfig();
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
      this.renderError();
    }
  }

  applyConfig() {
    if (this.buttonConfig) {
      const data = this.buttonConfig;
      this.dataVariant = data.variant || this.dataVariant;
      this.dataIconOnly =
        data.iconOnly !== undefined ? data.iconOnly : this.dataIconOnly;
      this.dataIcon = data.icon || this.dataIcon;
      this.dataText = data.text || this.dataText;
      this.dataIconLabel = data.iconLabel || this.dataIconLabel;
    }
  }
  render() {
    const classes = this.getButtonClasses();
    return html`
      <button id="buttonComponent" class="${classes}">
        ${this.renderContent()}
      </button>
    `;
  }

  getButtonClasses() {
    let classes = "";
    if (this.dataIconOnly) {
      classes = "icon-only icon";
    } else if (this.dataVariant) {
      classes = `button-type button-${this.dataVariant}`;
    }
    return classes;
  }

  renderContent() {
    return html`
      ${this.dataIcon
        ? html`
            <svg class="icon">
              <use href="${this.dataIcon}"></use>
            </svg>
          `
        : ""}
      ${this.dataText
        ? html`<span class="button-text">${this.dataText}</span>`
        : ""}
      ${this.dataIconLabel
        ? html`<p class="icon-label">${this.dataIconLabel}</p>`
        : ""}
      <slot></slot>
    `;
  }

  renderError() {
    // Display an error message
    this.dataText = "Error loading button";
    this.dataVariant = "error"; // Ensure you have styles for 'error' variant
  }
}
