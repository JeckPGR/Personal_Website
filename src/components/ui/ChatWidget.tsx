import { useState, useRef, useEffect } from 'react';

const QUICK_PROMPTS = [
  "Ceritain tentang project Terakhir Dzaky dong! 🚀",
  "Rencana dan arah Dzaky 5 tahun kedepan apa sih? 🎯",
  "Ceritakan pengalaman kerja terakhir Dzaky! 💼",
  "Pengalaman terberat dalam bekerja & cara mengatasinya? 💪"
];

const TOOLTIP_TEXTS = [
  "Gunakan AI untuk bertanya tentang Dzaky ✨",
  ...QUICK_PROMPTS
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'model', text: 'Halo! 👋 Saya asisten virtual Dzaky. Ada yang ingin kamu tanyakan seputar pengalaman, skills, atau project Dzaky?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); 
  
  const [tooltipIdx, setTooltipIdx] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Efek untuk Auto-Resize Textarea (Maksimal 2 baris)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'; 
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 64)}px`;
    }
  }, [input]);

  // Efek Timer Cooldown 
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Efek Animasi Loop Bubble Chat
  useEffect(() => {
    if (isOpen) return;

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);

      setTimeout(() => {
        setTooltipIdx((prev) =>
          prev >= TOOLTIP_TEXTS.length - 1 ? 0 : prev + 1
        );

        setShowTooltip(true);
      }, 500);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [tooltipIdx, isOpen]);

  const MAX_CHATS = 10;
  const userMessageCount = messages.filter(msg => msg.role === 'user').length;
  const isLimitReached = userMessageCount >= MAX_CHATS;

  const sendMessage = async (textToSend?: string) => {
    const messageContent = typeof textToSend === 'string' ? textToSend : input;
    
    if (!messageContent.trim() || isLimitReached || cooldown > 0 || isLoading) return;

    const newMessages = [...messages, { role: 'user', text: messageContent }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageContent,
          history: messages.slice(1).map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        throw new Error("Balasan kosong dari server");
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Waduh, koneksiku lagi gangguan nih 😅. Coba refresh halaman atau langsung reach out Dzaky via LinkedIn aja ya!' }]);
    } finally {
      setIsLoading(false);
      setCooldown(40); 
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Jendela Chat Utama */}
      {isOpen && (
        <div className="mb-4 w-[400px] bg-[#0a0a12]/95 rounded-2xl shadow-[0_0_30px_rgba(124,80,224,0.15)] border border-[rgba(255,255,255,0.08)] overflow-hidden flex flex-col h-[550px] backdrop-blur-xl transition-all duration-300 transform origin-bottom-right animate-in zoom-in-95">
          
          <div className="bg-gradient-to-r from-[rgba(255,255,255,0.03)] to-[rgba(124,80,224,0.05)] border-b border-[rgba(255,255,255,0.08)] p-4 text-[#f0ecff] font-semibold flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fd080] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4fd080]"></span>
              </div>
              <span className="tracking-wide text-sm font-bold">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#9d92cc] hover:text-[#f0ecff] transition-transform hover:rotate-90 duration-200 text-xl leading-none">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3.5 max-w-[85%] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-[#7c50e0] to-[#5a38a3] text-[#f0ecff] rounded-2xl rounded-tr-sm whitespace-pre-wrap' 
                    : 'bg-[rgba(255,255,255,0.04)] text-[#e2e0e8] rounded-2xl rounded-tl-sm border border-[rgba(255,255,255,0.05)] whitespace-pre-wrap'
                }`}>
                  <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>').replace(/\n/g, '<br/>') }} />
                </div>

                {i === 0 && messages.length === 1 && (
                  <div className="flex flex-col gap-2 mt-4 max-w-[95%]">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs border border-[rgba(124,80,224,0.3)] bg-[rgba(124,80,224,0.05)] text-[#c9bfff] px-4 py-2.5 rounded-xl hover:bg-[rgba(124,80,224,0.15)] hover:border-[rgba(124,80,224,0.6)] hover:translate-x-1 transition-all duration-200 text-left leading-relaxed shadow-sm"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#7c50e0] font-medium ml-2 animate-pulse">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 bg-[#7c50e0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="h-1.5 w-1.5 bg-[#7c50e0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="h-1.5 w-1.5 bg-[#7c50e0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </span>
                <span className="italic">AI sedang mengetik...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[rgba(10,10,18,0.8)] border-t border-[rgba(255,255,255,0.08)] backdrop-blur-md">
            {isLimitReached ? (
              <div className="text-center py-3 text-sm text-[#9d92cc] bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)]">
                <p className="mb-1.5 font-medium text-[#e2e0e8]">Sesi percakapan limit! 🚀</p>
                <p className="text-xs leading-relaxed">
                  Lanjut diskusi bareng Dzaky via <br/>
                  <a href="mailto:dzakyrazi@gmail.com" className="text-[#c060f0] font-semibold hover:text-white transition-colors">Email</a> atau <a href="https://linkedin.com/in/ahmad-dzaky" target="_blank" rel="noreferrer" className="text-[#c060f0] font-semibold hover:text-white transition-colors">LinkedIn</a> yuk!
                </p>
              </div>
            ) : (
              <div className="flex gap-2 items-end">
                {/* Perbaikan: Tambahan class untuk menyembunyikan scrollbar */}
                <textarea 
                  ref={textareaRef}
                  rows={1}
                  disabled={isLoading || cooldown > 0}
                  className={`flex-1 bg-[rgba(255,255,255,0.03)] border rounded-xl px-4 py-2.5 text-sm text-[#f0ecff] focus:outline-none transition-colors resize-none overflow-y-auto leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                    cooldown > 0 
                      ? 'border-yellow-500/30 placeholder-yellow-500/70 cursor-not-allowed' 
                      : 'border-[rgba(255,255,255,0.08)] placeholder-[#6e6898] focus:border-[#7c50e0] focus:ring-1 focus:ring-[#7c50e0]/50'
                  }`}
                  placeholder={
                    cooldown > 0 
                      ? `Tunggu ${cooldown} detik ya...` 
                      : `Tanya sesuatu... (${MAX_CHATS - userMessageCount} tersisa)`
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button 
                  onClick={() => sendMessage()} 
                  disabled={isLoading || cooldown > 0 || !input.trim()}
                  className={`px-5 rounded-xl h-[44px] text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                    isLoading || cooldown > 0 || !input.trim()
                      ? 'bg-[rgba(255,255,255,0.05)] text-[#6e6898] cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#7c50e0] to-[#603ba8] text-white hover:shadow-[0_0_15px_rgba(124,80,224,0.4)] hover:scale-[1.02]'
                  }`}
                >
                  {cooldown > 0 ? (
                    <span className="text-yellow-500">{cooldown}s</span>
                  ) : (
                    'Kirim'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Tooltip Animasi */}
      {!isOpen && (
        <div 
          className={`mb-4 mr-2 max-w-[220px] p-3 bg-[rgba(20,20,30,0.95)] border border-[rgba(124,80,224,0.4)] rounded-2xl rounded-br-sm shadow-[0_0_20px_rgba(124,80,224,0.2)] backdrop-blur-md transition-all duration-500 ease-in-out transform origin-bottom-right flex items-center gap-2 cursor-pointer ${
            showTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }`}
          onClick={() => setIsOpen(true)}
        >
          <p className="text-xs text-[#f0ecff] font-medium leading-relaxed drop-shadow-md">
            {TOOLTIP_TEXTS[tooltipIdx] || TOOLTIP_TEXTS[0]}
          </p>
        </div>
      )}

      {/* 3. Floating Button Utama */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-[#7c50e0] to-[#a27df0] rounded-full text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(124,80,224,0.4)] relative"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 11.996c0 2.29.967 4.358 2.53 5.867V21l3.52-2.181a10.02 10.02 0 002.95.431z" />
          </svg>
        )}
      </button>
    </div>
  );
}