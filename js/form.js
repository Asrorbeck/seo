let currentStep = 1;

function updateOptionsAndNext(stepId) {
  const currentStepSelect = document.getElementById("platform");
  if (currentStepSelect.value === "none") {
    alert("Please make a selection before proceeding.");
    return;
  }

  updateOptions();
  nextStep(stepId);
}

function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters

  // Check if the value starts with '7' and remove it
  if (value.startsWith("7")) {
    value = value.slice(1);
  }

  // Add the initial part of the phone number
  let formattedValue = "+7 (" + value.substring(0, 3) + ")";

  // Use regex to format the remaining part of the phone number
  formattedValue += value
    .substring(3)
    .replace(/(\d{3})(\d{2})(\d{1,2})/, "$1-$2-$3");

  input.value = formattedValue;
}

function updateOptions() {
  const platform = document.getElementById("platform").value;
  const keywordsSelect = document.getElementById("keywords");
  keywordsSelect.innerHTML = "";

  if (platform === "yandex") {
    addOption(keywordsSelect, "До 2 000 продвигаемых фраз", 40000);
    addOption(keywordsSelect, "До 7 000 продвигаемых фраз", 60000);
    addOption(keywordsSelect, "Более 7 000 продвигаемых фраз", 80000);
  } else if (platform === "yandex-google") {
    addOption(keywordsSelect, "До 2 000 продвигаемых фраз", 60000);
    addOption(keywordsSelect, "До 7 000 продвигаемых фраз", 80000);
    addOption(keywordsSelect, "Более 7 000 продвигаемых фраз", 100000);
  }
}

function addOption(select, text, value) {
  const option = document.createElement("option");
  option.className = "form__option";
  option.text = text;
  option.value = value;
  select.add(option);
}

function nextStep(stepId) {
  hideAllSteps();
  showStep(stepId);
  currentStep++;

  if (currentStep === 5) {
    // Calculate and display the sum before the 5th step
    const keywordsValue = parseInt(
      document.getElementById("keywords").value,
      10
    );
    const contentStrategyValue = parseInt(
      document.getElementById("contentStrategy").value,
      10
    );
    const sum = keywordsValue + contentStrategyValue;
    const totalCost = document.getElementById("totalCost");
    totalCost.innerHTML = sum;
  }
}

function prevStep(stepId) {
  hideAllSteps();
  showStep(stepId);
  currentStep--;
}

function showStep(stepId) {
  const step = document.getElementById(stepId);
  if (step) {
    step.classList.add("active");
  }
}

function hideAllSteps() {
  const steps = document.querySelectorAll(".form__step");
  steps.forEach((step) => {
    step.classList.remove("active");
  });
}

function sendTelegram3() {
  var tel = document.getElementById("tel1").value;
  var name = document.getElementById("name1").value;
  var web = document.getElementById("web1").value;

  var botToken = "6952866506:AAHwy80JQxTuf2Lq1QTeNmf8h0B_-A0ldxg";

  var chatIds = ["905770018"];

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

function processForm(event) {
  event.preventDefault();

  sendTelegram3();

  const successModal = document.getElementById("successModal");
  successModal.style.display = "block";
}

function sendTelegram3() {
  const platform = document.getElementById("platform").value;
  const keywords = document.getElementById("keywords").value;
  const contentStrategy = document.getElementById("contentStrategy").value;
  const gift = document.getElementById("gift").value;
  const telephone = document.getElementById("tel").value;
  const name = document.getElementById("name").value;
  const website = document.getElementById("web").value;

  const keywordsValue = parseInt(document.getElementById("keywords").value, 10);
  const contentStrategyValue = parseInt(
    document.getElementById("contentStrategy").value,
    10
  );
  const sum = keywordsValue + contentStrategyValue;

  var botToken = "6952866506:AAHwy80JQxTuf2Lq1QTeNmf8h0B_-A0ldxg";

  var chatIds = ["905770018", "895126630"];

  var message = `Platforma: ${platform}

keywords: ${keywords}

Website: ${website}

Content Strategy: ${contentStrategy}

gift: ${gift}

telefon: ${telephone}

name: ${name}

totals: ${sum}
`;

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

  document.getElementById("tel").value = "";
  document.getElementById("name").value = "";
  document.getElementById("web").value = "";

  return false;
}
