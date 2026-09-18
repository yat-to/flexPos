export const salesData = {
  labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
  datasets: [
    {
      label: "Jualan",
      data: [98, 115, 132, 109, 145, 178, 142],
      borderColor: "#1D9E75",
      backgroundColor: "rgba(29,158,117,0.08)",
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: "#1D9E75",
      pointRadius: 4,
    },
  ],
};

export const categoryData = {
  labels: ["Makanan Berat", "Minuman", "Snack", "Dessert"],
  datasets: [
    {
      data: [52, 25, 14, 9],
      backgroundColor: ["#1D9E75", "#5DCAA5", "#9FE1CB", "#E1F5EE"],
      borderWidth: 0,
    },
  ],
};

export const topMenus = [
  { rank: 1, name: "Nasi Goreng Spesial", count: 312 },
  { rank: 2, name: "Mie Ayam Bakso", count: 287 },
  { rank: 3, name: "Es Teh Manis", count: 241 },
  { rank: 4, name: "Ayam Bakar", count: 198 },
  { rank: 5, name: "Jus Alpukat", count: 176 },
];

export const metrics = [
  { label: "Jualan hari ini", value: "142", sub: "+12% dari kemarin", up: true },
  { label: "Pendapatan hari ini", value: "Rp 4,2jt", sub: "+8% dari kemarin", up: true },
  { label: "Total bulan ini", value: "Rp 87jt", sub: "-3% dari bulan lalu", up: false },
  { label: "Transaksi bulan ini", value: "3.241", sub: "+5% dari bulan lalu", up: true },
];