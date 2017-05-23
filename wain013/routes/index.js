const router = require("express").Router();


router.use("/user", require("./user"));
router.use("/signup", require("./signup"));
router.use("/articles?", require("./article"));
router.use("/business(es)?", require("./business"));
router.use("/locations?", require("./location"));
router.use("/languages?", require("./language"));
router.use("/events?", require("./event"));
router.use("/collections?", require("./collection"));
router.use("/businessCategory", require("./businessCategory"));
router.use("/businessOption", require("./businessOption"));
router.use("/eventCategory", require("./eventCategory"));
router.use("/eventOption", require("./eventOption"));
router.use("/contents?", require("./content"));
router.use("/upload", require("./upload"));
router.use("/", require("./util"));
router.use("/tags?", require("./tag"));
router.use("/systemVariables?", require("./systemVariable"));

module.exports = router;