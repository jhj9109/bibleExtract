"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextString = exports.extractVersesFromHtmlString = exports.isClamp = void 0;
var data2_1 = require("./data2");
var cheerio = require("cheerio");
var isClamp = function (target, lowerbound, upperbound) {
    return lowerbound <= target && target <= upperbound;
};
exports.isClamp = isClamp;
var extractVersesFromHtmlString = function (htmlString, bookName, chapterNumber, verseNumberStart, verseNumberEnd) {
    var extractVerseText = function (spanElement) {
        return $(spanElement)
            .contents()
            .filter(function (i, el) { return el.type === "text"; })
            .map(function (i, el) { return el.data.replaceAll('\n', ''); })
            .toArray()
            .join('')
            .trim();
    };
    var $ = cheerio.load(htmlString);
    // const selector = '#tdBible1 > span';
    var selector = 'span:not(.number)';
    var verses = $(selector)
        .map(function (_, el) { return extractVerseText(el); })
        .toArray()
        .map(function (text, idx) { return ({ bookName: bookName, chapterNumber: chapterNumber, verseNumber: idx + 1, verseText: text }); })
        .filter(function (verse) { return (0, exports.isClamp)(verse.verseNumber, verseNumberStart, verseNumberEnd); });
    // console.log(verses);
    return verses;
};
exports.extractVersesFromHtmlString = extractVersesFromHtmlString;
var getTextString = function (verses, bookName, chapterNumber, verseNumberStart, verseNumberEnd, alignStyle) {
    if (alignStyle === void 0) { alignStyle = 'left'; }
    var NEW_PAGE_STRING = '//';
    var ALIGN_STRING = {
        left: '<<',
        right: '>>',
        middle: '<>',
        movie: '&&' // 영화 자막 정렬(한 페이지내 가장 긴 문장(중앙정렬) 기준 왼쪽정렬)
    };
    var getLineFeedString = function () {
        // os.EOL 방식, os가 import가 안 되서 방식만 차용했다.
        // Windows만 CR+LF를 사용하고, Unix,Linux,macOS에서는 LF만 사용한다.
        var isWindow = process.platform === 'win32';
        return isWindow ? '\r\n' : '\n';
    };
    var lineFeed = getLineFeedString();
    var zeropadded = function (verseNumber) {
        return Array.from({ length: Math.max(0, String(verseNumberEnd).length - String(verseNumber).length) }).map(function (_) { return '0'; }) + String(verseNumber);
    };
    var getHeadTitle = function (bookNameStyle, chapterString, verseString) {
        if (bookNameStyle === void 0) { bookNameStyle = 'fullNameKr'; }
        if (chapterString === void 0) { chapterString = ':'; }
        if (verseString === void 0) { verseString = '~'; }
        var bookFullNameKr = data2_1.bibleInfos.find(function (info) { return info.shortNameKr === bookName; })[bookNameStyle];
        if (verseNumberStart === verseNumberEnd) {
            return bookFullNameKr + ' ' + "".concat(chapterNumber) + chapterString + "".concat(verseNumberStart);
        }
        else if (verseNumberStart + 1 === verseNumberEnd) {
            return bookFullNameKr + ' ' + "".concat(chapterNumber) + chapterString + "".concat(verseNumberStart) + ',' + "".concat(verseNumberEnd);
        }
        else {
            return bookFullNameKr + ' ' + "".concat(chapterNumber) + chapterString + "".concat(verseNumberStart) + verseString + "".concat(verseNumberEnd);
        }
    };
    var headTitle = getHeadTitle();
    var paddedTexts = verses.map(function (el) { return "".concat(zeropadded(el.verseNumber), " ").concat(el.verseText); });
    var result = __spreadArray([NEW_PAGE_STRING, ALIGN_STRING[alignStyle], headTitle], paddedTexts, true).join(lineFeed);
    return result;
};
exports.getTextString = getTextString;
