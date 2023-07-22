"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgument = void 0;
var data1_1 = require("./data1");
var data2_1 = require("./data2");
var data3_1 = require("./data3");
var utils_1 = require("./utils");
var newBookInfo = function (bibleInfo) { return ({
    bookName: bibleInfo.fullNameKr,
    totalChapters: Object.keys(data1_1.chapterInfoByBookName2[bibleInfo.fullNameKr]).length,
    totalVerses: Object.values(data1_1.chapterInfoByBookName2[bibleInfo.fullNameKr]).reduce(function (prev, cur) { return prev + cur; }, 0),
}); };
var newVerse = function (verseNumber, text) {
    if (text === void 0) { text = ''; }
    return ({ verseNumber: verseNumber, text: text });
};
var newChapter = function (numOfVerses) {
    return Array.from({ length: numOfVerses })
        .map(function (_, i) { return i + 1; })
        .reduce(function (prev, chapterNum) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[chapterNum] = newVerse(chapterNum), _a)));
    }, {});
};
var newChapters = function (bibleInfo) {
    return Object.entries(data1_1.chapterInfoByBookName2[bibleInfo.fullNameKr]).reduce(function (prev, cur) {
        var _a;
        return (__assign(__assign({}, prev), (_a = {}, _a[cur[0]] = newChapter(cur[1]), _a)));
    }, {});
};
var newBook = function (bibleInfo) { return ({
    bookInfo: newBookInfo(bibleInfo),
    chapters: newChapters(bibleInfo)
}); };
var bible = data2_1.bibleInfos.reduce(function (prev, cur) {
    var _a;
    return (__assign(__assign({}, prev), (_a = {}, _a[cur.shortNameKr] = newBook(cur), _a)));
}, {});
var getBookChapterLimit = function (bookName) { return Object.keys(bible[bookName].chapters).length; };
var getBookChapterVerseLimit = function (bookName, chapterNumber) {
    return (0, utils_1.isClamp)(chapterNumber, 1, getBookChapterLimit(bookName))
        ? Object.keys(bible[bookName].chapters[chapterNumber]).length
        : -1;
};
var parseArgument = function (args) {
    if (args.length < 3) {
        throw new Error('Invalid Argument Error. 최소 3개의 인자를 가져야 합니다. 실행 예시: 성경이름 장 시작절 [끝절]');
    }
    var bookName = args[0], chapterNumberString = args[1], verseNumberStringStart = args[2], verseNumberStringEnd = args[3];
    if (args.length == 3) {
        verseNumberStringEnd = verseNumberStringStart;
    }
    if (!data3_1.shortBookNameKrs.has(bookName)) {
        throw new Error('Invalid Argument Error. "성경이름"은 다음 중 하나이여야 합니다. ' + Array.from(data3_1.shortBookNameKrs).join(' | '));
    }
    if (Number.isNaN(chapterNumberString)) {
        throw new Error('Invalid Argument Error. "장"은 숫자이여야 합니다.');
    }
    if (Number.isNaN(verseNumberStringStart)) {
        throw new Error('Invalid Argument Error. "시작절"은 숫자이여야 합니다.');
    }
    if (Number.isNaN(verseNumberStringEnd)) {
        throw new Error('Invalid Argument Error. "끝절"은 숫자이여야 합니다.');
    }
    var _a = [chapterNumberString, verseNumberStringStart, verseNumberStringEnd].map(function (numString) { return Number(numString); }), chapterNumber = _a[0], verseNumberStart = _a[1], verseNumberEnd = _a[2];
    var bookChapterLimit = getBookChapterLimit(bookName);
    if (!(0, utils_1.isClamp)(chapterNumber, 1, bookChapterLimit)) {
        throw new Error("Invalid Argument Error. ".concat(bookName, "\uC740 1\uC7A5\uBD80\uD130 ").concat(bookChapterLimit, "\uC7A5\uAE4C\uC9C0 \uC874\uC7AC\uD569\uB2C8\uB2E4."));
    }
    var bookChapterVerseLimit = getBookChapterVerseLimit(bookName, chapterNumber);
    if (!(0, utils_1.isClamp)(verseNumberStart, 1, bookChapterVerseLimit) || !(0, utils_1.isClamp)(verseNumberEnd, 1, bookChapterVerseLimit)) {
        throw new Error("Invalid Argument Error. ".concat(bookName, " ").concat(chapterNumber, "\uC7A5\uC740 1\uC808\uC5D0\uC11C ").concat(bookChapterVerseLimit, "\uC808\uAE4C\uC9C0 \uC874\uC7AC\uD569\uB2C8\uB2E4."));
    }
    return { bookName: bookName, chapterNumber: chapterNumber, verseNumberStart: verseNumberStart, verseNumberEnd: verseNumberEnd };
};
exports.parseArgument = parseArgument;
