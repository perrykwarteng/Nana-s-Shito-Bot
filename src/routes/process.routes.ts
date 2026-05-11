import express from "express";

import { webhook } from "../controllers/process.controller";

const router = express.Router();

router.post("/webhook", webhook);

export default router;
