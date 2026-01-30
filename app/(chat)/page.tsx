import { cookies } from "next/headers";

import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { FloatingChat } from "@/components/FloatingChat";

export default async function Page() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  const chatId = generateUUID();
  const initialChatModel =
    modelIdFromCookie?.value || DEFAULT_CHAT_MODEL;

  return (
    <>
      <FloatingChat
        chatId={chatId}
        initialChatModel={initialChatModel}
      />

      <DataStreamHandler />
    </>
  );
}