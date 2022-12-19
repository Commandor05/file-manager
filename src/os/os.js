import os from 'os';
import { INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE, printMessage } from '../index.js';

export const getOsInfo = (option) => {
  const trimedOption = option.trim();
  try{
    switch (trimedOption) {
      case '--EOL': 
        printMessage(JSON.stringify(os.EOL)); 
        break;
      case '--cpus': 
        os.cpus().forEach(item => printMessage(item.model)); 
        break;
      case '--homedir': 
        printMessage(os.homedir());
        break;
      case '--architecture': 
        printMessage(os.arch()); 
        break;
      case '--username': 
        printMessage(os.userInfo({ encoding: "buffer" }).username); 
        break;
      default: 
        printMessage(INVALID_INPUT_MESSAGE);
    }
  } catch(e) {
    printMessage(OPERATION_FAILED_MESSAGE);
  }
}