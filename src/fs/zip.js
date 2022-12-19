import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { access } from 'fs/promises';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { OPERATION_FAILED_MESSAGE, FILE_COMPRESSED, printMessage } from '../index.js';

export const compress = async (sourcePath, destinationPath) => {
  const destinationParsedPath = path.parse(destinationPath);
  const gzip = createGzip();
  try{
    await access(sourcePath);
    await access(destinationParsedPath.dir);
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);

      pipeline(
          source,
          gzip,
          destination,
          (err) => {
              if (err) {
                throw new Error(OPERATION_FAILED_MESSAGE);
              }
          }
      );
      printMessage(FILE_COMPRESSED);
    } catch(e) {
      printMessage(OPERATION_FAILED_MESSAGE);
    }  
};