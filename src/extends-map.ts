import { Field, FieldType, NestedModelType } from "./parse";

type ExtendingModelTypes =
  | NestedModelType.APIResource
  | NestedModelType.NamedAPIResource;

type TypeExtendsMap = Record<ExtendingModelTypes, Set<string>>;

/**
 * Class to manage the map of what type extends which resource.
 */
export class ExtendsMap {
  /**
   * Map that keeps track of which types extend NamedAPIResource
   * or APIResource. Should be updated when parsing each model's fields.
   */
  private typeExtendsMap: TypeExtendsMap;

  constructor() {
    this.typeExtendsMap = {
      [NestedModelType.NamedAPIResource]: new Set<string>(),
      [NestedModelType.APIResource]: new Set<string>()
    };
  }

  /**
   * Add the field type to the extends map if needed
   * @param field
   */
  public addFieldToExtendsMap(field: Field) {
    // If the field extends from an api resource, add it to the proper set
    if (typeof field.type === "object") {
      if (typeof field.type.of === "object") {
        this.addTypeToExtendsMap(field.type.of);
      } else if (field.type.type !== NestedModelType.List) {
        this.addTypeToExtendsMap(field.type);
      }
    }
  }

  /**
   * Returns whether or not the passed name extends an
   * API resource.
   * @param name
   */
  public extendsWhichResource(
    modelName: string
  ): ExtendingModelTypes | undefined {
    if (this.typeExtendsMap[NestedModelType.NamedAPIResource].has(modelName)) {
      return NestedModelType.NamedAPIResource;
    }

    return this.typeExtendsMap[NestedModelType.APIResource].has(modelName)
      ? NestedModelType.APIResource
      : undefined;
  }

  /**
   * Trim the type and add it to the extends map
   * @param type
   */
  private addTypeToExtendsMap(type: FieldType) {
    // Need to trim because of bad docs files with extra spaces
    const trimmedType: ExtendingModelTypes = type.type.trim() as ExtendingModelTypes;
    this.typeExtendsMap[trimmedType].add(type.of as string);
  }
}
