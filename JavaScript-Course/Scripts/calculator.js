let calculation = localStorage.getItem("calculation") || "";

displayCalculation();

function updateCalculation(sign) {
  calculation += sign;
  // console.log(calculation);
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}

function displayCalculation() {
  document.querySelector(".js-text-calculate").innerHTML = `${calculation}`;
}
