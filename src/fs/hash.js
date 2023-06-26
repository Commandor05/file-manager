import { createHash, } from 'crypto';
import { readFile } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, printMessage } from '../index.js';

export const calculateHash = async (destinationFilePath) => {
  try {
    const fileBuffer = await readFile(destinationFilePath, { encoding: 'utf8' });
    const hash = createHash('sha256');
    hash.update(fileBuffer);
  
    const hex = hash.digest('hex');
    printMessage(hex);
  } catch(e) {
    printMessage(OPERATION_FAILED_MESSAGE);
  }
};
