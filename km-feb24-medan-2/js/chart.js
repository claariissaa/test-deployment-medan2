// Lakukan pengambilan data vending machine dan proses grafik
fetch("../json/vending-machine.json")
  .then((response) => response.json())
  .then((data) => {
    // Grafik 2: Jumlah produk per mesin
    const ctx2 = document.getElementById("myChart2").getContext("2d");
    const productCounts = {};
    data.forEach((item) => {
      const machineID = item.Machine;
      productCounts[machineID] = (productCounts[machineID] || 0) + 1;
    });
    const productLabels = Object.keys(productCounts);
    const productCountsValues = Object.values(productCounts);
    const chart2 = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: productLabels,
        datasets: [
          {
            label: "Products per Machine",
            data: productCountsValues,
            backgroundColor: "rgba(255, 193, 7, 0.5)",
            borderColor: "rgba(255, 193, 7, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Products per Machine",
            font: {
              size: 18,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });

    // Grafik 3: Jumlah produk per kategori
    const ctx3 = document.getElementById("myChart3").getContext("2d");
    const categoryCounts = {};
    data.forEach((item) => {
      const category = item.Category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    const categoryLabels = Object.keys(categoryCounts);
    const categoryCountsValues = Object.values(categoryCounts);
    const chart3 = new Chart(ctx3, {
      type: "bar",
      data: {
        labels: categoryLabels,
        datasets: [
          {
            label: "Products per Category",
            data: categoryCountsValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              // "rgba(54, 162, 235, 0.5)",
              // "rgba(255, 206, 86, 0.5)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Products per Category",
            font: {
              size: 18,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });

    // Tabel: Performa penjualan produk per mesin dan per kategori serta total keseluruhan
    const salesTableContainer = document.getElementById("salesTable");
    const salesPerformance = {};
    let totalSales = 0;
    data.forEach((item) => {
      const machine = item.Machine;
      const category = item.Category;
      const sales = parseFloat(item.LineTotal);
      totalSales += sales;
      salesPerformance[machine] = salesPerformance[machine] || {};
      salesPerformance[machine][category] =
        (salesPerformance[machine][category] || 0) + sales;
    });
    let salesTableHTML = `<h2 style="font-size: 18px; text-align: center;">Product Sales Performance by Category</h2><table><tr><th>Machine</th><th>Category</th><th>Total Sales</th></tr>`;
    Object.entries(salesPerformance).forEach(([machine, categories]) => {
      Object.entries(categories).forEach(([category, sales]) => {
        salesTableHTML += `<tr><td>${machine}</td><td>${category}</td><td>${sales.toFixed(
          2
        )}</td></tr>`;
      });
    });
    salesTableHTML += `<tr><td colspan="2"><strong>Total Overall Sales</strong></td><td><strong>${totalSales.toFixed(
      2
    )}</strong></td></tr></table>`;
    salesTableContainer.innerHTML = salesTableHTML;

    // Grafik 4: Jumlah produk per lokasi
    const productsPerLocation = {};
    data.forEach((item) => {
      const location = item.Location;
      productsPerLocation[location] = new Set(productsPerLocation[location]);
      productsPerLocation[location].add(item.Product);
    });
    
    const locationLabels = Object.keys(productsPerLocation);
    const productsCountPerLocation = Object.values(productsPerLocation).map((set) => set.size);
    
    const ctx4 = document.getElementById("myChart4").getContext("2d");
    const chart4 = new Chart(ctx4, {
      type: "bar",
      data: {
        labels: locationLabels,
        datasets: [
          {
            label: "Number of Distinct Products per Location",
            data: productsCountPerLocation,
            backgroundColor: "rgba(144, 238, 144, 0.5)",
            borderColor: "rgba(144, 238, 144, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Number of Distinct Products per Location",
            font: {
              size: 18,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
    

    // Grafik 5: Rata-rata transTotal per lokasi
    const ctx5 = document.getElementById("myChart5").getContext("2d");
    const averageTransTotalPerLocation = {};
    const locationCount = {};
    data.forEach((item) => {
      const location = item.Location;
      const transTotal = parseFloat(item.TransTotal);
      averageTransTotalPerLocation[location] =
        (averageTransTotalPerLocation[location] || 0) + transTotal;
      locationCount[location] = (locationCount[location] || 0) + 1;
    });
    Object.keys(averageTransTotalPerLocation).forEach((location) => {
      averageTransTotalPerLocation[location] /= locationCount[location];
    });
    const locationLabels5 = Object.keys(averageTransTotalPerLocation);
    const averageTransTotalValues = Object.values(averageTransTotalPerLocation);
    const chart5 = new Chart(ctx5, {
      type: "bar",
      data: {
        labels: locationLabels5,
        datasets: [
          {
            label: "Average TransTotal per Location",
            data: averageTransTotalValues,
            backgroundColor: "rgba(230, 230, 250, 0.5)",
            borderColor: "rgba(230, 230, 250, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Average TransTotal per Location",
            font: {
              size: 18,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            precision: 0
          }
        }
      }
    });
    

    const salesTrendData = {};

    // Proses pengumpulan data sales trend
    data.forEach((item) => {
      const date = new Date(item.Prcd_Date);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const category = item.Category;
      const price = parseFloat(item.MPrice);
      const monthYear = `${month} ${year}`;

      if (!salesTrendData[category]) {
        salesTrendData[category] = {};
      }

      if (!salesTrendData[category][monthYear]) {
        salesTrendData[category][monthYear] = [];
      }

      salesTrendData[category][monthYear].push(price);
    });

    // Membuat list bulan dan tahun dalam urutan yang benar
    const monthsInOrder = [];
    for (let year = 2022; year <= 2023; year++) {
      for (let month = 0; month < 12; month++) {
        const monthName = new Date(year, month).toLocaleString("default", {
          month: "long"
        });
        monthsInOrder.push(`${monthName} ${year}`);
        // Memeriksa apakah sudah mencapai Januari 2023
        if (year === 2023 && month === 0) {
          break; // Keluar dari loop jika sudah mencapai Januari 2023
        }
      }
    }

    // Menghitung rata-rata harga produk per kategori per bulan
    const salesTrendLabels = Object.keys(salesTrendData);
    const salesTrendValues = {};
    salesTrendLabels.forEach((category) => {
      salesTrendValues[category] = [];
      monthsInOrder.forEach((monthYear) => {
        const prices = salesTrendData[category][monthYear] || [];
        const sum = prices.reduce((total, price) => total + price, 0);
        const averagePrice = prices.length ? sum / prices.length : 0;
        salesTrendValues[category].push(averagePrice);
      });
    });

    // Membuat grafik sales trend per kategori dengan tipe "line"
    const ctx6 = document.getElementById("myChart6").getContext("2d");
    const chart6 = new Chart(ctx6, {
      type: "line",
      data: {
        labels: monthsInOrder,
        datasets: Object.keys(salesTrendData).map((category, index) => ({
          label: category,
          data: salesTrendValues[category],
          fill: "origin",
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(0, 191, 255, 0.2)"
          ][index % 3],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(0, 191, 255, 1)"
          ][index % 3],
          borderWidth: 2
        }))
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sales Trend",
            font: {
              size: 18,
              weight: "bold"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            precision: 2
          }
        }
      }
    });

    // Lakukan pengambilan data vending machine dan proses grafik
    fetch("../json/vending-machine.json")
      .then((response) => response.json())
      .then((data) => {
        // Mengumpulkan data transaksi per bulan dari Januari 2022 hingga Januari 2023
        const transactionDataPerMonth = {};
        for (let year = 2022; year <= 2023; year++) {
          const endMonth = year === 2023 ? 1 : 12; // Jika tahun 2023, berhenti di Januari
          for (let month = 0; month < endMonth; month++) {
            const date = new Date(year, month, 1);
            const monthName = date.toLocaleString("default", { month: "long" });
            const formattedMonth = `${monthName} ${year}`;
            // Inisialisasi jumlah transaksi untuk setiap bulan
            transactionDataPerMonth[formattedMonth] = 0;
          }
        }

        // Mengisi data transaksi yang sebenarnya
        data.forEach((item) => {
          const date = new Date(item.TransDate);
          const month = date.toLocaleString("default", { month: "long" });
          const year = date.getFullYear();
          // Mengecek apakah bulan dan tahun sesuai dengan rentang yang diinginkan
          if (year === 2022 || (year === 2023 && date.getMonth() === 0)) {
            const formattedMonth = `${month} ${year}`;
            // Meningkatkan jumlah transaksi untuk bulan yang sesuai
            transactionDataPerMonth[formattedMonth]++;
          }
        });

        // Memisahkan label bulan dan jumlah transaksi
        const labels = Object.keys(transactionDataPerMonth);
        const values = Object.values(transactionDataPerMonth);

        // Mendapatkan konteks dari elemen canvas pada HTML
        const ctx = document.getElementById("myChart7").getContext("2d");

        // Membuat grafik garis
        const transactionPerformanceChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Transaction Count Per Month",
                data: values,
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Transaction Count Per Month", // Judul grafik
                font: {
                  size: 18,
                  weight: "bold"
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month" // sumbu x
                }
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: "Number of Transactions" // sumbu y
                }
              }
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

// Filter

// Scorecard
