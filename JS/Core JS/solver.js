import { formulaLibrary } from "./formulas.js";

import { currentFormula, setVals, setResult } from "./globals.js";

export function calculate() {
  const data = formulaLibrary.find((f) => f.name === currentFormula);

  if (!data) {
    alert("Please select a formula first.");

    return;
  }

  let vals = {};

  data.vars.forEach((v) => {
    const input = document.getElementById(v.toLowerCase());

    if (!input || input.value === "") {
      vals[v] = undefined;
    } else {
      vals[v] = +input.value;
    }
  });

  const missingVars = data.vars.filter(
    (v) => vals[v] === undefined || isNaN(vals[v]),
  );

  if (missingVars.length !== 1) {
    alert("Please leave exactly ONE field empty to solve.");

    return;
  }

  const solvedVar = missingVars[0];

  const result = data.solve[solvedVar](vals);

  vals[solvedVar] = result;

  setVals(vals);

  setResult(result);

  const steps = data.getSteps[solvedVar](vals, result.toFixed(2));

  document.querySelector("#result").innerText =
    `Answer: ${result.toFixed(2)} ${data.unit || ""}`;

  document.querySelector("#steps").innerHTML = steps;

  const graphBtn = document.getElementById("viewGraphBtn");

  graphBtn.disabled = false;

  graphBtn.onclick = () => {
    localStorage.setItem(
      "graphData",
      JSON.stringify({
        formula: data.name,
        vals,
        solvedVar,
        result,
      }),
    );

    window.location.href = "graph.html";
  };
}
