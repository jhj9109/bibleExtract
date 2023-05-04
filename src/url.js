"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = void 0;
var data2_1 = require("./data2");
var data3_1 = require("./data3");
var BASE_URL = "https://www.bskorea.or.kr/bible/korbibReadpage.php?";
var DEFAULT_VERSION_NAME = "GAE"; // 개역개정
var getUrl = function (bookName, chapterNumber, verseNumberStart, version) {
    if (version === void 0) { version = DEFAULT_VERSION_NAME; }
    var fullNameKr = data2_1.bibleInfos.find(function (info) { return info.shortNameKr === bookName; }).fullNameKr;
    var queryBookName = data3_1.fullNameKrToQueryName[fullNameKr];
    var versionQuery = "version=".concat(version);
    var bookQuery = "book=".concat(queryBookName);
    var chapterQuery = "chap=".concat(chapterNumber);
    var verseQuery = "sec=".concat(verseNumberStart !== null && verseNumberStart !== void 0 ? verseNumberStart : 1);
    var queryString = [versionQuery, bookQuery, chapterQuery, verseQuery].join('&');
    return BASE_URL + queryString;
};
exports.getUrl = getUrl;
