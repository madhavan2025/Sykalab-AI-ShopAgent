// components/FloatingChatWrapper.tsx
"use client";

import { FloatingChat } from "./FloatingChat";

interface FloatingChatWrapperProps {
  chatId: string;
  initialChatModel?: string;
}

export function FloatingChatWrapper({ chatId, initialChatModel }: FloatingChatWrapperProps) {
  return (
    <FloatingChat
      chatId={chatId}
      initialChatModel={initialChatModel}
      initialMessages={[]}
      initialVisibilityType="private"
      isReadonly={false}
    />
  );
}
