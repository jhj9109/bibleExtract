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
exports.shortBookNameKrs = exports.queryVersionNames = exports.fullNameKrToQueryName = exports.queryNameToFullNameKr = void 0;
exports.queryNameToFullNameKr = {
    "gen": "창세기",
    "exo": "출애굽기",
    "lev": "레위기",
    "num": "민수기",
    "deu": "신명기",
    "jos": "여호수아",
    "jdg": "사사기",
    "rut": "룻기",
    "1sa": "사무엘상",
    "2sa": "사무엘하",
    "1ki": "열왕기상",
    "2ki": "열왕기하",
    "1ch": "역대상",
    "2ch": "역대하",
    "ezr": "에스라",
    "neh": "느헤미야",
    "est": "에스더",
    "job": "욥기",
    "psa": "시편",
    "pro": "잠언",
    "ecc": "전도서",
    "sng": "아가",
    "isa": "이사야",
    "jer": "예레미야",
    "lam": "예레미야애가",
    "ezk": "에스겔",
    "dan": "다니엘",
    "hos": "호세아",
    "jol": "요엘",
    "amo": "아모스",
    "oba": "오바댜",
    "jnh": "요나",
    "mic": "미가",
    "nam": "나훔",
    "hab": "하박국",
    "zep": "스바냐",
    "hag": "학개",
    "zec": "스가랴",
    "mal": "말라기",
    "mat": "마태복음",
    "mrk": "마가복음",
    "luk": "누가복음",
    "jhn": "요한복음",
    "act": "사도행전",
    "rom": "로마서",
    "1co": "고린도전서",
    "2co": "고린도후서",
    "gal": "갈라디아서",
    "eph": "에베소서",
    "php": "빌립보서",
    "col": "골로새서",
    "1th": "데살로니가전서",
    "2th": "데살로니가후서",
    "1ti": "디모데전서",
    "2ti": "디모데후서",
    "tit": "디도서",
    "phm": "빌레몬서",
    "heb": "히브리서",
    "jas": "야고보서",
    "1pe": "베드로전서",
    "2pe": "베드로후서",
    "1jn": "요한1서",
    "2jn": "요한2서",
    "3jn": "요한3서",
    "jud": "유다서",
    "rev": "요한계시록"
};
exports.fullNameKrToQueryName = Object.entries(exports.queryNameToFullNameKr)
    .reduce(function (prev, el) {
    var _a;
    return (__assign(__assign({}, prev), (_a = {}, _a[el[1]] = el[0], _a)));
}, {});
exports.queryVersionNames = {
    개역개정: "GAE",
    개역한글: "HAN",
    표준새번역: "SAE",
    새번역: "SAENEW",
    공동번역: "COG",
    "공동번역 개정판": "COGNEW",
    CEV: "CEV"
};
exports.shortBookNameKrs = new Set([
    '창', '출', '레', '민', '신', '수', '삿', '룻', '삼상', '삼하', '왕상', '왕하', '대상', '대하', '스', '느', '에', '욥', '시', '잠', '전', '아', '사', '렘', '애', '겔', '단', '호', '욜', '암', '옵', '욘', '미', '나', '합', '습', '학', '슥', '말', '마', '막', '눅', '요', '행', '롬', '고전', '고후', '갈', '엡', '빌', '골', '살전', '살후', '딤전', '딤후', '딛', '몬', '히', '약', '벧전', '벧후', '요일', '요이', '요삼', '유', '계'
]);
