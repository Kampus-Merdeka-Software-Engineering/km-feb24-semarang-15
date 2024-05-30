document.addEventListener("DOMContentLoaded", (event) => {
  let chart; // To hold the chart instance

  const fetchData = () => {
    return fetch("data/SUPERSTORE-TEAM15.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching the dataset:", error);
        return [];
      });
  };

  const updateChart = (data, year, region) => {
    let filteredData = data;

    // Filter by year
    if (year !== "All Year") {
      filteredData = filteredData.filter(
        (item) => item.Year_Separated === year
      );
    }

    // Filter by region
    if (region !== "All Regions") {
      filteredData = filteredData.filter((item) => item.Region === region);
    }

    const categories = [];
    const sales = [];
    const profits = [];

    filteredData.forEach((item) => {
      if (!categories.includes(item.Category)) {
        categories.push(item.Category);
      }
    });

    categories.forEach((category) => {
      const categorySales = filteredData
        .filter((item) => item.Category === category)
        .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
      sales.push(categorySales);

      const categoryProfit = filteredData
        .filter((item) => item.Category === category)
        .reduce((sum, item) => sum + parseFloat(item.Profit), 0);
      profits.push(categoryProfit);
    });

    // Update total penjualan dan total keuntungan pada kartu
    document.getElementById("totalSales").textContent =
      "$" + sales.reduce((sum, value) => sum + value).toLocaleString("en-US");

    document.getElementById("totalProfit").textContent =
      "$" + profits.reduce((sum, value) => sum + value).toLocaleString("en-US");

    const ctx = document.getElementById("myChart").getContext("2d");

    if (chart) {
      chart.destroy(); // Destroy the previous chart instance if it exists
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: categories,
        datasets: [
          {
            label: "Sales",
            data: sales,
            backgroundColor: "rgba(120, 128, 54, 50)",
            // borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            barPercentage: 0.9,
          },
          {
            label: "Profit",
            data: profits,
            backgroundColor: "rgba(251, 184, 54, 98)",
            // borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
            barPercentage: 0.9,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              padding: 20,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              padding: 20,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
        },
      },
    });
  };

  fetchData().then((data) => {
    console.log("Fetched data:", data);

    const yearFilter = document.getElementById("yearFilter");
    const regionFilter = document.getElementById("regionFilter");

    const updateChartFilters = () => {
      const selectedYear = yearFilter.value;
      const selectedRegion = regionFilter.value;
      updateChart(data, selectedYear, selectedRegion);
    };

    yearFilter.addEventListener("change", updateChartFilters);
    regionFilter.addEventListener("change", updateChartFilters);

    // Initialize chart with all years (2014-2017) and all regions
    updateChart(data, "All Year", "All Regions");
  });
});

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

//     console.log(
//       `Filtered data for year ${year} and region ${region}:`,
//       filteredData
//     );

//     const segments = [];
//     const sales = [];
//     const profits = [];

//     filteredData.forEach((item) => {
//       if (!segments.includes(item.Segment)) {
//         segments.push(item.Segment);
//       }
//     });

//     segments.forEach((segment) => {
//       const segmentSales = filteredData
//         .filter((item) => item.Segment === segment)
//         .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
//       sales.push(segmentSales);

//       const segmentsProfit = filteredData
//         .filter((item) => item.Segment === segment)
//         .reduce((sum, item) => sum + parseFloat(item.Profit), 0);
//       profits.push(segmentsProfit);
//     });

//     // Update total penjualan dan total keuntungan pada kartu
//     document.getElementById("totalSales").textContent =
//       "$" + sales.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     document.getElementById("totalProfit").textContent =
//       "$" + profits.reduce((sum, value) => sum + value).toLocaleString("en-US");

//     console.log("Segments:", segments);
//     console.log("Sales:", sales);

//     const ctx = document.getElementById("myChart").getContext("2d");

//     if (chart) {
//       chart.destroy(); // Destroy the previous chart instance if it exists
//     }

//     chart = new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: categories,
//         datasets: [
//           {
//             label: "Sales",
//             data: sales,
//             backgroundColor: "rgba(120, 128, 54, 50)",
//             // borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//           },
//           {
//             label: "Profit",
//             data: profits,
//             backgroundColor: "rgba(251, 184, 54, 98)",
//             // borderColor: "rgba(153, 102, 255, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });

//     const config = {
//       type: "doughnut",
//       data: data,
//       options: {
//         responsive: true,
//         maintainAspectRatio: false, // Mengatur agar aspect ratio bisa diubah
//       },
//     };
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
