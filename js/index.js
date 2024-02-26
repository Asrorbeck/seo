function toggleMenu() {
  var menu = document.getElementById('menu');
  var header = document.getElementById('header');
  var burgerBtn = document.getElementById('openBtn');
  var closeBtn = document.getElementById('closeBtn');

  menu.classList.toggle('menu-open');
  header.classList.toggle('header__bg');
  burgerBtn.classList.toggle('show');
  closeBtn.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the modals and buttons
  var modal = document.getElementById("myModal");
  var successModal = document.getElementById("successModal");
  var openModalBtn = document.getElementById("openModalBtn");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var closeSuccessModalBtn = document.getElementById("closeSuccessModalBtn");

  // When the user clicks the button, open the form modal
  openModalBtn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks the close button or outside the modal, close the form modal
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Handle form submission

  var forma = document.getElementById("forma");
  forma.addEventListener("submit", function (event) {
    event.preventDefault();

    successModal.style.display = "block";
  });

  window.onclick = function (event) {
    if (event.target === successModal) {
      successModal.style.display = "none";
    }
  };

  closeSuccessModalBtn.onclick = function () {
    successModal.style.display = "none";
  };
});

function sendTelegram() {
  var tel = document.getElementById("tel2").value;
  var name = document.getElementById("name2").value;
  var web = document.getElementById("web2").value;

  var botToken = "6952866506:AAHwy80JQxTuf2Lq1QTeNmf8h0B_-A0ldxg";

  var chatIds = ["905770018", "895126630"];

  var message = `Telephone: ${tel}

Name: ${name}

Website: ${web}`;

  var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  chatIds.forEach((chatId) => {
    var data = {
      chat_id: chatId,
      text: message,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Message sent`);
      })
      .catch((error) => {
        console.error(`Error sending message:`, error);
      });
  });

  document.getElementById("tel2").value = "";
  document.getElementById("name2").value = "";
  document.getElementById("web2").value = "";

  return false;
}

function sendTelegram2() {
  var tel = document.getElementById("tel1").value;
  var name = document.getElementById("name1").value;
  var web = document.getElementById("web1").value;

  var botToken = "6952866506:AAHwy80JQxTuf2Lq1QTeNmf8h0B_-A0ldxg";

  var chatIds = ["905770018", "895126630"];

  var message = `Telephone: ${tel}

Name: ${name}

Website: ${web}`;

  var apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  chatIds.forEach((chatId) => {
    var data = {
      chat_id: chatId,
      text: message,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Message sent`);
      })
      .catch((error) => {
        console.error(`Error sending message:`, error);
      });
  });

  document.getElementById("tel1").value = "";
  document.getElementById("name1").value = "";
  document.getElementById("web1").value = "";

  return false;
}

var modal = document.getElementById("myModal");
var successModal = document.getElementById("successModal");

var form = document.getElementById("formModal");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  sendTelegram2();

  successModal.style.display = "block";
  modal.style.display = "none";
});


