document.addEventListener("DOMContentLoaded", (event) => {
  let chart; // To hold the chart instance

  const fetchData = () => {
    return fetch("data/dataset-superstore.json")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching the dataset:", error);
        return [];
      });
  };

  const updateChart = (data, year) => {
    let filteredData;
    if (year === "All Year") {
      filteredData = data;
    } else {
      filteredData = data.filter((item) => item.Year_Separated === year);
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
          },
          {
            label: "Profit",
            data: profits,
            backgroundColor: "rgba(251, 184, 54, 98)",
            // borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  fetchData().then((data) => {
    const yearFilter = document.getElementById("yearFilter");

    yearFilter.addEventListener("change", () => {
      const selectedYear = yearFilter.value;
      updateChart(data, selectedYear);
    });

    // Initialize chart with all years (All Year)
    updateChart(data, "All Year");
  });
});
