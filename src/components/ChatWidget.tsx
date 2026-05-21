import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Droplets } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are the AquaLume assistant. You answer ONLY questions about the AquaLume Water Lamp product. 

Product facts you know:
- Name: AquaLume Water Lamp
- Concept: Water-activated LED lamp, no batteries needed
- Activation: Add water to activate the light instantly
- Autonomy: 8 to 12 hours per activation
- Use cases: Emergencies, blackouts, camping, survival, ambient home lighting
- Technology: UV-C purification + LED light in one device
- Design: Compact, portable, waterproof
- Eco: Zero chemicals, zero batteries, sustainable
- Price: 34.99 €
- Order: https://www.aliexpress.com/item/1005012048993433.html

Rules:
- If the question is NOT about this product, reply exactly: "I'm only here to help with questions about the AquaLume Water Lamp 💧"
- Always reply in the same language as the user
- Keep answers short: 2-3 sentences max
- Never invent features not listed above
- If asked to order, provide the AliExpress link`;

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm the AquaLume assistant. Ask me anything about the AquaLume Water Lamp — how it works, features, pricing, or how to order.",
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const newUserMsg: Message = { role: 'user', content: userText, timestamp: new Date() };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = messages.concat(newUserMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Fallback for API integration (direct client-side API call mapping)
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.content?.[0]?.text || "I'm sorry, I encountered an issue. Can you please rephrase?";

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: botResponse,
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops! We're experiencing connection issues right now. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes typing-dot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes bubble-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={() => { setIsOpen(true); setUnreadCount(0); }}
        className={`fixed bottom-6 right-6 w-[56px] h-[56px] bg-[#4ade80] rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(74,222,128,0.5)] z-40 transition-transform duration-300 hover:scale-110 active:scale-95 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ animation: 'bubble-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <Droplets size={28} />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-bold text-white border-2 border-[#151b27] px-1 shadow-md">
            {unreadCount}
          </div>
        )}
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed z-[110] flex flex-col overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          sm:bottom-24 sm:right-6 sm:w-[360px] sm:h-[480px] sm:rounded-[24px] sm:border sm:border-[#4ade80]/20
          bottom-0 right-0 w-full h-[100dvh] sm:h-[480px] rounded-none border-0
          ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-full sm:translate-y-10 pointer-events-none scale-100'}
        `}
        style={{
          backgroundColor: '#0a0f1a',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div 
          className="flex flex-shrink-0 items-center justify-between px-5 py-4 border-b border-[#4ade80]/15"
          style={{ background: 'linear-gradient(135deg, #151b27, #0a2a0a)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4ade80]/20 flex items-center justify-center text-[#4ade80] shrink-0 border border-[#4ade80]/30 shadow-inner">
              <Droplets size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-[15px] leading-tight tracking-wide">AquaLume</span>
              <span className="text-[#4ade80] text-[11px] font-bold tracking-widest uppercase">Assistant</span>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/70 hover:text-red-400 transition-colors bg-white/5 rounded-full p-2 hover:bg-white/10 shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 chat-scrollbar bg-[#0a0f1a]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[#4ade80]/20 border border-[#4ade80]/50 flex items-center justify-center text-[#4ade80] mr-3 shrink-0 mt-0.5">
                  <Droplets size={14} />
                </div>
              )}
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end max-w-[75%]' : 'items-start max-w-[80%]'}`}>
                <div 
                  className={`px-4 py-2.5 text-[14px] leading-relaxed shadow-md font-light ${
                    msg.role === 'user' 
                      ? 'bg-[#4ade80] text-[#151b27] rounded-3xl rounded-tr-sm font-medium' 
                      : 'bg-[#151b27] text-gray-200 border border-white/10 rounded-3xl rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <span className="text-[10px] text-gray-500 mt-1.5 px-2 font-medium tracking-wide">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="w-7 h-7 rounded-full bg-[#4ade80]/20 border border-[#4ade80]/50 flex items-center justify-center text-[#4ade80] mr-3 shrink-0 mt-0.5">
                <Droplets size={14} />
              </div>
              <div className="bg-[#151b27] border border-white/10 rounded-3xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 shadow-md">
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" style={{ animation: 'typing-dot 1.2s infinite ease-in-out' }} />
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" style={{ animation: 'typing-dot 1.2s infinite ease-in-out 0.2s' }} />
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full" style={{ animation: 'typing-dot 1.2s infinite ease-in-out 0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input */}
        <div className="p-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-[#151b27] border-t border-white/5 flex-shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AquaLume..."
              className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 placeholder-gray-500 focus:outline-none"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-full bg-[#4ade80] flex items-center justify-center text-[#151b27] shrink-0 disabled:opacity-30 disabled:scale-100 hover:scale-105 active:scale-95 transition-all outline-none"
            >
              <Send size={16} className="translate-x-[1px] translate-y-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
