import { homedir } from 'os';
import path, { sep } from 'path';
import { access } from 'fs/promises';
import { OPERATION_FAILED_MESSAGE } from '../index.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHomeDirectory = () => {
  return homedir();
}

export const getUpDirectory =  (currentPath) => {
  const pathArray = currentPath.split(sep);
  if (pathArray.length > 1) {
    pathArray.pop();
  }

  return pathArray.join(sep) || sep;
}

export const changeDirectory = async (currentPath, newPath) => {
  const isAbsolutePath = path.isAbsolute(newPath);
  let resultPath = path.resolve(newPath);

  try {
    if (!isAbsolutePath) {
      resultPath = path.resolve(currentPath, newPath);
    }

    await access(resultPath);
    return resultPath;
  } catch(e) {
    printMessage(OPERATION_FAILED_MESSAGE);
    return currentPath;
  } 
}