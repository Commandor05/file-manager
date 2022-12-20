import { rm } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE, FILE_REMOVED, printMessage } from '../index.js';

export const removeFile = async (filePath) => {
  try {
    await rm(filePath);
    printMessage(FILE_REMOVED);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};