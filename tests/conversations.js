var conv = [
    [
        "Can I ask you a question?",
        "Go ahead and ask."
    ]
];

var indigo = require("../main.js");
indigo.initialize(conv);

console.log("Getting response for: Can I ask you a question?");
console.log("Expected: Go ahead and ask.");
console.log("Got: " + indigo.getResponse("Can I ask you a question?"));
