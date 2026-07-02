const path = require("path");

const filePaths = {
    combinedLog: path.join(__dirname, "..", "logs", "combined.log"),
    errorLog: path.join(__dirname, "..", "logs", "error.log"),
};

module.exports = filePaths