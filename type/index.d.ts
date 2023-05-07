export type ShortBookNameKr = '창' | '출' | '레' | '민' | '신' | '수' | '삿' | '룻' | '삼상' | '삼하' | '왕상' | '왕하' | '대상' | '대하' | '스' | '느' | '에' | '욥' | '시' | '잠' | '전' | '아' | '사' | '렘' | '애' | '겔' | '단' | '호' | '욜' | '암' | '옵' | '욘' | '미' | '나' | '합' | '습' | '학' | '슥' | '말' | '마' | '막' | '눅' | '요' | '행' | '롬' | '고전' | '고후' | '갈' | '엡' | '빌' | '골' | '살전' | '살후' | '딤전' | '딤후' | '딛' | '몬' | '히' | '약' | '벧전' | '벧후' | '요일' | '요이' | '요삼' | '유' | '계';
export type NumberKey = string | number;
export type AlignMode = 'left' | 'right' | 'middle' | 'movie';
// interface ChapterInfo {
//   // bookInfo: BookInfo;
//   chapterNumber: number;
// }

export interface Verse {
  // chapterInfo: ChapterInfo;
  verseNumber: number;
  text: string;
}

export interface Chapter {
  // chapterInfo: ChapterInfo;
  verses: {
    [verse: number]: string;
    // [verse: number]: Verse;
  };
}

export interface BookInfo {
  bookName: string;
  totalChapters: number;
  totalVerses: number;
}

export interface Book {
  bookInfo: BookInfo;
  chapters: {
    [chapter: number]: Chapter;
  };
}

export type Bible = Record<ShortBookNameKr, Book>;

export interface BibleRequestInfo {
  bookName: ShortBookNameKr;
  chapterNumber: number;
  verseNumberStart: number;
  verseNumberEnd: number;
}

// for data1.ts
export type ChapterInfo = Record<NumberKey, number>;

export interface ChapterInfoByBookName {
  bookName: string;
  chapterInfo: ChapterInfo;
}

export interface ChapterInfoByBookName2 {
  [bookName: string]: ChapterInfo;
}

// for data2.ts

export interface BibleInfo {
  fullNameKr: string;
  shortNameKr: ShortBookNameKr;
  fullNameEn: string;
  shortNameEn: string;
  numOfChapter: number;
  numOfVerse: number;
}

export type BookNameStyle = 'fullNameKr' | 'shortNameKr' | 'fullNameEn' | 'shortNameEn';