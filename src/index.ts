import express from "express";
import dotenv from "dotenv";
import telegramRoute from "./routes/process.routes";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/telegram", telegramRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`App is running port http://localhost:${PORT}`);
});
