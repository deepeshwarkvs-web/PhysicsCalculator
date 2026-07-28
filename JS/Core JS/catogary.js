import { setSearchText } from "./globals.js";
import { formulaLibrary } from "./formulas.js";

export function renderCatogary(value) {
  const select = document.getElementById("formulaSelect");

  select.innerHTML = `<option value="" selected disabled>
      Formula Catogary
    </option>`;

  const filteredFormulas = formulaLibrary.filter((formula) => {
    console.log(formula.category, value);

    if (value === "All") {
      return true;
    }

    return formula.category === value;
  });

  filteredFormulas.forEach((formula) => {
    const option = document.createElement("option");

    option.value = formula.name;

    option.textContent = formula.label || formula.name;

    select.appendChild(option);
  });
}

export function classFilter(classSelcted) {
  const select = document.getElementById("formulaSelect");

  select.innerHTML = `<option value="">
      All class
    </option>`;

  const filteredFormulas = formulaLibrary.filter((formula) => {
    console.log(formula.class, classSelcted, formula.name);

    if (classSelcted === "AllClass") {
      return true;
    }

    return Number(formula.class) <= Number(classSelcted);
  });

  filteredFormulas.forEach((formula) => {
    const option = document.createElement("option");

    option.value = formula.name;

    option.textContent = formula.label || formula.name;

    select.appendChild(option);
  });
}
