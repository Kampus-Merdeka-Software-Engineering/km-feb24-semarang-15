document.addEventListener("DOMContentLoaded", (event) => {
  let data = []; // Global variable to hold fetched data

  function fetchDataAndInitialize() {
    fetch("data/SUPERSTORE-TEAM15.json")
      .then((response) => response.json())
      .then((fetchedData) => {
        data = fetchedData;
        updateTableAndCards();
      })
      .catch((error) => console.error("Error fetching the data:", error));
  }

  function updateTableAndCards() {
    const yearFilter = document.getElementById("yearFilter").value;
    const regionFilter = document.getElementById("regionFilter").value;

    let filteredData = data;

    if (yearFilter && yearFilter !== "All Year") {
      filteredData = filteredData.filter(
        (item) => item.Year_Separated === yearFilter
      );
    }

    if (regionFilter && regionFilter !== "All Regions") {
      filteredData = filteredData.filter(
        (item) => item.Region === regionFilter
      );
    }

    const groupedData = filteredData.reduce((acc, item) => {
      const key = `${item.Category}-${item.Region}`;
      if (!acc[key]) {
        acc[key] = {
          Region: item.Region,
          Category: item.Category,
          Sales: 0,
          Profit: 0,
        };
      }
      acc[key].Sales += parseFloat(item.Sales);
      acc[key].Profit += parseFloat(item.Profit);
      return acc;
    }, {});

    const tableData = Object.values(groupedData);
    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";

    tableData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td class="region">${item.Region}</td>
              <td class="category">${item.Category}</td>
              <td class="sales">${item.Sales.toLocaleString("en-US")}</td>
              <td class="profit">${item.Profit.toLocaleString("en-US")}</td>
          `;
      tableBody.appendChild(row);
    });

    const totalSales = tableData.reduce((sum, item) => sum + item.Sales, 0);
    const totalProfit = tableData.reduce((sum, item) => sum + item.Profit, 0);

    document.getElementById(
      "totalSales"
    ).innerText = `$${totalSales.toLocaleString("en-US")}`;
    document.getElementById(
      "totalProfit"
    ).innerText = `$${totalProfit.toLocaleString("en-US")}`;

    $("#product-table").DataTable();

    // if (dataTable) {
    //   dataTable.destroy();
    // }

    // dataTable = $("#product-table").DataTable({
    //   responsive: true,
    //   destroy: true,
    // });
  }

  document
    .getElementById("yearFilter")
    .addEventListener("change", updateTableAndCards);
  document
    .getElementById("regionFilter")
    .addEventListener("change", updateTableAndCards);

  fetchDataAndInitialize();
});

// document.addEventListener("DOMContentLoaded", (event) => {
//   let data = []; // Global variable to hold fetched data
//   let dataTable;

//   function fetchDataAndInitialize() {
//     fetch("data/SUPERSTORE-TEAM15.json")
//       .then((response) => response.json())
//       .then((fetchedData) => {
//         data = fetchedData;
//         updateTableAndCards();
//       })
//       .catch((error) => console.error("Error fetching the data:", error));
//   }

//   function updateTableAndCards() {
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

//     const groupedData = filteredData.reduce((acc, item) => {
//       const key = `${item.Category}-${item.Region}`;
//       if (!acc[key]) {
//         acc[key] = {
//           Region: item.Region,
//           Category: item.Category,
//           Sales: 0,
//           Profit: 0,
//         };
//       }
//       acc[key].Sales += parseFloat(item.Sales);
//       acc[key].Profit += parseFloat(item.Profit);
//       return acc;
//     }, {});

//     const tableData = Object.values(groupedData);
//     const tableBody = document.getElementById("product-table-body");
//     tableBody.innerHTML = "";

//     tableData.forEach((item) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td class="region">${item.Region}</td>
//         <td class="category">${item.Category}</td>
//         <td class="sales">${item.Sales.toLocaleString("en-US")}</td>
//         <td class="profit">${item.Profit.toLocaleString("en-US")}</td>
//       `;
//       tableBody.appendChild(row);
//     });

//     const totalSales = tableData.reduce((sum, item) => sum + item.Sales, 0);
//     const totalProfit = tableData.reduce((sum, item) => sum + item.Profit, 0);

//     document.getElementById(
//       "totalSales"
//     ).innerText = `$${totalSales.toLocaleString("en-US")}`;
//     document.getElementById(
//       "totalProfit"
//     ).innerText = `$${totalProfit.toLocaleString("en-US")}`;

//     if (dataTable) {
//       dataTable.destroy();
//     }

//     dataTable = $("#product-table").DataTable({
//       responsive: true,
//       destroy: true,
//     });
//   }

//   document
//     .getElementById("yearFilter")
//     .addEventListener("change", updateTableAndCards);
//   document
//     .getElementById("regionFilter")
//     .addEventListener("change", updateTableAndCards);

//   fetchDataAndInitialize();
// });
