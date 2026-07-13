const path = require("path");

const FILE_PATHS = {
    combinedLog: path.join(__dirname, "..", "logs", "combined.log"),
    errorLog: path.join(__dirname, "..", "logs", "error.log"),
};

module.exports = FILE_PATHS