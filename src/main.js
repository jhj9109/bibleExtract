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
var axios_1 = require("axios");
var fs = require("fs");
var https = require("https");
var prompt_1 = require("./prompt");
var utils_1 = require("./utils");
var url_1 = require("./url");
// 우회 방법1
var instance = axios_1.default.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});
// 우회 방법2
// const instance = axios;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var writeCallback, isWindow, lineFeed, queryVersionName, bibleRequestInfos, requestUrls, response, textStrings, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    writeCallback = function (err) {
                        return err ? console.error(err) : console.log('파일이 "output.txt"이름으로 성공적으로 저장되었습니다.');
                    };
                    isWindow = (0, prompt_1.windowCheckPrompt)();
                    lineFeed = (0, utils_1.getLineFeedString)(isWindow);
                    queryVersionName = (0, prompt_1.queryVersionPrompt)();
                    bibleRequestInfos = (0, prompt_1.promptQueries)();
                    if (bibleRequestInfos.length === 0) {
                        console.log("검색할 성경 구절이 입력되지 않아 종료합니다.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    requestUrls = bibleRequestInfos.map(function (_a) {
                        var bookName = _a.bookName, chapterNumber = _a.chapterNumber, verseNumberStart = _a.verseNumberStart, verseNumberEnd = _a.verseNumberEnd;
                        return (0, url_1.getUrl)(bookName, chapterNumber, verseNumberStart, queryVersionName);
                    });
                    return [4 /*yield*/, Promise.all(requestUrls.map(function (url) { return instance.get(url); }))];
                case 2:
                    response = _a.sent();
                    textStrings = response.map(function (resp, i) {
                        var _a = bibleRequestInfos[i], bookName = _a.bookName, chapterNumber = _a.chapterNumber, verseNumberStart = _a.verseNumberStart, verseNumberEnd = _a.verseNumberEnd;
                        var htmlString = resp.data;
                        var verses = (0, utils_1.extractVersesFromHtmlString)(htmlString, bookName, chapterNumber, verseNumberStart, verseNumberEnd);
                        var textString = (0, utils_1.getTextString)(verses, bookName, chapterNumber, verseNumberStart, verseNumberEnd, lineFeed);
                        return textString;
                    });
                    fs.writeFile('output.txt', textStrings.join(lineFeed), writeCallback);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
// process.argv
// 0: /home/codespace/nvm/current/bin/ts-node
// 1: /workspaces/sunmin/a.ts
// const args = process.argv.slice(2);
