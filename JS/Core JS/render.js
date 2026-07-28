import { formulaLibrary } from "./formulas.js";

import { searchText, setResult } from "./globals.js";

import { updateSolveState } from "./state.js";

export function renderInput(data) {
  if (!data) return;

  createInput(data);
}

export function createInput(data) {
  if (!data) return;

  setResult("");

  const graphBtn = document.getElementById("viewGraphBtn");

  graphBtn.disabled = true;

  document.getElementById("result").innerHTML = "";

  const stepsDiv = document.getElementById("steps");

  if (stepsDiv) {
    stepsDiv.innerHTML = "";
  }

  const formula = formulaLibrary.find((o) => o.name === data);

  if (!formula) return;

  const inputDiv = document.getElementById("inputs");

  inputDiv.innerHTML = "";

  formula.vars.forEach((v) => {
    const constraint = formula.state.find((p) => p.name === v);

    let guardrail = "";

    if (constraint && constraint.negative === false) {
      guardrail = `min="0" oninput="if(this.value < 0) this.value = Math.abs(this.value);"`;
    }

    inputDiv.innerHTML += `
      <input
        id="${v.toLowerCase()}"
        type="number"
        placeholder="${formula.labels[v]}"
        ${guardrail}
      >
    `;
  });

  inputDiv.addEventListener("input", () => {
    setResult("");

    graphBtn.disabled = true;

    updateSolveState();
  });

  updateSolveState();
}

export function createOption() {
  const select = document.getElementById("formulaSelect");

  select.innerHTML = `<option value="" selected disabled>
      Select formula
    </option>`;

  const optionCreate = formulaLibrary.filter((m) =>
    m.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  optionCreate.forEach((formula) => {
    const option = document.createElement("option");

    option.value = formula.name;

    option.textContent = formula.label || formula.name;

    select.appendChild(option);
  });
}
