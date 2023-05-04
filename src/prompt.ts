import * as readlineSync from 'readline-sync';
import { queryVersionNames } from './data3';

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
