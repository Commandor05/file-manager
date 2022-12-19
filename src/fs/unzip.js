import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
import { OPERATION_FAILED_MESSAGE, FILE_DECOMPRESSED, printMessage } from '../index.js';

export const decompress = async (sourcePath, destinationPath) => {
  const decompress = createUnzip();

  try {
    await access(sourcePath);
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