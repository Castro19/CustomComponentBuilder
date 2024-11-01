// scripts/codeInstructions.js
import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class CodeInstructions extends HTMLElement {
  static template = html`
    <template>
      <div class="instructions-container">
        <h3 class="instructions-title">How to Use This Button</h3>
        <slot name="instructions"></slot>
      </div>
    </template>
  `;

  static styles = css`
    .instructions-container {
      background-color: var(--color-black-light);
      border-radius: 8px;
      padding: var(--spacing-md);
      height: 100%;
      color: var(--color-white);
      overflow: auto;
    }

    .instructions-title {
      font-size: var(--font-size-md);
      font-weight: bold;
      margin-bottom: var(--spacing-md);
      color: var(--color-gold);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(CodeInstructions.template)
      .styles(reset.styles, CodeInstructions.styles);
  }
}
