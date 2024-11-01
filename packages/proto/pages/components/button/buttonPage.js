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

  // For now, just log the clicked icon's ID
  // Later I will extend this to display the customization tools
  if (iconId === "type-icon") {
    console.log("Type icon clicked");
    buttonTypeSection.style.display = "flex";
    // render the type icon customization tools
  } else if (iconId === "font-icon") {
    console.log("Font icon clicked");
    buttonFontSection.style.display = "flex";
    // render the font icon customization tools
  } else if (iconId === "border-icon") {
    console.log("Border icon clicked");
    buttonBorderSection.style.display = "flex";
    // render the border icon customization tools
  }
}

// Add event listeners for each icon to ensure all icons log their clicks
document.addEventListener("DOMContentLoaded", function () {
  // Get all the icon buttons
  const iconButtons = document.querySelectorAll(".icon-container button");

  // Add click event listeners to each button
  iconButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retrieve the parent .icon-container ID and log it via the function
      const iconContainer = button.parentElement;
      showCustomizationTools(iconContainer.id);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the display button and the customization buttons
  const displayButton = document.getElementById("customButton");
  const primaryButton = document.getElementById("primaryButton");
  const secondaryButton = document.getElementById("secondaryButton");
  const destructiveButton = document.getElementById("destructiveButton");
  const textColorPicker = document.querySelector(".text-color-picker");
  const buttonColorPicker = document.querySelector(".button-color-picker");

  // Function to remove existing style classes from the button
  function clearButtonStyles() {
    displayButton.classList.remove(
      "button-primary",
      "button-secondary",
      "button-destructive"
    );
    // Remove custom colors when switching button types
    displayButton.style.removeProperty("color");
    displayButton.style.removeProperty("background-color");
    // Reset color pickers to default values
    textColorPicker.value = "#000000";
    buttonColorPicker.value = "#CDA434";
    document.querySelector(".text-color-value").textContent = "#000000";
    document.querySelector(".button-color-value").textContent = "#CDA434";
  }

  // Event listener for Primary Button
  primaryButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    console.log("Primary button clicked");
    displayButton.classList.add("button-primary"); // Apply primary style
  });

  // Event listener for Secondary Button
  secondaryButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    displayButton.classList.add("button-secondary"); // Apply secondary style
  });

  // Event listener for Destructive Button
  destructiveButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
    displayButton.classList.add("button-destructive"); // Apply destructive style
  });

  // Optional: On initial load, set the default button style
  displayButton.classList.add("button-primary");
});

document.addEventListener("DOMContentLoaded", function () {
  const buttonTypes = document.querySelectorAll(".button-type");
  const fontSelect = document.querySelector(".font-family-select");
  const fontSizeSelect = document.querySelector(".font-size-select");
  const fontWeightSlider = document.querySelector(".font-weight-slider");
  const fontWeightValue = document.querySelector(".font-weight-value");
  const buttonTextInput = document.querySelector(".button-text-input");
  const customButton = document.getElementById("customButton");
  const textColorPicker = document.querySelector(".text-color-picker");
  const textColorValue = document.querySelector(".text-color-value");
  const buttonColorPicker = document.querySelector(".button-color-picker");
  const buttonColorValue = document.querySelector(".button-color-value");

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  fontSizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = `${size}px`;
    option.textContent = `${size}px`;
    fontSizeSelect.appendChild(option);
  });

  // Set default font size
  fontSizeSelect.value = "16px";

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

  // Set initial colors
  customButton.style.setProperty("color", textColorPicker.value);
  customButton.style.setProperty(
    "background-color",
    buttonColorPicker.value,
    "important"
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // Border control elements
  const borderWidthSelect = document.querySelector(".border-width-select");
  const borderStyleSelect = document.querySelector(".border-style-select");
  const borderColorPicker = document.querySelector(".border-color-picker");
  const borderColorValue = document.querySelector(".border-color-value");
  const borderRadiusSlider = document.querySelector(".border-radius-slider");
  const borderRadiusValue = document.querySelector(".border-radius-value");
  const customButton = document.getElementById("customButton");

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

  // Set initial border styles
  customButton.style.borderWidth = borderWidthSelect.value;
  customButton.style.borderStyle = borderStyleSelect.value;
  customButton.style.borderColor = borderColorPicker.value;
  customButton.style.borderRadius = borderRadiusSlider.value + "px";
});

document.addEventListener("DOMContentLoaded", function () {
  const textColorPicker = document.querySelector(".text-color-picker");
  const textColorValue = document.querySelector(".text-color-value");
  const customButton = document.getElementById("customButton");

  // Text color handler
  textColorPicker.addEventListener("input", function () {
    const color = this.value;
    textColorValue.textContent = color.toUpperCase();
    customButton.style.setProperty("color", color);
  });
});

// Add this new section for code tabs functionality
document.addEventListener("DOMContentLoaded", function () {
  const codeTabs = document.querySelectorAll(".code-tab");
  const codePanels = document.querySelectorAll(".code-panel");

  function switchTab(tabId) {
    // Remove active class from all tabs and panels
    codeTabs.forEach((tab) => tab.classList.remove("active"));
    codePanels.forEach((panel) => panel.classList.remove("active"));

    // Add active class to selected tab and panel
    const selectedTab = document.querySelector(
      `.code-tab[data-tab="${tabId}"]`
    );
    const selectedPanel = document.getElementById(`${tabId}Code`);

    if (selectedTab && selectedPanel) {
      selectedTab.classList.add("active");
      selectedPanel.classList.add("active");
    }
  }

  // Add click handlers to tabs
  codeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Function to update code content (will be used later)
  function updateCodeContent(type, newCode) {
    const codePanel = document.getElementById(`${type}Code`);
    if (codePanel) {
      codePanel.innerHTML = newCode;
    }
  }

  // Example usage (to be implemented later with actual button modifications):
  // updateCodeContent('html', '<button class="custom-button">New Button</button>');
  // updateCodeContent('css', '.custom-button { /* new styles */ }');
  // updateCodeContent('js', '// new JavaScript code');
});
