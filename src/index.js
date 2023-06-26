import { argv, stdin as input, stdout as output } from "process";
import readline from "readline";
import {
  getHomeDirectory,
  getUpDirectory,
  changeDirectory,
} from "./fs/path-manager.js";
import { getOsInfo } from "./os/os.js";
import { dispatchFileCommand } from "./fs/fs-dispatcher.js";
const readLine = readline.createInterface({ input, output });
let userName = "Unknown User";
export const INVALID_INPUT_MESSAGE = "Invalid input";
export const OPERATION_FAILED_MESSAGE = "Operation failed";
export const FILE_CREATED = "File was created!";
export const FILE_RENAMED = "File was renamed";
export const FILE_COPIED = "File was copied";
export const FILE_MOVED = "File was moved";
export const FILE_REMOVED = "File was removed";
export const FILE_COMPRESSED = "File was compressed";
export const FILE_DECOMPRESSED = "File was decompressed";
let currentPath = "";
const fileOperationCommands = [
  "ls",
  "mv",
  "cat",
  "add",
  "rn",
  "rm",
  "cp",
  "compress",
  "decompress",
];

const sayHi = () => {
  const message = `Welcome to the File Manager, ${userName}!`;
  printMessage(message);
};

const sayBye = () => {
  const message = `Thank you for using File Manager, ${userName}, goodbye!`;
  printMessage(message);
};

const printPath = (path) => {
  const message = `You are currently in ${path}`;
  printMessage(message);
};

export const printMessage = (message) => {
  output.write(message);
  output.write("\n");
};

const parseUserNameFromArgs = () => {
  const args = argv;
  let values = [];
  if (args.length === 3 && /^--/.test(args[2])) {
    values = args[2].split("=");
  }

  if (values.length == 2) {
    userName = values[1];
  }
};

const init = () => {
  parseUserNameFromArgs();
  sayHi();
  currentPath = getHomeDirectory();
  printPath(currentPath);
};

readLine.on("line", async (input) => {
  let inputValues = input.split(" ");

  if (inputValues[0] === ".exit") {
    process.exit();
  }

  try {
    if (inputValues[0] === "os") {
      getOsInfo(inputValues[1]);
    } else if (
      fileOperationCommands.some((comand) => comand === inputValues[0])
    ) {
      dispatchFileCommand(inputValues, currentPath);
    } else if (inputValues[0] === "up") {
      currentPath = getUpDirectory(currentPath);
    } else if (inputValues[0] === "cd") {
      currentPath = await changeDirectory(currentPath, inputValues[1]);
    } else {
      printMessage(INVALID_INPUT_MESSAGE);
    }
  } catch (e) {
    printMessage(OPERATION_FAILED_MESSAGE);
  }

  printPath(currentPath);
});

process.on("exit", () => sayBye());

init();
