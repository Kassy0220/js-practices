import { v4 as uuidv4 } from "uuid";
import dateFormat from "dateformat";
import { Memo } from "./memo.js";
import { MemoDB } from "./memoDB.js";
import { createPrompt } from "./createPrompt.js";
import { readStdin } from "./readStdin.js";

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
      case "list":
        this.#listAllMemos();
        break;
      case "refer":
        this.#referToMemo();
        break;
      case "delete":
        this.#deleteMemo();
        break;
    }
  }

  async #createMemo() {
    const memoContent = await readStdin();
    const date = dateFormat(new Date(), "yyyy/mm/dd HH:MM:ss");
    const memo = new Memo({
      id: uuidv4(),
      content: memoContent.join(""),
      createdAt: date,
      updatedAt: date,
    });
    MemoDB.saveMemo(memo.id, memo.content, memo.createdAt, memo.updatedAt);
  }

  async #listAllMemos() {
    const allMemos = await MemoDB.retrieveAllMemos();
    allMemos.forEach((memo) => {
      console.log(memo.content.trim().split("\n")[0]);
    });
  }

  async #referToMemo() {
    const allMemos = await MemoDB.retrieveAllMemos();
    const prompt = createPrompt(allMemos, "see");
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
    const prompt = createPrompt(allMemos, "delete");
    prompt
      .run()
      .then((memoId) => {
        MemoDB.deleteMemo(memoId);
      })
      .catch(console.error);
  }
}
