const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hi Home"
    });
});

router.get("/about", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hi About"
    });
});

module.exports = router;