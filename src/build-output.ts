import * as dom from "dts-dom";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import * as path from "path";
import { ParsedOutput, PropertyMapOutput, OutputItemFormat } from "./parse";

const BUILD_OUTPUT_DIR_NAME = "generated-types";
const TYPE_OUTPUT_DIR = path.join(__dirname, "../", BUILD_OUTPUT_DIR_NAME);
const BUILD_OUTPUT_FILE_NAME = "index.d.ts";
const MODULE_NAME = "pokeapi-js-wrapper";

export function buildOutput(parsed: ParsedOutput) {
  if (!existsSync(TYPE_OUTPUT_DIR)) {
    mkdirSync(TYPE_OUTPUT_DIR);
  }

  run(parsed);
}

function run(parsed: ParsedOutput) {
  // Create a single module to nest each interface and output at the end
  const mod = dom.create.module(MODULE_NAME);

  const interfacesMatrix = Object.entries(parsed).map(generateAllTypesForFile);
  const interfaces = [].concat.apply([], interfacesMatrix);

  mod.members.push(...interfaces);
  writeFileSync(
    path.join(TYPE_OUTPUT_DIR, BUILD_OUTPUT_FILE_NAME),
    dom.emit(mod),
    "utf-8"
  );
}

/**
 * Generate all types from a single file map
 * @param param0
 */
function generateAllTypesForFile([_, types]: [
  string,
  PropertyMapOutput
]): dom.InterfaceDeclaration[] {
  return Object.entries(types).map(generateType);
}

/**
 * Generate a single type from the member
 * @param param0
 */
function generateType([name, members]: [
  string,
  OutputItemFormat
]): dom.InterfaceDeclaration {
  // Create an interface for the new type
  const intf = dom.create.interface(name, dom.DeclarationFlags.Export);
  intf.members.push(...createInterfaceProperties(members.properties));

  // Determine whether it extends another interface
  if (members.extends) {
    intf.baseTypes = [dom.create.interface(members.extends)];
  }

  return intf;
}

function createInterfaceProperties(properties: Record<string, string>) {
  return Object.entries(properties).map(([name, type]) => {
    return dom.create.property(name, { kind: "name", name: type });
  });
}
