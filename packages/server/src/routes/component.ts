import express, { Request, Response } from "express";
import { getComponentConfig } from "../services/componentServices";

const router = express.Router();

router.get("/:componentId", async (req: Request, res: Response) => {
  const { componentId } = req.params;
  console.log("componentId", componentId);
  try {
    const data = await getComponentConfig(componentId);
    res.json(data);
  } catch (err) {
    res.status(404).send(`Component ${componentId} not found`);
  }
});

export default router;
