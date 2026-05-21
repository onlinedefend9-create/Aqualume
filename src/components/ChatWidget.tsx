import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Droplets } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AquaLume assistant. How can I help you regarding our water purification and lighting systems?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is not configured.');
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = "You are AquaLume assistant. Help customers with our smart water purifier and LED lighting products, installation, and support. Be concise, professional, friendly, and focus on the 'Pure Light. Pure Water.' mission. Respond in short paragraphs.";

      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      
      const prompt = `System: ${systemPrompt}\n\nHistory:\n${chatHistory}\nUser: ${userMessage}\nAssistant:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      if (response.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: response.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I am sorry, I am having trouble connecting to my knowledge base.' }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later or contact our human support team.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#4ade80] rounded-full flex items-center justify-center text-[#151b27] shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:scale-110 transition-all duration-300 z-[90] ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Panel */}
      <div 
        className={`fixed bottom-0 sm:bottom-6 right-0 sm:right-6 w-full sm:w-96 bg-[#0a0f1a] sm:rounded-2xl border border-white/10 shadow-2xl flex flex-col z-[100] transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0 h-full sm:h-[600px]' : 'translate-y-[150%] h-[600px]'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#151b27] sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[#4ade80]/20 flex items-center justify-center">
               <Droplets size={16} className="text-[#4ade80]" />
             </div>
             <div>
                <h3 className="font-bold text-white leading-tight">AquaLume Support</h3>
                <p className="text-xs text-[#4ade80]">Online</p>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#4ade80] text-[#151b27] rounded-br-sm' 
                    : 'bg-[#151b27] text-gray-200 border border-white/5 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#151b27] border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-[#151b27] sm:rounded-b-2xl">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#0a0f1a] text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#4ade80] border border-white/5"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-[#151b27] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex-shrink-0"
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
