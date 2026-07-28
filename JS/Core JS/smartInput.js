import { formulaLibrary } from "./formulas.js";
import { setCurrentFormula } from "./globals.js";
import { createInput, createOption } from "./render.js";
import { updateSolveState } from "./state.js";
import { calculate } from "./solver.js";
import { levenshtein } from "./Levenshtein.js";

const calBtn = document.querySelector("#calBtn");
const smartInput = document.querySelector("#smartInput");

export function smartSolve() {
  console.log("smartSolve is running");

  const type = smartInput.value.trim();

  // SMART MATCH
  const formula = findBestFormula(type);

  if (!formula) {
    alert("Formula not found.");

    return;
  }

  console.log("Formula found");

  setCurrentFormula(formula.name);

  createOption();

  document.getElementById("formulaSelect").value = formula.name;

  createInput(formula.name);

  const words = type.trim().split(/\s+/);

  if (type.includes("=") || type.includes(":")) {
    const matches = type.match(
      /([a-zA-Z_]+)\s*[:=]\s*(-?\d*\.?\d+(?:[eE][-+]?\d+)?)/g,
    );

    if (!matches) return;

    matches.forEach((item) => {
      const [key, value] = item.split(/[:=]/);

      console.log(key, value);

      Object.entries(formula.aliases).forEach(([realVar, aliasArray]) => {
        aliasArray.forEach((alias) => {
          if (alias.toLowerCase() === key.trim().toLowerCase()) {
            console.log({ realvar: realVar, value: value });

            const input = document.getElementById(realVar.toLowerCase());

            if (input) {
              input.value = value.trim();
            }
          }
        });
      });
    });
  } else if (!type.includes("=") && !type.includes(":"))
    console.log("Entering sentence mode");
  {
    if (words.length >= 5) {
      console.log("Passed words check");
      const sentence = type.trim();
      const cleanedWords = sentence.replace(/[^\w\s]/g, "");
      const wordsArray = cleanedWords.split(/\s+/);

      let word = [];
      let number = [];
      let connectedResult = [];

      for (let i = 0; i < wordsArray.length; i++) {
        const currunt_word = wordsArray[i];

        // Object.entries(formula.aliases).forEach(([realVar, aliasArray]) => {
        //   aliasArray.forEach((aliass) => {
        //     if (aliass.hasOwnProperty(currunt_word)) {
        //       word.push({
        //         word: currunt_word,
        //         index: i,
        //       });
        //     }
        //   });
        // });

        Object.entries(formula.aliases).forEach(([realVar, aliasArray]) => {
          if (aliasArray.includes(currunt_word)) {
            word.push({
              variable: realVar,
              alias: currunt_word,
              index: i,
            });
          }
        });
      }

      const numbers = [...type.matchAll(/-?\d+(\.\d+)?/g)];

      for (let i = 0; i < numbers.length; i++) {
        number.push({
          number: numbers[i][0],
          type: "number",
          value: parseFloat(numbers[i][0]),
          index: i,
        });
      }

      for (let i = 0; i < word.length; i++) {
        if (number[i]) {
          connectedResult.push({
            variable: word[i].variable,
            value: number[i].value,
          });
        }
      }

      for (const item of connectedResult) {
        const inputs = document.getElementById(item.variable.toLowerCase());

        if (inputs) {
          inputs.value = item.value;
        }
      }

      console.log(word);
      console.log(number);
      console.log(connectedResult);
      console.log(cleanedWords);
    }
  }

  updateSolveState();

  calBtn.click();
}

export function findBestFormula(searchText) {
  let bestMatch = null;

  let lowestScore = Infinity;

  formulaLibrary.forEach((formula) => {
    const words = searchText.toLowerCase().split(" ");

    const formulaWords = formula.name.toLowerCase();

    let score = Infinity;

    words.forEach((word) => {
      const currentScore = levenshtein(word, formulaWords);

      if (currentScore < score) {
        score = currentScore;
      }
    });

    // console.log(formula.name, score);

    if (score < lowestScore) {
      lowestScore = score;

      bestMatch = formula;
    }
  });

  return bestMatch;
}
