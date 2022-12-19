import { rename } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';

export const renameFile = async (sourcePath, destinationPath) => {
  try {
    await rename(sourcePath, destinationPath);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};