// npm package: jquery-steps
// github link: https://github.com/rstaib/jquery-steps/

$(function () {
  'use strict';
  var first = document.querySelector('.className_1')
  var second = document.querySelector('.className_2')
  var third = document.querySelector('.className_3')
  var fourth = document.querySelector('.className_4')

  document.getElementById('button1').onclick = () => {
    first.style.display = 'none'
    second.style.display = 'block'
  }


  document.getElementById('button2').onclick = () => {
    var pass = document.getElementById('password').value
    const apiUrl = `https://localhost:7251/api/Admin/CheckPass?adminId=1&pass=${pass}`
    const user = fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          alert("Nhập sai mật khẩu")
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.text;
      })
      .then(data => {
        second.style.display = 'none'
        third.style.display = 'block'
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
  }
  var receivedOTP = '';
  document.getElementById('getOTP').onclick = () => {
    const apiUrl = `https://localhost:7251/api/SMSSendingOrGmail/SendText?phoneNumber=0866058725`;

     // Biến để lưu trữ OTP khi nhận được

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        // Lưu trữ OTP khi nhận được
        receivedOTP = data;

        // Gọi hàm xử lý khi đã nhận được OTP
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
      const checkOTP = setInterval(() => {
        if (receivedOTP !== '') {
          clearInterval(checkOTP); // Dừng việc kiểm tra nếu đã nhận được OTP
          console.log('OTP đã nhận được:', receivedOTP);
          // Thực hiện các hành động cần thiết với OTP ở đây
          document.getElementById('button3').onclick = () =>{
            var otp = document.getElementById('OTP').value
            console.log(receivedOTP)
            if(otp == receivedOTP){
              third.style.display = 'none'
              fourth.style.display = 'block'
            }else{
              alert("OTP saii")
            }
          }
        }else{
          alert("Chưa nhận được OTP")
        }
      }, 1000); // Kiểm tra mỗi 1 giây
  };

  document.getElementById('button4').onclick = () => {
    var number = document.getElementById('numberUser').value
    const apiUrl = `https://localhost:7251/api/Users/GenAutomaticallyUser?numberOfUser=${number}`
    const user = fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Yêu cầu thất bại với mã lỗi: ${response.status}`);
        }
        return response.text;
      })
      .then(data => {
        fourth.style.display = 'none'
        first.style.display = 'block'
        alert("Thêm thành công "+number+ " user ảo")
      })
      .catch(error => {
        // Xử lý lỗi nếu có lỗi xảy ra
        console.error('Đã xảy ra lỗi:', error);
      });
  }

  // Hàm xử lý OTP sau khi nhận được

})