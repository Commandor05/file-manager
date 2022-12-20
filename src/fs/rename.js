import { rename } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, FILE_RENAMED, printMessage } from '../index.js';

export const renameFile = async (sourcePath, destinationPath) => {
  try {
    await rename(sourcePath, destinationPath);
    printMessage(FILE_RENAMED);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};