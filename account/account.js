$(document).ready(function () {
  $("#signup-form").submit(function (e) {
    e.preventDefault();

    var username = $("#username").val(); // username 필드 추가
    var password = $("#password").val(); // password 필드 추가
    var phoneNum = $("#phoneNum").val();
    var schoolNum = $("#schoolNum").val();
    var phoneRegex = /^\d{2,3}\d{3,4}\d{4}$/;

    $(".message").removeClass("error success");

    if (username === "" || password === "") {
      $(".message")
        .addClass("error")
        .text("빈 칸에 정보를 모두 기입하여 주세요.");
      return;
    } else if (length(password) <= 8) {
      $(".message")
        .addClass("error")
        .text("비밀번호를 8자리 이상으로 해주세요");
      return;
    }

    if (!phoneRegex.test(phoneNum)) {
      $(".message")
        .addClass("error")
        .text("올바른 전화번호 형식이 아닙니다. ex) 01012345678");
      return;
    }

    $.ajax({
      url: "signup.php",
      type: "POST",
      data: {
        username: username,
        password: password,
        phoneNum: phoneNum,
        schoolNum: schoolNum,
      }, // 비밀번호 및 아이디 전송 ( 건들지 마라 뒤진다 ) -> 전화번호랑 학번 저장 안함? 구별은 해야지
      success: function (response) {
        if (response.trim() === "Success") {
          // trim() 함수로 앞뒤 공백 제거
          alert("회원가입에 성공하셨습니다.");
          window.location.href =
            "../hello/login.html?username=" + encodeURIComponent(username); // 메인 페이지로 리다이렉트
        } else {
          $(".message")
            .addClass("error")
            .text(response + "\n서버와 연결에 실패했습니다."); // 실패 시 서버의 에러 메시지 출력
        }
      },
    });
  });
});
