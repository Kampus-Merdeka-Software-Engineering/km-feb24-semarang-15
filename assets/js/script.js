// Buka dan baca file JSON
fetch("dataset-superstore.json")
  .then((response) => response.json())
  .then((data) => {
    // Ambil nilai yang Anda butuhkan dari file JSON
    const salesValue = data[0].Sales; // Mengambil nilai Sales dari data pertama
    const profitValue = data[1].Profit; // Mengambil nilai Profit dari data kedua

    // Perbarui nilai tag <p> dengan nilai yang diperoleh
    document.getElementById("salesValue").innerText = salesValue;
    document.getElementById("profitValue").innerText = profitValue;
    document.getElementById("salesValue_1").innerText = salesValue;
    document.getElementById("profitValue_2").innerText = profitValue;
  })
  .catch((error) => console.error("Error reading JSON:", error));
