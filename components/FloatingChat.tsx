"use client";

import React, { useState,useEffect } from "react";
import { Chat } from "./chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import type { ChatMessage } from "@/lib/types";
import type { VisibilityType } from "./visibility-selector";
import { isEmbedMode } from "@/lib/isEmbed";
import Image from "next/image";
import { Maximize2, Minimize2 } from "lucide-react";
interface FloatingChatProps {
  chatId: string;
  initialMessages?: ChatMessage[];
  initialChatModel?: string;
  initialVisibilityType?: VisibilityType;
  isReadonly?: boolean;
  autoResume?: boolean;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({
  chatId,
  initialMessages = [],
  initialChatModel = DEFAULT_CHAT_MODEL,
  initialVisibilityType = "public",
  isReadonly = false,
  autoResume = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
   const [isEmbed, setIsEmbed] = useState(false);
  const [theme, setTheme] = useState<any>(null);
const [loadingTheme, setLoadingTheme] = useState(true);
const [isFullScreen, setIsFullScreen] = useState(false);

   useEffect(() => {
    setIsEmbed(isEmbedMode());
  }, []);


 useEffect(() => {
  const loadTheme = async () => {
    try {
      const res = await fetch("/api/chat-theme");
      const data = await res.json();

      console.log("Theme API Response:", data); // 👈 ADD THIS

      setTheme(Array.isArray(data) ? data[0] : data);

    } catch (err) {
      console.error("Theme load failed", err);
    } finally {
      setLoadingTheme(false);
    }
  };

  loadTheme();
}, []);


if (loadingTheme) return null;
  // 🚫 DO NOT render floating launcher inside iframe
  if (isEmbed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center cursor-pointer"
        >
  {theme?.chatIcon && (
  <Image
    src={theme.chatIcon}
    alt="Chat"
    width={theme.chatIconSize}
    height={theme.chatIconSize}
    unoptimized
    style={{
      backgroundColor: theme.chatIconBg,
      borderRadius: theme.borderRadius,
      objectFit: "contain",
      
    }}
  />
)}






        </button>
      )}

      {/* Floating Chat */}
      {isOpen && (
  <div
    className={`fixed z-[9999]  transition-all duration-300 ease-in-out
      ${
        isFullScreen
          ? "inset-0 flex items-center justify-center bg-black/40 p-4"
          : "bottom-4 right-4"
      }
    `}
  >
  <div
  className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out
    ${
      isFullScreen
        ? `
          w-full h-screen rounded-none
          sm:h-[97vh] sm:max-w-6xl sm:rounded-xl
        `
        : "w-[92vw] h-[70vh] sm:w-[420px] sm:h-[580px] rounded-xl"
    }
  `}
  style={{
    backgroundColor: theme.windowBg,
    border: theme.borderColor,
    boxShadow: theme.shadow,
  }}
>
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          backgroundColor: theme?.headerBg,
          color: theme?.headerTextColor,
        }}
      >
        <span className="font-semibold">Chatbot</span>

        <div className="flex items-center gap-3">
          {/* Expand / Minimize */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="hover:opacity-80 cursor-pointer"
          >
            {isFullScreen ? (
              <Minimize2 size={18} />
            ) : (
              <Maximize2 size={18} />
            )}
          </button>

          {/* Close */}
          <button
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              setIsFullScreen(false);
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-hidden">
        <Chat
          id={chatId}
          initialMessages={initialMessages}
          initialChatModel={initialChatModel}
          initialVisibilityType={initialVisibilityType}
          isReadonly={isReadonly}
          autoResume={autoResume}
          theme={theme}
        />
      </div>
    </div>
  </div>
)}
    </div>
  );
};