const jwt = require("jsonwebtoken");

const expiresIn = "10d";

module.exports.generateJwt = (userId, callback) => {
    if(!process.env.SERVER_KEY) {
        return callback(new Error("Internal Error"), null);
    } else {
        jwt.sign({ userId: userId }, process.env.SERVER_KEY, { expiresIn: expiresIn }, (err, jwt) => {
            return callback(err, jwt);
        });
    }
};

module.exports.verifyJwt = (jwt, callback) => {
    if(!process.env.SERVER_KEY) {
        return callback(new Error("Internal Error"), null);
    } else {
        jwt.verify(jwt, process.env.SERVER_KEY, (err, credentials) => {
            return callback(err, credentials.userId)
        })
    }
};