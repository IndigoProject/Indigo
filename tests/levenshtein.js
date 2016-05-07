var levenshtein = require("../src/utils/levenshtein.js");

console.log("Hello, Hallo: (should be 1)");
console.log(levenshtein("Hello", "Hallo"));
