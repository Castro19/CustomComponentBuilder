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
  const cssCode = outputButtonStyles();
  const cssTokens = outputButtonTokens();
  codeContainer.setAttribute("css-code", cssCode);
  codeContainer.setAttribute("tokens-code", cssTokens);

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
    const buttonStyles = [
      "font-family",
      "font-size",
      "font-weight",
      "color",
      "background-color",
      "border-width",
      "border-style",
      "border-color",
      "border-radius",
    ];
    // Remove custom colors when switching button types
    buttonStyles.forEach((style) => {
      customButton.style.removeProperty(style);
    });
    // Reset color pickers to default values
    document.querySelector(".text-color-value").textContent = "#000000";
    document.querySelector(".button-color-value").textContent = "#CDA434";
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
  primaryButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.classList.add("button-primary"); // Apply primary style
    // Update CSS code
    const cssCode = updateCodeContainerCSS("primary");
    const codeContainer = document.querySelector("code-container");
    codeContainer.setAttribute("css-code", cssCode);
  });

  // Event listener for Secondary Button
  secondaryButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.classList.add("button-secondary"); // Apply secondary style
    // Update CSS code
    const cssCode = updateCodeContainerCSS("secondary");
    const codeContainer = document.querySelector("code-container");
    codeContainer.setAttribute("css-code", cssCode);
  });

  // Event listener for Destructive Button
  destructiveButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    customButton.classList.add("button-destructive"); // Apply destructive style
    // Update CSS code
    const cssCode = updateCodeContainerCSS("destructive");
    const codeContainer = document.querySelector("code-container");
    codeContainer.setAttribute("css-code", cssCode);
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
  fontSelect.addEventListener("change", function () {
    const fontFamily = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-family", fontFamily);
    });
  });

  // Font size change handler
  fontSizeSelect.addEventListener("change", function () {
    const fontSize = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-size", fontSize);
    });
  });

  // Font weight change handler
  fontWeightSlider.addEventListener("input", function () {
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
  textColorPicker.addEventListener("input", function () {
    const color = this.value;
    textColorValue.textContent = color.toUpperCase();
    customButton.style.setProperty("color", color);
  });

  // Button color handler
  buttonColorPicker.addEventListener("input", function () {
    const color = this.value;
    buttonColorValue.textContent = color.toUpperCase();
    customButton.style.setProperty("background-color", color);
  });

  /* BORDER CUSTOMIZATION */
  // Border width handler
  borderWidthSelect.addEventListener("change", function () {
    const width = this.value;
    customButton.style.borderWidth = width;
  });

  // Border style handler
  borderStyleSelect.addEventListener("change", function () {
    const style = this.value;
    customButton.style.borderStyle = style;
  });

  // Border color handler
  borderColorPicker.addEventListener("input", function () {
    const color = this.value;
    borderColorValue.textContent = color.toUpperCase();
    customButton.style.borderColor = color;
  });

  // Border radius handler
  borderRadiusSlider.addEventListener("input", function () {
    const radius = this.value + "px";
    borderRadiusValue.textContent = radius;
    customButton.style.borderRadius = radius;
  });
});
