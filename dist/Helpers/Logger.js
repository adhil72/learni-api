"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msg = exports.error = exports.success = void 0;
// logger.ts
var LogColor;
(function (LogColor) {
    LogColor["Reset"] = "\u001B[0m";
    LogColor["FgRed"] = "\u001B[31m";
    LogColor["FgGreen"] = "\u001B[32m";
    LogColor["FgBlue"] = "\u001B[34m";
})(LogColor || (LogColor = {}));
function logWithColor(color, message) {
    console.log(color, message, LogColor.Reset);
}
function success(message) {
    logWithColor(LogColor.FgGreen, message);
}
exports.success = success;
function error(message) {
    logWithColor(LogColor.FgRed, message);
}
exports.error = error;
function msg(message) {
    logWithColor(LogColor.FgBlue, message);
}
exports.msg = msg;
