import { useState } from 'react';
import './App.css';
import { Chatbot } from './components/Chatbot';
import User from './components/User';
import { useGemini } from './hooks/useGemini';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const { generate, loading, error } = useGemini(); 

  async function handleChat(event) {
    event.preventDefault();

    if (!userInput.trim()) return; 

   
    const userMsg = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMsg]);

    const botReply = await generate(userInput);

    const botMsg = {
      sender: 'bot',
      text: botReply || "Bir hata oluştu veya yanıt alınamadı.",
    };
    setMessages((prev) => [...prev, botMsg]);

    setUserInput('');
  }

  function handleChange(event) {
    setUserInput(event.target.value);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="bottom-[calc(4rem+1.5rem)] right-0 m-auto bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">
        
        {/* Heading */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by Gemini ✨</p>
        </div>

        {/* Chat container */}
        <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
          <div className="max-h-[454px] overflow-auto flex flex-col gap-2">
            {messages.map((msg, index) =>
              msg.sender === 'user' ? (
                <User key={index} text={msg.text} />
              ) : (
                <Chatbot key={index} text={msg.text} />
              )
            )}
            {loading && <Chatbot text="Yazıyor..." />}
            {error && <Chatbot text={`Hata: ${error}`} />}
          </div>
        </div>

        {/* Input box */}
        <div className="flex items-center pt-0">
          <form onSubmit={handleChat} className="flex items-center justify-center w-full space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Message Gemini"
              value={userInput}
              onChange={handleChange}
              disabled={loading}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
