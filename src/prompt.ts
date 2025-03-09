import type { BibleRequestInfo } from '../type/index';
import * as readline from 'readline';
import { queryVersionNames } from './data3';
import { parseArgument } from './parse';
import { checkIsWindowFromProcess } from './utils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer.trim());
    });
  });
};

export const promptWithOptions = async (optionName: string, options: string[], defaultOption = '') => {
  const makePromptMessage = () => 
    `${optionName}을 선택해주세요.` + (!!defaultOption ? `(default: ${defaultOption})` : '') + '\n' + `[${options.join(', ')}]: `
  const promptMessage = makePromptMessage();
  const setOptions = Array.isArray(options) ? new Set(options) : options;
  let userInput = '';

  do {
    userInput = (await question(promptMessage))|| defaultOption;
  } while (!setOptions.has(userInput));

  console.log(`${optionName}은 ${userInput}로 선택하셨습니다.`);
  return userInput;
}

export const queryVersionPrompt = async () => {
  const queryVersionOptionName = '역본';
  const queryVersionOptions = Object.keys(queryVersionNames);
  const versionSelectedKr = await promptWithOptions(queryVersionOptionName, queryVersionOptions, '개역개정');
  const queryVersionName = queryVersionNames[versionSelectedKr];
  return queryVersionName;
}

export const windowCheckPrompt = async () => {
  const promptMessage = `window에서 사용할 것이라면 y를 입력해주세요. (default: 운영체제 자동 감지): `;
  const autoCheckIsWindow = checkIsWindowFromProcess();
  const isWindow = (await question(promptMessage)) === 'y' || autoCheckIsWindow;
  console.log(`window 사용 여부가 ${isWindow}로 체크되었습니다.`);
  return isWindow;
}

export const promptQueries = async () => {
  const bibleRequestInfos: BibleRequestInfo[] = [];
  
  console.log("찾을 성경 구절을 입력하세요. (e.g. 창 1 1 2) | 그만 하시려면 y를 입력하세요");
  
  let userInput = '';
  
  while (true) {
    userInput = await question("찾을 성경 구절: ");
    
    if (userInput === "y" || userInput === "Y") {
      break;
    }
    
    if (userInput) {
      const args = userInput.trim().split(/\s+/);
      
      try {
        bibleRequestInfos.push(parseArgument(args));
      } catch (error) {
        console.log(`올바르지 못한 입력입니다. 창 1 1 2 같은 형식으로 입력하세요. (입력값: ${userInput})`);
      }
    }
  }

  // rl.close(); // readline 인터페이스 닫기
  return bibleRequestInfos;
}
