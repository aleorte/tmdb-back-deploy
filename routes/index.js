const express = require("express");
const userRouter = require("./user");
const favoriteRoute = require ("./favorite")
const router = express.Router();

router.use("/favorite", favoriteRoute)
router.use("/user", userRouter);

module.exports = router;
