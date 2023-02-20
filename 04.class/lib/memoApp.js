import * as readline from "node:readline";
import { stdin as input } from "node:process";
import { v4 as uuidv4 } from "uuid";
import dateFormat from "dateformat";
import { Memo } from "./memo.js";
import { MemoDB } from "./memoDB.js";

export class MemoApp {
  #option;

  constructor(option) {
    this.#option = option;
  }

  main() {
    switch (this.#option) {
      case "create":
        this.#createMemo();
        break;
      case "l":
        this.#listAllMemos();
        break;
    }
  }

  async #createMemo() {
    const memoContent = await this.#readStdin();
    const date = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
    const memo = new Memo({
      id: uuidv4(),
      content: memoContent.join(""),
      createdAt: date,
      updatedAt: date,
    });
    MemoDB.saveMemo(memo.id, memo.content, memo.createdAt, memo.updatedAt);
  }

  #readStdin() {
    const rl = readline.createInterface({ input });
    const stdin = [];

    return new Promise((resolve, reject) => {
      rl.on("line", (line) => {
        stdin.push(line + "\n");
      });

      rl.on("close", () => {
        if (this.#isEmpty(stdin)) {
          reject(new Error("メモの内容を入力してください"));
        } else {
          resolve(stdin);
        }
      });
    });
  }

  #isEmpty(array) {
    if (array.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  async #listAllMemos() {
    const allMemos = await MemoDB.retrieveAllMemos();
    allMemos.forEach((memo) => {
      console.log(memo.content.trim().split("\n")[0]);
    });
  }
}
