module.exports.clean = function(inp) {
    //only keep a-z and spaces, and make all lowercase
    return inp.toLowerCase().replace(/[^a-zA-Z ]/g, "");
};
