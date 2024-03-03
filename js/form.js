let currentStep = 1;

function updateOptionsAndNext(stepId) {
  console.log(stepId, "index");
  const currentStepSelect = document.getElementById("platform");
  if (currentStepSelect.value === "none") {
    alert("Please make a selection before proceeding.");
    return;
  }
  updateActiveStep(1);
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
  let formattedValue = "+7 " + value.substring(0, 3);

  // Use regex to format the remaining part of the phone number
  formattedValue += value
    .substring(3)
    .replace(/(\d{3})(\d{2})(\d{1,2})/, " $1-$2-$3");

  input.value = formattedValue;

  console.log(formattedValue);
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
  const steps = document.querySelectorAll(".step");
  console.log(stepId, "stesp");
  if (stepId == "step2") {
    const steps = document.querySelectorAll(".step")[0];
    steps.classList.add("completed");
  }
  if (stepId == "step3") {
    const steps = document.querySelectorAll(".step")[1];
    steps.classList.add("completed");
  }
  if (stepId == "step4") {
    const steps = document.querySelectorAll(".step")[2];
    steps.classList.add("completed");
  }
  if (stepId == "step5") {
    const steps = document.querySelectorAll(".step")[3];
    steps.classList.add("completed");
  }

  updateActiveStep(currentStep);
  // updateActiveStep(2)
  hideAllSteps();
  showStep(stepId);
  currentStep++;

  // steps.forEach((step) => {
  //
  //     step.classList.remove('disabled');
  // });

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

function hideElement() {
  const element = document.getElementById("elementToHide");
  element.style.display = "none";
}

function showElement() {
  const element = document.getElementById("elementToHide");
  element.style.display = "block";
}

function prevStep(stepId) {
  console.log(stepId, "asdfasd");
  if (stepId == "step1") {
    const steps = document.querySelectorAll(".step")[0];
    steps.classList.remove("completed");
  }
  if (stepId == "step2") {
    const steps = document.querySelectorAll(".step")[1];
    steps.classList.remove("completed");
  }
  if (stepId == "step3") {
    const steps = document.querySelectorAll(".step")[2];
    steps.classList.remove("completed");
  }
  if (stepId == "step4") {
    const steps = document.querySelectorAll(".step")[3];
    steps.classList.remove("completed");
  }
  updateActiveStep(currentStep - 2);
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

  var botToken = "1394358441:AAHP6VJrxu7yc1z3e4GYLiSRwXVeg_DOswk";

  var chatIds = ["-1001260248230"];

  var message = `name: ${name}
Телефон: ${telephone}
Адрес сайта: ${website}

Сообщение:
Platforma: ${platform}
Ключевые запросы: ${keywords}
Контент стратегия: ${contentStrategy}
подарок: ${gift}
Цена работ: ${sum}
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
