/* Front Page Local Styles */
import { css } from "@calpoly/mustang";

const styles = css`
  h1,
  body,
  html {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  .magazine-cover {
    height: var(--page-height);
    background-color: var(
      --color-gray-dark
    ); /* Dark gray background for the cover */
    box-shadow: var(--box-shadow-default), var(--box-shadow-inset);
    border: var(--border-width-thin) solid var(--color-border-light);
    padding: var(--spacing-md);
    display: grid;
    grid-template-rows: auto 1fr auto; /* Three rows: header, content, footer */
    gap: var(--spacing-xs); /* Space between rows */
  }

  /* Title Styling */
  .title {
    font-size: var(--font-size-xl);
    color: var(--color-gold);
    justify-self: center; /* Center the title horizontally */
    margin: 0; /* Remove default margin */
    grid-row: 1; /* Place the title in the first row */
  }

  /* Subtitle Styling */
  .subtitle-cover {
    font-size: var(--font-size-lg);
    color: var(--color-white);
    justify-self: center; /* Center the subtitle horizontally */
    margin: 0; /* Remove default margin */
    grid-row: 2; /* Place the subtitle in the second row */
  }

  .footer-container-cover {
    display: flex;
    flex-direction: row;
    align-items: center; /* Vertically center the content */
    justify-content: space-between; /* Distribute space between items */
    width: 100%; /* Ensure the container spans the full width of the parent */
  }

  /* Author Styling */
  .author-cover {
    font-size: var(--font-size-lg);
    color: var(--color-white);
    margin: 0; /* Remove default margin */
    text-align: center; /* Center text alignment */
    flex: 1; /* Allow the author to take up available space in the center */
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .subtitle-cover {
      font-size: var(
        --font-size-lg
      ); /* Adjust the subtitle size for smaller screens */
    }
    .author-cover {
      font-size: var(
        --font-size-lg
      ); /* Reduce the author text size on smaller devices */
    }
  }

  @media (max-width: 1024px) {
    .magazine-cover {
      max-width: var(--page-width-large);
      margin: var(--spacing-xs) auto; /* Center each page individually */
    }
  }
`;

export default { styles };
