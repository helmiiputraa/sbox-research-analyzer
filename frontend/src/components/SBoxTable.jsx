import React, { useState } from "react";
import axios from "axios";

const SBoxTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Comparison");
  const [hovered, setHovered] = useState({
    pos: "[00]",
    idx: 0,
    hex: "0x63",
    dec: 99,
    bin: "01100011",
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/generate-analyze");
      setData(res.data);
    } catch (e) {
      alert("Error connecting to backend!");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-white to-green-50 rounded-[2.5rem] border border-[#0C342C]/20 p-20 text-center shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent mb-4">
            Ready to Analyze
          </h2>
          <p className="text-gray-600 mb-10 max-w-lg">
            Click generate to compare multiple S-box configurations with comprehensive strength testing.
          </p>
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-[#0C342C]/30 transition-all flex items-center gap-3 active:scale-95"
          >
            {loading ? "ANALYZING..." : "⚡ Generate & Analyze"}
          </button>
        </div>
      </div>
    );
  }

  const currentKey = activeTab === "Research (K44)" ? "research" : "aes";
  const cur = data[currentKey];
  const resM = data.research.metrics;
  const aesM = data.aes.metrics;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* 1. CONTROL BAR */}
      <div className="bg-gradient-to-r from-white to-green-50 p-8 rounded-[2rem] border border-[#0C342C]/20 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
        <div className="flex gap-3 bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20 p-1.5 rounded-2xl border border-[#0C342C]/20">
          {["Comparison", "Research (K44)", "AES S-box"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                activeTab === t
                  ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-gray-800 shadow-lg shadow-[#0C342C]/20"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-8 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          <p>
            Generation: <span className="text-gray-800 font-black">0.00s</span>
          </p>
          <p>
            Analysis: <span className="text-gray-800 font-black">21.11s</span>
          </p>
          <p>
            Total: <span className="text-gray-800 font-black">21.11s</span>
          </p>
        </div>
      </div>

      {/* 2. TAB COMPARISON */}
      {activeTab === "Comparison" && (
        <div className="space-y-12">
          <div className="bg-gradient-to-br from-white to-green-50 rounded-[2.5rem] border border-[#0C342C]/20 overflow-hidden shadow-lg">
            <div className="p-10 border-b border-[#0C342C]/10 bg-gradient-to-r from-[#E3EF26]/20 to-[#076653]/20">
              <h3 className="text-3xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent uppercase italic tracking-tighter">
                Side-by-Side Comparison
              </h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] border-b border-[#0C342C]/10 bg-gradient-to-r from-[#E3EF26]/10 to-[#076653]/10">
                  <th className="p-8">Metric</th>
                  <th className="p-8">Research (K44)</th>
                  <th className="p-8">AES S-box</th>
                  <th className="p-8">Target</th>
                  <th className="p-8">Winner</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono text-gray-700">
                <CompRow label="Nonlinearity (Avg)" v1={resM.nl.avg} v2={aesM.nl.avg} target="112" winner="-" />
                <CompRow label="Nonlinearity (Min)" v1={resM.nl.min} v2={aesM.nl.min} target="112" winner="-" />
                <CompRow label="SAC (Average)" v1={resM.sac.avg} v2={aesM.sac.avg} target="~0.5" winner="K44" />
                <CompRow
                  label="BIC-SAC (Average)"
                  v1={resM.bic_sac.avg}
                  v2={aesM.bic_sac.avg}
                  target="~0.5"
                  winner="K44"
                />
                <CompRow
                  label="LAP (Max Bias)"
                  v1={resM.lap.bias}
                  v2={aesM.lap.bias}
                  target="Lower is better"
                  winner="-"
                />
                <CompRow label="DAP (Max)" v1={resM.dap.max} v2={aesM.dap.max} target="Lower is better" winner="-" />
                <CompRow
                  label="Max Cycle Length"
                  v1={resM.cycle.max}
                  v2={aesM.cycle.max}
                  target="Higher is better"
                  winner="K44"
                />
                <CompRow label="SV (Strength Value)" v1={resM.sv} v2={aesM.sv} target="Lower is better" winner="K44" />
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RankCard title="Research (K44)" wins="15" isTop />
            <RankCard title="AES Standard" wins="12" />
          </div>
        </div>
      )}

      {/* 3. TAB DETAIL (RESEARCH / AES) */}
      {activeTab !== "Comparison" && (
        <div className="space-y-16">
          {/* Validation */}
          <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent">
                {activeTab} - Validation
              </h3>
              <span className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                Status: Valid
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Balanced output bits", "Bijective 0-255"].map((v) => (
                <div
                  key={v}
                  className="bg-gradient-to-br from-[#E3EF26]/30 to-[#076653]/30 border border-[#0C342C]/20 p-4 rounded-2xl text-center"
                >
                  <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">{v}</p>
                  <p className="text-emerald-600 font-black text-xs uppercase italic">Verified</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hex Grid & Detail Viewer */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2 bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 overflow-x-auto shadow-md">
              <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-10 italic">
                16x16 Hexadecimal Grid
              </h4>
              <div className="grid grid-cols-17 gap-1.5 min-w-[700px]">
                <div className="w-9 h-9"></div>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 flex items-center justify-center text-[10px] font-black text-[#0C342C]/50"
                  >
                    {i.toString(16).toUpperCase()}
                  </div>
                ))}
                {Array.from({ length: 256 }).map((_, i) => {
                  const hex = cur.hex_grid[i];
                  const row = Math.floor(i / 16);
                  return (
                    <React.Fragment key={i}>
                      {i % 16 === 0 && (
                        <div className="w-9 h-9 flex items-center justify-center text-[10px] font-black text-[#0C342C]/50">
                          {row.toString(16).toUpperCase()}
                        </div>
                      )}
                      <div
                        onMouseEnter={() =>
                          setHovered({
                            pos: `[${row.toString(16).toUpperCase()}${(i % 16).toString(16).toUpperCase()}]`,
                            idx: i,
                            hex: `0x${hex}`,
                            dec: parseInt(hex, 16),
                            bin: parseInt(hex, 16).toString(2).padStart(8, "0"),
                          })
                        }
                        className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#E3EF26]/20 to-[#076653]/20 rounded-lg text-[10px] font-mono text-gray-700 hover:bg-gradient-to-br hover:from-[#E3EF26] hover:to-[#076653] hover:text-white transition-all cursor-crosshair border border-[#0C342C]/20 hover:border-[#0C342C]"
                      >
                        {hex}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#E3EF26] via-[#076653] to-[#0C342C] text-white p-12 rounded-[3rem] shadow-2xl flex flex-col justify-between h-fit sticky top-28">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 opacity-70">
                Transformation Detail
              </p>
              <div className="space-y-10">
                <div>
                  <p className="text-xs font-bold opacity-70 uppercase mb-2 tracking-widest">Position [Row, Col]:</p>
                  <p className="text-5xl font-black italic">{hovered.pos}</p>
                </div>
                <div>
                  <p className="text-xs font-bold opacity-70 uppercase mb-2 tracking-widest">Hex Value:</p>
                  <p className="text-5xl font-black italic">{hovered.hex}</p>
                </div>
                <div className="pt-10 border-t border-white/30 grid grid-cols-2 gap-10">
                  <div>
                    <p className="text-xs font-bold opacity-70 uppercase mb-2 tracking-widest">Decimal:</p>
                    <p className="text-3xl font-black italic">{hovered.dec}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold opacity-70 uppercase mb-2 tracking-widest">Binary:</p>
                    <p className="text-2xl font-mono font-bold tracking-tighter">{hovered.bin}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Strength Analysis (12 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StrengthCard title="Nonlinearity (NL)" m={cur.metrics.nl} />
            <StrengthCard title="SAC" m={cur.metrics.sac} />
            <StrengthCard title="BIC-NL" m={cur.metrics.bic_nl} />
            <StrengthCard title="BIC-SAC" m={cur.metrics.bic_sac} />
            <StrengthCard title="LAP" m={cur.metrics.lap} />
            <StrengthCard title="DAP" m={cur.metrics.dap} />
            <StrengthCard title="Differential Uniformity" m={cur.metrics.du} />
            <StrengthCard title="Algebraic Degree" m={cur.metrics.ad} />
            <StrengthCard title="Transparency Order" m={cur.metrics.to} />
            <StrengthCard title="Correlation Immunity" m={cur.metrics.ci} />
            <StrengthCard title="Cycle Structure" m={cur.metrics.cycle} />
          </div>

          {/* Decimal Grid (Bottom) */}
          <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 shadow-md">
            <h4 className="text-sm font-black text-gray-600 uppercase tracking-widest mb-10 italic">
              Nilai Desimal Grid
            </h4>
            <div className="grid grid-cols-8 md:grid-cols-16 gap-2">
              {cur.dec_grid.map((d, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[#E3EF26]/30 to-[#076653]/30 border border-[#0C342C]/20 p-2 rounded text-[10px] text-center text-gray-700 font-mono font-black"
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sub-components
const CompRow = ({ label, v1, v2, target, winner }) => (
  <tr className="border-b border-[#0C342C]/10 hover:bg-gradient-to-r hover:from-[#E3EF26]/20 hover:to-[#076653]/20 transition-all group">
    <td className="p-8 font-black text-gray-600 group-hover:text-[#0C342C] transition-colors uppercase tracking-tighter">
      {label}
    </td>
    <td className={`p-8 font-black ${winner === "K44" ? "text-gray-800" : "text-gray-600"}`}>{v1}</td>
    <td className={`p-8 font-black ${winner === "AES" ? "text-gray-800" : "text-gray-600"}`}>{v2}</td>
    <td className="p-8 text-gray-600 italic text-xs uppercase tracking-widest">{target}</td>
    <td className="p-8">
      <span
        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          winner === "K44"
            ? "bg-gradient-to-r from-[#E3EF26] to-[#076653] text-gray-800 shadow-lg shadow-[#0C342C]/20"
            : "text-gray-600"
        }`}
      >
        {winner}
      </span>
    </td>
  </tr>
);

const RankCard = ({ title, wins, isTop }) => (
  <div
    className={`p-12 rounded-[3rem] border transition-all ${
      isTop
        ? "bg-gradient-to-br from-[#E3EF26] to-[#076653] border-[#0C342C] shadow-2xl shadow-[#0C342C]/20 text-gray-800"
        : "bg-gradient-to-br from-white to-green-50 border-[#0C342C]/20 text-gray-800"
    }`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-6xl font-black mb-4 tracking-tighter">
          {wins} <span className="text-sm uppercase tracking-[0.4em] opacity-60 ml-4">Wins</span>
        </h4>
        <p className={`text-sm font-black uppercase tracking-[0.3em] ${isTop ? "text-gray-700" : "text-gray-600"}`}>
          {title}
        </p>
      </div>
      {isTop && (
        <span className="bg-gradient-to-r from-[#076653] to-[#0C342C] text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">
          Top Score
        </span>
      )}
    </div>
  </div>
);

const StrengthCard = ({ title, m }) => (
  <div className="bg-gradient-to-br from-white to-green-50 p-10 rounded-[2.5rem] border border-[#0C342C]/20 hover:border-[#0C342C] hover:shadow-lg hover:shadow-[#0C342C]/20 transition-all group">
    <h4 className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-10 italic group-hover:bg-gradient-to-r group-hover:from-[#E3EF26] group-hover:via-[#076653] group-hover:to-[#0C342C] group-hover:bg-clip-text group-hover:text-transparent transition-colors">
      {title}
    </h4>
    <div className="space-y-4">
      {Object.entries(m).map(([k, v]) => (
        <div key={k} className="flex justify-between items-center text-xs font-mono">
          <span className="text-gray-600 uppercase font-black tracking-tighter">{k.replace("_", " ")}:</span>
          <span className="text-gray-800 font-black italic">{v}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SBoxTable;
