export class OptionParser {
  static parse(argv) {
    delete argv._;
    const option = argv;

    if (OptionParser.#isEmpty(option)) {
      // オプションが指定されていない場合は'create'を返す
      return "create";
    } else {
      return Object.keys(option)[0];
    }
  }

  static #isEmpty(object) {
    if (Object.keys(object).length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
