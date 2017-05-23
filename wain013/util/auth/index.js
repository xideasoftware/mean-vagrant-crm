const Emitter = new require("events");
const emitter = new Emitter();
const activities = require("./activity");
const roles = require("./role");


emitter.on("Authorization By Activity Request", activities);

emitter.on("Authorization By Role Request", roles);


module.exports = {
    can: function(activity) {
        return (req, res, next) => {
            return emitter.emit("Authorization By Activity Request", activity, req, res, next);
        };
    },
    is: function (role) {
        return (req, res, next) => {
            return emitter.emit("Authorization By Role Request", role, req, res, next);
        };
    }
};