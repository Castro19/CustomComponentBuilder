import { html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { define } from "@calpoly/mustang";

import index from "../styles/index.css.js";
import gridUtility from "../styles/gridUtility.css.js";
import buttonPage from "../styles/buttonPage.css.js";
import customButtonStylesCss from "../styles/custom-button-styles.css.js";

import {
  ButtonConfigFetched,
  ComponentConfig,
  Instruction,
} from "server/models";
import { CodeInstruction } from "../components/codeInstruction.js";
import { CodeContainer } from "../components/codeContainer.js";
import { ButtonCustomComponent } from "../components/buttonComponent.js";

import { parseCssToStyleObject } from "../utils/parseCss.js";
import { outputButtonTokens } from "../utils/defaultStyles.js";

@customElement("component-view")
export class ComponentViewElement extends LitElement {
  static uses = define({
    "button-custom": ButtonCustomComponent,
    "code-instruction": CodeInstruction,
    "code-container": CodeContainer,
  });

  /* ICON TYPE SELECTOR */
  @query("#customization-button-types")
  buttonTypeSection!: HTMLElement;

  @query("#customization-button-font")
  buttonFontSection!: HTMLElement;

  @query("#customization-button-border")
  buttonBorderSection!: HTMLElement;

  @state()
  private activeCustomization: "type" | "font" | "border" | null = null;

  /* BUTTON VARIANT SELECTOR */
  @state()
  currentVariant: "primary" | "secondary" | "destructive" | "custom" =
    "primary";

  /* CODE SNIPPETS */
  @state()
  cssCode: string = "";

  @state()
  htmlCode: string = "";

  @state()
  jsCode: string = "";

  @state()
  tokensCode: string = outputButtonTokens();

  /* FONT OPTIONS */
  @state()
  fontFamily: string = "Arial, sans-serif";

  @state()
  fontSize: string = "16px";

  @state()
  fontWeight: string = "400";

  @state()
  customButtonText: string = "Button";

  @state()
  textColor: string = "#000000";

  @state()
  buttonColor: string = "#CDA434";

  @property({ type: String, attribute: "component-id" })
  componentId = "button";

  @state()
  componentConfig: ComponentConfig | null = null;

  @state()
  buttonConfig: ButtonConfigFetched[] | null = null;

  @state()
  currentButtonConfig: ButtonConfigFetched | null = null;

  /* Border Options */
  @state()
  borderWidth: string = "1px";

  @state()
  borderStyle: string = "solid";

  @state()
  borderColor: string = "#FFFFFF";

  @state()
  borderRadius: string = "4px";

  fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  /* LIFECYCLE */
  connectedCallback() {
    super.connectedCallback();
    this.loadData();
    this.loadButtonData();
  }

  /* FIRST UPDATED */
  firstUpdated() {
    this.showCustomizationTools("type-icon");
    // Show the button types section by default
    this.updateCodeSnippets();
  }

  /* LOAD COMPONENT DATA */
  async loadData() {
    const src = `/api/component/${this.componentId}`;
    try {
      const res = await fetch(src);
      if (res.status === 200) {
        const json = await res.json();
        this.componentConfig = json;
      } else {
        throw new Error(`Server responded with status ${res.status}`);
      }
    } catch (err) {
      console.error("Failed to load component data:", err);
    }
  }

  /* LOAD BUTTON DATA */
  async loadButtonData() {
    try {
      const response = await fetch("http://localhost:3000/api/button");
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("BUTTON DATA: ", data);
      this.buttonConfig = data as ButtonConfigFetched[];
      if (this.buttonConfig && this.buttonConfig.length > 0) {
        this.currentButtonConfig = this.buttonConfig[0];
      }
    } catch (error) {
      console.error("Error fetching button config:", error);
    }
  }

  /* SUBMIT BUTTON CONFIG */
  async handleSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Collect button configuration data from the component's state
      const iconOnly = false; // Update as needed
      const icon = ""; // Update as needed
      const iconLabel = ""; // Update as needed
      const text = this.customButtonText;

      // Retrieve code snippets
      const htmlCode = this.htmlCode;
      const cssCode = this.cssCode;
      const jsCode = this.jsCode;
      const tokensCode = outputButtonTokens();

      // Prepare the payload
      const payload = {
        variant: "custom",
        iconOnly,
        icon,
        iconLabel,
        text,
        htmlCode,
        cssCode,
        tokensCode,
        jsCode,
      };

      console.log("Submitting the following payload:", payload);

      // Send the data to the server via a POST request
      const response = await fetch("http://localhost:3000/api/button", {
        // Ensure the endpoint is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      // Optionally, handle the server's response data
      const responseData = await response.json();
      console.log("Server response:", responseData);

      // Provide user feedback (e.g., alert, modal, notification)
      alert("Button configuration submitted successfully!");

      // Optionally, reset the form or perform other actions
    } catch (error: any) {
      console.error("Error submitting button configuration:", error);
      alert(`Error submitting button configuration: ${error.message}`);
    }
  }

  /* DELETE BUTTON VARIANT */
  async deleteButtonVariant(_id: string) {
    console.log("Deleting button Id:", _id);
    try {
      const response = await fetch(`http://localhost:3000/api/button/${_id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete button: ${response.statusText}`);
      }
      console.log("Button deleted successfully");
    } catch (error) {
      console.error("Error deleting button:", error);
    }
  }

  /* GET CUSTOM BUTTON STYLES */
  get customButtonStyles() {
    let styles: { [key: string]: string } = {};

    // Variant styles
    if (this.currentVariant === "primary") {
      styles.color = "var(--button-primary-color)";
      styles.backgroundColor = "var(--button-primary-background)";
      styles.borderColor = "var(--button-primary-border-color)";
    } else if (this.currentVariant === "secondary") {
      styles.color = "var(--button-secondary-color)";
      styles.backgroundColor = "var(--button-secondary-background)";
      styles.borderColor = "var(--button-secondary-border-color)";
    } else if (this.currentVariant === "destructive") {
      styles.color = "var(--button-destructive-color)";
      styles.backgroundColor = "var(--button-destructive-background)";
      styles.borderColor = "var(--button-destructive-border-color)";
    } else if (this.currentVariant === "custom" && this.currentButtonConfig) {
      // Parse the CSS code from currentButtonConfig
      const parsedStyles = parseCssToStyleObject(
        this.currentButtonConfig.cssCode
      );
      Object.assign(styles, parsedStyles);
    }

    // Font styles
    styles.fontFamily = this.fontFamily;
    styles.fontSize = this.fontSize;
    styles.fontWeight = this.fontWeight;

    // Override colors if user has customized them
    if (this.textColor) {
      styles.color = this.textColor;
    }
    if (this.buttonColor) {
      styles.backgroundColor = this.buttonColor;
    }

    // Border styles
    styles.borderWidth = this.borderWidth;
    styles.borderStyle = this.borderStyle;
    styles.borderRadius = this.borderRadius;

    // Only override borderColor if user has customized it
    if (this.borderColor) {
      styles.borderColor = this.borderColor;
    }

    return styles;
  }

  /* SELECT BUTTON VARIANT */
  selectButtonVariant(buttonConfig: ButtonConfigFetched) {
    this.currentVariant = buttonConfig.variant;
    this.currentButtonConfig = buttonConfig;

    this.textColor = "";
    this.buttonColor = "";
    this.borderColor = "";

    this.updateCodeSnippets();
    this.applyButtonStyles();
  }

  /* UPDATE CODE HANDLERS */
  updateCodeSnippets() {
    this.cssCode = this.outputButtonStyles();
    this.htmlCode = this.outputButtonHTML();
    this.jsCode = this.outputButtonJS();
  }
  outputButtonStyles() {
    const styles = this.customButtonStyles;
    return `
    .customButton {
          color: ${styles.color};
          background-color: ${styles.backgroundColor};
          border-color: ${styles.borderColor};
          border-width: ${styles.borderWidth};
          border-style: ${styles.borderStyle};
          border-radius: ${styles.borderRadius};
          font-family: ${styles.fontFamily};
          font-size: ${styles.fontSize};
          font-weight: ${styles.fontWeight};
          /* Additional styles */
        }`;
  }
  outputButtonHTML() {
    return `
    <button class="customButton">${this.customButtonText}</button>`;
  }
  outputButtonJS() {
    return `
    const button = document.querySelector('.customButton');
      button.addEventListener('click', () => {
        alert('Button clicked!');
      });`;
  }

  /* CUSTOMIZATION TOOLS */
  showCustomizationTools(iconId: string) {
    if (iconId === "type-icon") {
      this.activeCustomization = "type";
    } else if (iconId === "font-icon") {
      this.activeCustomization = "font";
    } else if (iconId === "border-icon") {
      this.activeCustomization = "border";
    }
  }
  /* APPLY STYLES */
  applyButtonStyles() {
    if (this.currentButtonConfig) {
      // Update the styles of the display button using cssCode and tokensCode
      const styleElement = this.shadowRoot?.getElementById("dynamic-styles");
      if (styleElement) {
        styleElement.textContent = `
              ${this.currentButtonConfig.tokensCode}
              ${this.currentButtonConfig.cssCode}
            `;
      }
      this.requestUpdate();
    }
  }

  /* FONT HANDLERS */
  onFontFamilyChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.fontFamily = select.value;
    this.updateCodeSnippets();
  }
  onFontSizeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.fontSize = select.value;
    this.updateCodeSnippets();
  }
  onFontWeightChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fontWeight = input.value;
    this.updateCodeSnippets();
  }
  onButtonTextChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.customButtonText = input.value || "Button";
    this.updateCodeSnippets();
  }
  onTextColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textColor = input.value;
    this.updateCodeSnippets();
  }
  onButtonColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.buttonColor = input.value;
    this.updateCodeSnippets();
  }

  /* BORDER HANDLERS */
  onBorderWidthChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.borderWidth = select.value;
    this.updateCodeSnippets();
  }
  onBorderStyleChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.borderStyle = select.value;
    this.updateCodeSnippets();
  }
  onBorderColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.borderColor = input.value;
    this.updateCodeSnippets();
  }
  onBorderRadiusChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.borderRadius = input.value + "px";
    this.updateCodeSnippets();
  }

  render() {
    if (!this.componentConfig || !this.buttonConfig) {
      return html`<div>No component data found</div>`;
    }
    const { options, instructions } = this.componentConfig;
    const buttonConfigs = this.buttonConfig;
    console.log("BUTTON CONFIGS: ", buttonConfigs);

    const renderVariants = (buttonConfigs: ButtonConfigFetched[]) => {
      return buttonConfigs.map((buttonConfig) => {
        const styles = parseCssToStyleObject(buttonConfig.cssCode);
        const trashIcon = "trash";
        return html`
          <div class="button-type-container">
            <button
              id="${buttonConfig._id}"
              class="button-type button-${buttonConfig.variant}"
              style=${styleMap(styles)}
              @click=${() => this.selectButtonVariant(buttonConfig)}
            >
              ${buttonConfig.variant.charAt(0).toUpperCase() +
              buttonConfig.variant.slice(1)}
              Button
            </button>
            <button-custom
              .dataIconOnly=${true}
              .dataIcon="/componentOptions.svg#icon-${trashIcon}"
              .dataText="Delete"
              @click=${() => this.deleteButtonVariant(buttonConfig._id)}
            ></button-custom>
          </div>
        `;
      });
    };

    const renderOptions = (options: string[]) => {
      return options.map((option) => {
        const iconId = `${option}-icon`; // Construct the icon ID
        return html`
          <div class="icon-container" id="${iconId}">
            <button-custom
              .dataIconOnly=${true}
              .dataIcon="/componentOptions.svg#icon-${option}"
              .dataText=${option}
              @click=${() => this.showCustomizationTools(iconId)}
            ></button-custom>
          </div>
        `;
      });
    };

    const renderInstructions = (instructions: {
      [key: string]: Instruction;
    }) => {
      return Object.entries(instructions).map(([stepNumber, instruction]) => {
        return html`<code-instruction>
          <span slot="step-number">${stepNumber}</span>
          <h4 slot="step-title">${instruction.title}</h4>
          <div slot="step-content">${instruction.description}</div>
        </code-instruction>`;
      });
    };

    console.log("CURRENT BUTTON CONFIG: ", this.currentButtonConfig);
    return html`
      <!-- Inject styles from currentButtonConfig -->
      ${this.currentButtonConfig
        ? html`
            <style>
              ${this.currentButtonConfig.tokensCode}
              ${this.currentButtonConfig.cssCode}
            </style>
            <style id="dynamic-styles"></style>
          `
        : ""}
      <main>
        <div class="magazine-wrapper">
          <div class="magazine-page magazine-page-left">
            <div class="page-number-left">5</div>
            <h1 class="title">Button</h1>
            <div class="grid-container left-page-grid-2-rows">
              <div class="grid-item left-page-first-row">
                <div class="button-display-container">
                  <p class="button-display-title">Button Display</p>
                  <button
                    id="customButton main-display-button"
                    class="button-display button-type"
                    style=${styleMap(this.customButtonStyles)}
                  >
                    ${this.customButtonText}
                  </button>
                </div>
              </div>
              <div class="grid-item">
                <div class="controls">${renderOptions(options)}</div>
              </div>
              <div
                class="grid-item-customization"
                id="customization-button-types"
                style="display: ${this.activeCustomization === "type"
                  ? "flex"
                  : "none"};"
              >
                <h3 class="customization-tools-type-title">Button Types</h3>
                <div class="button-type-list">
                  ${renderVariants(buttonConfigs)}
                </div>
              </div>
              <!-- Font Customization Section -->
              <div
                class="grid-item-customization font-customization"
                id="customization-button-font"
                style="display: ${this.activeCustomization === "font"
                  ? "flex"
                  : "none"};"
              >
                <h3 class="customization-tools-type-title">Font</h3>

                <!-- Font Family -->
                <div class="font-family-container">
                  <p class="font-family-title">Font Family:</p>
                  <div class="font-family-list">
                    <select
                      class="font-family-select"
                      @change=${this.onFontFamilyChange}
                    >
                      <option
                        value="Arial, sans-serif"
                        ?selected=${this.fontFamily === "Arial, sans-serif"}
                      >
                        Arial
                      </option>
                      <option
                        value="Helvetica, sans-serif"
                        ?selected=${this.fontFamily === "Helvetica, sans-serif"}
                      >
                        Helvetica
                      </option>
                      <option
                        value="Georgia, serif"
                        ?selected=${this.fontFamily === "Georgia, serif"}
                      >
                        Georgia
                      </option>
                      <option
                        value="'Times New Roman', serif"
                        ?selected=${this.fontFamily ===
                        "'Times New Roman', serif"}
                      >
                        Times New Roman
                      </option>
                      <option
                        value="Verdana, sans-serif"
                        ?selected=${this.fontFamily === "Verdana, sans-serif"}
                      >
                        Verdana
                      </option>
                      <option
                        value="'Courier New', monospace"
                        ?selected=${this.fontFamily ===
                        "'Courier New', monospace"}
                      >
                        Courier New
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Font Size -->
                <div class="font-size-container">
                  <p class="font-size-title">Font Size:</p>
                  <div class="font-size-list">
                    <select
                      class="font-size-select"
                      @change=${this.onFontSizeChange}
                    >
                      ${this.fontSizes.map(
                        (size) =>
                          html`<option
                            value="${size}px"
                            ?selected=${this.fontSize === `${size}px`}
                          >
                            ${size}px
                          </option>`
                      )}
                    </select>
                  </div>
                </div>

                <!-- Font Weight -->
                <div class="font-weight-container">
                  <p class="font-weight-title">Font Weight:</p>
                  <div class="font-weight-controls">
                    <input
                      type="range"
                      class="font-weight-slider"
                      min="100"
                      max="900"
                      step="100"
                      .value=${this.fontWeight}
                      @input=${this.onFontWeightChange}
                    />
                    <span class="font-weight-value">${this.fontWeight}</span>
                  </div>
                </div>

                <!-- Button Text -->
                <div class="button-text-container">
                  <p class="button-text-title">Button Text:</p>
                  <div class="button-text-controls">
                    <input
                      type="text"
                      class="button-text-input"
                      placeholder="Enter button text..."
                      .value=${this.customButtonText}
                      @input=${this.onButtonTextChange}
                    />
                  </div>
                </div>

                <!-- Text Color -->
                <div class="text-color-container">
                  <p class="text-color-title">Text Color:</p>
                  <div class="text-color-controls">
                    <input
                      type="color"
                      class="text-color-picker"
                      .value=${this.textColor}
                      @input=${this.onTextColorChange}
                    />
                    <span class="text-color-value"
                      >${this.textColor.toUpperCase()}</span
                    >
                  </div>
                </div>

                <!-- Button Color -->
                <div class="button-color-container">
                  <p class="button-color-title">Button Color:</p>
                  <div class="button-color-controls">
                    <input
                      type="color"
                      class="button-color-picker"
                      .value=${this.buttonColor}
                      @input=${this.onButtonColorChange}
                    />
                    <span class="button-color-value"
                      >${this.buttonColor.toUpperCase()}</span
                    >
                  </div>
                </div>
              </div>
              <!-- Border Customization Section -->
              <div
                class="grid-item-customization border-customization"
                id="customization-button-border"
                style="display: ${this.activeCustomization === "border"
                  ? "flex"
                  : "none"};"
              >
                <h3 class="customization-tools-type-title">Border</h3>

                <!-- Border Width -->
                <div class="border-width-container">
                  <p class="border-width-title">Border Width:</p>
                  <div class="border-width-controls">
                    <select
                      class="border-width-select"
                      @change=${this.onBorderWidthChange}
                    >
                      <option
                        value="1px"
                        ?selected=${this.borderWidth === "1px"}
                      >
                        Thin (1px)
                      </option>
                      <option
                        value="2px"
                        ?selected=${this.borderWidth === "2px"}
                      >
                        Medium (2px)
                      </option>
                      <option
                        value="3px"
                        ?selected=${this.borderWidth === "3px"}
                      >
                        Thick (3px)
                      </option>
                      <option
                        value="4px"
                        ?selected=${this.borderWidth === "4px"}
                      >
                        Extra Thick (4px)
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Border Style -->
                <div class="border-style-container">
                  <p class="border-style-title">Border Style:</p>
                  <div class="border-style-controls">
                    <select
                      class="border-style-select"
                      @change=${this.onBorderStyleChange}
                    >
                      <option
                        value="solid"
                        ?selected=${this.borderStyle === "solid"}
                      >
                        Solid
                      </option>
                      <option
                        value="dashed"
                        ?selected=${this.borderStyle === "dashed"}
                      >
                        Dashed
                      </option>
                      <option
                        value="dotted"
                        ?selected=${this.borderStyle === "dotted"}
                      >
                        Dotted
                      </option>
                      <option
                        value="double"
                        ?selected=${this.borderStyle === "double"}
                      >
                        Double
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Border Color -->
                <div class="border-color-container">
                  <p class="border-color-title">Border Color:</p>
                  <div class="border-color-controls">
                    <input
                      type="color"
                      class="border-color-picker"
                      .value=${this.borderColor}
                      @input=${this.onBorderColorChange}
                    />
                    <span class="border-color-value"
                      >${this.borderColor.toUpperCase()}</span
                    >
                  </div>
                </div>

                <!-- Border Radius -->
                <div class="border-radius-container">
                  <p class="border-radius-title">Border Radius:</p>
                  <div class="border-radius-controls">
                    <input
                      type="range"
                      class="border-radius-slider"
                      min="0"
                      max="50"
                      step="1"
                      .value=${parseInt(this.borderRadius)}
                      @input=${this.onBorderRadiusChange}
                    />
                    <span class="border-radius-value"
                      >${this.borderRadius}</span
                    >
                  </div>
                </div>
              </div>
              <div class="submit-button-container">
                <button id="submit-button" @click=${this.handleSubmit}>
                  Submit Button
                </button>
              </div>
            </div>

            <div class="footer-container footer-container-left-page">
              <button class="arrow-button">
                <a href="/tableContents">
                  <svg class="icon arrow arrow-left">
                    <use href="/componentOptions.svg#icon-arrow" />
                  </svg>
                </a>
              </button>
            </div>
          </div>

          <div class="magazine-page magazine-page-right">
            <div class="page-number-right">6</div>
            <h1 class="title">Button Docs</h1>

            <!-- Right Page Grid Layout -->
            <div class="right-page-docs-grid">
              <!-- Code Section -->
              <div class="right-page-code-section">
                <code-container
                  .htmlCode=${this.htmlCode}
                  .cssCode=${this.cssCode}
                  .jsCode=${this.jsCode}
                  .tokensCode=${this.tokensCode}
                ></code-container>
              </div>
              <!-- Instructions Section -->
              <div class="right-page-instructions-section">
                <h4 class="instructions-title">How to Use This Button</h4>
                <div class="instructions-container">
                  ${renderInstructions(instructions)}
                </div>
              </div>
            </div>
            <div class="footer-container footer-container-right-page">
              <button class="arrow-button">
                <a href="/credits">
                  <svg class="icon arrow" width="50" height="50">
                    <use href="/componentOptions.svg#icon-arrow" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  static styles = [
    index.styles,
    buttonPage.styles,
    customButtonStylesCss.styles,
    gridUtility.styles,
  ];
}
