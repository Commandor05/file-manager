import fs from 'fs';
import path from 'path';
import { access } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, FILE_COPIED, printMessage } from '../index.js';

export const copyFile = async (sourcePath, destinationPath) => {
  const destinationParsedPath = path.parse(destinationPath);
  try {
    await access(sourcePath);
    await access(destinationParsedPath.dir);
    const readStream = fs.createReadStream(sourcePath);
    let writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    printMessage(FILE_COPIED);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};