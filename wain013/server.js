const express = require("express");
const server = express();
const passport = require("./config/passport");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(require("./config/database"));
mongoose.Promise = require("bluebird");
const logger = require("morgan");
const cors = require("cors");


server.use("/uploads", express.static(path.join(__dirname, "uploads")));


server.use([
    express.static(path.join(__dirname, "./admin/public")),
    logger("dev", {
        skip: () => {
            return process.env.NODE_ENV == "test"
        }
    }),
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    passport.initialize(),
    cors()
]);

server.use("/api", require("./routes"));
server.use("/api", require("./util/resultHandler"));




const port = 3000;
server.listen(port, () => {
    console.log("Listening on port", port);
});
