import React, { useState } from "react";
import axios from "axios";

const EncryptionTool = () => {
  const [mode, setMode] = useState("Encrypt");
  const [sboxType, setSboxType] = useState("K44");
  const [text, setText] = useState("ilmu komputer");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleAction = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/process-text", {
        mode,
        sboxType,
        text,
        key,
      });
      setResult(res.data.result);
    } catch (e) {
      alert("Backend Offline! Pastikan uvicorn berjalan di port 8000.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 shadow-2xl text-left font-sans">
      <h2 className="text-3xl font-black mb-1 uppercase bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent">
        Encryption & Decryption
      </h2>
      <p className="text-gray-600 text-sm mb-10 font-medium italic opacity-70 tracking-tight">
        AES-128 Simulation with K44 Research S-box
      </p>

      <div className="flex bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20 p-1.5 rounded-2xl border border-[#0C342C]/20 mb-4">
        {["Encrypt", "Decrypt"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setResult("");
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
        <div className="relative">
          <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
            Input {mode === "Encrypt" ? "Plaintext" : "Ciphertext (Hex)"}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-white/80 border border-[#0C342C]/20 rounded-3xl p-6 text-base font-mono text-[#076653] outline-none focus:border-[#076653] min-h-[140px] resize-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(result || text);
              alert("Copied!");
            }}
            className="absolute top-14 right-6 bg-gradient-to-r from-[#076653] to-[#0C342C] px-4 py-1.5 rounded-lg text-[10px] font-black text-white uppercase border border-[#0C342C]/20"
          >
            Copy
          </button>
        </div>

        <div>
          <label className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] block mb-4">
            Encryption Key (Visible)
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key (e.g. rahasia)..."
            className="w-full bg-white/80 border border-[#0C342C]/20 rounded-2xl px-6 py-4 text-base font-mono text-gray-800 outline-none focus:border-[#076653]"
          />
          <p className="text-[10px] text-gray-600 font-bold mt-4 uppercase italic tracking-tighter">
            Key will be automatically adjusted to 16 bytes for AES simulation
          </p>
        </div>

        {result && (
          <div className="animate-in fade-in duration-300 p-8 bg-gradient-to-br from-[#076653]/10 to-[#0C342C]/10 border border-[#076653]/20 rounded-3xl">
            <p className="text-[11px] font-black text-[#076653] uppercase mb-3 tracking-widest italic">
              Process Result:
            </p>
            <p className="font-mono text-xl break-all text-gray-800 leading-relaxed font-black">{result}</p>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleAction}
            className="flex-1 bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:shadow-[#0C342C]/30 transition-all flex items-center justify-center gap-3"
          >
            <span>{mode === "Encrypt" ? "🔒" : "🔓"}</span> {mode} NOW
          </button>
          <button
            onClick={() => {
              setText("");
              setKey("");
              setResult("");
            }}
            className="px-10 bg-gradient-to-r from-white to-green-50 text-gray-700 py-5 rounded-3xl font-black text-sm uppercase border border-[#0C342C]/20 hover:border-[#0C342C] transition-all"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default EncryptionTool;
