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
  
  const extractVerseText = (spanElement: cheerio.Element) => 
    $(spanElement)
      .contents()
      .filter((i, el) => (el as any).type === "text")
      .map((i, el)=> (el as any).data.replaceAll('\n', ''))
      .toArray()
      .join('')
      .trim()

  const $ = cheerio.load(htmlString);

  // const selector = '#tdBible1 > span';
  const selector = 'span:not(.number)';
  
  const verses = $(selector)
    .map((_, el) => extractVerseText(el))
    .toArray()
    .map((text, idx) => ({ bookName, chapterNumber, verseNumber: idx + 1, verseText: text }))
    .filter(verse => isClamp(verse.verseNumber, verseNumberStart, verseNumberEnd))
    
  // console.log(verses);
  return verses;
}

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
  alignStyle: AlignMode = 'left',
) => {
  const NEW_PAGE_STRING = '//';
  const ALIGN_STRING: Record<AlignMode, string> = {
    left: '<<',
    right: '>>',
    middle: '<>',
    movie: '&&' // 영화 자막 정렬(한 페이지내 가장 긴 문장(중앙정렬) 기준 왼쪽정렬)
  };
  const getLineFeedString = () => {
    // os.EOL 방식, os가 import가 안 되서 방식만 차용했다.
    // Windows만 CR+LF를 사용하고, Unix,Linux,macOS에서는 LF만 사용한다.
    const isWindow = process.platform === 'win32';
    return isWindow ? '\r\n' : '\n';
  }
  
  const lineFeed = getLineFeedString();

  const zeropadded = (verseNumber: number) => 
    Array.from({length: Math.max(0, String(verseNumberEnd).length - String(verseNumber).length)}).map(_ => '0') + String(verseNumber);
  
  const getHeadTitle = (
    bookNameStyle: BookNameStyle = 'fullNameKr',
    chapterString: string = ':',
    verseString: string = '~',
  ) => {
    
    const bookFullNameKr = (bibleInfos.find(info => info.shortNameKr === bookName) as BibleInfo)[bookNameStyle];

    if (verseNumberStart === verseNumberEnd) {
      return bookFullNameKr + ' ' + `${chapterNumber}` + chapterString + `${verseNumberStart}`;
    } else if (verseNumberStart + 1 === verseNumberEnd) {
      return bookFullNameKr + ' ' + `${chapterNumber}` + chapterString + `${verseNumberStart}` + ',' + `${verseNumberEnd}`;
    } else {
      return bookFullNameKr + ' ' + `${chapterNumber}` + chapterString + `${verseNumberStart}` + verseString + `${verseNumberEnd}`;
    }
  }
  
  const headTitle = getHeadTitle();
  
  const paddedTexts = verses.map(el => `${zeropadded(el.verseNumber)} ${el.verseText}`);
  
  const result = [NEW_PAGE_STRING, ALIGN_STRING[alignStyle], headTitle, ...paddedTexts].join(lineFeed);

  return result;
}

