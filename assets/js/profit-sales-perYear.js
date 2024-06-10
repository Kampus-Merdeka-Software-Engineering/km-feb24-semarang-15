// fetch("data/SUPERSTORE-TEAM15.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const profitData = {};
//     const salesData = {};
//     const monthMapping = {
//       January: "Jan",
//       February: "Feb",
//       March: "Mar",
//       April: "Apr",
//       May: "May",
//       June: "Jun",
//       July: "Jul",
//       August: "Aug",
//       September: "Sep",
//       October: "Oct",
//       November: "Nov",
//       December: "Dec",
//     };

//     data.forEach((order) => {
//       const year = order.Year_Separated;
//       const month = order.Month_Separated;
//       const monthYear = `${monthMapping[month]} ${year}`;

//       if (!profitData[monthYear]) {
//         profitData[monthYear] = 0;
//         salesData[monthYear] = 0;
//       }
//       profitData[monthYear] += order.Profit;
//       salesData[monthYear] += order.Sales;
//     });

//     const sortedLabels = Object.keys(profitData).sort((a, b) => {
//       const [monthA, yearA] = a.split(" ");
//       const [monthB, yearB] = b.split(" ");
//       return (
//         new Date(`${monthA} 01, ${yearA}`) - new Date(`${monthB} 01, ${yearB}`)
//       );
//     });

//     const totalProfit = sortedLabels.map((label) => profitData[label]);
//     const totalSales = sortedLabels.map((label) => salesData[label]);

//     const updateSalesAndProfit = (selectedYear, selectedRegion) => {
//       let filteredData = data;

//       // Filter by year
//       if (selectedYear !== "All Year") {
//         filteredData = filteredData.filter(
//           (item) => item.Year_Separated === selectedYear
//         );
//       }

//       // Filter by region
//       if (selectedRegion !== "All Regions") {
//         filteredData = filteredData.filter(
//           (item) => item.Region === selectedRegion
//         );
//       }

//       // Calculate total profit and total sales for filtered data
//       const totalProfitValue = filteredData.reduce(
//         (sum, item) => sum + parseFloat(item.Profit),
//         0
//       );
//       const totalSalesValue = filteredData.reduce(
//         (sum, item) => sum + parseFloat(item.Sales),
//         0
//       );

//       // Update total profit and total sales in the document
//       document.getElementById("totalProfit").textContent =
//         "$" + totalProfitValue.toLocaleString("en-US");
//       document.getElementById("totalSales").textContent =
//         "$" + totalSalesValue.toLocaleString("en-US");
//     };

//     const yearFilter = document.getElementById("yearFilter");
//     const regionFilter = document.getElementById("regionFilter");

//     // Add event listeners to both filters
//     yearFilter.addEventListener("change", function () {
//       const selectedYear = this.value;
//       const selectedRegion = regionFilter.value;
//       updateSalesAndProfit(selectedYear, selectedRegion);
//     });

//     regionFilter.addEventListener("change", function () {
//       const selectedYear = yearFilter.value;
//       const selectedRegion = this.value;
//       updateSalesAndProfit(selectedYear, selectedRegion);
//     });

//     // initial call to updateSalesAndProfit with default values
//     updateSalesAndProfit("All Year", "All Regions");

//     const filteredLabels = sortedLabels.filter(
//       (label) =>
//         label.startsWith("Jan") ||
//         label.startsWith("Mar") ||
//         label.startsWith("Jul") ||
//         label.startsWith("Oct")
//     );

//     const averageProfit =
//       totalProfit.reduce((a, b) => a + b, 0) / totalProfit.length;
//     const averageSales =
//       totalSales.reduce((a, b) => a + b, 0) / totalSales.length;

//     const ctx = document.getElementById("myChart").getContext("2d");
//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: sortedLabels,
//         datasets: [
//           {
//             label: "Total Profit",
//             data: totalProfit,
//             borderColor: "rgba(255, 159, 64, 1)",
//             backgroundColor: "rgba(255, 159, 64, 0.2)",
//             fill: false,
//           },
//           {
//             label: "Total Sales",
//             data: totalSales,
//             borderColor: "rgba(75, 192, 192, 1)",
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             fill: false,
//           },
//           {
//             label: "Average Profit",
//             data: new Array(sortedLabels.length).fill(averageProfit),
//             borderColor: "rgba(255, 159, 64, 0.5)",
//             borderWidth: 2,
//             borderDash: [5, 5],
//             pointRadius: 0,
//           },
//           {
//             label: "Average Sales",
//             data: new Array(sortedLabels.length).fill(averageSales),
//             borderColor: "rgba(75, 192, 192, 0.5)",
//             borderWidth: 2,
//             borderDash: [5, 5],
//             pointRadius: 0,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           title: {
//             display: true,
//             text: "Profit and Sales",
//           },
//           tooltip: {
//             callbacks: {
//               label: function (tooltipItem) {
//                 return `${
//                   tooltipItem.dataset.label
//                 }: ${tooltipItem.raw.toLocaleString()}`;
//               },
//             },
//           },
//         },
//         scales: {
//           x: {
//             title: {
//               display: true,
//             },
//             // ticks: {
//             //   callback: function (value, index, ticks) {
//             //     if (filteredLabels.includes(this.getLabelForValue(value))) {
//             //       return this.getLabelForValue(value);
//             //     } else {
//             //       return "";
//             //     }
//             //   },
//             // },
//           },
//           y: {
//             title: {
//               display: true,
//               text: "Amount",
//             },
//             ticks: {
//               callback: function (value) {
//                 return `${value / 1000000} jt`; // Convert to 'jt'
//               },
//             },
//           },
//         },
//       },
//     });
//   })
//   .catch((error) => console.error("Error fetching data:", error));

fetch("data/SUPERSTORE-TEAM15.json")
  .then((response) => response.json())
  .then((data) => {
    const profitData = {};
    const salesData = {};
    const monthMapping = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };

    data.forEach((order) => {
      const year = order.Year_Separated;
      const month = order.Month_Separated;
      const monthYear = `${monthMapping[month]} ${year}`;

      if (!profitData[monthYear]) {
        profitData[monthYear] = 0;
        salesData[monthYear] = 0;
      }
      profitData[monthYear] += order.Profit;
      salesData[monthYear] += order.Sales;
    });

    const sortedLabels = Object.keys(profitData).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      return (
        new Date(`${monthA} 01, ${yearA}`) - new Date(`${monthB} 01, ${yearB}`)
      );
    });

    const totalProfit = sortedLabels.map((label) => profitData[label]);
    const totalSales = sortedLabels.map((label) => salesData[label]);

    const filteredLabels = sortedLabels.filter(
      (label) =>
        label.startsWith("Jan") ||
        label.startsWith("Mar") ||
        label.startsWith("Jul") ||
        label.startsWith("Oct")
    );

    const averageProfit =
      totalProfit.reduce((a, b) => a + b, 0) / totalProfit.length;
    const averageSales =
      totalSales.reduce((a, b) => a + b, 0) / totalSales.length;

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: "Total Profit",
            data: totalProfit,
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            fill: false,
          },
          {
            label: "Total Sales",
            data: totalSales,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
          },
          {
            label: "Average Profit",
            data: new Array(sortedLabels.length).fill(averageProfit),
            borderColor: "rgba(255, 159, 64, 0.5)",
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
          },
          {
            label: "Average Sales",
            data: new Array(sortedLabels.length).fill(averageSales),
            borderColor: "rgba(75, 192, 192, 0.5)",
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Profit and Sales",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${
                  tooltipItem.dataset.label
                }: ${tooltipItem.raw.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
            },
            // ticks: {
            //   callback: function (value, index, ticks) {
            //     if (filteredLabels.includes(this.getLabelForValue(value))) {
            //       return this.getLabelForValue(value);
            //     } else {
            //       return "";
            //     }
            //   },
            // },
          },
          y: {
            title: {
              display: true,
              text: "Amount",
            },
            ticks: {
              callback: function (value) {
                return `${value / 1000000} jt`; // Convert to 'jt'
              },
            },
          },
        },
      },
    });

    const updateSalesAndProfit = (selectedYear, selectedRegion) => {
      let filteredData = data;

      // Filter by year
      if (selectedYear !== "All Year") {
        filteredData = filteredData.filter(
          (item) => item.Year_Separated === selectedYear
        );
      }

      // Filter by region
      if (selectedRegion !== "All Regions") {
        filteredData = filteredData.filter(
          (item) => item.Region === selectedRegion
        );
      }

      // Calculate total profit and total sales for filtered data
      const totalProfitValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.Profit),
        0
      );
      const totalSalesValue = filteredData.reduce(
        (sum, item) => sum + parseFloat(item.Sales),
        0
      );

      // Update total profit and total sales in the document
      document.getElementById("totalProfit").textContent =
        "$" + totalProfitValue.toLocaleString("en-US");
      document.getElementById("totalSales").textContent =
        "$" + totalSalesValue.toLocaleString("en-US");

      // Update the chart data
      const filteredProfitData = {};
      const filteredSalesData = {};

      filteredData.forEach((order) => {
        const year = order.Year_Separated;
        const month = order.Month_Separated;
        const monthYear = `${monthMapping[month]} ${year}`;

        if (!filteredProfitData[monthYear]) {
          filteredProfitData[monthYear] = 0;
          filteredSalesData[monthYear] = 0;
        }
        filteredProfitData[monthYear] += order.Profit;
        filteredSalesData[monthYear] += order.Sales;
      });

      const filteredSortedLabels = Object.keys(filteredProfitData).sort(
        (a, b) => {
          const [monthA, yearA] = a.split(" ");
          const [monthB, yearB] = b.split(" ");
          return (
            new Date(`${monthA} 01, ${yearA}`) -
            new Date(`${monthB} 01, ${yearB}`)
          );
        }
      );

      const filteredTotalProfit = filteredSortedLabels.map(
        (label) => filteredProfitData[label]
      );
      const filteredTotalSales = filteredSortedLabels.map(
        (label) => filteredSalesData[label]
      );

      myChart.data.labels = filteredSortedLabels;
      myChart.data.datasets[0].data = filteredTotalProfit;
      myChart.data.datasets[1].data = filteredTotalSales;
      myChart.data.datasets[2].data = new Array(
        filteredSortedLabels.length
      ).fill(
        filteredTotalProfit.reduce((a, b) => a + b, 0) /
          filteredTotalProfit.length
      );
      myChart.data.datasets[3].data = new Array(
        filteredSortedLabels.length
      ).fill(
        filteredTotalSales.reduce((a, b) => a + b, 0) /
          filteredTotalSales.length
      );

      myChart.update();
    };

    const yearFilter = document.getElementById("yearFilter");
    const regionFilter = document.getElementById("regionFilter");

    // Add event listeners to both filters
    yearFilter.addEventListener("change", function () {
      const selectedYear = this.value;
      const selectedRegion = regionFilter.value;
      updateSalesAndProfit(selectedYear, selectedRegion);
    });

    regionFilter.addEventListener("change", function () {
      const selectedYear = yearFilter.value;
      const selectedRegion = this.value;
      updateSalesAndProfit(selectedYear, selectedRegion);
    });

    // initial call to updateSalesAndProfit with default values
    updateSalesAndProfit("All Year", "All Regions");
  })
  .catch((error) => console.error("Error fetching data:", error));
