import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const KuruviGPT = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setIsStreaming(true);

    try {
      // Using Kuruvi's own AI API
      const response = await fetch('/api/kuruvi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          stream: true
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let currentMessage = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        currentMessage += text;
        
        setMessages(prev => [
          ...prev.slice(0, -1),
          { role: 'assistant', content: currentMessage }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400 via-purple-400 to-pink-400">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl min-h-[600px] flex flex-col">
          <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-3xl">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              Kuruvi GPT
              <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                Powered by Kuruvi AI
              </span>
            </h1>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-4 max-w-[80%] shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-white/80 backdrop-blur-sm text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-3 text-indigo-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                {isStreaming ? 'Generating...' : 'Thinking...'}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Kuruvi AI anything..."
                className="flex-1 rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-6 py-4 hover:opacity-90 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KuruviGPT;