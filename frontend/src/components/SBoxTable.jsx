import React, { useState, useEffect } from "react";
import axios from "axios";

const SBoxTable = () => {
  const [sboxData, setSboxData] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data S-box K44 dari FastAPI backend
    axios
      .get("http://127.0.0.1:8000/generate-sbox-k44")
      .then((response) => {
        setSboxData(response.data.data);
        setMetrics(response.data.metrics);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching S-box data:", error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center p-10">Loading Research Data...</div>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Research S-box (K44) Matrix
      </h2>

      {/* Panel Metrik Kriptografi sesuai Paper */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-600 font-semibold uppercase">
            Nonlinearity (NL)
          </p>
          <p className="text-xl font-bold">{metrics.nonlinearity}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <p className="text-xs text-green-600 font-semibold uppercase">SAC</p>
          <p className="text-xl font-bold">{metrics.sac}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-xs text-purple-600 font-semibold uppercase">LAP</p>
          <p className="text-xl font-bold">{metrics.lap}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
          <p className="text-xs text-red-600 font-semibold uppercase">DAP</p>
          <p className="text-xl font-bold">{metrics.dap}</p>
        </div>
      </div>

      {/* Grid 16x16 Hexadecimal */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">x</th>
              {[...Array(16)].map((_, i) => (
                <th key={i} className="border p-2 bg-gray-50">
                  {i.toString(16).toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(16)].map((_, row) => (
              <tr key={row}>
                <td className="border p-2 bg-gray-50 font-bold text-center">
                  {row.toString(16).toUpperCase()}
                </td>
                {[...Array(16)].map((_, col) => {
                  const val = sboxData[row * 16 + col];
                  return (
                    <td
                      key={col}
                      className="border p-2 text-center hover:bg-yellow-100 cursor-default transition-colors"
                    >
                      {val !== undefined
                        ? val.toString(16).toUpperCase().padStart(2, "0")
                        : "--"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-gray-500 italic">
        * S-box ini dibangun menggunakan matriks afin K44 dan polinomial
        x⁸+x⁴+x³+x+1.
      </p>
    </div>
  );
};

export default SBoxTable;
