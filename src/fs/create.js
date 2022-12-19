import { writeFile } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';

export const createFile = async (filePath) => {
  try {
    await writeFile(filePath, '');
  } catch(e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
}
