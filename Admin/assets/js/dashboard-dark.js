$(function () {
  'use strict'

  var colors = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#b8c3d9",
    cardBg: "#0c1427"
  }
  
  var colorArr = ["#6571ff","#7987a1","#05a34a","#66d1d1","#fbbc06","#ff3366","#e9ecef","#060c17","#7987a1","rgba(77, 138, 240, .15)","#b8c3d9","#0c1427"]
  var fontFamily = "'Roboto', Helvetica, sans-serif"

  //Call API : 
  const date = new Date()
  // calling a constructor, can use other methods to extract info from returned value

  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  let fullDate = `${month}-${day}-${year}`
  function ChartMess(date) {
    var revenueChartData = []
    var revenueChartCategories = []
    // Sử dụng biến date để xây dựng URL
    const apiUrl = `https://localhost:7251/api/DashBoard/GetCountMess?date=${date}`;
    //alert(`https://localhost:7251/api/DashBoard/GetCountMess?date=${date}`)

    // Sử dụng Fetch API để gửi yêu cầu GET đến URL đã xây dựng
    const data = fetch(apiUrl)
      .then(response => {
        // Xử lý phản hồi tương tự như trong ví dụ trước
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Xử lý dữ liệu nhận được
        revenueChartData = data.slice(0, 1440).map(item => item.messageCount);
        for (var i = 0; i < 24; i++) {
          revenueChartCategories.push(i)
        }
        console.log(revenueChartData);
        RenderMessageChart(revenueChartData, revenueChartCategories)
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
  }
 
  ChartMess('2023-11-05')

  //Hàm khi thay đổi date picker 
  $("#DatePicker").change(function() {
    const date = $("#DatePicker").val();
    ChartMess(date)
  });


  function DonutChart(apiUrl,id){
    var rentData = []
    var labels = []
    var rentColor = []
    const data = fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        for(var i = 0;i< data.length;i++){
          if(data[i].name == null){
            data[i].name = "Not choose"
          }
          rentData.push(data[i].userCount)
          labels.push(data[i].name)
          rentColor.push(colorArr[i])
        }
        //alert(rentData)
        RenderApexDonutChart(id, labels,rentData,rentColor)
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  $('#showChart').click(function () {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    const startDates = new Date($('#startDate').val());
    const endDates = new Date($('#endDate').val());
    if(startDate==''){
      alert('Please select a start date')
    }
    if(endDate==''){
      alert('Please select a end date')
    }else if(endDate<startDate){
      alert('End date must be greater than start date')
    }else if(endDates.getMonth() - startDates.getMonth()>=24){
      alert('Should be calculate in 2 years')
    }
    else{

      showChartMonthly(startDate,endDate)
      //alert(`https://localhost:7251/api/DashBoard/GetRegisDate?startDate=${startDate}&endDate=${endDate}`)
    }
  });
  showChartMonthly('2022-01-01','2023-01-01')
  function showChartMonthly(startDate,endDate) {
    var rentData = []
    var labels = []
    const data = fetch(`https://localhost:7251/api/DashBoard/GetRegisDate?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        for(var i = 0;i< data.length;i++){
          rentData.push(data[i].userCount)
          labels.push(data[i].time)
        }
        //alert(rentData)
        RenderMonthly(labels,rentData)
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  DonutChart("https://localhost:7251/api/DashBoard/GetSexOri",'SexOri')
  DonutChart("https://localhost:7251/api/DashBoard/GetFutureFamily",'FutureFamily')
  DonutChart("https://localhost:7251/api/DashBoard/GetVacxinCovid",'VacxinCovid')
  DonutChart("https://localhost:7251/api/DashBoard/GetPurposeDate",'PurposeDate')
  DonutChart("https://localhost:7251/api/DashBoard/GetGender",'Gender')
  DonutChart("https://localhost:7251/api/DashBoard/GetEducation",'Education')






  // Date Picker
  if ($('#dashboardDate').length) {
    flatpickr("#dashboardDate", {
      wrap: true,
      dateFormat: "d-M-Y",
      defaultDate: "today",
    });
  }
  // Date Picker - END
  // New Customers Chart
  if ($('#customersChart').length) {
    var options1 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
        name: '',
        data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
      }],
      xaxis: {
        type: 'datetime',
        categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: [colors.primary],
    };
    new ApexCharts(document.querySelector("#customersChart"), options1).render();
  }
  // New Customers Chart - END
  // Orders Chart
  if ($('#ordersChart').length) {
    var options2 = {
      chart: {
        type: "bar",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: "60%"
        }
      },
      colors: [colors.primary],
      series: [{
        name: '',
        data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63]
      }],
      xaxis: {
        type: 'datetime',
        categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
      },
    };
    new ApexCharts(document.querySelector("#ordersChart"), options2).render();
  }
  // Orders Chart - END
  // Growth Chart
  if ($('#growthChart').length) {
    var options3 = {
      chart: {
        type: "line",
        height: 60,
        sparkline: {
          enabled: !0
        }
      },
      series: [{
        name: '',
        data: [41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89]
      }],
      xaxis: {
        type: 'datetime',
        categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
      },
      stroke: {
        width: 2,
        curve: "smooth"
      },
      markers: {
        size: 0
      },
      colors: [colors.primary],
    };
    new ApexCharts(document.querySelector("#growthChart"), options3).render();
  }
  // Growth Chart - END
  // Revenue Chart
  function RenderMessageChart(MessageData, MessageDataCategory) {
    if ($('#revenueChart').length) {
      var lineChartOptions = {
        chart: {
          type: "line",
          height: '500',
          parentHeightOffset: 0,
          foreColor: colors.bodyColor,
          background: colors.cardBg,
          toolbar: {
            show: false
          },
        },
        theme: {
          mode: 'light'
        },
        tooltip: {
          theme: 'light'
        },
        colors: [colors.primary, colors.danger, colors.warning],
        grid: {
          padding: {
            bottom: -4,
          },

          xaxis: {
            lines: {
              show: true
            }
          }
        },
        series: [
          {
            name: "MessageData",
            data: MessageData
          },
        ],
        xaxis: {          
          title: {
            text: 'Đơn vị (Giờ)',
            style: {
              size: 9,
              color: colors.muted
            }
        },
          categories: MessageDataCategory,
          lines: {
            show: true
          },
          axisBorder: {
            color: colors.gridBorder,
          },
          axisTicks: {
            color: colors.gridBorder,
          },
          crosshairs: {
            stroke: {
              color: colors.secondary,
            },
          },
        },
        yaxis: {
          title: {
            text: 'Số lượng tin nhắn',
            style: {
              size: 9,
              color: colors.muted
            }
          },
          tickAmount: 4,
          tooltip: {
            enabled: true
          },
          crosshairs: {
            stroke: {
              color: colors.secondary,
            },
          },
        },
        markers: {
          size: 0,
        },
        stroke: {
          width: 2,
          curve: "straight",
        },
      };
      var apexLineChart = new ApexCharts(document.querySelector("#revenueChart"), lineChartOptions);
      apexLineChart.render();
    }
  }

  // Revenue Chart - END
  // Revenue Chart - RTL
  if ($('#revenueChartRTL').length) {
    var lineChartOptions = {
      chart: {
        type: "line",
        height: '400',
        parentHeightOffset: 0,
        foreColor: colors.bodyColor,
        background: colors.cardBg,
        toolbar: {
          show: false
        },
      },
      theme: {
        mode: 'light'
      },
      tooltip: {
        theme: 'light'
      },
      colors: [colors.primary, colors.danger, colors.warning],
      grid: {
        padding: {
          bottom: -4,
        },
        borderColor: colors.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      series: [
        {
          name: "Revenue",
          data: revenueChartData
        },
      ],
      xaxis: {
        type: "datetime",
        categories: revenueChartCategories,
        lines: {
          show: true
        },
        axisBorder: {
          color: colors.gridBorder,
        },
        axisTicks: {
          color: colors.gridBorder,
        },
        crosshairs: {
          stroke: {
            color: colors.secondary,
          },
        },
      },
      yaxis: {
        opposite: true,
        title: {
          text: 'Số lượng tin nhắn',
          offsetX: -135,
          style: {
            size: 9,
            color: colors.muted
          }
        },
        labels: {
          align: 'left',
          offsetX: -20,
        },
        tickAmount: 4,
        tooltip: {
          enabled: true
        },
        crosshairs: {
          stroke: {
            color: colors.secondary,
          },
        },
      },
      markers: {
        size: 0,
      },
      stroke: {
        width: 2,
        curve: "straight",
      },
    };
    var apexLineChart = new ApexCharts(document.querySelector("#revenueChartRTL"), lineChartOptions);
    apexLineChart.render();
  }
  // Revenue Chart - RTL - END
  // Monthly Sales Chart
  function RenderMonthly(label,data){
    if ($('#monthlySalesChart').length) {
      var options = {
        chart: {
          type: 'bar',
          height: '318',
          parentHeightOffset: 0,
          foreColor: colors.bodyColor,
          background: colors.cardBg,
          toolbar: {
            show: false
          },
        },
        theme: {
          mode: 'light'
        },
        tooltip: {
          theme: 'light'
        },
        colors: [colors.primary],
        fill: {
          opacity: .9
        },
        grid: {
          padding: {
            bottom: -4
          },
          borderColor: colors.gridBorder,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        series: [{
          name: 'Users',
          data: data
        }],
        xaxis: {
          type :'line',
          categories: label,
          axisBorder: {
            color: colors.gridBorder,
          },
          axisTicks: {
            color: colors.gridBorder,
          },
        },
        yaxis: {
          title: {
            text: 'Number of Users',
            style: {
              size: 9,
              color: colors.muted
            }
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: 'center',
          fontFamily: fontFamily,
          itemMargin: {
            horizontal: 8,
            vertical: 0
          },
        },
        stroke: {
          width: 0
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '10px',
            fontFamily: fontFamily,
          },
          offsetY: -27
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            borderRadius: 4,
            dataLabels: {
              position: 'top',
              orientation: 'vertical',
            }
          },
        },
      }
  
      var apexBarChart = new ApexCharts(document.querySelector("#monthlySalesChart"), options);
      apexBarChart.render();
    }
  }

  // Monthly Sales Chart - END
  // Monthly Sales Chart - RTL
  if ($('#monthlySalesChartRTL').length) {
    var options = {
      chart: {
        type: 'bar',
        height: '318',
        parentHeightOffset: 0,
        foreColor: colors.bodyColor,
        background: colors.cardBg,
        toolbar: {
          show: false
        },
      },
      theme: {
        mode: 'light'
      },
      tooltip: {
        theme: 'light'
      },
      colors: [colors.primary],
      fill: {
        opacity: .9
      },
      grid: {
        padding: {
          bottom: -4
        },
        borderColor: colors.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      series: [{
        name: 'Sales',
        data: [152, 109, 93, 113, 126, 161, 188, 143, 102, 113, 116, 124]
      }],
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022', '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022', '12/01/2022'],
        axisBorder: {
          color: colors.gridBorder,
        },
        axisTicks: {
          color: colors.gridBorder,
        },
      },
      yaxis: {
        opposite: true,
        title: {
          text: 'Number of Sales',
          offsetX: -108,
          style: {
            size: 9,
            color: colors.muted
          }
        },
        labels: {
          align: 'left',
          offsetX: -20,
        }
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: 'center',
        fontFamily: fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
          fontFamily: fontFamily,
        },
        offsetY: -27
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 4,
          dataLabels: {
            position: 'top',
            orientation: 'vertical',
          }
        },
      },
    }

    var apexBarChart = new ApexCharts(document.querySelector("#monthlySalesChartRTL"), options);
    apexBarChart.render();
  }
  // Monthly Sales Chart - RTL - END
  // Cloud Storage Chart
  if ($('#storageChart').length) {
    var options = {
      chart: {
        height: 260,
        type: "radialBar"
      },
      series: [67],
      colors: [colors.primary],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%"
          },
          track: {
            show: true,
            background: colors.dark,
            strokeWidth: '100%',
            opacity: 1,
            margin: 5,
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -11,
              show: true,
              color: colors.muted,
              fontSize: "13px"
            },
            value: {
              color: colors.bodyColor,
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        opacity: 1
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Storage Used"]
    };

    var chart = new ApexCharts(document.querySelector("#storageChart"), options);
    chart.render();
  }
  // Cloud Storage Chart - END
  //Phần chart cho 16 bảng
  function RenderApexDonutChart(id,labels, data,rentColor){
    if ($(`#${id}`).length) {
      var options = {
        chart: {
          height: 300,
          type: "donut",
          foreColor: colors.bodyColor,
          background: colors.cardBg,
          toolbar: {
            show: false
          },
        },
        theme: {
          mode: 'dark'
        },
        tooltip: {
          theme: 'dark'
        },
        stroke: {
          colors: ['rgba(0,0,0,0)']
        },
        colors: rentColor,
        legend: {
          show: true,
          position: "bottom",
          horizontalAlign: 'center',
          fontFamily: fontFamily,
          itemMargin: {
            horizontal: 8,
            vertical: 0
          },
        },
        dataLabels: {
          enabled: false
        },
        labels:labels,
        series: data
      };
  
      var chart = new ApexCharts(document.querySelector(`#${id}`), options);
      chart.render();
    }
  }

  var apiUrl = "https://localhost:7251/api/Admin/GetAll"
  var table = document.getElementById('tableAdmin')
  const data =  fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.json();
      })
      .then(datas => {
        datas.forEach((data)=>{
          var add = `                      
          <tr>
          <td>${data.id}</td>
          <td>${data.userName}</td>
          <td>${data.pass}</td>
          <td>${data.phoneNumber}</td>
          <td>${data.ofStatus}</td>
        </tr>`
          table.innerHTML += add
          console.log(data.id)
        })
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
     
    var apiUrlUser = "https://localhost:7251/api/DashBoard/GetUserLastLoginFor30Days"    
    var tableUser = document.getElementById('tableUser')
    const user =  fetch(apiUrlUser)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.json();
      })
      .then(datas => {
        datas.forEach((data)=>{
          var add = `
          <a href="javascript:;" class="d-flex align-items-center border-bottom pb-3">
                    <div class="me-3">
                      <img src="${data.photoImage}" class="rounded-circle wd-35" alt="user">
                    </div>
                    <div class="w-100">
                      <div class="d-flex justify-content-between">
                        <h6 class="text-body mb-2">${data.fullName}</h6>
                        <p class="text-muted tx-12">${data.userName}</p>
                      </div>
                      <p class="text-muted tx-13">Not logged in for ${data.lastLoginDaysAgo} days</p>
                    </div>
                  </a>                      
          `
          tableUser.innerHTML += add
        })
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });

});