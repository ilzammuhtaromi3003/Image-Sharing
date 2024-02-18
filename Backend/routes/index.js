//routes/index.js

const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes");
const postRouter = require("./postRoutes");
const categoryRouter = require("./categoryRoutes");

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/category", categoryRouter);

module.exports = router;