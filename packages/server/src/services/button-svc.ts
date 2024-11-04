// src/services/button-svc.ts
import { Schema, model } from "mongoose";
import { ButtonConfigWithId } from "../models/button";

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

// Existing functions
function index(): Promise<ButtonConfigWithId[]> {
  return ButtonConfigModel.find();
}

async function get(buttonId: string): Promise<ButtonConfigWithId> {
  return ButtonConfigModel.findOne({ buttonId })
    .then((data) => {
      if (data) return data;
      else throw new Error(`Button ${buttonId} Not Found`);
    })
    .catch((err) => {
      throw err;
    });
}

// New functions
async function create(button: ButtonConfigWithId): Promise<ButtonConfigWithId> {
  const newButton = new ButtonConfigModel(button);
  console.log("NEW BUTTON", newButton);
  return newButton.save();
}

async function update(
  buttonId: string,
  button: ButtonConfigWithId
): Promise<ButtonConfigWithId> {
  return ButtonConfigModel.findOneAndUpdate({ buttonId }, button, {
    new: true,
  }).then((updated) => {
    if (!updated) throw new Error(`${buttonId} not updated`);
    else return updated;
  });
}

async function remove(buttonId: string): Promise<void> {
  return ButtonConfigModel.findOneAndDelete({ buttonId }).then((deleted) => {
    if (!deleted) throw new Error(`${buttonId} not deleted`);
  });
}

export default { index, get, create, update, remove };
