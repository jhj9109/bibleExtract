#!/usr/bin/env ts-node
// @ts-ignore
// @ts-check
// @ts-nocheck

import * as process from 'process';
import axios from 'axios';
import * as fs from 'fs';
import { queryVersionPrompt } from './prompt';

import { extractVersesFromHtmlString, getTextString } from './utils'
import { parseArgument } from './parse'
import { getUrl } from './url'

async function main(args: string[]) {
  const writeCallback = (err: NodeJS.ErrnoException) =>
    err ? console.error(err) : console.log('파일이 "output.txt"이름으로 성공적으로 저장되었습니다.');
  
  const queryVersionName = queryVersionPrompt();

  const { bookName, chapterNumber, verseNumberStart, verseNumberEnd } = parseArgument(args);

  // 1. args에서 타겟을 설정하기 => bookName && chapter => url
  const requestUrl = getUrl(bookName, chapterNumber, verseNumberStart, queryVersionName);

  // console.log("============= requestUrl ================");
  // console.log(requestUrl)
  
  // 2. url로 요청후 응답 받기
  const response = await axios.get(requestUrl);
  const htmlString = await response.data;
  
  // console.log("============= htmlString ================");
  // console.log(htmlString)

  // 3. 응답에서 verses 추출
  const verses = extractVersesFromHtmlString(
    htmlString,
    bookName,
    chapterNumber,
    verseNumberStart,
    verseNumberEnd
  );

  // console.log("============= verses ================");
  // console.log(verses);

  // 4. verses를 가지고 파일에 작성할 String 생성
  const textString = getTextString(
    verses,
    bookName,
    chapterNumber,
    verseNumberStart,
    verseNumberEnd,
  );

  // console.log("============= textString ================");
  // console.log(textString);

  // fs.appendFile('output.txt', textString, writeCallback);
  fs.writeFile('output.txt', textString, writeCallback);
}

if (require.main === module) {
  // process.argv
  // 0: /home/codespace/nvm/current/bin/ts-node
  // 1: /workspaces/sunmin/a.ts
  const args = process.argv.slice(2);
  try {
    main(args);
  } catch (error) {
    console.error(`Failed to parse JSON: ${error.message}`);
  }
}

export { main };