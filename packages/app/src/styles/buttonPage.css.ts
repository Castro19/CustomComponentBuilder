import { css } from "@calpoly/mustang";

const styles = css`
  /* 1.) button Display */
  .button-display-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: var(--spacing-sm);
  }

  .button-display-title {
    font-size: var(--font-size-md);
    font-weight: bold;
    margin-top: var(--spacing-xs);
  }

  .button-display {
    position: relative;
    z-index: 1;
    background-color: #cda434;
    color: #000;
    margin-bottom: var(--spacing-xs);
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    transition: transform 0.3s ease;
    min-width: 170px;
  }

  /* Layer effect using ::before */
  .button-display::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: -1;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: scale(1.05);
  }

  .button-display:hover::before {
    transform: scale(1.1);
    opacity: 0.8;
  }

  .button-display:hover {
    transform: translateY(-2px); /* Button lifts on hover */
  }

  /* 2.) Control OPtions */
  .controls {
    display: flex;
    flex-direction: column;

    max-height: 400px;
    overflow-y: auto;
    gap: 10px;
    padding: 10px;
  }

  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .icon-container button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    width: 50px;
    height: 50px;
    filter: brightness(0) invert(1); /* Makes the icon white */
  }

  .icon-label {
    font-size: 14px;
    margin-top: 5px;
    color: var(--color-white);
  }

  .icon-container:hover .icon-label {
    color: var(--color-gold); /* Change color on hover */
  }

  /* 3.) Customization Tools */
  #customization-tools {
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  /* Heading for the customization section */
  .customization-tools-type {
    justify-self: flex-start;
    gap: var(--spacing-sm);
    font-size: 18px;
    margin-bottom: 15px;
    color: var(--color-white);
  }
  .customization-tools-type-title {
    font-size: var(--font-size-md);
    font-weight: bold;
    align-self: center;
  }
  /* Button List Container */
  .button-type-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px; /* Reduced space between buttons */
    margin: var(--spacing-sm);
    width: 100%;
  }

  .button-type {
    font-size: var(--font-size-xs); /* Smaller font size */
    padding: var(--spacing-xs) var(--spacing-sm); /* Smaller padding */
    width: 100%;
  }

  /* Font Customization */
  .font-customization {
    display: none;
    align-items: flex-start !important;
  }

  .font-family-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
  }
  .font-family-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }
  .font-family-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
    margin: var(--spacing-sm);
  }

  .font-family-select {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .font-family-select option {
    background: var(--color-black);
    color: var(--color-white);
  }

  .font-size-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
  }

  .font-size-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }

  .font-size-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
    margin: var(--spacing-sm);
  }

  .font-size-select {
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .font-size-select option {
    background: var(--color-black);
    color: var(--color-white);
  }

  @media (max-width: 1024px) {
    .controls {
      flex-direction: row;
      justify-content: space-around;
      width: 100%;
      overflow-x: auto;
      gap: var(--spacing-lg);
      max-height: 200px;
    }
    .button-type-list {
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .button-type {
      font-size: var(--font-size-xs); /* Smaller font size */
    }
    .icon {
      height: 35px;
      width: 35px;
    }
    .icon-label {
      font-size: var(--font-size-sm);
    }
  }

  .font-weight-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }

  .font-weight-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }

  .font-weight-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .font-weight-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: var(--color-white);
    outline: none;
  }

  .font-weight-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-gold);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .font-weight-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-gold);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .font-weight-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .font-weight-value {
    color: var(--color-white);
    min-width: 40px;
    text-align: center;
  }

  .button-text-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }

  .button-text-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }

  .button-text-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .button-text-input {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-white);
    border-radius: 4px;
    background: transparent;
    color: var(--color-white);
    font-size: var(--font-size-sm);
    transition: all 0.3s ease;
  }

  .button-text-input:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 2px rgba(205, 164, 52, 0.2);
  }

  .button-text-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  /* Border Customization */
  .border-customization {
    display: none;
    align-items: flex-start !important;
  }

  /* Common styles for border containers */
  .border-width-container,
  .border-style-container,
  .border-color-container,
  .border-radius-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }

  /* Common styles for titles */
  .border-width-title,
  .border-style-title,
  .border-color-title,
  .border-radius-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }

  /* Common styles for controls */
  .border-width-controls,
  .border-style-controls,
  .border-color-controls,
  .border-radius-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  /* Select styles */
  .border-width-select,
  .border-style-select {
    width: 100%;
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-white);
    border-radius: 4px;
    background: transparent;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .border-width-select option,
  .border-style-select option {
    background: var(--color-black);
    color: var(--color-white);
  }

  /* Color picker styles */
  .border-color-picker {
    -webkit-appearance: none;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .border-color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .border-color-picker::-webkit-color-swatch {
    border: 1px solid var(--color-white);
    border-radius: 4px;
  }

  .border-color-value {
    color: var(--color-white);
    font-size: var(--font-size-sm);
  }

  /* Radius slider styles */
  .border-radius-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background: var(--color-white);
    outline: none;
  }

  .border-radius-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-gold);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .border-radius-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-gold);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .border-radius-value {
    color: var(--color-white);
    min-width: 40px;
    text-align: center;
  }

  /* Hover and focus states */
  .border-width-select:hover,
  .border-style-select:hover,
  .border-radius-slider::-webkit-slider-thumb:hover {
    border-color: var(--color-gold);
  }

  .border-width-select:focus,
  .border-style-select:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 2px rgba(205, 164, 52, 0.2);
  }

  .instructions-title {
    font-size: var(--font-size-md);
    font-weight: bold;
    margin-bottom: var(--spacing-md);
    color: var(--color-gold);
  }

  /* Text and Button Color Containers */
  .text-color-container,
  .button-color-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    justify-content: flex-start;
    margin-left: var(--spacing-sm);
    margin-top: var(--spacing-sm);
  }

  /* Text and Button Color Titles */
  .text-color-title,
  .button-color-title {
    font-size: var(--font-size-sm);
    font-weight: bold;
    margin-right: var(--spacing-sm);
  }

  /* Text and Button Color Controls */
  .text-color-controls,
  .button-color-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  /* Color Picker Styles */
  .text-color-picker,
  .button-color-picker {
    -webkit-appearance: none;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .text-color-picker::-webkit-color-swatch-wrapper,
  .button-color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  .text-color-picker::-webkit-color-swatch,
  .button-color-picker::-webkit-color-swatch {
    border: 1px solid var(--color-white);
    border-radius: 4px;
  }

  .text-color-value,
  .button-color-value {
    color: var(--color-white);
    font-size: var(--font-size-sm);
    min-width: 70px;
  }

  /* Code Display Container Styles */
  .code-container {
    background-color: var(--color-black-light);
    border-radius: 8px;
    padding: var(--spacing-md);
    height: 100%;
    justify-self: stretch;
    align-self: start;
    width: 100%;
  }

  .code-tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .code-tab {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: transparent;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .code-tab.active {
    background: var(--color-gold);
    border-color: var(--color-gold);
    color: var(--color-black);
  }

  .code-content {
    background-color: var(--color-black);
    border-radius: 4px;
    padding: var(--spacing-sm);
    height: calc(100% - 60px);
    overflow-y: auto;
    text-align: left;
    display: block;
  }

  .code-panel {
    display: none;
    white-space: pre-wrap;
    font-family: "Courier New", Courier, monospace;
    font-size: var(--font-size-sm);
    color: var(--color-white);
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .instructions-container {
    background-color: var(--color-black-light);
    border-radius: 8px;
    padding: var(--spacing-md);
    height: 100%;
    color: var(--color-white);
    overflow: auto;
  }

  .code-panel.active {
    display: block;
  }

  /* Add syntax highlighting colors */
  .code-keyword {
    color: #ff79c6;
  }
  .code-string {
    color: #f1fa8c;
  }
  .code-comment {
    color: #6272a4;
  }
  .code-tag {
    color: #ff79c6;
  }
  .code-attribute {
    color: #50fa7b;
  }
  .code-value {
    color: #f1fa8c;
  }

  .button-type-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

export default { styles };
