// scripts/codeInstructions.js
import { css, html, shadow } from "@calpoly/mustang";
import { reset } from "../styles/reset.css.ts";
export class CodeInstruction extends HTMLElement {
  static template = html`
    <template>
      <div class="instruction-step">
        <span class="step-number"><slot name="step-number"></slot></span>
        <div class="step-content">
          <h4 class="step-title"><slot name="step-title"></slot></h4>
          <slot name="step-content"></slot>
        </div>
      </div>
    </template>
  `;

  static styles = css`
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
  `;

  constructor() {
    super();
    shadow(this)
      .template(CodeInstruction.template)
      .styles([reset, CodeInstruction.styles]);
  }
}
