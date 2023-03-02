#!/usr/bin/env node

import minimist from "minimist";
import { MemoApp } from "../lib/memoApp.js";
import { OptionParser } from "../lib/optionParser.js";

const argv = minimist(process.argv.slice(2));
const option = OptionParser.parse(argv);

const memoApp = new MemoApp(option);
memoApp.main();
