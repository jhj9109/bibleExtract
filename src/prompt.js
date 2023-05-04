"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryVersionPrompt = exports.promptWithOptions = void 0;
var readlineSync = require("readline-sync");
var data3_1 = require("./data3");
var promptWithOptions = function (optionName, options, defaultOption) {
    if (defaultOption === void 0) { defaultOption = ''; }
    var makePromptMessage = function () {
        return "".concat(optionName, "\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.") + (!!defaultOption ? "(default: ".concat(defaultOption, ")") : '') + '\n' + "[".concat(options.join(', '), "]: ");
    };
    var promptMessage = makePromptMessage();
    var setOptions = Array.isArray(options) ? new Set(options) : options;
    var userInput = '';
    do {
        userInput = readlineSync.question(promptMessage) || defaultOption;
    } while (!setOptions.has(userInput));
    console.log("".concat(optionName, "\uC740 ").concat(userInput, "\uB85C \uC120\uD0DD\uD558\uC168\uC2B5\uB2C8\uB2E4."));
    return userInput;
};
exports.promptWithOptions = promptWithOptions;
var queryVersionPrompt = function () {
    var queryVersionOptionName = '역본';
    var queryVersionOptions = Object.keys(data3_1.queryVersionNames);
    var versionSelectedKr = (0, exports.promptWithOptions)(queryVersionOptionName, queryVersionOptions, '개역개정');
    var queryVersionName = data3_1.queryVersionNames[versionSelectedKr];
    return queryVersionName;
};
exports.queryVersionPrompt = queryVersionPrompt;
