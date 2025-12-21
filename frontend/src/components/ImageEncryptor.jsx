import React, { useState } from "react";
import axios from "axios";

const ImageEncryptor = () => {
  const [mode, setMode] = useState("Encrypt Image");
  const [sboxType, setSboxType] = useState("K44");
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!file) return alert("Silakan pilih gambar terlebih dahulu!");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);
    formData.append("key", key);
    formData.append("sboxType", sboxType);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/process-image",
        formData
      );
      setOutput(res.data.result_image);
    } catch (e) {
      alert("Gagal memproses gambar. Cek koneksi backend.");
    } finally {
      setLoading(false);
    }
  };

  // FUNGSI BARU: DOWNLOAD GAMBAR
  const handleDownload = () => {
    if (!output) return;
    const link = document.createElement("a");
    link.href = output;
    // Nama file otomatis berdasarkan mode
    link.download =
      mode === "Encrypt Image"
        ? "encrypted_result.png"
        : "decrypted_result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setFile(null);
    setKey("");
    setOutput(null);
  };

  return (
    <div className="bg-[#121212] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl text-left font-sans">
      <h2 className="text-3xl font-black mb-1 uppercase text-white">
        Image Cryptography
      </h2>
      <p className="text-gray-500 text-sm mb-10 font-medium italic opacity-70 tracking-tight">
        Visual Security Test with Affine Mod Matrix
      </p>

      {/* Tabs Level 1 */}
      <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 mb-4">
        {["Encrypt Image", "Decrypt Image"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setOutput(null);
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
              mode === m
                ? "bg-white text-black shadow-xl"
                : "text-gray-500 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Tabs Level 2 */}
      <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mb-10">
        {["K44 S-box", "AES S-box"].map((t) => (
          <button
            key={t}
            onClick={() => setSboxType(t.split(" ")[0])}
            className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              sboxType === t.split(" ")[0]
                ? "bg-[#2a2a2a] text-white border border-white/10"
                : "text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        <div>
          <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
            Select Source Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 text-xs text-gray-500 file:bg-[#2a2a2a] file:text-white file:border-0 file:rounded-xl file:px-5 file:py-2 file:mr-5 file:font-black hover:file:bg-[#333] transition-all cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
            Encryption Key (Visible)
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Secret key..."
            className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-base font-mono text-white outline-none focus:border-blue-500/50"
          />
        </div>

        {/* HASIL & TOMBOL DOWNLOAD */}
        {output && (
          <div className="animate-in fade-in duration-500 space-y-4">
            <label className="text-[11px] font-black text-blue-500 uppercase tracking-widest block italic">
              Cryptography Outcome:
            </label>
            <div className="relative group">
              <img
                src={output}
                className="rounded-3xl border border-white/10 w-full shadow-2xl transition-all"
                alt="Result"
              />
              {/* Tombol Download Overlay */}
              <button
                onClick={handleDownload}
                className="absolute bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-500 transition-all flex items-center gap-2"
              >
                <span>📥</span> Download Result
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={handleProcess}
            disabled={loading}
            className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all ${
              loading
                ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01]"
            }`}
          >
            {loading ? "PROCESSING CRYPTO..." : `EXECUTE ${mode.toUpperCase()}`}
          </button>

          <button
            onClick={handleClear}
            className="w-full bg-[#2a2a2a] text-gray-500 py-5 rounded-3xl font-black text-sm uppercase border border-white/5 hover:bg-[#333] transition-all"
          >
            Clear Workspace
          </button>
        </div>

        {/* Info Limitasi */}
        <div className="bg-black/30 rounded-3xl border border-white/5 p-8 mt-10">
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-5 italic">
            ⓘ Program Limitations
          </p>
          <ul className="text-[11px] text-gray-600 space-y-2 list-disc pl-5 font-mono leading-relaxed">
            <li>
              <span className="font-bold text-gray-400">File size:</span> Max 8
              MB per process
            </li>
            <li>
              <span className="font-bold text-gray-400">Memory:</span> Images
              &gt; 100 MB may cause processing delay
            </li>
            <li>
              <span className="font-bold text-gray-400">Algoritma:</span> S-box
              substitution based on NL 112
            </li>
            <li>
              <span className="font-bold text-gray-400">Security:</span> Uses
              DAP 0.015625 for visual resistance
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageEncryptor;
