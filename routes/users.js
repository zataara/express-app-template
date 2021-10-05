const express = require("express");
const { nextTick } = require("process");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");


router.get('/', async (req, res) => {
    try {
        const results = await db.query(`SELECt * FROM users`);
        return res.json(results.rows);
    }catch(e) {
        return next(e);
    }
});


module.exports = router;
