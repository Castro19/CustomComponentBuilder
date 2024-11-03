import { Schema, model } from "mongoose";
import { ButtonConfig } from "../models/button";

type ButtonConfigWithId = ButtonConfig & { buttonId: string };

const ButtonConfigSchema = new Schema<ButtonConfigWithId>(
  {
    buttonId: { type: String, required: true, unique: true },
    variant: {
      type: String,
      required: true,
    },
    text: { type: String },
    code: { type: String },
    iconOnly: { type: Boolean },
    icon: { type: String },
    iconLabel: { type: String },
  },
  { collection: "button_configs" }
);

const ButtonConfigModel = model<ButtonConfigWithId>(
  "ButtonConfig",
  ButtonConfigSchema
);

async function get(buttonId: string): Promise<ButtonConfigWithId> {
  return ButtonConfigModel.findOne({ variant: buttonId })
    .then((data) => {
      if (data) return data;
      else throw new Error(`Button ${buttonId} Not Found`);
    })
    .catch((err) => {
      throw err;
    });
}

function index(): Promise<ButtonConfigWithId[]> {
  return ButtonConfigModel.find();
}

export default { get, index };
