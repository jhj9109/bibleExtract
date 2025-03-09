import type { AlignMode, BookNameStyle, BibleInfo } from '../type/index'
import { bibleInfos } from './data2';
import * as cheerio from 'cheerio';

export const isClamp = (target: number, lowerbound: number, upperbound: number) =>
  lowerbound <= target && target <= upperbound

export const extractVersesFromHtmlString = (
  htmlString: string,
  bookName: string,
  chapterNumber: number,
  verseNumberStart: number,
  verseNumberEnd: number
) => {
  const isCommentElement = (el: cheerio.TagElement | cheerio.CommentElement) => !(el.type === "tag" && el.name === "font" && el.attribs?.size !== '2')
  const parseFontElement = (el: cheerio.TagElement) =>
    el.children
      .filter(child => child.type === 'text')
      .map(textNode => textNode.data)
      .filter(text => !!text)
      .join('');
  const parseSpanElementChild = (el: cheerio.Element) =>
    el.type === 'text' ? el.data :
      isCommentElement(el) ? '' : parseFontElement(el as cheerio.TagElement)
  const parseSpanElement = (spanElements: cheerio.Element) =>
    $(spanElements)
      .contents()
      .map((i, spanElement) => parseSpanElementChild(spanElement))
      .toArray()
      .join('')
      .trim()

  const $ = cheerio.load(htmlString);

  const selector = 'div#tdBible1 span:not(.number)';

  const verses = $(selector)
    .map((_, el) => parseSpanElement(el))
    .toArray()
    .map((text, idx) => ({ bookName, chapterNumber, verseNumber: idx + 1, verseText: text }))
    .filter(verse => isClamp(verse.verseNumber, verseNumberStart, verseNumberEnd))

  // console.log(verses);
  return verses;
}

// os.EOL 방식, os가 import가 안 되서 방식만 차용했다.
// Windows만 CR+LF를 사용하고, Unix,Linux,macOS에서는 LF만 사용한다.
export const checkIsWindowFromProcess = () => process.platform === 'win32';

export const getLineFeedString = (isWindow: boolean) => isWindow ? '\r\n' : '\n';

export const getTextString = (
  verses: {
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    verseText: any;
  }[],
  bookName: string,
  chapterNumber: number,
  verseNumberStart: number,
  verseNumberEnd: number,
  lineFeed: string,
  alignStyle: AlignMode = 'left',
) => {
  const NEW_PAGE_STRING = '//';
  const ALIGN_STRING: Record<AlignMode, string> = {
    left: '<<',
    right: '>>',
    middle: '<>',
    movie: '&&' // 영화 자막 정렬(한 페이지내 가장 긴 문장(중앙정렬) 기준 왼쪽정렬)
  };

  const noPad = verseNumberStart === verseNumberEnd;

  const zeropadded = (verseNumber: number) =>
    '0'.repeat(Math.max(0, String(verseNumberEnd).length - String(verseNumber).length)) + String(verseNumber);

  const getHeadTitle = (
    bookNameStyle: BookNameStyle = 'fullNameKr',
    chapterString: string = ':',
    verseString: string = '-',
  ) => {

    const bookFullNameKr = (bibleInfos.find(info => info.shortNameKr === bookName) as BibleInfo)[bookNameStyle];

    let headTitle = bookFullNameKr + ' ' + `${chapterNumber}` + chapterString + `${verseNumberStart}`;

    if (verseNumberStart < verseNumberEnd) {
      if (verseNumberStart + 1 === verseNumberEnd) {
        verseString = ',';
      }
      headTitle += verseString + `${verseNumberEnd}`;
    }

    return headTitle;
  }

  const getVerseString = (
    verse: {
      bookName: string;
      chapterNumber: number;
      verseNumber: number;
      verseText: any;
    }
  ) => noPad ? verse.verseText : `${zeropadded(verse.verseNumber)} ${verse.verseText}`

  const headTitle = getHeadTitle();

  const paddedTexts = verses.map(getVerseString);

  /**
   * 새로운 버전에서 페이지 구분방식이 변경됨에 따라 양식 변경
   * - lineFeed가 무조건 페이지 구분으로써 사용됨
   * - 옵션으로 예전처럼 NEW_PAGE_STRING을 페이지 구분으로써 사용가능
   * - 1. 타이틀과 본문사이에 lineFeed 제거
   * - 2. NEW_PAGE_STRING 옵션 적용전 넣은 본문뒤 lineFeed도 제거
   */
  const result = [
    NEW_PAGE_STRING,
    ALIGN_STRING[alignStyle],
    headTitle,
    // lineFeed, // 본래 필요한 양식이나, lineFeed가 무조건적으로 페이지 구분으로 작동해 제거
    ...paddedTexts,
    // lineFeed, // NEW_PAGE_STRING 옵션 모를때 사용
  ].reduce((prev, cur) =>
    cur !== lineFeed ?
      prev + lineFeed + cur :
      prev + cur);

  return result;
}

export const setStdinStdoutEncodingUtf8 = () => {
  process.stdin.setEncoding('utf8');
  process.stdout.setEncoding('utf8');
}