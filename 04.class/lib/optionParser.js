export class OptionParser {
  static parse(argv) {
    delete argv._;
    const option = Object.keys(argv)[0];

    if (option === undefined) {
      // オプションが指定されていない場合は'create'を返す
      return "create";
    } else {
      return OptionParser.#returnOptionName(option);
    }
  }

  static #returnOptionName(option) {
    switch (option) {
      case "l":
      case "list":
        return "list";
      case "r":
      case "refer":
        return "refer";
      case "d":
      case "delete":
        return "delete";
    }
  }
}
