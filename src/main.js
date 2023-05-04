#!/usr/bin/env ts-node
"use strict";
// @ts-ignore
// @ts-check
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var process = require("process");
var axios_1 = require("axios");
var fs = require("fs");
var prompt_1 = require("./prompt");
var utils_1 = require("./utils");
var parse_1 = require("./parse");
var url_1 = require("./url");
function main(args) {
    return __awaiter(this, void 0, void 0, function () {
        var writeCallback, queryVersionName, _a, bookName, chapterNumber, verseNumberStart, verseNumberEnd, requestUrl, response, htmlString, verses, textString;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    writeCallback = function (err) {
                        return err ? console.error(err) : console.log('파일이 "output.txt"이름으로 성공적으로 저장되었습니다.');
                    };
                    queryVersionName = (0, prompt_1.queryVersionPrompt)();
                    _a = (0, parse_1.parseArgument)(args), bookName = _a.bookName, chapterNumber = _a.chapterNumber, verseNumberStart = _a.verseNumberStart, verseNumberEnd = _a.verseNumberEnd;
                    requestUrl = (0, url_1.getUrl)(bookName, chapterNumber, verseNumberStart, queryVersionName);
                    return [4 /*yield*/, axios_1.default.get(requestUrl)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.data];
                case 2:
                    htmlString = _b.sent();
                    verses = (0, utils_1.extractVersesFromHtmlString)(htmlString, bookName, chapterNumber, verseNumberStart, verseNumberEnd);
                    textString = (0, utils_1.getTextString)(verses, bookName, chapterNumber, verseNumberStart, verseNumberEnd);
                    // console.log("============= textString ================");
                    // console.log(textString);
                    // fs.appendFile('output.txt', textString, writeCallback);
                    fs.writeFile('output.txt', textString, writeCallback);
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
if (require.main === module) {
    // process.argv
    // 0: /home/codespace/nvm/current/bin/ts-node
    // 1: /workspaces/sunmin/a.ts
    var args = process.argv.slice(2);
    try {
        main(args);
    }
    catch (error) {
        console.error("Failed to parse JSON: ".concat(error.message));
    }
}
