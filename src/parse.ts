import * as fs from "fs";
import * as path from "path";

enum BasicModelType {
  Integer = "integer",
  String = "string"
}

enum NestedModelType {
  List = "list",
  NamedAPIResource = "NamedAPIResource",
  APIResource = "APIResource"
}

type ExtendingModelTypes =
  | NestedModelType.APIResource
  | NestedModelType.NamedAPIResource;

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
  type: BasicModelType | FieldType;
}

interface FieldType {
  type: NestedModelType;
  of: string;
}

type DocFiles = Doc[];

interface OutputItemFormat {
  name: string;
  extends?: NestedModelType.APIResource | NestedModelType.NamedAPIResource;
  properties: Record<string, string>;
}

/** Mapping of filename to map of type name to properties */
type OutputFormat = Record<string, Record<string, OutputItemFormat>>;

const TYPE_OUTPUT_DIR = path.join(__dirname, "../generated-types");

/**
 * Map that keeps track of which types extend NamedAPIResource
 * or APIResource. Should be updated when parsing each model's fields.
 */
const typeExtendsMap: Record<ExtendingModelTypes, Set<string>> = {
  [NestedModelType.NamedAPIResource]: new Set<string>(),
  [NestedModelType.APIResource]: new Set<string>()
};

/**
 * Return the correct type for the given model type.
 * @param type
 */
function getTypeFromModel(type: Field["type"]): string {
  if (type === BasicModelType.Integer) {
    return "number";
  } else if (type === BasicModelType.String) {
    return "string";
  } else if (type.type === NestedModelType.List) {
    return `${type.of}[]`;
  } else {
    return type.of;
  }
}

/**
 * Generate types given a path to the directory where the
 * pokeapi docs live.
 * @param dir
 */
export function generateTypes(dir: string) {
  const outputTypes = fs.readdirSync(dir).reduce<OutputFormat>((res, file) => {
    const filename = path.basename(dir + file, path.extname(file));
    const generatedTypes = parseFile(dir + file);
    res[filename] = generatedTypes;
    return res;
  }, {});
  //TODO: make a pass through all types and check for extends property in typeExtendsMap
  const outputWithExtends = addExtendsProperty(outputTypes);
  //TODO: Output types -- look at how dts-gen outputs types to files
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
      // If the field extends an api resource, add it to the proper set
      if (
        typeof field.type === "object" &&
        field.type.type !== NestedModelType.List
      ) {
        // Need to trim because of bad docs files with extra spaces
        const trimmedType: ExtendingModelTypes = field.type.type.trim() as ExtendingModelTypes;
        typeExtendsMap[trimmedType].add(field.name);
      }
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
function addExtendsProperty(builtOutput: OutputFormat): OutputFormat {
  // TODO: iterate over all keys and update the extends property as needed -- use extendsWhichResource
  return builtOutput;
}

/**
 * Returns whether or not the passed name extends an
 * API resource.
 * @param name
 */
function extendsWhichResource(name: string): ExtendingModelTypes | undefined {
  if (typeExtendsMap[NestedModelType.NamedAPIResource].has(name)) {
    return NestedModelType.NamedAPIResource;
  }

  return typeExtendsMap[NestedModelType.APIResource].has(name)
    ? NestedModelType.APIResource
    : undefined;
}
