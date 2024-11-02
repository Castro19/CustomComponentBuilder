import { ComponentConfig } from "../models/component";

const componentConfigs: { [key: string]: ComponentConfig } = {
  buttonPage: {
    variants: ["primary", "secondary", "destructive"],
    options: ["type", "font", "border"],
    instructions: {
      1: {
        title: "Include Required CSS",
        description:
          "Copy the CSS code from the CSS tab above and include it in your stylesheet.",
      },
      2: {
        title: "Include Required HTML",
        description:
          "Copy the HTML code from the HTML tab above and include it in your HTML file.",
      },
      3: {
        title: "Add JavaScript",
        description:
          "Copy the JavaScript code from the JS tab above and include it in your script file.",
      },
    },
  },
  // More configurations will be added:
};

export function getComponentConfig(id: string): ComponentConfig {
  return componentConfigs[id] || componentConfigs["buttonPage"];
}
