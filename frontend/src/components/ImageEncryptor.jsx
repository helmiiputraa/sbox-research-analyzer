import React, { useState } from "react";
import axios from "axios";
import ImageAnalysis from "./ImageAnalysis"; // Pastikan komponen ini sudah Anda buat

const ImageEncryptor = () => {
  // 1. STATE MANAGEMENT
  const [mode, setMode] = useState("Encrypt Image");
  const [sboxType, setSboxType] = useState("K44");
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [output, setOutput] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. FUNGSI EKSEKUSI (API CALL)
  const handleProcess = async () => {
    if (!file) return alert("Silakan pilih gambar terlebih dahulu!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    formData.append("key", key);
    formData.append("sboxType", sboxType);

    try {
      // Memanggil endpoint backend untuk pengolahan citra dan perhitungan metrik
      const res = await axios.post("http://127.0.0.1:8000/process-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOutput(res.data.result_image);

      // Menyimpan data statistik untuk ditampilkan di bagian bawah
      if (res.data.metrics && res.data.histograms) {
        setAnalysisData({
          metrics: res.data.metrics,
          histograms: res.data.histograms,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal terhubung ke backend. Pastikan server Python (main.py) aktif.");
    } finally {
      setLoading(false);
    }
  };

  // 3. FUNGSI DOWNLOAD HASIL
  const handleDownload = () => {
    if (!output) return;
    const link = document.createElement("a");
    link.href = output;
    link.download = mode === "Encrypt Image" ? "encrypted_k44.png" : "decrypted_result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. RESET WORKSPACE
  const handleClear = () => {
    setFile(null);
    setKey("");
    setOutput(null);
    setAnalysisData(null);
    if (document.getElementById("imageInput")) document.getElementById("imageInput").value = "";
  };

  return (
    <div className="space-y-12 w-full">
      {/* PANEL UTAMA IMAGE CRYPTOGRAPHY */}
      <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 shadow-2xl text-left font-sans">
        <h2 className="text-3xl font-black mb-2 uppercase bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent tracking-tighter">
          Image Cryptography
        </h2>
        <p className="text-gray-600 text-sm mb-10 font-medium italic opacity-70">
          Visual Security Test with S-box Substitution & Statistics Evaluation
        </p>

        {/* Tabs Level 1: Encrypt / Decrypt */}
        <div className="flex bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20 p-1.5 rounded-2xl border border-[#0C342C]/20 mb-4">
          {["Encrypt Image", "Decrypt Image"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setOutput(null);
                setAnalysisData(null);
              }}
              className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                mode === m
                  ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-gray-800 shadow-xl"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Tabs Level 2: S-box Type */}
        <div className="flex bg-gradient-to-r from-[#E3EF26]/10 to-[#076653]/10 p-1 rounded-xl border border-[#0C342C]/20 mb-10">
          {["K44 S-box", "AES S-box"].map((t) => (
            <button
              key={t}
              onClick={() => setSboxType(t.split(" ")[0])}
              className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                sboxType === t.split(" ")[0]
                  ? "bg-gradient-to-r from-[#076653] to-[#0C342C] text-white border border-[#0C342C]"
                  : "text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {/* Input File */}
          <div>
            <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
              Select Source Image
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-white/80 border border-[#0C342C]/20 rounded-2xl p-4 text-xs text-gray-700 file:bg-gradient-to-r file:from-[#076653] file:to-[#0C342C] file:text-white file:border-0 file:rounded-xl file:px-5 file:py-2 file:mr-5 file:font-black hover:file:shadow-lg transition-all cursor-pointer"
            />
          </div>

          {/* Input Key */}
          <div>
            <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
              Encryption Key (Visible)
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci keamanan..."
              className="w-full bg-white/80 border border-[#0C342C]/20 rounded-2xl px-6 py-4 text-base font-mono text-gray-800 outline-none focus:border-[#076653]"
            />
          </div>

          {/* Preview Image & Download Button */}
          {output && (
            <div className="animate-in fade-in duration-500 space-y-4">
              <label className="text-[11px] font-black text-[#076653] uppercase tracking-widest block italic">
                Cryptography Outcome:
              </label>
              <div className="relative group overflow-hidden rounded-3xl border border-[#0C342C]/20">
                <img src={output} className="w-full shadow-2xl transition-all" alt="Result" />
                <button
                  onClick={handleDownload}
                  className="absolute bottom-6 right-6 bg-gradient-to-r from-[#076653] to-[#0C342C] text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:shadow-[#0C342C]/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>📥</span> Download Result
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={handleProcess}
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${
                loading
                  ? "bg-gray-300 text-gray-600"
                  : "bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] text-white hover:shadow-[#0C342C]/30 hover:scale-[1.01]"
              }`}
            >
              {loading ? "CALCULATING ANALYSIS..." : `EXECUTE ${mode.toUpperCase()}`}
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gradient-to-r from-white to-green-50 text-gray-700 py-5 rounded-3xl font-black text-sm uppercase border border-[#0C342C]/20 hover:border-[#0C342C] transition-all"
            >
              Clear Workspace
            </button>
          </div>

          {/* Limitasi Program */}
          <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl border border-[#0C342C]/20 p-8 mt-10">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-5 italic">
              ⓘ Program Limitations
            </p>
            <ul className="text-[11px] text-gray-600 space-y-2 list-disc pl-5 font-mono leading-relaxed">
              <li>
                <span className="font-bold text-gray-400">Ukuran file:</span> Maksimal 8 MB per upload
              </li>
              <li>
                <span className="font-bold text-gray-400">Memory:</span> Gambar &gt; 100 MB mungkin memakan waktu lebih
                lama
              </li>
              <li>
                <span className="font-bold text-gray-400">Algoritma:</span> Substitusi S-box berdasarkan metrik riset
              </li>
              <li>
                <span className="font-bold text-gray-400">Security:</span> Evaluasi NPCR, UACI, dan Entropy
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. TAMPILAN ANALISIS (Muncul otomatis setelah proses) */}
      {analysisData && <ImageAnalysis metrics={analysisData.metrics} histograms={analysisData.histograms} />}
    </div>
  );
};

export default ImageEncryptor;
