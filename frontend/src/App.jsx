import React from "react";
import logo from "./assets/images/logo.png";
import ParameterPanel from "./components/ParameterPanel";
import SBoxTable from "./components/SBoxTable";
import EncryptionTool from "./components/EncryptionTool";
import ImageEncryptor from "./components/ImageEncryptor";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white text-gray-800 font-sans selection:bg-gradient-to-r selection:from-[#E3EF26] selection:to-[#076653]">
      {/* 1. HERO SECTION & NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E3EF26] py-6 shadow-sm">
        <div className="container mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="App Logo"
              className="w-12 h-12 rounded-xl shadow-lg shadow-[#0C342C]/20 border border-[#0C342C]/10 bg-white object-contain"
            />
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent leading-none">
                AES S-box Research Analyzer
              </h1>
              <p className="text-[10px] text-[#0C342C] uppercase tracking-[0.3em] mt-1 font-bold">
                Affine Matrices Exploration Platform
              </p>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative py-24 overflow-hidden border-b border-[#E3EF26]/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E3EF26]/20 via-transparent to-transparent opacity-100"></div>
        <div className="container mx-auto px-10 relative z-10 text-center">
          <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#E3EF26] to-[#076653] border border-[#0C342C]/20 bg-clip-text text-transparent text-xs font-black uppercase tracking-[0.3em] mb-8 inline-block">
            Universitas Negeri Semarang
          </span>
          <h2 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-gray-800 via-[#0C342C] to-[#076653] bg-clip-text text-transparent mb-8 tracking-tighter leading-tight">
            AES S-Box Analyzer.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Platform komprehensif untuk mengeksplorasi varian S-box AES melalui manipulasi matriks afin, mengevaluasi
            kekuatan kriptografi, dan visualisasi hasil secara interaktif.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-10 py-20 space-y-32">
        {/* 2. RESEARCH TEAM SECTION */}
        <section id="team">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent uppercase tracking-tighter">
              Research Team
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C]"></div>
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
        <section
          id="pipeline"
          className="bg-gradient-to-br from-[#E3EF26]/30 to-[#076653]/20 rounded-[3rem] p-16 border border-[#0C342C]/20 shadow-lg"
        >
          <div className="max-w-4xl">
            <h2 className="text-sm font-black text-[#0C342C] uppercase tracking-[0.4em] mb-4">
              Research Pipeline Overview
            </h2>
            <h3 className="text-4xl font-black bg-gradient-to-r from-gray-800 to-[#0C342C] bg-clip-text text-transparent mb-12 tracking-tight">
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
              <h2 className="text-4xl font-black bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] bg-clip-text text-transparent mb-3 uppercase tracking-tight">
                Control Panel
              </h2>
              <p className="text-gray-600 text-lg font-medium">
                Generate and analyze S-boxes using multiple affine matrices with comprehensive strength testing.
              </p>
            </div>
            <button className="bg-gradient-to-r from-[#E3EF26] via-[#076653] to-[#0C342C] text-white px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:shadow-2xl transition-all shadow-lg active:scale-95">
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
      <footer className="border-t border-[#E3EF26]/20 py-24 text-center bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-10">
          <p className="text-gray-600 text-xs font-black uppercase tracking-[0.5em] mb-6">
            Projek Mata Kuliah Kriptografi - UNNES
          </p>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto italic leading-relaxed mb-10 font-medium">
            Platform ini mengimplementasikan riset "AES S-box modification uses affine matrices exploration" yang
            menggunakan modifikasi matriks afin $K_{44}$ dengan Nonlinearity 112 dan SAC 0.50073.
          </p>
          <div className="flex justify-center gap-12 opacity-70">
            <img
              src={logo}
              alt="App Logo"
              className="h-16 w-16 rounded-2xl border border-[#0C342C]/10 shadow-sm object-contain bg-white"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

// SUB-KOMPONEN INTERNAL (Helper)
const TeamCard = ({ name, role, nim }) => (
  <div className="bg-gradient-to-br from-[#E3EF26]/40 to-[#076653]/30 border border-[#0C342C]/30 p-8 rounded-[2rem] hover:border-[#0C342C] transition-all group shadow-md hover:shadow-lg hover:shadow-[#0C342C]/10">
    <div className="w-20 h-20 bg-gradient-to-br from-[#E3EF26] to-[#076653] rounded-2xl mb-8 flex items-center justify-center text-white font-black text-2xl group-hover:shadow-lg group-hover:shadow-[#0C342C]/30 transition-all">
      {name.charAt(0)}
    </div>
    <h3 className="text-gray-800 font-black text-lg mb-1 group-hover:bg-gradient-to-r group-hover:from-[#0C342C] group-hover:to-[#076653] group-hover:bg-clip-text group-hover:text-transparent transition-colors tracking-tight">
      {name}
    </h3>
    <p className="text-xs text-gray-600 font-bold mb-4 uppercase tracking-widest">{role}</p>
    <p className="text-xs text-[#0C342C] font-mono font-bold tracking-tighter">{nim}</p>
  </div>
);

const PipelineStep = ({ num, title, desc }) => (
  <div className="flex gap-8 group">
    <div className="flex-none w-12 h-12 rounded-2xl border-2 border-[#0C342C]/30 flex items-center justify-center text-sm font-black text-gray-600 group-hover:bg-gradient-to-br group-hover:from-[#E3EF26] group-hover:to-[#076653] group-hover:border-[#0C342C] group-hover:text-white transition-all shadow-md">
      {num}
    </div>
    <div className="pt-1">
      <h4 className="text-gray-800 font-black text-xl mb-2 tracking-tight">{title}</h4>
      <p className="text-base text-gray-600 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default App;
