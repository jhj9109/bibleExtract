#!/usr/bin/env ts-node
// @ts-ignore
// @ts-check
// @ts-nocheck

import axios from 'axios';
import * as fs from 'fs';
import * as https from 'https';

import { queryVersionPrompt, windowCheckPrompt, promptQueries } from './prompt';

import { extractVersesFromHtmlString, getTextString, getLineFeedString } from './utils'
import { getUrl } from './url'

// 우회 방법1
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// 우회 방법2
// const instance = axios;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function main() {
  const writeCallback = (err: NodeJS.ErrnoException) =>
    err ? console.error(err) : console.log('파일이 "output.txt"이름으로 성공적으로 저장되었습니다.');
  
  const isWindow = await windowCheckPrompt();

  const lineFeed = getLineFeedString(isWindow);
  
  const queryVersionName = await queryVersionPrompt();

  const bibleRequestInfos = await promptQueries();

  if (bibleRequestInfos.length === 0) {
    console.log("검색할 성경 구절이 입력되지 않아 종료합니다.")
    return;
  }

  try {
    const requestUrls = bibleRequestInfos.map(({ bookName, chapterNumber, verseNumberStart, verseNumberEnd }) =>
      getUrl(bookName, chapterNumber, verseNumberStart, queryVersionName));

    const response = await Promise.all(requestUrls.map(url => instance.get(url)));

    const textStrings = response.map((resp, i) => {
      const { bookName, chapterNumber, verseNumberStart, verseNumberEnd } = bibleRequestInfos[i];
      const htmlString = resp.data;

      const verses = extractVersesFromHtmlString(
        htmlString,
        bookName,
        chapterNumber,
        verseNumberStart,
        verseNumberEnd
      );

      const textString = getTextString(
        verses,
        bookName,
        chapterNumber,
        verseNumberStart,
        verseNumberEnd,
        lineFeed
      );

      return textString;
    });

    fs.writeFile('output.txt', textStrings.join(lineFeed), writeCallback);
  } catch (error) {
    console.error(error);
  }  
}

if (require.main === module) {
  main();
}
// process.argv
// 0: /home/codespace/nvm/current/bin/ts-node
// 1: /workspaces/sunmin/a.ts
// const args = process.argv.slice(2);