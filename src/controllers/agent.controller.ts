import axios from "axios";
import threadsModel from "../model/threads.model";

export const agent = async (chatId: string, text: string) => {
  const savedThread = await threadsModel.findOne({ telegramChatId: chatId });

  let threadId;

  if (savedThread) {
    threadId = savedThread.threadId;
  }

  const response = await axios.post(
    `${process.env.AGENT_API}/chat`,
    {
      message: text,
      ...(savedThread && { threadId }),
    },
    {
      headers: {
        "X-Api-Key": `${process.env.AGENT_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!savedThread && response.data.threadId) {
    await threadsModel.create({
      telegramChatId: chatId,
      threadId: response.data.threadId,
    });
  }

  return response.data;
};
