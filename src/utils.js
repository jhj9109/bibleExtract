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
exports.getTextString = exports.getLineFeedString = exports.checkIsWindowFromProcess = exports.extractVersesFromHtmlString = exports.isClamp = void 0;
var data2_1 = require("./data2");
var cheerio = require("cheerio");
var isClamp = function (target, lowerbound, upperbound) {
    return lowerbound <= target && target <= upperbound;
};
exports.isClamp = isClamp;
var extractVersesFromHtmlString = function (htmlString, bookName, chapterNumber, verseNumberStart, verseNumberEnd) {
    var isCommentElement = function (el) { var _a; return !(el.type === "tag" && el.name === "font" && ((_a = el.attribs) === null || _a === void 0 ? void 0 : _a.size) !== '2'); };
    var parseFontElement = function (el) {
        return el.children
            .filter(function (child) { return child.type === 'text'; })
            .map(function (textNode) { return textNode.data; })
            .filter(function (text) { return !!text; })
            .join('');
    };
    var parseSpanElementChild = function (el) {
        return el.type === 'text' ? el.data :
            isCommentElement(el) ? '' : parseFontElement(el);
    };
    var parseSpanElement = function (spanElements) {
        return $(spanElements)
            .contents()
            .map(function (i, spanElement) { return parseSpanElementChild(spanElement); })
            .toArray()
            .join('')
            .trim();
    };
    var $ = cheerio.load(htmlString);
    var selector = 'div#tdBible1 span:not(.number)';
    var verses = $(selector)
        .map(function (_, el) { return parseSpanElement(el); })
        .toArray()
        .map(function (text, idx) { return ({ bookName: bookName, chapterNumber: chapterNumber, verseNumber: idx + 1, verseText: text }); })
        .filter(function (verse) { return (0, exports.isClamp)(verse.verseNumber, verseNumberStart, verseNumberEnd); });
    // console.log(verses);
    return verses;
};
exports.extractVersesFromHtmlString = extractVersesFromHtmlString;
// os.EOL 방식, os가 import가 안 되서 방식만 차용했다.
// Windows만 CR+LF를 사용하고, Unix,Linux,macOS에서는 LF만 사용한다.
var checkIsWindowFromProcess = function () { return process.platform === 'win32'; };
exports.checkIsWindowFromProcess = checkIsWindowFromProcess;
var getLineFeedString = function (isWindow) { return isWindow ? '\r\n' : '\n'; };
exports.getLineFeedString = getLineFeedString;
var getTextString = function (verses, bookName, chapterNumber, verseNumberStart, verseNumberEnd, lineFeed, alignStyle) {
    if (alignStyle === void 0) { alignStyle = 'left'; }
    var NEW_PAGE_STRING = '//';
    var ALIGN_STRING = {
        left: '<<',
        right: '>>',
        middle: '<>',
        movie: '&&' // 영화 자막 정렬(한 페이지내 가장 긴 문장(중앙정렬) 기준 왼쪽정렬)
    };
    var noPad = verseNumberStart === verseNumberEnd;
    var zeropadded = function (verseNumber) {
        return '0'.repeat(Math.max(0, String(verseNumberEnd).length - String(verseNumber).length)) + String(verseNumber);
    };
    var getHeadTitle = function (bookNameStyle, chapterString, verseString) {
        if (bookNameStyle === void 0) { bookNameStyle = 'fullNameKr'; }
        if (chapterString === void 0) { chapterString = ':'; }
        if (verseString === void 0) { verseString = '-'; }
        var bookFullNameKr = data2_1.bibleInfos.find(function (info) { return info.shortNameKr === bookName; })[bookNameStyle];
        var headTitle = bookFullNameKr + ' ' + "".concat(chapterNumber) + chapterString + "".concat(verseNumberStart);
        if (verseNumberStart < verseNumberEnd) {
            if (verseNumberStart + 1 === verseNumberEnd) {
                verseString = ',';
            }
            headTitle += verseString + "".concat(verseNumberEnd);
        }
        return headTitle;
    };
    var getVerseString = function (verse) { return noPad ? verse.verseText : "".concat(zeropadded(verse.verseNumber), " ").concat(verse.verseText); };
    var headTitle = getHeadTitle();
    var paddedTexts = verses.map(getVerseString);
    /**
     * 새로운 버전에서 페이지 구분방식이 변경됨에 따라 양식 변경
     * - lineFeed가 무조건 페이지 구분으로써 사용됨
     * - 옵션으로 예전처럼 NEW_PAGE_STRING을 페이지 구분으로써 사용가능
     * - 1. 타이틀과 본문사이에 lineFeed 제거
     * - 2. NEW_PAGE_STRING 옵션 적용전 넣은 본문뒤 lineFeed도 제거
     */
    var result = __spreadArray([
        NEW_PAGE_STRING,
        ALIGN_STRING[alignStyle],
        headTitle
    ], paddedTexts, true).reduce(function (prev, cur) {
        return cur !== lineFeed ?
            prev + lineFeed + cur :
            prev + cur;
    });
    return result;
};
exports.getTextString = getTextString;
