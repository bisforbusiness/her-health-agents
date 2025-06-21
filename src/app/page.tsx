'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function HerHealthAgents() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    maxSteps: 10,
  });

  const [showWelcome, setShowWelcome] = useState(true);

  const handleStartChat = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Her Health Agents</h1>
          <p className="text-xl text-gray-600">Compassionate AI-powered women&apos;s health support</p>
        </div>

        {showWelcome ? (
          /* Welcome Screen */
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-pink-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">🌸</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Luna</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                 Your compassionate health data collection assistant specializing in women&apos;s hormone-related health information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🔍 What Luna Does</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Collects comprehensive health information</li>
                  <li>• Asks personalized, adaptive questions</li>
                  <li>• Maintains complete confidentiality</li>
                  <li>• Connects you with research insights</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                                 <h3 className="text-lg font-semibold text-gray-800 mb-3">🚧 What Luna Doesn&apos;t Do</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Provide medical advice</li>
                  <li>• Diagnose conditions</li>
                  <li>• Replace healthcare professionals</li>
                  <li>• Make treatment recommendations</li>
                </ul>
              </div>
            </div>

                         <div className="bg-blue-50 rounded-xl p-6 mb-8">
               <h3 className="text-lg font-semibold text-gray-800 mb-3">📋 Information We&apos;ll Discuss</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <ul className="space-y-1">
                  <li>• Menstrual cycle tracking</li>
                  <li>• Current symptoms</li>
                  <li>• Health history</li>
                  <li>• Lifestyle factors</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Daily life impact</li>
                  <li>• Stress and sleep patterns</li>
                  <li>• Medications/supplements</li>
                  <li>• Family history</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleStartChat}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Conversation with Luna
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Your privacy is protected. All information is collected anonymously.
              </p>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 h-[70vh] flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌸</span>
                </div>
                <div>
                  <h3 className="font-semibold">Luna</h3>
                  <p className="text-sm opacity-90">Your Health Data Collection Assistant</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                                     <p className="text-gray-700">
                     Hello! I&apos;m Luna, and I&apos;m here to help collect information about your women&apos;s health concerns. 
                     This information will be used for research purposes and to connect you with relevant resources. 
                     I won&apos;t be providing any medical advice - I&apos;m simply here to listen and gather details. 
                     Shall we start with a few basic questions?
                   </p>
                </div>
              )}
              
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                      : 'bg-gray-50 text-gray-800 border border-gray-200'
                  }`}>
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case 'text':
                          return (
                            <p key={index} className="whitespace-pre-wrap">
                              {part.text}
                            </p>
                          );
                        case 'tool-invocation':
                          if (part.toolInvocation.toolName === 'sendToAgent') {
                            switch (part.toolInvocation.state) {
                              case 'call':
                                return (
                                  <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                                    <p className="text-blue-800 font-medium">📊 Processing your health data...</p>
                                    <p className="text-blue-600 text-sm">Sending to research agents for analysis</p>
                                  </div>
                                );
                              case 'result':
                                return (
                                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                                    <p className="text-green-800 whitespace-pre-wrap">
                                      {part.toolInvocation.result}
                                    </p>
                                  </div>
                                );
                            }
                          }
                          return null;
                        default:
                          return null;
                      }
                    })}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="animate-pulse flex space-x-1">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-gray-500 text-sm">Luna is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Share your health information with Luna..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Send
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Your information is collected anonymously and securely for research purposes only
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 Her Health Agents - Empowering women through AI-powered health insights</p>
        </div>
      </div>
    </div>
  );
}
