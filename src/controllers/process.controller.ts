import type { Request, Response } from "express";
import axios from "axios";
import { agent } from "./agent.controller";

export const webhook = async (req: Request, res: Response) => {
  const { message } = req.body;

  res.sendStatus(200);

  if (!message?.text) return;

  const chatId = message.chat.id;
  const text = message.text;

  let typingInterval: NodeJS.Timeout;

  try {
    typingInterval = setInterval(() => {
      axios
        .post(
          `${process.env.TELEGRAM_API}${process.env.BOT_TOKEN}/sendChatAction`,
          {
            chat_id: chatId,
            action: "typing",
          },
        )
        .catch(() => {});
    }, 4000);

    const agentResponse = await agent(chatId, text);

    const reply =
      typeof agentResponse?.response === "string"
        ? agentResponse.response
        : JSON.stringify(agentResponse.response, null, 2);

    clearInterval(typingInterval);

    await axios.post(
      `${process.env.TELEGRAM_API}${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: reply,
        parse_mode: "HTML",
      },
    );
  } catch (error) {
    console.error("Failed to process message:", error);
  }
};
