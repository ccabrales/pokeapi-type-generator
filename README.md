# pokeapi-type-generator

Generate Typescript types for each resource in [PokeAPI](https://pokeapi.co/docs/v2.html/). It downloads the relevant JSON docs from the [docs site](https://github.com/PokeAPI/pokeapi.co/tree/master/src/docs), parses each file, and builds a module `pokeapi-js-wrapper` with exported interfaces for each resource. Feel free to open an issue if anything needs to be improved! If this gets used enough, it might be useful to contribute to [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

## Usage

### Option 1: Running it yourself

- Clone the repository
- Run `yarn` (or `npm install`) to install necessary packages
- Use `yarn start` to output the `index.d.ts` file to the `generated-types/` top-level directory
- Fix up some missing styles related to [known issues](#knownissues)

### Option 2: Copy the `index.d.ts` file from `generated-types` directory

- Copy/paste the generated output. NOTE: it could be out of date, so it's probably better to just run it yourself

## Known Issues

- There is at least one instance of incorrectly typed properties that I attempt to fix in code
  - `Ability` resource, property `effect_entries` improperly uses `names` instead of `VerboseEffect`
- Resources `MoveDamageClass` and `MoveMetaData` appear as property types, but are not listed in the docs
  - You will need to define `MoveDamageClass` as `NamedAPIResource`
  - You will need to define `MoveMetaData` according to the `meta` property in the `Moves` [resource](https://pokeapi.co/docs/v2.html#moves)
