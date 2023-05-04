import { chapterInfoByBookName2 } from "./data1";
import { bibleInfos } from "./data2";
import { shortBookNameKrs } from "./data3";
import { isClamp } from "./utils";

const newBookInfo = (bibleInfo: BibleInfo): BookInfo => ({
  bookName: bibleInfo.fullNameKr,
  totalChapters: Object.keys(chapterInfoByBookName2[bibleInfo.fullNameKr]).length,
  totalVerses: Object.values(chapterInfoByBookName2[bibleInfo.fullNameKr]).reduce((prev, cur) => prev + cur, 0),
});

const newVerse = (verseNumber: number, text = '') => ({ verseNumber, text })

const newChapter = (numOfVerses: number) =>
  Array.from({ length: numOfVerses })
    .map((_, i) => i+1)
    .reduce((prev, chapterNum) => ({ ...prev, [chapterNum]: newVerse(chapterNum) }),
  {} as Verse);

const newChapters = (bibleInfo: BibleInfo): { [chapter: number]: Chapter; } =>
  Object.entries(chapterInfoByBookName2[bibleInfo.fullNameKr]).reduce(
    (prev, cur) => ({ ...prev, [cur[0]]: newChapter(cur[1]) }),
    {} as { [chapter: number]: Chapter; })

const newBook = (bibleInfo: BibleInfo): Book => ({
  bookInfo: newBookInfo(bibleInfo),
  chapters: newChapters(bibleInfo)
});

const bible = bibleInfos.reduce(
  (prev, cur) => ({ ...prev, [cur.shortNameKr]: newBook(cur) }),
  {} as Bible)

const getBookChapterLimit = (bookName: ShortBookNameKr) => Object.keys(bible[bookName].chapters).length
const getBookChapterVerseLimit = (bookName: ShortBookNameKr, chapterNumber: number) =>
  isClamp(chapterNumber, 1, getBookChapterLimit(bookName))
    ? Object.keys(bible[bookName].chapters[chapterNumber]).length
    : -1

export const parseArgument = (args: string[]): BibleRequestInfo => {

  if (args.length < 3) {
    throw new Error('Invalid Argument Error. 최소 3개의 인자를 가져야 합니다. 실행 예시: ./파일명 성경이름 장 시작절 [끝절]');
  }

  let [bookName, chapterNumberString, verseNumberStringStart, verseNumberStringEnd] = args;

  if (args.length == 3) {
    verseNumberStringEnd = verseNumberStringStart;
  }

  if (!shortBookNameKrs.has(bookName)) {
    throw new Error('Invalid Argument Error. "성경이름"은 다음 중 하나이여야 합니다. ' + Array.from(shortBookNameKrs).join(' | '));
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

  const [chapterNumber, verseNumberStart, verseNumberEnd] = [chapterNumberString, verseNumberStringStart, verseNumberStringEnd].map(numString => Number(numString));

  const bookChapterLimit = getBookChapterLimit(bookName as ShortBookNameKr);

  if (!isClamp(chapterNumber, 1, bookChapterLimit)) {
    throw new Error(`Invalid Argument Error. ${bookName}은 1장부터 ${bookChapterLimit}장까지 존재합니다.`);
  }

  const bookChapterVerseLimit = getBookChapterVerseLimit(bookName as ShortBookNameKr, chapterNumber);

  if (!isClamp(verseNumberStart, 1, bookChapterVerseLimit) || !isClamp(verseNumberEnd, 1, bookChapterVerseLimit)) {
    throw new Error(`Invalid Argument Error. ${bookName} ${chapterNumber}장은 1절에서 ${bookChapterVerseLimit}절까지 존재합니다.`);
  }

  return { bookName: bookName as ShortBookNameKr, chapterNumber, verseNumberStart, verseNumberEnd };
}