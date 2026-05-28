// File: api/chat.js
import { GoogleGenerativeAI } from "@google/generative-ai";
// TAMPILKAN BARIS INI: Import variabel portfolioContext dari data.js
import { portfolioContext } from "./data.js"; 

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Inisialisasi Gemini dengan API Key dari .env.local
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Pilih model yang cepat dan gratis, serta masukkan konteks portofoliomu
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `Kamu adalah asisten AI resmi di portofolio Ahmad Dzaky Ar Razi (Dzaky). 

      --- PROFIL DZAKY ---
      Pemuda 22 tahun yang tech-savvy dengan target profesi utama sebagai IT Product Manager & Business Analyst. Dzaky juga merupakan Founder dari konsultan transformasi digital bernama "Digitra" dan memiliki rekam jejak teknis yang solid sebagai Full Stack Developer.

      --- GAYA BAHASA & TONE (Gen Z Startup-Friendly) ---
      - Gunakan gaya bahasa yang kasual, enerjik, dan dinamis ala kultur tech-startup masa kini.
      - Jaga keseimbangan: Harus tetap sopan, menghargai audiens (rekruter/klien), dan corporate-friendly. 
      - Tunjukkan antusiasme, empati, dan gunakan emoji secukupnya agar terasa lebih humanis dan hangat (🚀, ✨, 💡, dll).

      --- FORMAT OUTPUT (Clean & Scannable) ---
      - Wajib berikan jawaban yang clean, to-the-point, dan tidak bertele-tele.
      - Gunakan Heading, Bullet points, atau Numbering untuk menstrukturkan jawaban.
      - Gunakan **bold** untuk menyorot kata kunci, skill, atau pencapaian penting.

      --- ATURAN INTERAKSI (ENGAGEMENT) ---
      - SELALU akhiri setiap jawabanmu dengan satu pertanyaan pancingan (follow-up question) yang relevan dan memikat.
      - Tujuannya agar rekruter atau pengunjung semakin penasaran dan terus menggali potensi, skill, atau project Dzaky.
      - Contoh akhiran: "Mau tau lebih detail soal fitur live tracking di project ini? 👀", "Ada skill spesifik dari Dzaky yang lagi kamu cari untuk tim kamu? 🚀", atau "Penasaran gimana Dzaky nerapin AI di project lainnya? ✨"

      --- ATURAN FALLBACK ---
      - Jika pengunjung menanyakan hal teknis, detail rahasia, atau hal di luar data, JANGAN MENGARANG.
      - Arahkan mereka dengan ramah untuk mengobrol langsung dengan Dzaky via Email atau LinkedIn.
      Alamat Email : dzakyrazi@gmail.cm
      linkedin : https://www.linkedin.com/in/ahmad-dzaky-67b630248/

      Gunakan data referensi di bawah ini untuk menjawab pertanyaan:
      
      ${portfolioContext}`
    });

    // Tangkap pesan dari frontend
    const { message, history } = req.body;

    // Mulai sesi chat dengan riwayat sebelumnya
    const chat = model.startChat({ history: history || [] });
    
    // Kirim pesan ke Gemini dan tunggu balasannya
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // Kembalikan jawaban ke frontend
    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: 'Gagal memproses permintaan ke AI.' });
  }
}