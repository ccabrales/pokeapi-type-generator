const svnUltimate = require("node-svn-ultimate");

// Retrieve JSON files from the docs repo https://github.com/PokeAPI/pokeapi.co/tree/master/src/docs
const DOCS_FOLDER = "https://github.com/PokeAPI/pokeapi.co/trunk/src/docs";
const FILE_EXT = ".json";

svnUltimate.commands.export(
  DOCS_FOLDER,
  "./pokeapi-docs-dl",
  undefined,
  (err: Error) => {
    if (err) {
      console.log("Error downloading doc files:", err.message);
    } else {
      // TODO: Only keep .json files
      // TODO: Begin parsing the files and building types
    }
  }
);
