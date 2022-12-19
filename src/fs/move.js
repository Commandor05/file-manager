import fs, { rm } from 'fs';
import { access, stat } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';

export const moveFile = async (sourcePath, destinationPath) => {
  try {
    await access(sourcePath);
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
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};