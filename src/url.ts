import { bibleInfos } from "./data2";
import { fullNameKrToQueryName } from "./data3";

const BASE_URL = "https://www.bskorea.or.kr/bible/korbibReadpage.php?"
const defaultVersion = "GAE"

export const getUrl = (bookName: ShortBookNameKr, chapterNumber: number, verseNumberStart?: number, version?: string) => {
  const fullNameKr =  (bibleInfos.find(info => info.shortNameKr === bookName) as BibleInfo).fullNameKr
  const queryBookName = fullNameKrToQueryName[fullNameKr];
  const versionQuery = `version=${version ?? defaultVersion}`
  const bookQuery = `book=${queryBookName}`
  const chapterQuery = `chap=${chapterNumber}`
  const verseQuery = `sec=${verseNumberStart ?? 1}`
  const queryString = [versionQuery, bookQuery, chapterQuery, verseQuery].join('&');
  return BASE_URL + queryString;
}
