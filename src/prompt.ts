import * as readlineSync from 'readline-sync';
import { queryVersionNames } from './data3';
import { parseArgument } from './parse';

export const promptWithOptions = (optionName: string, options: string[], defaultOption = '') => {
  const makePromptMessage = () => 
    `${optionName}을 선택해주세요.` + (!!defaultOption ? `(default: ${defaultOption})` : '') + '\n' + `[${options.join(', ')}]: `
  const promptMessage = makePromptMessage();
  const setOptions = Array.isArray(options) ? new Set(options) : options;
  let userInput = '';
  do {
    userInput = readlineSync.question(promptMessage) || defaultOption;
  } while (!setOptions.has(userInput));
  console.log(`${optionName}은 ${userInput}로 선택하셨습니다.`);
  return userInput;
}

export const queryVersionPrompt = () => {
  const queryVersionOptionName = '역본';
  const queryVersionOptions = Object.keys(queryVersionNames);
  const versionSelectedKr = promptWithOptions(queryVersionOptionName, queryVersionOptions, '개역개정');
  const queryVersionName = queryVersionNames[versionSelectedKr];
  return queryVersionName;
}



export const promptQueries = () => {
  const bibleRequestInfos: BibleRequestInfo[] = [];
  
  console.log("찾을 성경 구절을 입력하세요. (e.g. 창 1 1 2) | 그만 하시려면 y를 입력하세요");
  
  let userInput = '';
  
  while (true) {
    userInput = readlineSync.question("찾을 성경 구절: ");
    
    if (userInput === "y") {
      break;
    }
    
    if (userInput) {
      
      const args = (userInput as any).replaceAll(/\s{2,}/g, " ").split(" ") as string[];
      
      try {
        bibleRequestInfos.push(parseArgument(args));
      } catch (error) {
        console.log(`올바르지 못한 입력입니다. (${userInput})`);
      }

    }
  }

  return bibleRequestInfos;
}