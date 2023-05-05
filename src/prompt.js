"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptQueries = exports.queryVersionPrompt = exports.promptWithOptions = void 0;
var readlineSync = require("readline-sync");
var data3_1 = require("./data3");
var parse_1 = require("./parse");
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
var promptQueries = function () {
    var bibleRequestInfos = [];
    console.log("찾을 성경 구절을 입력하세요. (e.g. 창 1 1 2) | 그만 하시려면 y를 입력하세요");
    var userInput = '';
    while (true) {
        userInput = readlineSync.question("찾을 성경 구절: ");
        if (userInput === "y") {
            break;
        }
        if (userInput) {
            var args = userInput.replaceAll(/\s{2,}/g, " ").split(" ");
            try {
                bibleRequestInfos.push((0, parse_1.parseArgument)(args));
            }
            catch (error) {
                console.log("\uC62C\uBC14\uB974\uC9C0 \uBABB\uD55C \uC785\uB825\uC785\uB2C8\uB2E4. (".concat(userInput, ")"));
            }
        }
    }
    return bibleRequestInfos;
};
exports.promptQueries = promptQueries;
