import { readdir } from 'fs/promises';
import path from 'path';
import { OPERATION_FAILED_MESSAGE } from '../index.js';
const DIRECTORY = 'directory';
const FILE = 'file';

export const getDirectoryList = async (currentPath) => {
  const targetPath = path.resolve(currentPath);
  let files = null;
  const list = [];

  try {
    files = await readdir(targetPath, { withFileTypes: true },);
    function DirectoryItem(name, type) {
      this.Name = name;
      this.Type = type;
    }
    
    if (files) {
      files.forEach(file => {
        const type = file.isDirectory() ? DIRECTORY : FILE;
        list.push(new DirectoryItem(file.name, type)) ;
      });
    }

    console.table(list, ['Name', 'Type']);
  } catch(e) {
    throw new Error(OPERATION_FAILED_MESSAGE);
  }
};
