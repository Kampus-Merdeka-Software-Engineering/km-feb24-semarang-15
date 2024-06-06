// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart; // To hold the chart instance

//   const fetchData = () => {
//     return fetch("data/SUPERSTORE-TEAM15.json")
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Error fetching the dataset:", error);
//         return [];
//       });
//   };

//   const updateChart = (data, year, region) => {
//     let filteredData = data;

//     // Filter by year
//     if (year !== "All Year") {
//       filteredData = filteredData.filter(
//         (item) => item.Year_Separated === year
//       );
//     }

//     // Filter by region
//     if (region !== "All Regions") {
//       filteredData = filteredData.filter((item) => item.Region === region);
//     }

//     const categories = [];
//     const sales = [];
//     const profits = [];

//     filteredData.forEach((item) => {
//       if (!categories.includes(item.Category)) {
//         categories.push(item.Category);
//       }
//     });

//     categories.forEach((category) => {
//       const categorySales = filteredData
//         .filter((item) => item.Category === category)
//         .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
//       sales.push(categorySales);

//       const categoryProfit = filteredData
//         .filter((item) => item.Category === category)
//         .reduce((sum, item) => sum + parseFloat(item.Profit), 0);
//       profits.push(categoryProfit);
//     });

//     // Update total penjualan dan total keuntungan pada kartu
//     document.getElementById("totalSales").textContent =
//       "$" + sales.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     document.getElementById("totalProfit").textContent =
//       "$" + profits.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     const ctx = document.getElementById("myChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: categories,
//         datasets: [
//           {
//             label: "Sales",
//             data: sales,
//             backgroundColor: "rgba(120, 128, 54, 50)",
//             // borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//             barPercentage: 0.9,
//           },
//           {
//             label: "Profit",
//             data: profits,
//             backgroundColor: "rgba(251, 184, 54, 98)",
//             // borderColor: "rgba(153, 102, 255, 1)",
//             borderWidth: 1,
//             barPercentage: 0.9,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             grid: {
//               display: false,
//             },
//             ticks: {
//               padding: 20,
//             },
//           },
//           y: {
//             grid: {
//               display: false,
//             },
//             ticks: {
//               padding: 20,
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             position: "top",
//             align: "end",
//             labels: {
//               padding: 20,
//               usePointStyle: true,
//               pointStyle: "circle",
//             },
//           },
//         },
//       },
//     });
//   };

//   fetchData().then((data) => {
//     console.log("Fetched data:", data);

//     const yearFilter = document.getElementById("yearFilter");
//     const regionFilter = document.getElementById("regionFilter");

//     const updateChartFilters = () => {
//       const selectedYear = yearFilter.value;
//       const selectedRegion = regionFilter.value;
//       updateChart(data, selectedYear, selectedRegion);
//     };

//     yearFilter.addEventListener("change", updateChartFilters);
//     regionFilter.addEventListener("change", updateChartFilters);

//     // Initialize chart with all years (2014-2017) and all regions
//     updateChart(data, "All Year", "All Regions");
//   });
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart; // To hold the chart instance

//   const fetchData = () => {
//     return fetch("data/SUPERSTORE-TEAM15.json")
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Error fetching the dataset:", error);
//         return [];
//       });
//   };

//   const updateChart = (data, year, region) => {
//     let filteredData = data;

//     // Filter by year
//     if (year !== "All Year") {
//       filteredData = filteredData.filter(
//         (item) => item.Year_Separated === year
//       );
//     }

//     // Filter by region
//     if (region !== "All Regions") {
//       filteredData = filteredData.filter((item) => item.Region === region);
//     }

//     const dates = [];
//     const sales = [];
//     const profits = [];

//     filteredData.forEach((item) => {
//       if (!dates.includes(item.Order_Date)) {
//         dates.push(item.Order_Date);
//       }
//     });

//     dates.sort();

//     dates.forEach((date) => {
//       const dateSales = filteredData
//         .filter((item) => item.Order_Date === date)
//         .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
//       sales.push(dateSales);

//       const dateProfit = filteredData
//         .filter((item) => item.Order_Date === date)
//         .reduce((sum, item) => sum + parseFloat(item.Profit), 0);
//       profits.push(dateProfit);
//     });

//     const avgSales = sales.reduce((sum, value) => sum + value) / sales.length;
//     const avgProfits =
//       profits.reduce((sum, value) => sum + value) / profits.length;

//     // Update total penjualan dan total keuntungan pada kartu
//     document.getElementById("totalSales").textContent =
//       "$" + sales.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     document.getElementById("totalProfit").textContent =
//       "$" + profits.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     const ctx = document.getElementById("myChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: dates,
//         datasets: [
//           {
//             label: "Sales",
//             data: sales,
//             backgroundColor: "rgba(120, 128, 54, 0.2)",
//             borderColor: "rgba(120, 128, 54, 1)",
//             borderWidth: 1,
//             tension: 0.3,
//           },
//           {
//             label: "Profit",
//             data: profits,
//             backgroundColor: "rgba(251, 184, 54, 0.2)",
//             borderColor: "rgba(251, 184, 54, 1)",
//             borderWidth: 1,
//             tension: 0.3,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           x: {
//             grid: {
//               display: false,
//             },
//             ticks: {
//               padding: 20,
//             },
//           },
//           y: {
//             grid: {
//               display: false,
//             },
//             ticks: {
//               padding: 20,
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             position: "top",
//             align: "end",
//             labels: {
//               padding: 20,
//               usePointStyle: true,
//               pointStyle: "circle",
//             },
//           },
//           annotation: {
//             annotations: {
//               line1: {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgSales,
//                 borderColor: "rgba(120, 128, 54, 0.5)",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Sales",
//                   backgroundColor: "rgba(120, 128, 54, 0.5)",
//                   position: "start",
//                 },
//               },
//               line2: {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgProfits,
//                 borderColor: "rgba(251, 184, 54, 0.5)",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Profit",
//                   backgroundColor: "rgba(251, 184, 54, 0.5)",
//                   position: "start",
//                 },
//               },
//             },
//           },
//         },
//       },
//     });
//   };

//   fetchData().then((data) => {
//     console.log("Fetched data:", data);

//     const yearFilter = document.getElementById("yearFilter");
//     const regionFilter = document.getElementById("regionFilter");

//     const updateChartFilters = () => {
//       const selectedYear = yearFilter.value;
//       const selectedRegion = regionFilter.value;
//       updateChart(data, selectedYear, selectedRegion);
//     };

//     yearFilter.addEventListener("change", updateChartFilters);
//     regionFilter.addEventListener("change", updateChartFilters);

//     // Initialize chart with all years (2014-2017) and all regions
//     updateChart(data, "All Year", "All Regions");
//   });
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart; // To hold the chart instance
//   let data = []; // Global variable to hold fetched data

//   function fetchDataAndInitialize() {
//     fetch("data/SUPERSTORE-TEAM15.json") // Update the path to your JSON file as needed
//       .then((response) => response.json())
//       .then((fetchedData) => {
//         data = fetchedData;
//         updateChart();
//       })
//       .catch((error) => console.error("Error fetching the data:", error));
//   }

//   function getQuarter(month) {
//     return Math.floor((month - 1) / 3) + 1;
//   }

//   function updateChart() {
//     const yearFilter = document.getElementById("yearFilter").value;
//     const regionFilter = document.getElementById("regionFilter").value;

//     let filteredData = data;

//     if (yearFilter && yearFilter !== "All Year") {
//       filteredData = filteredData.filter(
//         (item) => item.Year_Separated === yearFilter
//       );
//     }

//     if (regionFilter && regionFilter !== "All Regions") {
//       filteredData = filteredData.filter(
//         (item) => item.Region === regionFilter
//       );
//     }

//     const quarterlyData = {};

//     filteredData.forEach((item) => {
//       const orderDate = new Date(item.Order_Date);
//       const quarter = getQuarter(orderDate.getMonth() + 1);
//       const year = orderDate.getFullYear();
//       const key = `${year} Q${quarter}`;

//       if (!quarterlyData[key]) {
//         quarterlyData[key] = { sales: 0, profit: 0 };
//       }
//       quarterlyData[key].sales += parseFloat(item.Sales);
//       quarterlyData[key].profit += parseFloat(item.Profit);
//     });

//     const labels = Object.keys(quarterlyData).sort();
//     const salesData = labels.map((label) => quarterlyData[label].sales);
//     const profitData = labels.map((label) => quarterlyData[label].profit);

//     const ctx = document.getElementById("quarterChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "Sales",
//             data: salesData,
//             borderColor: "orange",
//             fill: false,
//           },
//           {
//             label: "Profit",
//             data: profitData,
//             borderColor: "green",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "Amount",
//             },
//           },
//           x: {
//             title: {
//               display: true,
//               text: "Quarter",
//             },
//           },
//         },
//         plugins: {
//           title: {
//             display: true,
//             text: "Profit and Sales Per Quarter",
//           },
//           tooltip: {
//             mode: "index",
//             intersect: false,
//           },
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });
//   }

//   document.getElementById("yearFilter").addEventListener("change", updateChart);
//   document
//     .getElementById("regionFilter")
//     .addEventListener("change", updateChart);

//   fetchDataAndInitialize();
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart; // To hold the chart instance
//   let data = []; // Global variable to hold fetched data

//   function fetchDataAndInitialize() {
//     fetch("data/SUPERSTORE-TEAM15.json") // Update the path to your JSON file as needed
//       .then((response) => response.json())
//       .then((fetchedData) => {
//         data = fetchedData;
//         updateChart();
//       })
//       .catch((error) => console.error("Error fetching the data:", error));
//   }

//   function getQuarter(month) {
//     return Math.floor((month - 1) / 3) + 1;
//   }

//   function calculateAverage(arr) {
//     const sum = arr.reduce((a, b) => a + b, 0);
//     return sum / arr.length;
//   }

//   function updateChart() {
//     const yearFilter = document.getElementById("yearFilter").value;
//     const regionFilter = document.getElementById("regionFilter").value;

//     let filteredData = data;

//     if (yearFilter && yearFilter !== "All Year") {
//       filteredData = filteredData.filter(
//         (item) => item.Year_Separated === yearFilter
//       );
//     }

//     if (regionFilter && regionFilter !== "All Regions") {
//       filteredData = filteredData.filter(
//         (item) => item.Region === regionFilter
//       );
//     }

//     const quarterlyData = {};

//     filteredData.forEach((item) => {
//       const orderDate = new Date(item.Order_Date);
//       const quarter = getQuarter(orderDate.getMonth() + 1);
//       const year = orderDate.getFullYear();
//       const key = `${year} Q${quarter}`;

//       if (!quarterlyData[key]) {
//         quarterlyData[key] = { sales: 0, profit: 0 };
//       }
//       quarterlyData[key].sales += parseFloat(item.Sales);
//       quarterlyData[key].profit += parseFloat(item.Profit);
//     });

//     const labels = Object.keys(quarterlyData).sort();
//     const salesData = labels.map((label) => quarterlyData[label].sales);
//     const profitData = labels.map((label) => quarterlyData[label].profit);
//     const avgSales = calculateAverage(salesData);
//     const avgProfit = calculateAverage(profitData);

//     const ctx = document.getElementById("quarterChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "Sales",
//             data: salesData,
//             borderColor: "orange",
//             fill: false,
//           },
//           {
//             label: "Profit",
//             data: profitData,
//             borderColor: "green",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "Amount",
//             },
//           },
//           x: {
//             title: {
//               display: true,
//               text: "Quarter",
//             },
//           },
//         },
//         plugins: {
//           title: {
//             display: true,
//             text: "Profit and Sales Per Quarter",
//           },
//           tooltip: {
//             mode: "index",
//             intersect: false,
//           },
//           annotation: {
//             annotations: [
//               {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgSales,
//                 borderColor: "orange",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Sales",
//                   position: "center",
//                   backgroundColor: "rgba(255,165,0,0.8)",
//                   color: "white",
//                 },
//               },
//               {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgProfit,
//                 borderColor: "green",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Profit",
//                   position: "center",
//                   backgroundColor: "rgba(0,128,0,0.8)",
//                   color: "white",
//                 },
//               },
//             ],
//           },
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });
//   }

//   document.getElementById("yearFilter").addEventListener("change", updateChart);
//   document
//     .getElementById("regionFilter")
//     .addEventListener("change", updateChart);

//   fetchDataAndInitialize();
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart; // To hold the chart instance
//   let data = []; // Global variable to hold fetched data

//   function fetchDataAndInitialize() {
//     fetch("data/SUPERSTORE-TEAM15.json") // Update the path to your JSON file as needed
//       .then((response) => response.json())
//       .then((fetchedData) => {
//         data = fetchedData;
//         updateChart();
//       })
//       .catch((error) => console.error("Error fetching the data:", error));
//   }

//   function getQuarter(month) {
//     return Math.floor((month - 1) / 3) + 1;
//   }

//   function calculateAverage(arr) {
//     const sum = arr.reduce((a, b) => a + b, 0);
//     return sum / arr.length;
//   }

//   function updateChart() {
//     const yearFilter = document.getElementById("yearFilter").value;
//     const regionFilter = document.getElementById("regionFilter").value;

//     let filteredData = data;

//     if (yearFilter && yearFilter !== "All Year") {
//       filteredData = filteredData.filter(
//         (item) => item.Year_Separated === yearFilter
//       );
//     }

//     if (regionFilter && regionFilter !== "All Regions") {
//       filteredData = filteredData.filter(
//         (item) => item.Region === regionFilter
//       );
//     }

//     const quarterlyData = {};

//     filteredData.forEach((item) => {
//       const orderDate = new Date(item.Order_Date);
//       const quarter = getQuarter(orderDate.getMonth() + 1);
//       const year = orderDate.getFullYear();
//       const key = `${year} Q${quarter}`;

//       if (!quarterlyData[key]) {
//         quarterlyData[key] = { sales: 0, profit: 0 };
//       }
//       quarterlyData[key].sales += parseFloat(item.Sales);
//       quarterlyData[key].profit += parseFloat(item.Profit);
//     });

//     const labels = Object.keys(quarterlyData).sort();
//     const salesData = labels.map((label) => quarterlyData[label].sales);
//     const profitData = labels.map((label) => quarterlyData[label].profit);
//     const avgSales = calculateAverage(salesData);
//     const avgProfit = calculateAverage(profitData);

//     const ctx = document.getElementById("quarterChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [
//           {
//             label: "Sales",
//             data: salesData,
//             borderColor: "orange",
//             fill: false,
//           },
//           {
//             label: "Profit",
//             data: profitData,
//             borderColor: "green",
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: "Amount",
//             },
//           },
//           x: {
//             title: {
//               display: true,
//               text: "Quarter",
//             },
//           },
//         },
//         plugins: {
//           title: {
//             display: true,
//             text: "Profit and Sales Per Quarter",
//           },
//           tooltip: {
//             mode: "index",
//             intersect: false,
//           },
//           annotation: {
//             annotations: [
//               {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgSales,
//                 borderColor: "orange",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Sales",
//                   position: "center",
//                   backgroundColor: "rgba(255,165,0,0.8)",
//                   color: "white",
//                 },
//               },
//               {
//                 type: "line",
//                 scaleID: "y",
//                 value: avgProfit,
//                 borderColor: "green",
//                 borderWidth: 2,
//                 label: {
//                   enabled: true,
//                   content: "Average Profit",
//                   position: "center",
//                   backgroundColor: "rgba(0,128,0,0.8)",
//                   color: "white",
//                 },
//               },
//             ],
//           },
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     });
//   }

//   document.getElementById("yearFilter").addEventListener("change", updateChart);
//   document
//     .getElementById("regionFilter")
//     .addEventListener("change", updateChart);

//   fetchDataAndInitialize();
// });
