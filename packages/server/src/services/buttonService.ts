import { ButtonConfig } from "../models/button";

const buttonConfigs: { [key: string]: ButtonConfig } = {
  primaryButton: {
    variant: "primary",
    text: "Primary Button",
  },
  secondaryButton: {
    variant: "secondary",
    text: "Secondary Button",
  },
  destructiveButton: {
    variant: "destructive",
    text: "Destructive Button",
  },
  iconButton: {
    variant: "primary",
    iconOnly: true,
    icon: "/icons/componentOptions.svg#icon-options",
  },
  // More configurations will be added:
};

export function getButtonConfig(id: string): ButtonConfig {
  return buttonConfigs[id] || buttonConfigs["primaryButton"];
}
