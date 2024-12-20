/* Global Utility Classes for Grid Layouts */
import { css } from "@calpoly/mustang";

const styles = css`
  /* Base Grid Container */
  .grid-container {
    display: grid;
    gap: var(--spacing-xs); /* Default spacing between grid items */
    padding: var(--spacing-xs); /* Add some padding for internal spacing */
    border: var(--border-width-thick) solid var(--color-border-dark); /* Border for visual distinction */
    border-radius: var(--border-radius-small); /* Rounded corners */
  }
  .grid-container-2-rows-3-columns {
    grid-template-rows: 1fr 1fr; /* Two rows, the second row is three times the height of the first */
    grid-template-columns: 1fr 1fr 1fr;
  }
  .left-page-grid-2-rows {
    grid-template-rows: 1fr 3fr; /* Two rows, the second row is three times the height of the first */
    grid-template-columns: 1fr 2fr;
  }
  .left-page-first-row {
    grid-column: 1 / -1; /* Span the entire width of the grid in the first row */
  }
  .right-page-grid-2-rows {
    grid-template-rows: 1fr 2fr; /* Two rows, the second row is three times the height of the first */
  }
  /* Individual Grid Items */
  .grid-item,
  .grid-item-customization {
    background-color: var(
      --color-gray-dark
    ); /* Dark gray background for grid items */
    border: var(--border-width-thin) solid var(--color-border-light); /* Border to outline each grid item */
    border-radius: var(
      --border-radius-small
    ); /* Rounded corners for grid items */
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    font-size: var(--font-size-base);
  }

  .grid-item-customization {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  /* Responsive Adjustments for Single-Column Layout */
  @media (max-width: 1024px) {
    .grid-container {
      grid-template-columns: 1fr; /* Switch to a single-column layout for smaller screens */
      grid-template-rows: auto; /* Automatically size rows based on content */
      gap: var(
        --spacing-sm
      ); /* Increase gap for better spacing between items */
    }
    .left-page-grid-2-rows {
      grid-template-rows: 3fr 3fr 5fr;
    }

    .grid-item {
      margin: var(--spacing-xs) 0; /* Add some vertical spacing between grid items */
      width: 100%; /* Ensure items take up full width */
    }
  }

  /* Right Page Specific Grid Layout */
  .right-page-docs-grid {
    display: grid;
    grid-template-rows: 2fr 3fr; /* Two equal rows */
    gap: var(--spacing-xs);
    padding: var(--spacing-xs);
    overflow: auto;
    border: var(--border-width-thick) solid var(--color-border-dark);
  }

  /* Code Section Grid Item */
  .right-page-code-section {
    background-color: var(--color-gray-dark);
    border: var(--border-width-thin) solid var(--color-border-light);
    border-radius: var(--border-radius-small);
    overflow: hidden; /* Contains the scrollable content */
    max-height: 100%; /* Ensures it stays within grid bounds */
  }

  .right-page-instructions-section {
    background-color: var(--color-gray-dark);
    border: var(--border-width-thin) solid var(--color-border-light);
    border-radius: var(--border-radius-small);
    overflow: hidden;
    max-height: 100%;
  }
`;

export default { styles };
