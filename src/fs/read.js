const { stdout } = process;
import fs from 'fs';
import { access, stat } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';

export const readFile = async (destinationFilePath) => {
  try {
    await checkFileAccess(destinationFilePath);

    const readStream = fs.createReadStream(destinationFilePath, 'utf-8');
    readStream.on('data', chunk => stdout.write(chunk));
    readStream.on('end', () => stdout.write('\n'));
  } catch(e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};


const checkFileAccess = async (filePath) => {
  try {
    await access(filePath);
    const itemStat = await stat(filePath);
    if (itemStat.isDirectory()) {
      throw new Error(OPERATION_FAILED_MESSAGE);
    }
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};
