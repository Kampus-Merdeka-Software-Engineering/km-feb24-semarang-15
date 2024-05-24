document.addEventListener("DOMContentLoaded", (event) => {
  let chart;

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
    // if (year === "All Year") {
    //   filteredData = data;
    // } else {
    //   filteredData = data.filter((item) => item.Year_Separated === year);
    // }

    // console.log(`Filtered data for year ${year}:`, filteredData);

    const segments = [];
    const sales = [];

    filteredData.forEach((item) => {
      if (!segments.includes(item.Segment)) {
        segments.push(item.Segment);
      }
    });

    segments.forEach((segment) => {
      const segmentSales = filteredData
        .filter((item) => item.Segment === segment)
        .reduce((sum, item) => sum + parseFloat(item.Sales), 0);
      console.log(segmentSales);
      sales.push(segmentSales);
    });

    console.log("Segments:", segments);
    console.log("Sales:", sales);

    const ctx = document.getElementById("myChart").getContext("2d");

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: segments,
        datasets: [
          {
            label:
              year === "All Year"
                ? "Sales by Segment (2014-2017)"
                : `Sales by Segment for ${year}`,
            data: sales,
            backgroundColor: [
              "rgba(127, 132, 83, 52)",
              "rgba(255, 192, 68,100)",
              "rgba(148, 183, 33, 72)",
            ],
          },
        ],
      },
    });
  };

  fetchData().then((data) => {
    console.log("Fetched data:", data);

    const yearFilter = document.getElementById("yearFilter");

    yearFilter.addEventListener("change", () => {
      const selectedYear = yearFilter.value;
      updateChart(data, selectedYear);
    });

    // Initialize chart with all years (2014-2017)
    updateChart(data, "All Year");
  });
});
