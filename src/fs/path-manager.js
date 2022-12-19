import { homedir } from 'os';
import path, { sep } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHomeDirectory = () => {
  return homedir();
}

export const getUpDirectory = (currentPath) => {
  const pathArray = currentPath.split(sep);
  if (pathArray.length > 1) {
    pathArray.pop();
  }

  return pathArray.join(sep) || sep;
}

export const changeDirectory = (currentPath, newPath) => {
  const isAbsolutePath =path.isAbsolute(newPath);
}