import { Schema, model } from "mongoose";
import { ComponentConfig } from "../models/component";

const componentConfigs: { [key: string]: ComponentConfig } = {
  buttonPage: {
    variants: ["primary", "secondary", "destructive"],
    options: ["type", "font", "border"],
    instructions: new Map([
      [
        1,
        {
          title: "Include Required CSS",
          description:
            "Copy the CSS code from the CSS tab above and include it in your stylesheet.",
        },
      ],
      [
        2,
        {
          title: "Include Required HTML",
          description:
            "Copy the HTML code from the HTML tab above and include it in your HTML file.",
        },
      ],
      [
        3,
        {
          title: "Add JavaScript",
          description:
            "Copy the JavaScript code from the JS tab above and include it in your script file.",
        },
      ],
    ]),
  },
};

type ComponentConfigWithId = ComponentConfig & { componentId: string };
// Define the schema
const ComponentConfigSchema = new Schema<ComponentConfigWithId>(
  {
    componentId: { type: String, required: true, unique: true },
    variants: [{ type: String, enum: ["primary", "secondary", "destructive"] }],
    options: [{ type: String, enum: ["type", "font", "border"] }],
    instructions: {
      type: Map,
      of: new Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
      }),
    },
  },
  { collection: "component_configs" }
);

// Create model
const ComponentConfigModel = model<ComponentConfigWithId>(
  "ComponentConfig",
  ComponentConfigSchema
);

// CRUD Operations
function get(componentId: string): Promise<ComponentConfigWithId> {
  return ComponentConfigModel.findOne({ componentId })
    .then((data) => {
      if (data) return data;
      else throw new Error(`Component ${componentId} Not Found`);
    })
    .catch((err) => {
      throw err;
    });
}

function index(): Promise<ComponentConfigWithId[]> {
  return ComponentConfigModel.find();
}

export default { get, index };
