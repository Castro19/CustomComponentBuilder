import { Auth, define, Observer } from "@calpoly/mustang";
import { html, LitElement, TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import buttonPage from "../styles/buttonPage.css.js";
import customButtonStyles from "../styles/custom-button-styles.css.js";
import gridUtility from "../styles/gridUtility.css.js";
import { ComponentConfig } from "server/models";
import { CodeInstruction } from "../components/codeInstruction.ts";
import { CodeContainer } from "../components/codeContainer.ts";
import { ButtonCustomComponent } from "../components/buttonComponent.ts";
export class ButtonComponentViewElement extends LitElement {
  static uses = define({
    "button-custom": ButtonCustomComponent,
    "code-instruction": CodeInstruction,
    "code-container": CodeContainer,
  });

  @property({ attribute: "component-id", reflect: true })
  componentId = "button";

  @state()
  componentConfig: ComponentConfig | null = null;
  _authObserver = new Observer<Auth.Model>(this, "blazing:auth");

  _user = new Auth.User();

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user) {
        this._user = user;
      }
      this.loadData();
    });
  }

  loadData() {
    const src = `/component/${this.componentId}`;

    fetch(src, {
      headers: Auth.headers(this._user),
    })
      .then((res: Response) => {
        if (res.status === 200) return res.json();
        throw `Server responded with status ${res.status}`;
      })
      .catch((err) => console.log("Failed to load component data:", err))
      .then((json: ComponentConfig) => {
        if (json) {
          this.componentConfig = json;
        }
      })
      .catch((err) => console.log("Failed to convert component data:", err));
  }

  render(): TemplateResult {
    if (!this.componentConfig) {
      return html`<div>No component data found</div>`;
    }
    const { variants, options, instructions } = this.componentConfig;
    console.log("variants", variants);
    console.log("options", options);
    console.log("instructions", instructions);
    const renderVariants = (variants: string[]) => {
      return variants.map((variant) => {
        return html`<button-custom
          id="${variant}Button"
          data-variant="${variant}"
          >${variant} Button</button-custom
        >`;
      });
    };
    const renderOptions = (options: string[]) => {
      return options.map((option) => {
        return html`<div class="icon-container" id="${option}-icon">
          <button-custom data-icon-only>
            <svg slot="icon" class="icon">
              <use href="/componentOptions.svg#icon-${option}" />
            </svg>
          </button-custom>
        </div>`;
      });
    };
    // const renderInstructions = (instructions: Instructions) => {
    //   return Array.from(instructions.entries()).map(
    //     ([stepNumber, instruction]) => {
    //       return html`<code-instruction>
    //         <span slot="step-number">${stepNumber}</span>
    //         <h4 slot="step-title">${instruction.title}</h4>
    //         <div slot="step-content">${instruction.description}</div>
    //       </code-instruction>`;
    //     }
    //   );
    // };

    return html`
      <main>
        <div class="magazine-wrapper">
          <div class="magazine-page magazine-page-left">
            <div class="page-number-left">5</div>
            <h1 class="title">Button</h1>
            <div class="grid-container left-page-grid-2-rows">
              <div class="grid-item left-page-first-row">
                <div class="button-display-container">
                  <p class="button-display-title">Button Display</p>
                  <button id="customButton" class="button-display button-type">
                    Button
                  </button>
                </div>
              </div>
              <div class="grid-item">
                <!-- <div class="controls">${renderOptions(options)}</div> -->
              </div>
              <div
                class="grid-item-customization"
                id="customization-button-types"
              >
                <h3 class="customization-tools-type-title">Button Types</h3>
                <!-- <div class="button-type-list">${renderVariants(
                  variants
                )}</div> -->
              </div>
              <div
                class="grid-item-customization font-customization"
                id="customization-button-font"
              >
                <h3 class="customization-tools-type-title">Font</h3>
                <div class="font-family-container">
                  <p class="font-family-title">Font Family:</p>
                  <div class="font-family-list">
                    <select class="font-family-select">
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="Helvetica, sans-serif">Helvetica</option>
                      <option value="Georgia, serif">Georgia</option>
                      <option value="'Times New Roman', serif">
                        Times New Roman
                      </option>
                      <option value="Verdana, sans-serif">Verdana</option>
                      <option value="'Courier New', monospace">
                        Courier New
                      </option>
                    </select>
                  </div>
                </div>
                <div class="font-size-container">
                  <p class="font-size-title">Font Size:</p>
                  <div class="font-size-list">
                    <select class="font-size-select"></select>
                  </div>
                </div>
                <div class="font-weight-container">
                  <p class="font-weight-title">Font Weight:</p>
                  <div class="font-weight-controls">
                    <input
                      type="range"
                      class="font-weight-slider"
                      min="100"
                      max="900"
                      step="100"
                      value="400"
                    />
                    <span class="font-weight-value">400</span>
                  </div>
                </div>
                <div class="button-text-container">
                  <p class="button-text-title">Button Text:</p>
                  <div class="button-text-controls">
                    <input
                      type="text"
                      class="button-text-input"
                      placeholder="Enter button text..."
                      value="Button"
                    />
                  </div>
                </div>
                <div class="text-color-container">
                  <p class="text-color-title">Text Color:</p>
                  <div class="text-color-controls">
                    <input
                      type="color"
                      class="text-color-picker"
                      value="#000000"
                    />
                    <span class="text-color-value">#000000</span>
                  </div>
                </div>
                <div class="button-color-container">
                  <p class="button-color-title">Button Color:</p>
                  <div class="button-color-controls">
                    <input
                      type="color"
                      class="button-color-picker"
                      value="#CDA434"
                    />
                    <span class="button-color-value">#CDA434</span>
                  </div>
                </div>
              </div>
              <div
                class="grid-item-customization border-customization"
                id="customization-button-border"
              >
                <h3 class="customization-tools-type-title">Border</h3>

                <!-- Border Width -->
                <div class="border-width-container">
                  <p class="border-width-title">Border Width:</p>
                  <div class="border-width-controls">
                    <select class="border-width-select">
                      <option value="1px">Thin (1px)</option>
                      <option value="2px">Medium (2px)</option>
                      <option value="3px">Thick (3px)</option>
                      <option value="4px">Extra Thick (4px)</option>
                    </select>
                  </div>
                </div>

                <!-- Border Style -->
                <div class="border-style-container">
                  <p class="border-style-title">Border Style:</p>
                  <div class="border-style-controls">
                    <select class="border-style-select">
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                      <option value="dotted">Dotted</option>
                      <option value="double">Double</option>
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
                      value="#FFFFFF"
                    />
                    <span class="border-color-value">#FFFFFF</span>
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
                      value="4"
                    />
                    <span class="border-radius-value">4px</span>
                  </div>
                </div>
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
                  html-code="&lt;button class='customButton'&gt;Button Text&lt;/button&gt;"
                  css-code=".customButton { background-color: #cda434; /* styles */ }"
                  js-code="const button = document.querySelector('.customButton'); /* code */"
                ></code-container>
              </div>
              <!-- Instructions Section -->
              <div class="right-page-instructions-section">
                <h4 class="instructions-title">How to Use This Button</h4>
                <div class="instructions-container"></div>
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
    buttonPage.styles,
    customButtonStyles.styles,
    gridUtility.styles,
  ];
}
