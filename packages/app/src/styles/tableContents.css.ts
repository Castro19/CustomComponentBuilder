/* Table of Contents Local Styles */
import { css } from "@calpoly/mustang";
const styles = css`
  /* Title Styling */
  .title {
    font-size: var(
      --font-size-xl
    ); /* Adjust font size to fit the page nicely */
    color: var(--color-gold);
    text-align: center; /* Center the title horizontally */
    margin: var(--spacing-md) 0; /* Space around the title */
  }
  /* Table of Contents Container Styling */
  .toc-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md); /* Space between each TOC item */
    margin: var(--spacing-md) 0; /* Add some space around the TOC */
  }

  /* Individual Table of Contents Items */
  .toc-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-md); /* Adjusted size to match the design */
    color: var(--color-white);
    text-decoration: none; /* Remove underline from links */
    padding: var(--spacing-sm); /* Add padding for a button-like appearance */
    background-color: transparent; /* Transparent background to blend in */
    border: none; /* Remove default button border */
    cursor: pointer; /* Pointer cursor for interactivity */
    transition: background-color 0.3s ease;
  }

  .toc-item:hover {
    background-color: var(--color-shadow-light); /* Highlight effect on hover */
  }

  /* Table of Contents Title Styling */
  .toc-title {
    font-family: var(--font-family-serif);
    font-weight: 600;
  }

  /* Dashed Line Styling */
  .toc-dots {
    flex-grow: 1; /* Allows the dots to stretch between title and page number */
    border-bottom: var(--border-width-thin) dashed var(--color-white); /* Dashed line styling */
    margin: 0 var(--spacing-sm); /* Space between the title and page number */
  }

  /* Page Number Styling in the Table of Contents */
  .toc-page-number {
    font-family: var(--font-family-serif);
    font-weight: 500;
    color: var(--color-white);
  }

  /* Responsive Adjustments for Table of Contents */
  @media (max-width: 1024px) {
    .title {
      font-size: var(--font-size-lg); /* Smaller font size for titles */
    }
    .toc-item {
      font-size: var(--font-size-sm); /* Smaller font size for titles */
      padding: 0;
    }
  }
`;

export default { styles };
