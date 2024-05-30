// document.addEventListener("DOMContentLoaded", (event) => {
//   let chart;

//   const fetchData = () => {
//     return fetch("data/SUPERSTORE-TEAM15.json")
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Error fetching the dataset:", error);
//         return [];
//       });
//   };

//   const updateChart = (data, year) => {
//     let filteredData;
//     if (year === "All Year") {
//       filteredData = data.filter((item) => {
//         const year = parseInt(item.Year_Separated);
//         return year >= 2014 && year <= 2017;
//       });
//     } else {
//       filteredData = data.filter((item) => item.Year_Separated === year);
//     }

//     console.log(`Filtered data for year ${year}:`, filteredData);

//     const segments = [];
//     const sales = [];

//     filteredData.forEach((item) => {
//       if (!segments.includes(item.Segment)) {
//         segments.push(item.Segment);
//       }
//     });

//     segments.forEach((segment) => {
//       const segmentSales = filteredData
//         .filter((item) => item.Segment === segment)
//         .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
//       console.log(segmentSales);
//       sales.push(segmentSales);
//     });

//     console.log("Segments:", segments);
//     console.log("Sales:", sales);

//     const ctx = document.getElementById("myChart").getContext("2d");

//     if (chart) {
//       chart.destroy();
//     }

//     chart = new Chart(ctx, {
//       type: "doughnut",
//       data: {
//         labels: segments,
//         datasets: [
//           {
//             label:
//               year === "All Year"
//                 ? "Sales by Segment (2014-2017)"
//                 : `Sales by Segment for ${year}`,
//             data: sales,
//             backgroundColor: [
//               "rgba(127, 132, 83, 52)",
//               "rgba(255, 192, 68,100)",
//               "rgba(148, 183, 33, 72)",
//             ],
//           },
//         ],
//       },
//     });
//   };

//   fetchData().then((data) => {
//     console.log("Fetched data:", data);

//     const yearFilter = document.getElementById("yearFilter");

//     yearFilter.addEventListener("change", () => {
//       const selectedYear = yearFilter.value;
//       updateChart(data, selectedYear);
//     });

//     // Initialize chart with all years (2014-2017)
//     updateChart(data, "All Year");
//   });
// });

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

    console.log(
      `Filtered data for year ${year} and region ${region}:`,
      filteredData
    );

    const segments = [];
    const sales = [];
    const profits = [];

    filteredData.forEach((item) => {
      if (!segments.includes(item.Segment)) {
        segments.push(item.Segment);
      }
    });

    segments.forEach((segment) => {
      const segmentSales = filteredData
        .filter((item) => item.Segment === segment)
        .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
      sales.push(segmentSales);

      const segmentsProfit = filteredData
        .filter((item) => item.Segment === segment)
        .reduce((sum, item) => sum + parseFloat(item.Profit), 0);
      profits.push(segmentsProfit);
    });

    // Update total penjualan dan total keuntungan pada kartu
    document.getElementById("totalSales").textContent =
      "$" + sales.reduce((sum, value) => sum + value).toLocaleString("en-US");

    document.getElementById("totalProfit").textContent =
      "$" + profits.reduce((sum, value) => sum + value).toLocaleString("en-US");

    console.log("Segments:", segments);
    console.log("Sales:", sales);

    const ctx = document.getElementById("myChart").getContext("2d");

    if (chart) {
      chart.destroy(); // Destroy the previous chart instance if it exists
    }

    const label =
      year === "All Year" && region === "All Regions"
        ? "Sales by Segment (2014-2017) and All Regions"
        : `Sales by Segment for ${
            year === "All Year" ? "2014-2017" : year
          } and ${region === "All Regions" ? "all regions" : region}`;

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: segments,
        datasets: [
          {
            label: label,
            data: sales,
            backgroundColor: [
              "rgba(127, 132, 83, 52)",
              "rgba(255, 192, 68,100)",
              "rgba(148, 183, 33, 72)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: "40%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          datalabels: {
            color: "black",
            anchor: "end",
            align: "start",
            formatter: (value) => {
              return value.toLocaleString();
            },
          },
        },
      },
      plugins: [ChartDataLabels], // Menambahkan plugin ChartDataLabels ke chart
    });

    const config = {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
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
