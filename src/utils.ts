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

  const result = [
    NEW_PAGE_STRING,
    ALIGN_STRING[alignStyle],
    headTitle,
    lineFeed,
    ...paddedTexts
  ].reduce((prev, cur) =>
    cur !== lineFeed ?
      prev + lineFeed + cur :
      prev + cur);

  return result;
}

