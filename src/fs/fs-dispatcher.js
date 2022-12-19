import path, { sep } from 'path';
import { OPERATION_FAILED_MESSAGE, INVALID_INPUT_MESSAGE, printMessage } from '../index.js';

import { getDirectoryList } from './list.js';
import { readFile } from './read.js';
import { createFile } from './create.js';
import { renameFile } from './rename.js';
import { copyFile } from './copy.js';
import { moveFile } from './move.js';
import { removeFile } from './remove.js';
import { calculateHash } from './hash.js';
import { compress } from './zip.js';
import { decompress } from './unzip.js';

export const dispatchFileCommand = async (inputValues, currentPath) => {
  let sourcePath = '';
  let targetPath = '';

  try{
    switch (inputValues[0]) {
      case 'ls': 
        await getDirectoryList(currentPath); 
        break;
      case 'cat':
        targetPath = path.resolve(currentPath, inputValues[1]);
        await readFile(targetPath); 
        break;
      case 'add':
        targetPath = path.resolve(currentPath, inputValues[1]);
        await createFile(targetPath); 
        break;
      case 'rn':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);
          targetPath = path.resolve(currentPath , inputValues[2]);

          await renameFile(sourcePath, targetPath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;
      case 'cp':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);

          let destination = path.resolve(currentPath , inputValues[2]);
           
          targetPath = inputValues[1].includes(sep)? 
            path.join(destination, inputValues[1].split(sep).pop) :
            path.join(destination, inputValues[1]);

          await copyFile(sourcePath, targetPath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'mv':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);

          let destination = path.resolve(currentPath , inputValues[2]);
           
          targetPath = inputValues[1].includes(sep)? 
            path.join(destination, inputValues[1].split(sep).pop) :
            path.join(destination, inputValues[1]);
          
          await moveFile(sourcePath, targetPath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;  
      case 'rm':
        if (inputValues[1]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);

          await removeFile(sourcePath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;  
      case 'hash':
        if (inputValues[1]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);

          await calculateHash(sourcePath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'compress':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);
          let destination = path.resolve(currentPath , inputValues[2]);
           
          await compress(sourcePath, destination);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'decompress':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.resolve(currentPath , inputValues[1]);

          let destination = path.resolve(currentPath , inputValues[2]);

          await decompress(sourcePath, destination);  
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;  
      default: 
        printMessage(INVALID_INPUT_MESSAGE);
    }
  } catch(e) {
    printMessage(OPERATION_FAILED_MESSAGE);
  }
}