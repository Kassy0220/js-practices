import * as readline from "node:readline";
import { stdin as input } from "node:process";

export function readStdin() {
  const rl = readline.createInterface({ input });
  const stdin = [];

  return new Promise((resolve, reject) => {
    rl.on("line", (line) => {
      stdin.push(line + "\n");
    });

    rl.on("close", () => {
      if (isEmpty(stdin)) {
        reject(new Error("メモの内容を入力してください"));
      } else {
        resolve(stdin);
      }
    });
  });
}

function isEmpty(array) {
  if (array.length === 0) {
    return true;
  } else {
    return false;
  }
}
