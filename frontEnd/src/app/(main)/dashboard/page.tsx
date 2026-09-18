"use client";
import { salesData, categoryData, topMenus, metrics } from "@/data/dashboardData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, Legend, Filler
);

export default function DashboardPage() {
  return (
    <div className="space-y-4 ">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm">
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide mb-1 truncate">{m.label}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{m.value}</p>
            <p className={`text-[10px] sm:text-xs mt-1 ${m.up ? "text-teal-600" : "text-red-500"}`}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart Penjualan */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-900 mb-4">
          Penjualan 7 hari terakhir
        </p>
        <div className="h-48">
          <Line data={salesData} options={{
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: "rgba(0,0,0,0.04)" } }
            }
          }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Menu Paling Laris */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-900 mb-3">Menu paling laris</p>
          <ul className="space-y-3">
            {topMenus.map((m) => (
              <li key={m.rank} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded text-xs font-medium flex items-center justify-center shrink-0
                  ${m.rank === 1 ? "bg-amber-50 text-amber-700" :
                    m.rank === 2 ? "bg-gray-100 text-gray-600" : "bg-teal-50 text-teal-700"}`}>
                  {m.rank}
                </span>
                <span className="flex-1 text-xs sm:text-sm text-gray-700 truncate">{m.name}</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-900">{m.count}x</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chart Kategori */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-900 mb-3">Pendapatan per kategori</p>
          <div className="h-44">
            <Doughnut data={categoryData} options={{
              responsive: true, maintainAspectRatio: false,
              cutout: "65%",
              plugins: { legend: { position: "bottom", labels: { font: { size: 11 }, boxWidth: 10, padding: 12 } } }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}