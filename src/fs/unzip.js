import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import path from 'path';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
import { OPERATION_FAILED_MESSAGE, FILE_DECOMPRESSED, printMessage } from '../index.js';

export const decompress = async (sourcePath, destinationPath) => {
  const destinationParsedPath = path.parse(destinationPath);
  const decompress = createUnzip();

  try {
    await access(sourcePath);
    await access(destinationParsedPath);
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath); 

    pipeline(
      source,
      decompress,
      destination,
      (err) => {
          if (err) {
            throw new Error(OPERATION_FAILED_MESSAGE);
          }
      }
    );
    printMessage(FILE_DECOMPRESSED);
  } catch(e) {
    printMessage(OPERATION_FAILED_MESSAGE);
  }  
};