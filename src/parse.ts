import * as fs from "fs";

interface Doc {
  name: string;
  description: string;
  exampleRequest: string;
  exampleResponse: Object;
  responseModels: ResponseModel[];
}

interface ResponseModel {
  name: string;
  fields: Field[];
}

interface Field {
  name: string;
  description: string;
  type: string | FieldType;
}

interface FieldType {
  type: string;
  of: string;
}

type DocFile = Doc[];

/**
 * Generate types given a path to the directory where the
 * pokeapi docs live.
 * @param dir
 */
export function generateTypes(dir: string) {
  fs.readdirSync(dir).forEach(file => {
    parseFile(dir + file);
  });
}

function parseFile(filePath: string) {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log("data", data);
}
