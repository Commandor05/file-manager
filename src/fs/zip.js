import { createReadStream, createWriteStream } from 'fs';
import { access } from 'fs/promises';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { OPERATION_FAILED_MESSAGE, printMessage } from '../index.js';

export const compress = async (sourcePath, destinationPath) => {
  const gzip = createGzip();
  try{
    await access(sourcePath);
    const source = createReadStream(sourcePath);
    const destination = createWriteStream(destinationPath);

    pipeline(
        source,
        gzip,
        destination,
        (err) => {
            if (err) {
              printMessage(OPERATION_FAILED_MESSAGE);
            }
        }
    );
    } catch(e) {
      printMessage(OPERATION_FAILED_MESSAGE);
    }  
};