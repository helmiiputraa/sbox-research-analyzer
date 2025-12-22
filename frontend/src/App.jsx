import React from "react";
import ParameterPanel from "./components/ParameterPanel";
import SBoxTable from "./components/SBoxTable";
import EncryptionTool from "./components/EncryptionTool";
import ImageEncryptor from "./components/ImageEncryptor";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-blue-500/30">
      {/* 1. HERO SECTION & NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-6">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-blue-500/20">
              Sbox
            </div>
            <div>
              <h1 className="text-xl font-black text-white leading-none">AES S-box Research Analyzer</h1>
              <p className="text-[10px] text-blue-500 uppercase tracking-[0.3em] mt-1 font-bold">
                Affine Matrices Exploration Platform
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-green-500 uppercase tracking-widest text-green-500">
              Backend Active
            </span>
          </div>
        </div>
      </nav>

      <header className="relative py-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50"></div>
        <div className="container mx-auto px-10 relative z-10 text-center">
          <span className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block">
            Universitas Negeri Semarang
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
            AES S-Box <span className="text-blue-600">Analyzer.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Platform komprehensif untuk mengeksplorasi varian S-box AES melalui manipulasi matriks afin, mengevaluasi
            kekuatan kriptografi, dan visualisasi hasil secara interaktif.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-10 py-20 space-y-32">
        {/* 2. RESEARCH TEAM SECTION */}
        <section id="team">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Research Team</h2>
            <div className="h-[2px] flex-1 bg-white/5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <TeamCard name="Josephin Nova Bagaskara" nim="2304130002" />
            <TeamCard name="Muhammad Faisal" nim="2304130004" />
            <TeamCard name="Ihza Ferdina" nim="2304130017" />
            <TeamCard name="Helmi Putra Noor Pratama" nim="2304130043" />
          </div>
        </section>

        {/* 3. RESEARCH PARAMETERS (The Panel) */}
        <section id="parameters">
          <ParameterPanel />
        </section>

        {/* 4. RESEARCH PIPELINE OVERVIEW */}
        <section id="pipeline" className="bg-white/[0.02] rounded-[3rem] p-16 border border-white/5 shadow-inner">
          <div className="max-w-4xl">
            <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] mb-4">
              Research Pipeline Overview
            </h2>
            <h3 className="text-4xl font-black text-white mb-12 tracking-tight">
              Proses Lengkap Eksplorasi Affine Matrix → S-box
            </h3>
            <div className="space-y-10">
              <PipelineStep
                num="1"
                title="Menentukan matriks affine 8x8"
                desc="Memilih dari 2^64 kombinasi bit untuk membentuk ruang pencarian matriks potensial."
              />
              <PipelineStep
                num="2"
                title="Transformasi inverse GF(2^8)"
                desc="Setiap byte dibalik menggunakan polinomial irreduksibel x^8 + x^4 + x^3 + x + 1."
              />
              <PipelineStep
                num="3"
                title="Pembentukan kandidat S-box"
                desc="Hasil inverse dikalikan dengan matriks afin dan ditambahkan konstanta C_AES (0x63)."
              />
              <PipelineStep
                num="4"
                title="Seleksi Balance & Bijective"
                desc="Hanya matriks yang menghasilkan output unik 0-255 dan jumlah bit seimbang yang dipilih."
              />
              <PipelineStep
                num="5"
                title="Pengujian 10 metrik kriptografi"
                desc="Uji otomatis NL, SAC, BIC, LAP, DAP, DU, AD, TO, dan CI untuk menentukan performa terbaik."
              />
            </div>
          </div>
        </section>

        {/* 5. CONTROL PANEL & ANALYSIS */}
        <section id="analysis">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-black text-white mb-3 uppercase tracking-tight">Control Panel</h2>
              <p className="text-gray-500 text-lg font-medium">
                Generate and analyze S-boxes using multiple affine matrices with comprehensive strength testing.
              </p>
            </div>
            <button className="bg-white text-black px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl shadow-white/5 active:scale-95">
              Generate & Analyze
            </button>
          </div>
          <SBoxTable />
        </section>

        {/* 6 & 7. ENCRYPTION MODULES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <EncryptionTool />
          <ImageEncryptor />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-24 text-center bg-black/20">
        <div className="container mx-auto px-10">
          <p className="text-gray-500 text-xs font-black uppercase tracking-[0.5em] mb-6">
            Projek Mata Kuliah Kriptografi - UNNES
          </p>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto italic leading-relaxed mb-10 font-medium">
            Platform ini mengimplementasikan riset "AES S-box modification uses affine matrices exploration" yang
            menggunakan modifikasi matriks afin $K_{44}$ dengan Nonlinearity 112 dan SAC 0.50073.
          </p>
          <div className="flex justify-center gap-12 opacity-20 grayscale">
            {/* Logo Unnes Placeholder */}
            <div className="w-16 h-16 bg-white rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// SUB-KOMPONEN INTERNAL (Helper)
const TeamCard = ({ name, role, nim }) => (
  <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all group shadow-lg">
    <div className="w-20 h-20 bg-white/5 rounded-2xl mb-8 flex items-center justify-center text-gray-700 font-black text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
      {name.charAt(0)}
    </div>
    <h3 className="text-white font-black text-lg mb-1 group-hover:text-blue-400 transition-colors tracking-tight">
      {name}
    </h3>
    <p className="text-xs text-gray-500 font-bold mb-4 uppercase tracking-widest">{role}</p>
    <p className="text-xs text-blue-500/50 font-mono font-bold tracking-tighter">{nim}</p>
  </div>
);

const PipelineStep = ({ num, title, desc }) => (
  <div className="flex gap-8 group">
    <div className="flex-none w-12 h-12 rounded-2xl border-2 border-white/10 flex items-center justify-center text-sm font-black text-gray-500 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all shadow-lg">
      {num}
    </div>
    <div className="pt-1">
      <h4 className="text-white font-black text-xl mb-2 tracking-tight">{title}</h4>
      <p className="text-base text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default App;
