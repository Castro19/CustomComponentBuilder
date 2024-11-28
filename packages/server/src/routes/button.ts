// src/routes/buttons.ts
import express, { Request, Response } from "express";
import { ButtonConfig, ButtonConfigWithId } from "../models/button";
import Buttons from "../services/button-svc";

const router = express.Router();

// GET all buttons
router.get("/", (_, res: Response) => {
  Buttons.index()
    .then((list: ButtonConfig[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// GET a single button by ID
router.get("/:buttonId", (req: Request, res: Response) => {
  const { buttonId } = req.params;

  Buttons.get(buttonId)
    .then((button: ButtonConfigWithId | null) => {
      if (button) res.json(button);
      else res.status(404).send("Button not found");
    })
    .catch((err) => res.status(404).send(err.message));
});
// POST a new button
router.post("/", async (req: Request, res: Response) => {
  try {
    const buttonData = req.body as ButtonConfig;

    // Validate required fields
    // Validate required fields
    if (!buttonData.variant) {
      return res.status(400).json({ error: "Button variant is required" });
    }
    if (!buttonData.htmlCode) {
      return res.status(400).json({ error: "HTML code is required" });
    }
    if (!buttonData.cssCode) {
      return res.status(400).json({ error: "CSS code is required" });
    }
    if (!buttonData.jsCode) {
      return res.status(400).json({ error: "JS code is required" });
    }
    // Add more validations as needed

    // Generate base buttonId
    const baseId = buttonData.text
      ? `${buttonData.variant}-${buttonData.text}`
      : `${buttonData.variant}-button`;

    // Convert to URL-friendly format
    let buttonId = baseId
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Check for existing buttonId and append number if needed
    let counter = 1;
    let uniqueButtonId = buttonId;

    while (await Buttons.get(uniqueButtonId)) {
      uniqueButtonId = `${buttonId}-${counter}`;
      counter++;
    }
    buttonId = uniqueButtonId;

    const newButton: ButtonConfigWithId = {
      ...buttonData,
      buttonId,
    };

    const createdButton = await Buttons.create(newButton);
    res.status(201).json(createdButton);
  } catch (err) {
    res
      .status(500)
      .send(err instanceof Error ? err.message : "Unknown error occurred");
  }
});

// PUT (update) an existing button
router.put("/:buttonId", (req: Request, res: Response) => {
  const { buttonId } = req.params;
  const updatedButton = req.body as ButtonConfigWithId;

  Buttons.update(buttonId, updatedButton)
    .then((button: ButtonConfig) => res.json(button))
    .catch((err) => res.status(404).send(err.message));
});

// DELETE a button
router.delete("/:buttonId", (req: Request, res: Response) => {
  const { buttonId } = req.params;

  Buttons.remove(buttonId)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err.message));
});

export default router;
