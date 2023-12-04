$(document).ready(function() {
  var table = $('#dataTableExample').DataTable({
      "processing": true,
      "serverSide": true,
      "ajax": {
          "url": "https://localhost:7251/api/DashBoard/PaginationUser",
          "type": "GET",
          "data": function(d) {
              // Thêm các tham số cần thiết để gửi yêu cầu đến API
              d.draw = d.draw;
              d.start = d.start;
              d.length = d.length;
          },
          "dataSrc": function(response) {
              datas = response.data
              datas.forEach((data)=>{
                  if(data.sexsualOrientation == null) {data.sexsualOrientation  = "Not Filled"}
                  if(data.futureFamily == null) {data.futureFamily  = "Not Filled"}
                  if(data.vacxinCovid == null) {data.vacxinCovid  = "Not Filled"}
                  if(data.zodiac == null) {data.zodiac  = "Not Filled"}
                  if(data.education == null) {data.education  = "Not Filled"}
              })
              return datas; // Trả về mảng dữ liệu từ API
          }
      },
      "columns": [
          { "data": "id" },
          { "data": "fullName" },
          { "data": "age" },
          { "data": "sexsualOrientation" },
          { "data": "futureFamily" },
          { "data": "vacxinCovid" },
          { "data": "zodiac" },
          { "data": "education" },
          // Thêm các cột khác nếu cần thiết
      ],
      "pageLength": 10,
      "language": {
          search: ""
      },        
      "initComplete": function () {
        this.api().columns().every(function () {
            var that = this;
            $('<input>').appendTo($(this.footer()).empty())
                .on('keyup', function () {
                    that.search(this.value).draw();
                });
        });
    }
  });
});