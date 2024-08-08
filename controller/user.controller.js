const express = require("express");
const router = require("../routes/users");

router.get("/login", (req, res) => {
    // login code here
    if (loginSuccess) {
        res.send("Login Successful!");
    } else {
        res.send("Login Failed!");
    }
});

router.post("/register", (req, res) => {
    res.send("Hello World!");
});

module.exports = router;