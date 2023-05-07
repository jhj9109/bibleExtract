import type { ShortBookNameKr, BibleInfo } from "../type/index"
import { bibleInfos } from "./data2";
import { fullNameKrToQueryName } from "./data3";

const BASE_URL = "https://www.bskorea.or.kr/bible/korbibReadpage.php?"
const DEFAULT_VERSION_NAME = "GAE"; // 개역개정

export const getUrl = (bookName: ShortBookNameKr, chapterNumber: number, verseNumberStart?: number, version = DEFAULT_VERSION_NAME) => {
  const fullNameKr =  (bibleInfos.find(info => info.shortNameKr === bookName) as BibleInfo).fullNameKr
  const queryBookName = fullNameKrToQueryName[fullNameKr];
  const versionQuery = `version=${version}`
  const bookQuery = `book=${queryBookName}`
  const chapterQuery = `chap=${chapterNumber}`
  const verseQuery = `sec=${verseNumberStart ?? 1}`
  const queryString = [versionQuery, bookQuery, chapterQuery, verseQuery].join('&');
  return BASE_URL + queryString;
}