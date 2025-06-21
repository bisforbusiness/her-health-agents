"use client";

import { useChat } from "@ai-sdk/react";
import React from "react";

const ArrowUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HerHealthAgents() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Hello! I'm Luna, and I'm here to help collect information about your female health related concerns. This information will be used for research purposes. I won't be providing any medical advice - I'm simply here to listen and gather details and help you by connecting you to reliable, respected and supportive resources. Shall we start with a few basic questions?",
          createdAt: new Date(),
        },
      ],
      maxSteps: 10,
    });

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  React.useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading, messages]);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "#FDF4EC" }}
    >
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[65%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "text-black rounded-br-none"
                  : "py-4 px-6 max-w-[80%] text-[20px] leading-[28px] text-black bg-white rounded-t-md rounded-br-md border-2 border-black shadow-[-8px_8px_0px_0px_#000] ml-2 mb-[8px] duration-300 animate-in fade-in-0 zoom-in-75 origin-bottom-left"
              }`}
              style={{
                backgroundColor:
                  message.role === "user" ? "#F8D7C4" : "#FFFFFF",
              }}
            >
              {message.content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {message.createdAt && (
              <p className="text-xs mt-2" style={{ color: "#9E9E9E" }}>
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder=""
              className="w-full bg-white rounded-2xl px-5 py-4 pr-16 text-black border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F8D7C4] shadow-sm"
              disabled={isLoading}
              style={{
                color: "#3D3D3D",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
              style={{ backgroundColor: "#5A5A5A" }}
            >
              <ArrowUpIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
