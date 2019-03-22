import * as fs from "fs";
import * as path from "path";
import { ExtendsMap } from "./extends-map";
import { buildOutput } from "./build-output";

enum BasicModelType {
  Boolean = "boolean",
  Integer = "integer",
  String = "string"
}

export enum NestedModelType {
  List = "list",
  NamedAPIResource = "NamedAPIResource",
  APIResource = "APIResource"
}

interface Doc {
  name: string;
  description: string;
  exampleRequest: string;
  exampleResponse: object;
  responseModels: ResponseModel[];
}

interface ResponseModel {
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
  description: string;
  type: BasicModelType | FieldType | string;
}

export interface FieldType {
  type: NestedModelType;
  of: string | FieldType;
}

type DocFiles = Doc[];

export interface OutputItemFormat {
  name: string;
  extends?: NestedModelType.APIResource | NestedModelType.NamedAPIResource;
  properties: Record<string, string>;
}

/** Mapping of filename to map of type name to properties */
export type PropertyMapOutput = Record<string, OutputItemFormat>;
export type ParsedOutput = Record<string, PropertyMapOutput>;

const extendsMap = new ExtendsMap();

/**
 * Return the correct type for the given model type.
 * @param type
 */
function getTypeFromModel(type: Field["type"]): string {
  if (type === BasicModelType.Integer) {
    return "number";
  } else if (type === BasicModelType.String) {
    return "string";
  } else if (type === BasicModelType.Boolean) {
    return "boolean";
  } else if (typeof type === "string") {
    return type;
  } else if (type.type === NestedModelType.List) {
    if (typeof type.of === "object") {
      return `${type.of.of}[]`;
    }
    return `${type.of}[]`;
  } else {
    return typeof type.of === "object" ? (type.of.of as string) : type.of;
  }
}

/**
 * Generate types given a path to the directory where the
 * pokeapi docs live.
 * @param dir
 */
export function generateTypes(dir: string) {
  const outputTypes = fs.readdirSync(dir).reduce<ParsedOutput>((res, file) => {
    const filename = path.basename(dir + file, path.extname(file));
    const generatedTypes = parseFile(dir + file);
    res[filename] = generatedTypes;
    return res;
  }, {});
  const outputWithExtends = addExtendsProperty(outputTypes);
  buildOutput(outputWithExtends);
}

/**
 * Parse an individual file and add its output to the record
 * of output types.
 * @param filePath
 */
function parseFile(filePath: string): Record<string, OutputItemFormat> {
  const contents = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(contents) as DocFiles;

  // name property will be the key for which is currently being parsed. check the set, then add it
  return data.reduce<Record<string, OutputItemFormat>>((res, resource) => {
    resource.responseModels.forEach(model => {
      res[model.name] = buildInterface(model);
    });
    return res;
  }, {});
}

/**
 * Build an interface for each field on the type
 * @param model
 */
function buildInterface(model: ResponseModel): OutputItemFormat {
  const properties = model.fields.reduce<OutputItemFormat["properties"]>(
    (res, field) => {
      res[field.name] = getTypeFromModel(field.type);
      extendsMap.addFieldToExtendsMap(field);
      return res;
    },
    {}
  );

  return {
    name: model.name,
    properties
  };
}

/**
 * Runs through the built list and updates each interface with
 * the extends property if needed.
 * @param builtOutput
 */
function addExtendsProperty(builtOutput: ParsedOutput): ParsedOutput {
  const withExtends = Object.entries(builtOutput).reduce<ParsedOutput>(
    (res, [key, val]) => {
      const newVal = Object.entries(val).reduce<
        Record<string, OutputItemFormat>
      >((valRes, [valKey, valVal]) => {
        const updatedModelVal = {
          ...valVal,
          extends: extendsMap.extendsWhichResource(valKey)
        };
        valRes[valKey] = updatedModelVal;
        return valRes;
      }, {});
      res[key] = newVal;
      return res;
    },
    {}
  );
  return withExtends;
}
