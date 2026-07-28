// levenshtein.js

export function levenshtein(a, b) {
  const matrix = [];

  // Create rows
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // Create columns
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Compare letters
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // replace

          matrix[i][j - 1] + 1, // insert

          matrix[i - 1][j] + 1, // delete
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
