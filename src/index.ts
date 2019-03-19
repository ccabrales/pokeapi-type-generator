import * as path from "path";
import { removeFilesWithoutExt } from "./files-utils";
import { generateTypes } from "./parse";

const svnUltimate = require("node-svn-ultimate");

// Retrieve JSON files from the docs repo https://github.com/PokeAPI/pokeapi.co/tree/master/src/docs
const DOCS_FOLDER = "https://github.com/PokeAPI/pokeapi.co/trunk/src/docs";
const OUTPUT_DOCS = path.join(__dirname, "../pokeapi-docs-dl/");

svnUltimate.commands.export(
  DOCS_FOLDER,
  OUTPUT_DOCS,
  undefined,
  (err: Error) => {
    if (err) {
      throw err;
    } else {
      removeFilesWithoutExt(OUTPUT_DOCS);
      generateTypes(OUTPUT_DOCS);
    }
  }
);
