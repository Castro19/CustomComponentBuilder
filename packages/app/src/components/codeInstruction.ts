// scripts/codeInstruction.ts
import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { reset } from "../styles/reset.css.js";

@customElement("code-instruction")
export class CodeInstruction extends LitElement {
  static styles = [
    unsafeCSS(reset),
    unsafeCSS(css`
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
        color: var(--color-white);
      }
    `),
  ];

  render() {
    return html`
      <div class="instruction-step">
        <span class="step-number"><slot name="step-number"></slot></span>
        <div class="step-content">
          <h4 class="step-title"><slot name="step-title"></slot></h4>
          <div class="step-description">
            <slot name="step-content"></slot>
          </div>
        </div>
      </div>
    `;
  }
}
