import * as readline from "node:readline";
import { stdin as input } from "node:process";
import { v4 as uuidv4 } from "uuid";
import dateFormat from "dateformat";
import enquirer from "enquirer";
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
      case "r":
        this.#referToMemo();
        break;
      case "d":
        this.#deleteMemo();
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

  async #referToMemo() {
    const allMemos = await MemoDB.retrieveAllMemos();
    const prompt = this.#createPrompt(allMemos, "see");
    prompt
      .run()
      .then((memoId) => {
        const choosedMemo = allMemos.find((memo) => {
          return memo.id === memoId;
        });
        console.log(choosedMemo.content.trim());
      })
      .catch(console.error);
  }

  async #deleteMemo() {
    const allMemos = await MemoDB.retrieveAllMemos();
    const prompt = this.#createPrompt(allMemos, "delete");
    prompt
      .run()
      .then((memoId) => {
        MemoDB.deleteMemo(memoId);
      })
      .catch(console.error);
  }

  #createPrompt(allMemos, message) {
    const { Select } = enquirer;
    const prompt = new Select({
      name: "memoId",
      message: `Choose memo you want to ${message}`,
      choices: allMemos.map((memo) => {
        return { name: memo.id, message: memo.content.trim().split("\n")[0] };
      }),
    });
    return prompt;
  }
}
