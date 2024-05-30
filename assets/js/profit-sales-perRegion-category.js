// document.addEventListener("DOMContentLoaded", () => {
//   fetch("data/SUPERSTORE-TEAM15.json")
//     .then((res) => res.json())
//     .then((data) => {
//       let tableBody = document.getElementById("product-table-body");

//       data.forEach(function (item) {
//         let row = document.createElement("tr");

//         row.innerHTML = `
//             <tr>
//             <td>${item.Region}</td>
//             <td>${item.Category}</td>
//             <td>${item.Sales}</td>
//             <td>${item.Profit}</td>
//             </tr>
//             `;

//         tableBody.appendChild(row);
//       });

//       $("#product-table").DataTable();
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/SUPERSTORE-TEAM15.json")
    .then((res) => res.json())
    .then((data) => {
      let tableBody = document.getElementById("product-table-body");
      let regionCategoryMap = {};

      data.forEach(function (item) {
        let region = item.Region;
        let category = item.Category;

        if (!regionCategoryMap[region]) {
          regionCategoryMap[region] = {};
        }

        if (!regionCategoryMap[region][category]) {
          regionCategoryMap[region][category] = {
            Sales: 0,
            Profit: 0,
          };
        }

        regionCategoryMap[region][category].Sales += parseFloat(item.Sales);
        regionCategoryMap[region][category].Profit += parseFloat(item.Profit);
      });

      for (let region in regionCategoryMap) {
        for (let category in regionCategoryMap[region]) {
          let row = document.createElement("tr");

          row.innerHTML = `
                <td>${region}</td>
                <td>${category}</td>
                <td>${regionCategoryMap[region][
                  category
                ].Sales.toLocaleString()}</td>
                <td>${regionCategoryMap[region][
                  category
                ].Profit.toLocaleString()}</td>
                `;

          tableBody.appendChild(row);
        }
      }

      $("#product-table").DataTable();
    });
});
