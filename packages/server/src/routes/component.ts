import express, { Request, Response } from "express";
import { ComponentPage } from "../pages/componentPage";
import { getComponentConfig } from "../services/componentServices";

const router = express.Router();

router.get("/:componentId", async (req: Request, res: Response) => {
  const { componentId } = req.params;
  try {
    const data = await getComponentConfig(componentId);
    const page = new ComponentPage(data);

    res.set("Content-Type", "text/html").send(page.render());
  } catch (err) {
    res.status(404).send(`Component ${componentId} not found`);
  }
});

export default router;
