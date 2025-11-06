const passwordEl = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const generateBtn = document.getElementById("generate");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const themeToggle = document.getElementById("themeToggle");

lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

generateBtn.addEventListener("click", () => {
  const len = +lengthInput.value;
  const chars = [
    upper.checked ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
    lower.checked ? "abcdefghijklmnopqrstuvwxyz" : "",
    number.checked ? "0123456789" : "",
    symbol.checked ? "!@#$%^&*()_+-=[]{}|;:,.<>?" : ""
  ].join("");

  if (!chars) {
    passwordEl.value = "Select options!";
    updateStrength(0);
    return;
  }

  let pw = "";
  for (let i = 0; i < len; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordEl.value = pw;
  updateStrength(len);
});

copyBtn.addEventListener("click", () => {
  if (!passwordEl.value) return;
  navigator.clipboard.writeText(passwordEl.value);
  copyBtn.textContent = "✅";
  setTimeout(() => (copyBtn.textContent = "📋"), 1000);
});

function updateStrength(length) {
  let strength = 0;
  if (length >= 12) strength = 100;
  else if (length >= 8) strength = 70;
  else if (length >= 5) strength = 40;
  else strength = 20;

  strengthBar.style.width = `${strength}%`;
  strengthBar.style.background =
    strength >= 80 ? "#16a34a" : strength >= 50 ? "#f59e0b" : "#ef4444";
  strengthText.textContent =
    strength >= 80 ? "Strong" : strength >= 50 ? "Medium" : "Weak";
}

// 🌙 Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light")
    ? "☀️"
    : "🌙";
});



