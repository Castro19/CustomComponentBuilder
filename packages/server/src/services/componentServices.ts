import { ComponentConfig } from "models/component";
import ComponentConfigModel from "./component-svc";

export async function getComponentConfig(
  componentId: string
): Promise<ComponentConfig> {
  return ComponentConfigModel.get(componentId)
    .then((data) => {
      if (data) return data;
      else throw new Error(`Component ${componentId} Not Found`);
    })
    .catch((err) => {
      throw err;
    });
}
