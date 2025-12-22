import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MetricCard = ({ title, subtitle, ideal, original, encrypted, improvement, badge, badgeColor }) => (
  <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl border border-[#0C342C]/20 relative overflow-hidden group">
    <div
      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${badgeColor}`}
    >
      {badge}
    </div>
    <h3 className="text-gray-800 font-black text-lg mb-1">{title}</h3>
    <p className="text-gray-600 text-xs mb-6 font-medium">
      {subtitle} (ideal: {ideal})
    </p>

    <div className="space-y-3">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-gray-600 uppercase">Original:</span>
        <span className="text-gray-800 font-bold">{original}</span>
      </div>
      <div className="flex justify-between text-xs font-mono">
        <span className="text-gray-600 uppercase">Encrypted:</span>
        <span className={`font-black ${title === "Correlation" ? "text-emerald-600" : "text-emerald-600"}`}>
          {encrypted}
        </span>
      </div>
      {improvement && (
        <div className="pt-3 border-t border-[#0C342C]/10 flex justify-between text-[10px] font-black uppercase italic">
          <span className="text-gray-600 tracking-tighter">Improvement:</span>
          <span className="text-emerald-600">{improvement}</span>
        </div>
      )}
    </div>
  </div>
);

const HistogramView = ({ title, data }) => {
  const chartData = data.r.map((_, i) => ({
    name: i,
    red: data.r[i],
    green: data.g[i],
    blue: data.b[i],
  }));

  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-3xl border border-[#0C342C]/20">
      <h4 className="text-gray-800 font-bold text-sm mb-6 uppercase tracking-widest">{title}</h4>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar dataKey="red" fill="#ef4444" isAnimationActive={false} />
            <Bar dataKey="green" fill="#22c55e" isAnimationActive={false} />
            <Bar dataKey="blue" fill="#3b82f6" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {["Red", "Green", "Blue"].map((c, i) => (
          <div key={c} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${["bg-red-500", "bg-green-500", "bg-blue-500"][i]}`} />
            <span className="text-[10px] text-gray-600 font-bold uppercase">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageAnalysis = ({ metrics, histograms }) => {
  if (!metrics || !histograms) return null;

  return (
    <div className="mt-20 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Histogram Section */}
      <div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent mb-8 uppercase tracking-tighter italic">
          Histogram Analysis
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HistogramView title="Original Image Histogram" data={histograms.original} />
          <HistogramView title="Encrypted Image Histogram" data={histograms.encrypted} />
        </div>
        <p className="text-xs text-gray-600 mt-6 leading-relaxed italic">
          Histogram menunjukkan distribusi intensitas pixel untuk setiap channel RGB (Red, Green, Blue). Gambar
          terenkripsi yang baik akan memiliki histogram yang lebih merata dibandingkan gambar asli.
        </p>
      </div>

      {/* Security Metrics Section */}
      <div>
        <h2 className="text-3xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent mb-8 uppercase tracking-tighter italic">
          Security Metrics Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Entropy"
            subtitle="Randomness uncertainty"
            ideal="~8.0"
            original={metrics.entropy_orig}
            encrypted={metrics.entropy_enc}
            improvement={`+${((metrics.entropy_enc / metrics.entropy_orig - 1) * 100).toFixed(2)}%`}
            badge="Good"
            badgeColor="bg-yellow-500/10 text-yellow-600"
          />
          <MetricCard
            title="NPCR"
            subtitle="Pixels Change Rate"
            ideal="~99.6%"
            original="0.0000%"
            encrypted={`${metrics.npcr}%`}
            badge="Excellent"
            badgeColor="bg-green-500/10 text-green-600"
          />
          <MetricCard
            title="UACI"
            subtitle="Average Intensity Change"
            ideal="~33.46%"
            original="0.0000%"
            encrypted={`${metrics.uaci}%`}
            badge="Fair"
            badgeColor="bg-orange-500/10 text-orange-500"
          />
          <MetricCard
            title="Correlation"
            subtitle="Pixel correlation"
            ideal="0.0"
            original="0.9840"
            encrypted={metrics.correlation}
            improvement={`-${((1 - metrics.correlation / 0.984) * 100).toFixed(2)}%`}
            badge="Fair"
            badgeColor="bg-orange-500/10 text-orange-500"
          />
        </div>
      </div>

      {/* Interpretation Section */}
      <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-[2rem] border border-[#0C342C]/20">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-black text-gray-800 uppercase tracking-widest mr-2">Interpretation:</span>
          Entropy mendekati 8.0, NPCR mendekati 99.6%, dan UACI mendekati 33.46% menunjukkan enkripsi yang baik.
          Correlation yang rendah (mendekati 0) menunjukkan bahwa pixel-pixel terenkripsi tidak memiliki korelasi,
          membuat analisis statistik menjadi sulit bagi penyerang.
        </p>
      </div>
    </div>
  );
};

export default ImageAnalysis;
