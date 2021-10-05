const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");


router.post("/register", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(
        password, BCRYPT_WORK_FACTOR);
        const result = await db.query(
            `INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING username`,
            [username, hashedPassword]);
        return res.json(result.rows[0]);
    } catch (err) {
        return next(err);
    }
});


router.post("/login-1", async function (req, res, next) {
    try {
        const { username, password } = req.body;
        const result = await db.query(
            `SELECT password FROM users WHERE username = $1`,
            [username]);
        const user = result.rows[0];
        if (user) {
            if (await bcrypt.compare(password, user.password) === true) {
                return res.json({ message: "Logged in!" });
            }
        }
        throw new ExpressError("Invalid user/password", 400);
    } catch (err) {
        return next(err);
    }
});