import {
  outputButtonStyles,
  outputButtonTokens,
  updateCodeContainerCSS,
} from "./buttonHelpers/defaultStyles.js";

// Add event listeners for each icon to ensure all icons log their clicks
document.addEventListener("DOMContentLoaded", function () {
  // Get all the icon buttons
  const iconButtons = document.querySelectorAll(
    ".icon-container button-custom"
  );
  // Get references to the display button and the customization buttons
  const buttonTypes = document.querySelectorAll(".button-type");
  const customButton = document.getElementById("customButton");
  const primaryButton = document.getElementById("primaryButton");
  const secondaryButton = document.getElementById("secondaryButton");
  const destructiveButton = document.getElementById("destructiveButton");

  // Font Section Styles
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];
  const fontSelect = document.querySelector(".font-family-select");
  const fontSizeSelect = document.querySelector(".font-size-select");
  const fontWeightSlider = document.querySelector(".font-weight-slider");
  const fontWeightValue = document.querySelector(".font-weight-value");
  const buttonTextInput = document.querySelector(".button-text-input");
  const textColorPicker = document.querySelector(".text-color-picker");
  const textColorValue = document.querySelector(".text-color-value");
  const buttonColorPicker = document.querySelector(".button-color-picker");
  const buttonColorValue = document.querySelector(".button-color-value");

  // Border control elements
  const borderWidthSelect = document.querySelector(".border-width-select");
  const borderStyleSelect = document.querySelector(".border-style-select");
  const borderColorPicker = document.querySelector(".border-color-picker");
  const borderColorValue = document.querySelector(".border-color-value");
  const borderRadiusSlider = document.querySelector(".border-radius-slider");
  const borderRadiusValue = document.querySelector(".border-radius-value");

  // Code Container elements:
  const codeContainer = document.querySelector("code-container");

  // Set initial colors
  customButton.style.setProperty("color", textColorPicker.value);
  customButton.style.setProperty("background-color", buttonColorPicker.value);

  // Set initial font styles
  customButton.style.fontSize = fontSizeSelect.value;
  customButton.style.fontFamily = fontSelect.value;
  customButton.style.fontWeight = fontWeightSlider.value;

  // Set initial border styles
  customButton.style.borderWidth = borderWidthSelect.value;
  customButton.style.borderStyle = borderStyleSelect.value;
  customButton.style.borderColor = borderColorPicker.value;
  customButton.style.borderRadius = borderRadiusSlider.value + "px";

  // Set initial CSS code with initial styles
  const cssTokens = outputButtonTokens();
  let cssCode = outputButtonStyles(customButton);
  codeContainer.setAttribute("tokens-code", cssTokens);
  codeContainer.setAttribute("css-code", cssCode);

  // Function to handle click events and log the icon that was clicked
  function showCustomizationTools(iconId) {
    const buttonTypeSection = document.getElementById(
      "customization-button-types"
    );
    const buttonFontSection = document.getElementById(
      "customization-button-font"
    );
    const buttonBorderSection = document.getElementById(
      "customization-button-border"
    );

    buttonTypeSection.style.display = "none";
    buttonFontSection.style.display = "none";
    buttonBorderSection.style.display = "none";

    // render the type icon customization tools
    if (iconId === "type-icon") {
      buttonTypeSection.style.display = "flex";
      // render the font icon customization tools
    } else if (iconId === "font-icon") {
      buttonFontSection.style.display = "flex";
      // render the border icon customization tools
    } else if (iconId === "border-icon") {
      buttonBorderSection.style.display = "flex";
    }
  }

  // Function to remove existing style classes from the button
  function clearButtonStyles() {
    customButton.classList.remove(
      "button-primary",
      "button-secondary",
      "button-destructive"
    );
    // Set initial colors
    customButton.style.setProperty("color", textColorPicker.value);
    customButton.style.setProperty("background-color", buttonColorPicker.value);

    // Set initial font styles
    customButton.style.fontSize = fontSizeSelect.value;
    customButton.style.fontFamily = fontSelect.value;
    customButton.style.fontWeight = fontWeightSlider.value;

    // Set initial border styles
    customButton.style.borderWidth = borderWidthSelect.value;
    customButton.style.borderStyle = borderStyleSelect.value;
    customButton.style.borderColor = borderColorPicker.value;
    customButton.style.borderRadius = borderRadiusSlider.value + "px";

    // Reset color pickers to default values
    document.querySelector(".text-color-value").textContent = "#000000";
    document.querySelector(".button-color-value").textContent = "#CDA434";
  }

  function createEventListenerWithCSSUpdate(element, eventType, handler) {
    element.addEventListener(eventType, function (event) {
      // Run the original handler
      handler.call(this, event);
      // Update CSS code
      cssCode = outputButtonStyles(customButton);
      codeContainer.setAttribute("css-code", cssCode);
    });
  }

  // Add click event listeners to each button
  iconButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retrieve the parent .icon-container ID and log it via the function
      const iconContainer = button.parentElement;
      showCustomizationTools(iconContainer.id);
    });
  });

  // Event listener for Primary Button
  createEventListenerWithCSSUpdate(primaryButton, "click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.style.setProperty("color", "var(--button-primary-color)");
    customButton.style.setProperty(
      "background-color",
      "var(--button-primary-background)"
    );
    customButton.style.setProperty(
      "border-color",
      "var(--button-primary-border-color)"
    );
    console.log("After styling button:", customButton.style.cssText);
  });

  // Event listener for Secondary Button
  createEventListenerWithCSSUpdate(secondaryButton, "click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.style.setProperty("color", "var(--button-secondary-color)");
    customButton.style.setProperty(
      "background-color",
      "var(--button-secondary-background)"
    );
    customButton.style.setProperty(
      "border-color",
      "var(--button-secondary-border-color)"
    );
  });

  // Event listener for Destructive Button
  createEventListenerWithCSSUpdate(destructiveButton, "click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.style.setProperty("color", "var(--button-destructive-color)");
    customButton.style.setProperty(
      "background-color",
      "var(--button-destructive-background)"
    );
    customButton.style.setProperty(
      "border-color",
      "var(--button-destructive-border-color)"
    );
  });

  /* FONT CUSTOMIZATION */
  // Populate font size options
  fontSizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = `${size}px`;
    option.textContent = `${size}px`;
    fontSizeSelect.appendChild(option);
  });

  // Font family change handler
  createEventListenerWithCSSUpdate(fontSelect, "change", function () {
    const fontFamily = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-family", fontFamily);
    });
  });

  // Font size change handler
  createEventListenerWithCSSUpdate(fontSizeSelect, "change", function () {
    const fontSize = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-size", fontSize);
    });
  });

  // Font weight change handler
  createEventListenerWithCSSUpdate(fontWeightSlider, "input", function () {
    const weight = this.value;
    fontWeightValue.textContent = weight;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-weight", weight);
    });
  });

  // Button text change handler
  buttonTextInput.addEventListener("input", function () {
    const newText = this.value || "Button"; // Use "Button" as fallback if empty
    customButton.textContent = newText;
  });

  // Text color handler
  createEventListenerWithCSSUpdate(textColorPicker, "input", function () {
    const color = this.value;
    textColorValue.textContent = color.toUpperCase();
    customButton.style.setProperty("color", color);
  });

  // Button color handler
  createEventListenerWithCSSUpdate(buttonColorPicker, "input", function () {
    const color = this.value;
    buttonColorValue.textContent = color.toUpperCase();
    customButton.style.setProperty("background-color", color);
  });

  /* BORDER CUSTOMIZATION */
  // Border width handler
  createEventListenerWithCSSUpdate(borderWidthSelect, "change", function () {
    const width = this.value;
    customButton.style.borderWidth = width;
  });

  // Border style handler
  createEventListenerWithCSSUpdate(borderStyleSelect, "change", function () {
    const style = this.value;
    customButton.style.borderStyle = style;
  });

  // Border color handler
  createEventListenerWithCSSUpdate(borderColorPicker, "input", function () {
    const color = this.value;
    borderColorValue.textContent = color.toUpperCase();
    customButton.style.borderColor = color;
  });

  // Border radius handler
  createEventListenerWithCSSUpdate(borderRadiusSlider, "input", function () {
    const radius = this.value + "px";
    borderRadiusValue.textContent = radius;
    customButton.style.borderRadius = radius;
  });
});
