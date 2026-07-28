import { formulaLibrary } from "./formulas.js";

import { currentFormula } from "./globals.js";

const calBtn = document.querySelector("#calBtn");

export function updateSolveState() {
  const formula = formulaLibrary.find((f) => f.name === currentFormula);

  if (!formula) return;

  const inputs = formula.vars.map((v) => document.getElementById(v.toLowerCase()));

  inputs.forEach((input, index) => {
    input.disabled = false;

    const varName = formula.vars[index];

    input.placeholder = formula.labels[varName];
  });

  const emptyInputs = inputs.filter((input) => input.value.trim() === "");

  if (emptyInputs.length === 1) {
    emptyInputs[0].disabled = true;

    emptyInputs[0].placeholder = "Auto Calculated";

    calBtn.disabled = false;
  } else {
    calBtn.disabled = true;
  }
}
