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

const FILE_CREATED = 'File was created!';
const FILE_RENAMED = 'File was renamed';
const FILE_COPIED = 'File was copied';
const FILE_MOVED  = 'File was moved';
const FILE_REMOVED  = 'File was removed';
const FILE_COMPRESSED  = 'File was compressed';
const FILE_DECOMPRESSED  = 'File was decompressed';

export const dispatchFileCommand = async (inputValues, currentPath) => {
  let sourcePath = '';
  let targetPath = '';

  try{
    switch (inputValues[0]) {
      case 'ls': 
        await getDirectoryList(currentPath); 
        break;
      case 'cat':
        targetPath = path.join(currentPath, inputValues[1]);
        await readFile(targetPath); 
        break;
      case 'add':
        targetPath = path.join(currentPath, inputValues[1]);
        await createFile(targetPath); 
        printMessage(FILE_CREATED);
        break;
      case 'rn':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = path.isAbsolute(inputValues[1])?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);
          targetPath = path.join(currentPath , inputValues[2]);

          await renameFile(sourcePath, targetPath); 
          printMessage(FILE_RENAMED);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;
      case 'cp':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = inputValues[1].includes(sep)?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);

          let destination = inputValues[2].includes(sep) ?
            path.resolve(inputValues[2]) :
            path.join(currentPath , inputValues[2]);
           
          targetPath = inputValues[1].includes(sep)? 
            path.join(destination, inputValues[1].split(sep).pop) :
            path.join(destination, inputValues[1]);

          await copyFile(sourcePath, targetPath); 
          printMessage(FILE_COPIED);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'mv':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = inputValues[1].includes(sep)?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);

          let destination = inputValues[2].includes(sep) ?
            path.resolve(inputValues[2]) :
            path.join(currentPath , inputValues[2]);
           
          targetPath = inputValues[1].includes(sep)? 
            path.join(destination, inputValues[1].split(sep).pop) :
            path.join(destination, inputValues[1]);
          
          await moveFile(sourcePath, targetPath); 
          printMessage(FILE_MOVED);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;  
      case 'rm':
        if (inputValues[1]) {
          sourcePath = inputValues[1].includes(sep)?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);

          await removeFile(sourcePath); 
          printMessage(FILE_REMOVED);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break;  
      case 'hash':
        if (inputValues[1]) {
          sourcePath = inputValues[1].includes(sep)?
          path.resolve(inputValues[1]) :
          path.join(currentPath , inputValues[1]);

          await calculateHash(sourcePath); 
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'compress':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = inputValues[1].includes(sep)?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);

          let destination = inputValues[2].includes(sep) ?
            path.resolve(inputValues[2]) :
            path.join(currentPath , inputValues[2]);
           
          await compress(sourcePath, destination);
          printMessage(FILE_COMPRESSED);
        } else {
          printMessage(INVALID_INPUT_MESSAGE);
        }
        break; 
      case 'decompress':
        if (inputValues[1] && inputValues[2]) {
          sourcePath = inputValues[1].includes(sep)?
            path.resolve(inputValues[1]) :
            path.join(currentPath , inputValues[1]);

          let destination = inputValues[2].includes(sep) ?
            path.resolve(inputValues[2]) :
            path.join(currentPath , inputValues[2]);

          await decompress(sourcePath, destination);  
          printMessage(FILE_DECOMPRESSED);
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