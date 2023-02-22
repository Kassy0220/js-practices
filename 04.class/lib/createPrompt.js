import enquirer from "enquirer";

export function createPrompt(allMemos, message) {
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
