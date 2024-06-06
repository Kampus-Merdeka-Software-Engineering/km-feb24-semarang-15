// google.charts.load("current", {
//   packages: ["geochart"],
//   mapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Ganti dengan API key Google Maps Anda
// });

// google.charts.setOnLoadCallback(fetchDataAndDrawChart);

// let chartData = []; // Global variable to hold fetched data

// function fetchDataAndDrawChart() {
//   fetch("data/SUPERSTORE-TEAM15.json")
//     .then((response) => response.json())
//     .then((data) => {
//       chartData = data;
//       drawSalesRegionsMap(chartData);
//       drawProfitRegionsMap(chartData);
//     })
//     .catch((error) => console.error("Error fetching the data:", error));
// }

// // function untuk chart geo map sales per state
// function drawSalesRegionsMap(data) {
//   const yearFilter = document.getElementById("yearFilter").value;
//   const regionFilter = document.getElementById("regionFilter").value;

//   let filteredData = data;

//   if (yearFilter && yearFilter !== "All Year") {
//     filteredData = filteredData.filter(
//       (item) => item.Year_Separated === yearFilter
//     );
//   }

//   if (regionFilter && regionFilter !== "All Regions") {
//     filteredData = filteredData.filter((item) => item.Region === regionFilter);
//   }

//   const salesData = filteredData.reduce((acc, item) => {
//     if (acc[item.State]) {
//       acc[item.State] += parseFloat(item.Sales);
//     } else {
//       acc[item.State] = parseFloat(item.Sales);
//     }
//     return acc;
//   }, {});

//   const dataArray = [["State", "Total Sales"]];
//   for (const state in salesData) {
//     dataArray.push([state, salesData[state]]);
//   }

//   const dataTable = google.visualization.arrayToDataTable(dataArray);

//   const options = {
//     region: "US",
//     displayMode: "regions",
//     resolution: "provinces",
//     colorAxis: { colors: ["#ffecb3", "#ffc107", "#ff8f00"] },
//   };

//   const chart = new google.visualization.GeoChart(
//     document.getElementById("regions_sales_div")
//   );
//   chart.draw(dataTable, options);
// }

// // function untuk chart geo map profit per state
// function drawProfitRegionsMap(data) {
//   const yearFilter = document.getElementById("yearFilter").value;
//   const regionFilter = document.getElementById("regionFilter").value;

//   let filteredData = data;

//   if (yearFilter && yearFilter !== "All Year") {
//     filteredData = filteredData.filter(
//       (item) => item.Year_Separated === yearFilter
//     );
//   }

//   if (regionFilter && regionFilter !== "All Regions") {
//     filteredData = filteredData.filter((item) => item.Region === regionFilter);
//   }

//   const profitData = filteredData.reduce((acc, item) => {
//     if (acc[item.State]) {
//       acc[item.State] += parseFloat(item.Profit);
//     } else {
//       acc[item.State] = parseFloat(item.Profit);
//     }
//     return acc;
//   }, {});

//   const dataArray = [["State", "Total Profit"]];
//   for (const state in profitData) {
//     dataArray.push([state, profitData[state]]);
//   }

//   const dataTable = google.visualization.arrayToDataTable(dataArray);

//   const options = {
//     region: "US",
//     displayMode: "regions",
//     resolution: "provinces",
//     colorAxis: { colors: ["#f0f4c3", "#cddc39", "#827717"] },
//   };

//   const chart = new google.visualization.GeoChart(
//     document.getElementById("regions_profit_div")
//   );
//   chart.draw(dataTable, options);
// }

// document.getElementById("yearFilter").addEventListener("change", () => {
//   drawSalesRegionsMap(chartData);
//   drawProfitRegionsMap(chartData);
// });
// document.getElementById("regionFilter").addEventListener("change", () => {
//   drawSalesRegionsMap(chartData);
//   drawProfitRegionsMap(chartData);
// });

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Ganti dengan API key Google Maps Anda
});

google.charts.setOnLoadCallback(fetchDataAndDrawChart);

let chartData = []; // Global variable to hold fetched data

function fetchDataAndDrawChart() {
  fetch("data/SUPERSTORE-TEAM15.json")
    .then((response) => response.json())
    .then((data) => {
      chartData = data;
      updateTotalsAndCharts();
    })
    .catch((error) => console.error("Error fetching the data:", error));
}

function updateTotalsAndCharts() {
  const yearFilter = document.getElementById("yearFilter").value;
  const regionFilter = document.getElementById("regionFilter").value;

  let filteredData = chartData;

  if (yearFilter && yearFilter !== "All Year") {
    filteredData = filteredData.filter(
      (item) => item.Year_Separated === yearFilter
    );
  }

  if (regionFilter && regionFilter !== "All Regions") {
    filteredData = filteredData.filter((item) => item.Region === regionFilter);
  }

  const totalSales = filteredData.reduce(
    (sum, item) => sum + parseFloat(item.Sales),
    0
  );
  const totalProfit = filteredData.reduce(
    (sum, item) => sum + parseFloat(item.Profit),
    0
  );

  document.getElementById(
    "totalSales"
  ).innerText = `$${totalSales.toLocaleString("en-US")}`;
  document.getElementById(
    "totalProfit"
  ).innerText = `$${totalProfit.toLocaleString("en-US")}`;

  drawSalesRegionsMap(filteredData);
  drawProfitRegionsMap(filteredData);
}

// function untuk chart geo map sales per state
function drawSalesRegionsMap(data) {
  const salesData = data.reduce((acc, item) => {
    if (acc[item.State]) {
      acc[item.State] += parseFloat(item.Sales);
    } else {
      acc[item.State] = parseFloat(item.Sales);
    }
    return acc;
  }, {});

  const dataArray = [["State", "Total Sales"]];
  for (const state in salesData) {
    dataArray.push([state, salesData[state]]);
  }

  const dataTable = google.visualization.arrayToDataTable(dataArray);

  const options = {
    region: "US",
    displayMode: "regions",
    resolution: "provinces",
    colorAxis: { colors: ["#ffecb3", "#ffc107", "#ff8f00"] },
  };

  const chart = new google.visualization.GeoChart(
    document.getElementById("regions_sales_div")
  );
  chart.draw(dataTable, options);

  // Make the chart responsive
  window.addEventListener("resize", () => {
    chart.draw(dataTable, options);
  });
}

// function untuk chart geo map profit per state
function drawProfitRegionsMap(data) {
  const profitData = data.reduce((acc, item) => {
    if (acc[item.State]) {
      acc[item.State] += parseFloat(item.Profit);
    } else {
      acc[item.State] = parseFloat(item.Profit);
    }
    return acc;
  }, {});

  const dataArray = [["State", "Total Profit"]];
  for (const state in profitData) {
    dataArray.push([state, profitData[state]]);
  }

  const dataTable = google.visualization.arrayToDataTable(dataArray);

  const options = {
    region: "US",
    displayMode: "regions",
    resolution: "provinces",
    colorAxis: { colors: ["#f0f4c3", "#cddc39", "#827717"] },
  };

  const chart = new google.visualization.GeoChart(
    document.getElementById("regions_profit_div")
  );
  chart.draw(dataTable, options);

  // Make the chart responsive
  window.addEventListener("resize", () => {
    chart.draw(dataTable, options);
  });
}

document
  .getElementById("yearFilter")
  .addEventListener("change", updateTotalsAndCharts);
document
  .getElementById("regionFilter")
  .addEventListener("change", updateTotalsAndCharts);
