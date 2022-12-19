import fs, { rm } from 'fs';
import path from 'path';
import { access } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, FILE_MOVED, printMessage } from '../index.js';

export const moveFile = async (sourcePath, destinationPath) => {
  const destinationParsedPath = path.parse(destinationPath);
  try {
    await access(sourcePath);
    await access(destinationParsedPath.dir);
    const readStream = fs.createReadStream(sourcePath);
    let writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    writeStream.on('finish', () => {
      rm(sourcePath, {},  (err) => {
        if(err){
            throw new Error(OPERATION_FAILED_MESSAGE);
        }

      })
    });
    printMessage(FILE_MOVED);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};