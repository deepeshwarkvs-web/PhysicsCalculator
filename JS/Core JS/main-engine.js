import { setSearchText, setCurrentFormula } from "./globals.js";
import { createOption, renderInput } from "./render.js";
import { calculate } from "./solver.js";
import { smartSolve, findBestFormula } from "./smartInput.js";
import { renderCatogary, classFilter } from "./catogary.js";

const smartInput = document.querySelector("#smartInput");
const smartBtn = document.querySelector("#smartBtn");
const calBtn = document.querySelector("#calBtn");
const formulaFilter = document.querySelector("#formulaFilter");
const classFil = document.querySelector("#classFilter");

// ==========================================
// ENTER SUPPORT
// ==========================================

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (document.activeElement === smartInput) {
      smartBtn.click();
    } else {
      calBtn.click();
    }
  }
});

// ==========================================
// SEARCH INPUT
// ==========================================

document.getElementById("manuInt").addEventListener("input", (e) => {
  setSearchText(e.target.value.trim());

  createOption();
});

// ==========================================
// FORMULA SELECT
// ==========================================

document.getElementById("formulaSelect").addEventListener("change", (e) => {
  const data = e.target.value.trim();

  if (!data) return;

  setCurrentFormula(data);

  renderInput(data);
});

// ==========================================
// BUTTONS
// ==========================================

calBtn.addEventListener("click", calculate);

smartBtn.addEventListener("click", smartSolve);

// ==========================================
// RENDERING
// ==========================================

formulaFilter.addEventListener("change", (e) => {
  renderCatogary(formulaFilter.value);
});

classFil.addEventListener("change", (e) => {
  classFilter(classFil.value);
});

smartBtn.addEventListener("click", () => {
  const result = findBestFormula(smartInput.value.trim());
});
