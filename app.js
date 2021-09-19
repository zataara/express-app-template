const express = require("express");
const app = express();
const ExpressError = requrie("./expressError");

app.use(express.json());

const uRoutes = require("./routes/users");
app.use("/users", uRoutes);

/* 404 HANDLER */ 
app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err)
})