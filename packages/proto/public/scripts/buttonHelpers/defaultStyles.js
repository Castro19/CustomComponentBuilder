export function outputButtonStyles(customButton) {
  const cssText = customButton.style.cssText;
  // Split the cssText into individual rules and format them
  const cssRules = cssText
    .split(";")
    .map((rule) => rule.trim())
    .filter((rule) => rule !== "");

  const cssOutput = `#customButton {\n  ${cssRules.join(";\n  ")};\n}`;
  // Log the formatted CSS to the console
  return cssOutput;
}

export function outputButtonTokens() {
  return `
  :host {
    --button-primary-background: #007bff;
    --button-primary-color: #fff;
    --button-secondary-background: #6c757d;
    --button-secondary-color: #fff;
    --button-destructive-background: #dc3545;
    --button-destructive-color: #fff;
  
    /* Button Borders */
    --button-border-radius: 4px;
    --button-border-width: 1px;
    --button-border-style: solid;
    --button-primary-border-color: #007bff;
    --button-secondary-border-color: #6c757d;
    --button-destructive-border-color: #dc3545;
  
    /* Button Colors */
    --button-primary-hover-background: #0056b3;
    --button-secondary-hover-background: #5a6268;
    --button-destructive-hover-background: #c82333;
  
    /* Font Customizations */
    --button-font-family: "Arial", sans-serif;
    --button-font-size: 12px;
    --button-font-weight: 600; /* Bold */
    --button-font-style: normal;
  
    /* Box Shadow */
    --button-box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  
    /* Button Padding */
    --button-padding: 12px 24px;
  }
    `;
}

export function updateCodeContainerCSS(buttonType) {
  let cssCode = "";

  if (buttonType === "primary") {
    cssCode = `/* Primary Button */
  .customButton {
      background-color: var(--button-primary-background);
      color: var(--button-primary-color);
      border-color: var(--button-primary-border-color);
  }
  .customButton:hover {
      background-color: var(--button-primary-hover-background);
  }
  `;
  } else if (buttonType === "secondary") {
    cssCode = `/* Secondary Button */
  .customButton {
      background-color: var(--button-secondary-background);
      color: var(--button-secondary-color);
      border-color: var(--button-secondary-border-color);
  }
  .customButton:hover {
      background-color: var(--button-secondary-hover-background);
  }
  `;
  } else if (buttonType === "destructive") {
    cssCode = `/* Destructive Button */
  .customButton {
      background-color: var(--button-destructive-background);
      color: var(--button-destructive-color);
      border-color: var(--button-destructive-border-color);
  }
  .customButton:hover {
      background-color: var(--button-destructive-hover-background);
  }
        `;
  }
  return cssCode;
}
