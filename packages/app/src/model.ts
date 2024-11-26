// src/model.ts
import { ComponentConfig, ButtonConfig } from "server/models";

export interface Model {
  component?: ComponentConfig;
  button?: ButtonConfig;
  buttonIndex?: ButtonConfig[];
}

export const init: Model = {};
