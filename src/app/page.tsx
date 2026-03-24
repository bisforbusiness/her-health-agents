"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState } from "react";

const InfoIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
    <line
      x1="12" y1="8" x2="12" y2="8.5"
      stroke="white" strokeWidth="2.5" strokeLinecap="round"
    />
    <line
      x1="12" y1="11" x2="12" y2="16"
      stroke="white" strokeWidth="2" strokeLinecap="round"
    />
  </svg>
);

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

export default function HHAGuidedIntake() {
  const [showInfo, setShowInfo] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Hi, I'm the HHA Guided Intake Assistant. I'm here to gather some information about your health concerns so we can connect you with relevant resources. This is completely anonymous — I won't ask for your name or any contact details. Ready to get started?",
          createdAt: new Date(),
        },
      ],
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
      className="flex flex-col h-screen relative"
      style={{
        backgroundImage: "url('/intake_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Info button — fixed top right */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setShowInfo(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity opacity-70 hover:opacity-100"
          aria-label="About this tool"
        >
          <InfoIcon />
        </button>
      </div>

      {/* Info modal */}
      {showInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(2, 16, 27, 0.65)" }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-base font-semibold mb-3"
              style={{ color: "#02101B" }}
            >
              About this tool
            </h2>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#02101B" }}
            >
              This is a concept prototype created as a project under{" "}
              <strong>Her Health Agents</strong>. Its purpose is to conduct a
              guided intake to help connect you to potentially helpful resources.
            </p>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "#02101B" }}
            >
              This tool is not designed to offer medical advice, and there is no
              person involved in this conversation. It is simply here to collect
              non-personal details and information.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#006D77" }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-16 pb-4 sm:px-6 space-y-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {message.content && (
              <div
                className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "rounded-br-none"
                    : "rounded-tl-none border-2 ml-2 mb-1 duration-300 animate-in fade-in-0 zoom-in-95 origin-bottom-left"
                }`}
                style={
                  message.role === "user"
                    ? {
                        backgroundColor: "#FFDBD7",
                        color: "#02101B",
                      }
                    : {
                        backgroundColor: "#FFFFFF",
                        color: "#02101B",
                        borderColor: "#160577",
                        boxShadow: "-5px 5px 0px 0px #160577",
                        fontSize: "17px",
                        lineHeight: "27px",
                      }
                }
              >
                {message.content.split("\n").map((line, i) => (
                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            )}
            {message.createdAt && (
              <p className="text-xs mt-1 px-1" style={{ color: "#E6E4E8" }}>
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

      {/* Input */}
      <div className="p-4 sm:p-5">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder="Type your response…"
              className="w-full bg-white rounded-2xl px-5 py-4 pr-16 border-2 border-transparent focus:outline-none focus:border-white shadow-md"
              disabled={isLoading}
              style={{ color: "#02101B" }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: "#006D77" }}
            >
              <ArrowUpIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
