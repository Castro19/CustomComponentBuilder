// import { ButtonConfig } from "../models/button";
// import ButtonConfigModel from "./button-svc";

// const buttonConfigs: { [key: string]: ButtonConfig } = {
//   primaryButton: {
//     variant: "primary",
//     text: "Primary Button",
//     code: `{
//   color: var(--button-primary-color);
//   background-color: var(--button-primary-background);
//   font-family: Arial, sans-serif;
//   font-weight: 400;
//   border-width: 1px;
//   border-style: solid;
//   border-color: var(--button-primary-border-color);
//   border-radius: 4px;
//   font-size: 12px;
// }`,
//   },
//   secondaryButton: {
//     variant: "secondary",
//     text: "Secondary Button",
//     code: `{
//   color: var(--button-secondary-color);
//   background-color: var(--button-secondary-background);
//   font-family: Arial, sans-serif;
//   font-weight: 400;
//   border-width: 1px;
//   border-style: solid;
//   border-color: var(--button-secondary-border-color);
//   border-radius: 4px;
//   font-size: 12px;
// }`,
//   },
//   destructiveButton: {
//     variant: "destructive",
//     text: "Destructive Button",
//     code: `{
//   color: var(--button-destructive-color);
//   background-color: var(--button-destructive-background);
//   font-family: Arial, sans-serif;
//   font-weight: 400;
//   border-width: 1px;
//   border-style: solid;
//   border-color: var(--button-destructive-border-color);
//   border-radius: 4px;
//   font-size: 12px;
// }`,
//   },
//   //   iconButton: {
//   //     variant: "primary",
//   //     iconOnly: true,
//   //     icon: "/icons/componentOptions.svg#icon-options",
//   //   },
//   // More configurations will be added:
// };

// export async function getButtonConfig(buttonId: string): Promise<ButtonConfig> {
//   return ButtonConfigModel.get(buttonId)
//     .then((data) => {
//       if (data) return data;
//       else throw new Error(`Button ${buttonId} Not Found`);
//     })
//     .catch((err) => {
//       throw err;
//     });
// }
