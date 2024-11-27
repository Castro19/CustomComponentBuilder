// src/model.ts
import { ComponentConfig, ButtonConfig, Profile } from "server/models";

export interface Model {
  component?: ComponentConfig;
  button?: ButtonConfig;
  buttonIndex?: ButtonConfig[];
  profile?: Profile;
}

export const init: Model = {};
