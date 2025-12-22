import React, { useState, useEffect } from "react";

const ParameterPanel = () => {
  const allMatrices = {
    Paper: [
      {
        id: "k44",
        name: "K44 Matrix (Best Performer)",
        desc: "NL=112, SAC=0.50073, BIC-NL=112",
        rows: ["01010111", "10101011", "11010101", "11101010", "01110101", "10111010", "01011101", "10101110"],
        hex: ["0x57", "0xAB", "0xD5", "0xEA", "0x75", "0xBA", "0x5D", "0xAE"],
      },
      {
        id: "k43",
        name: "K43 Matrix",
        desc: "Alternative from paper exploration",
        rows: ["11010101", "10101011", "01010111", "11101010", "01110101", "10111010", "01011101", "10101110"],
        hex: ["0xD5", "0xAB", "0x57", "0xEA", "0x75", "0xBA", "0x5D", "0xAE"],
      },
      {
        id: "k45",
        name: "K45 Matrix",
        desc: "Alternative from paper exploration",
        rows: ["11101010", "10101011", "11010101", "01010111", "01110101", "10111010", "01011101", "10101110"],
        hex: ["0xEA", "0xAB", "0xD5", "0x57", "0x75", "0xBA", "0x5D", "0xAE"],
      },
    ],
    Standard: [
      {
        id: "aes",
        name: "AES Matrix (Rijndael)",
        desc: "Standard AES S-box matrix (FIPS-197)",
        rows: ["11110001", "11100011", "11000111", "10001111", "00011111", "00111110", "01111100", "11111000"],
        hex: ["0xF1", "0xE3", "0xC7", "0x8F", "0x1F", "0x3E", "0x7C", "0xF8"],
      },
    ],
    Variations: [
      {
        id: "identity",
        name: "Identity Matrix",
        desc: "For testing and comparison",
        rows: ["10000000", "01000000", "00100000", "00010000", "00001000", "00000100", "00000010", "00000001"],
        hex: ["0x80", "0x40", "0x20", "0x10", "0x08", "0x04", "0x02", "0x01"],
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("Paper");
  const [selectedId, setSelectedId] = useState("k44");
  const [constantC, setConstantC] = useState("63");
  const [customRows, setCustomRows] = useState([...allMatrices.Paper[0].rows]);
  const [savedPresets, setSavedPresets] = useState([]);
  const [presetName, setPresetName] = useState("");

  const binToHex = (bin) => "0x" + (parseInt(bin, 2) || 0).toString(16).toUpperCase().padStart(2, "0");

  const current =
    activeTab === "Custom"
      ? {
          name: "Custom Matrix",
          rows: customRows,
          hex: customRows.map((r) => binToHex(r)),
        }
      : allMatrices[activeTab]?.find((m) => m.id === selectedId) || allMatrices[activeTab][0];

  const handleEdit = () => {
    setCustomRows([...current.rows]);
    setActiveTab("Custom");
  };
  const handleReset = () => {
    setActiveTab("Paper");
    setSelectedId("k44");
    setConstantC("63");
  };

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 shadow-2xl text-left font-sans">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tight bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent">
          Research Parameters
        </h2>
        <button
          onClick={handleReset}
          className="bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20 border border-[#0C342C]/20 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-800 hover:border-[#0C342C] transition-all"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Kolom Kiri: Matrix */}
        <div className="space-y-8">
          <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Affine Transformation Matrix</p>
          <div className="flex bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20 p-1.5 rounded-2xl border border-[#0C342C]/20">
            {["Paper", "Standard", "Variations", "Custom"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-gray-800 shadow-xl"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Custom" ? (
            <div className="space-y-3 bg-gradient-to-br from-[#E3EF26]/10 to-[#076653]/10 p-6 rounded-3xl border border-[#0C342C]/20">
              {customRows.map((row, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="w-8 text-xs font-bold text-gray-600">R{idx}</span>
                  <input
                    type="text"
                    value={row}
                    onChange={(e) => {
                      const n = [...customRows];
                      n[idx] = e.target.value;
                      setCustomRows(n);
                    }}
                    className="flex-1 bg-white/80 border border-[#0C342C]/20 rounded-xl px-4 py-2 text-sm font-mono text-gray-800 focus:outline-none focus:border-[#076653] tracking-[0.3em]"
                  />
                  <span className="text-xs font-mono text-gray-600">{binToHex(row)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                {allMatrices[activeTab].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all ${
                      selectedId === m.id
                        ? "bg-gradient-to-r from-[#E3EF26]/30 to-[#076653]/30 border-[#0C342C]"
                        : "bg-white/80 border-[#0C342C]/20 hover:border-[#0C342C]"
                    }`}
                  >
                    <p className="font-black text-base text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-600 font-mono italic">{m.desc}</p>
                  </button>
                ))}
              </div>
              <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 border border-[#0C342C]/20 relative">
                <button
                  onClick={handleEdit}
                  className="absolute top-6 right-8 text-xs font-bold text-[#076653] hover:underline"
                >
                  EDIT
                </button>
                <p className="text-xs font-black text-gray-600 uppercase tracking-widest mb-6 italic">
                  Current Matrix Viewer
                </p>
                <div className="space-y-1.5 font-mono text-sm leading-relaxed">
                  {current.rows.map((row, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-500 w-10">R{idx}:</span>
                      <span className="flex-1 text-gray-800 tracking-[0.4em] ml-4 font-black">{row}</span>
                      <span className="text-gray-600 font-bold">({current.hex[idx]})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Kolom Kanan: Constant C */}
        <div className="space-y-12">
          <div className="space-y-6 text-left">
            <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Constant Vector (C)</p>
            <div className="bg-gradient-to-br from-[#E3EF26]/20 to-[#076653]/20 p-10 rounded-[2rem] border border-[#0C342C]/20 flex items-center justify-between">
              <input
                type="text"
                value={constantC}
                onChange={(e) => setConstantC(e.target.value.toUpperCase())}
                className="bg-transparent text-6xl font-black outline-none text-gray-800 font-mono"
                maxLength={2}
              />
              <div className="text-right">
                <p className="text-xs font-black text-gray-600 uppercase mb-1">Decimal</p>
                <p className="text-3xl font-mono text-gray-700 font-black">{parseInt(constantC, 16) || 0}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {["0x63", "0x0", "0xFF", "0xAA", "0x55"].map((p) => (
                <button
                  key={p}
                  onClick={() => setConstantC(p.replace("0x", ""))}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black border transition-all ${
                    constantC === p.replace("0x", "")
                      ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-gray-800 border-[#0C342C]"
                      : "bg-white/80 text-gray-600 border-[#0C342C]/20 hover:border-[#0C342C]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#076653]/5 to-[#0C342C]/5 rounded-[2rem] p-10 border border-[#076653]/20">
            <p className="text-xs font-black text-[#076653] uppercase tracking-[0.3em] mb-6">Live Formula Analysis</p>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-base">
                <span className="text-gray-500 font-bold">Active Matrix:</span>
                <span className="text-gray-800 font-black">{current.name}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-500 font-bold">Constant Vector:</span>
                <span className="text-gray-800 font-mono font-black">0x{constantC || "00"}</span>
              </div>
            </div>
            <div className="text-2xl font-mono text-[#076653] font-black tracking-tight bg-white/80 p-6 rounded-2xl text-center shadow-inner border border-[#0C342C]/20">
              S(X) = M &times; X<sup>-1</sup> &oplus; 0x{constantC || "00"}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Manager Footer */}
      <div className="mt-16 bg-gradient-to-br from-white to-green-50 rounded-[2.5rem] border border-[#0C342C]/20 p-10">
        <h3 className="text-xl font-black uppercase tracking-widest bg-gradient-to-r from-[#076653] to-[#0C342C] bg-clip-text text-transparent mb-8">
          Parameter Presets Manager
        </h3>
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="Configuration name (e.g. Paper-K44)..."
            className="flex-1 bg-white/80 border border-[#0C342C]/20 rounded-2xl px-6 py-4 text-gray-800 outline-none focus:border-[#076653]"
          />
          <button
            onClick={() => {
              if (!presetName) return;
              setSavedPresets([
                ...savedPresets,
                {
                  id: Date.now(),
                  name: presetName,
                  matrix: current.name,
                  c: constantC,
                },
              ]);
              setPresetName("");
            }}
            className="bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-[#0C342C]/30 transition-all"
          >
            Save Preset
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPresets.map((p) => (
            <div
              key={p.id}
              className="bg-white/80 border border-[#0C342C]/20 rounded-2xl p-6 flex justify-between items-center group transition-all hover:border-[#0C342C]"
            >
              <div>
                <p className="text-gray-800 font-black text-base">{p.name}</p>
                <p className="text-[10px] text-gray-600 font-mono mt-1 uppercase">
                  M: {p.matrix} | C: 0x{p.c}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#076653]/10 text-[#076653] rounded-lg text-[10px] font-black uppercase tracking-widest border border-[#076653]/20 hover:bg-[#076653]/20">
                  Load
                </button>
                <button
                  onClick={() => setSavedPresets(savedPresets.filter((x) => x.id !== p.id))}
                  className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {savedPresets.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-[#0C342C]/20 rounded-3xl">
              <p className="text-gray-600 text-xs font-black uppercase tracking-[0.4em]">No configurations saved</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParameterPanel;
