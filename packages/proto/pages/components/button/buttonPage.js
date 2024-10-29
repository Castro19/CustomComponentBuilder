// Function to handle click events and log the icon that was clicked
function showCustomizationTools(iconId) {
  const buttonTypeSection = document.getElementById(
    "customization-button-types"
  );
  const buttonFontSection = document.getElementById(
    "customization-button-font"
  );

  buttonTypeSection.style.display = "none";
  buttonFontSection.style.display = "none";

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

  // Function to remove existing style classes from the button
  function clearButtonStyles() {
    displayButton.classList.remove(
      "button-primary",
      "button-secondary",
      "button-destructive"
    );
  }

  // Event listener for Primary Button
  primaryButton.addEventListener("click", function () {
    clearButtonStyles(); // Remove existing styles
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

  // Font size options (in pixels)
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  // Populate font size dropdown
  fontSizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = `${size}px`;
    option.textContent = `${size}px`;
    fontSizeSelect.appendChild(option);
  });

  // Set default font size
  fontSizeSelect.value = "16px";

  // Font family change handler (existing code)
  fontSelect.addEventListener("change", function () {
    const fontFamily = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-family", fontFamily, "important");
    });
  });

  // Font size change handler
  fontSizeSelect.addEventListener("change", function () {
    const fontSize = this.value;
    buttonTypes.forEach((btn) => {
      btn.style.setProperty("font-size", fontSize, "important");
    });
  });
});
