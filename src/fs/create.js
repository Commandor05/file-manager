import { writeFile } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, FILE_CREATED, printMessage } from '../index.js';

export const createFile = async (filePath) => {
  try {
    await writeFile(filePath, '');
    printMessage(FILE_CREATED);
  } catch(e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
}
