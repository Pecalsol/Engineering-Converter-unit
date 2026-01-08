const units = {
  length: ["meter", "kilometer", "mile", "feet"],
  mass: ["gram", "kilogram", "pound"],
  temperature: ["celsius", "fahrenheit", "kelvin"]
};

document.getElementById("type").addEventListener("change", populateUnits);
document.getElementById("convertBtn").addEventListener("click", convert);

populateUnits();
loadSaved();

function populateUnits() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  from.innerHTML = "";
  to.innerHTML = "";

  units[type].forEach(u => {
    from.innerHTML += `<option value="${u}">${u}</option>`;
    to.innerHTML += `<option value="${u}">${u}</option>`;
  });
}

function convert() {
  const type = document.getElementById("type").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const value = parseFloat(document.getElementById("value").value);

  if (isNaN(value)) {
    alert("Please enter a valid number!");
    return;
  }

  let result;

  if (type === "length") result = convertLength(value, from, to);
  if (type === "mass") result = convertMass(value, from, to);
  if (type === "temperature") result = convertTemp(value, from, to);

  document.getElementById("result").innerText = `${value} ${from} = ${result} ${to}`;
  saveConversion(`${value} ${from} → ${result} ${to}`);
}

function convertLength(v, from, to) {
  const m = {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    feet: 0.3048
  };

  return (v * m[from] / m[to]).toFixed(4);
}

function convertMass(v, from, to) {
  const m = { gram: 1, kilogram: 1000, pound: 453.592 };
  return (v * m[from] / m[to]).toFixed(4);
}

function convertTemp(v, from, to) {
  if (from === to) return v;

  if (from === "celsius") {
    if (to === "fahrenheit") return (v * 9/5 + 32).toFixed(2);
    if (to === "kelvin") return (v + 273.15).toFixed(2);
  }
  if (from === "fahrenheit") {
    if (to === "celsius") return ((v - 32) * 5/9).toFixed(2);
    if (to === "kelvin") return ((v - 32) * 5/9 + 273.15).toFixed(2);
  }
  if (from === "kelvin") {
    if (to === "celsius") return (v - 273.15).toFixed(2);
    if (to === "fahrenheit") return ((v - 273.15) * 9/5 + 32).toFixed(2);
  }
}

function saveConversion(text) {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved.unshift(text);
  saved = saved.slice(0, 5);
  localStorage.setItem("saved", JSON.stringify(saved));
  loadSaved();
}

function loadSaved() {
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  const list = document.getElementById("savedList");
  list.innerHTML = "";
  saved.forEach(item => list.innerHTML += `<li>${item}</li>`);
}
