import { rm } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';

export const removeFile = async (filePath) => {
  try {
    await rm(filePath);
  } catch (e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};