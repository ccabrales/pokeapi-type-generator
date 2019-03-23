declare module "pokeapi-js-wrapper" {
  export interface Berry extends NamedAPIResource {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: BerryFirmness;
    flavors: BerryFlavorMap[];
    item: Item;
    natural_gift_type: Type;
  }

  export interface BerryFlavorMap {
    potency: number;
    flavor: BerryFlavor;
  }

  export interface BerryFirmness extends NamedAPIResource {
    id: number;
    name: string;
    berries: Berry[];
    names: Name[];
  }

  export interface BerryFlavor extends NamedAPIResource {
    id: number;
    name: string;
    berries: FlavorBerryMap[];
    contest_type: ContestType;
    names: Name[];
  }

  export interface FlavorBerryMap {
    potency: number;
    berry: Berry;
  }

  export interface ContestType extends NamedAPIResource {
    id: number;
    name: string;
    berry_flavor: BerryFlavor;
    names: ContestName[];
  }

  export interface ContestName {
    name: string;
    color: string;
    language: Language;
  }

  export interface ContestEffect extends APIResource {
    id: number;
    appeal: number;
    jam: number;
    effect_entries: Effect[];
    flavor_text_entries: FlavorText[];
  }

  export interface SuperContestEffect extends APIResource {
    id: number;
    appeal: number;
    flavor_text_entries: FlavorText[];
    moves: Move[];
  }

  export interface EncounterMethod extends NamedAPIResource {
    id: number;
    name: string;
    order: number;
    names: Name[];
  }

  export interface EncounterCondition extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    values: EncounterConditionValue[];
  }

  export interface EncounterConditionValue extends NamedAPIResource {
    id: number;
    name: string;
    condition: EncounterCondition[];
    names: Name[];
  }

  export interface EvolutionChain extends APIResource {
    id: number;
    baby_trigger_item: Item;
    chain: ChainLink;
  }

  export interface ChainLink {
    is_baby: boolean;
    species: PokemonSpecies;
    evolution_details: EvolutionDetail[];
    evolves_to: ChainLink[];
  }

  export interface EvolutionDetail {
    item: Item;
    trigger: EvolutionTrigger;
    gender: number;
    held_item: Item;
    known_move: Move;
    known_move_type: Type;
    location: Location;
    min_level: number;
    min_happiness: number;
    min_beauty: number;
    min_affection: number;
    needs_overworld_rain: boolean;
    party_species: PokemonSpecies;
    party_type: Type;
    relative_physical_stats: number;
    time_of_day: string;
    trade_species: PokemonSpecies;
    turn_upside_down: boolean;
  }

  export interface EvolutionTrigger extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: PokemonSpecies[];
  }

  export interface Generation extends NamedAPIResource {
    id: number;
    name: string;
    abilities: Ability[];
    names: Name[];
    main_region: Region;
    moves: Move[];
    pokemon_species: PokemonSpecies[];
    types: Type[];
    version_groups: VersionGroup[];
  }

  export interface Pokedex extends NamedAPIResource {
    id: number;
    name: string;
    is_main_series: boolean;
    descriptions: Description[];
    names: Name[];
    pokemon_entries: PokemonEntry[];
    region: Region;
    version_groups: VersionGroup[];
  }

  export interface PokemonEntry {
    entry_number: number;
    pokemon_species: PokemonSpecies;
  }

  export interface Version extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    version_group: VersionGroup;
  }

  export interface VersionGroup extends NamedAPIResource {
    id: number;
    name: string;
    order: number;
    generation: Generation;
    move_learn_methods: MoveLearnMethod[];
    pokedexes: Pokedex[];
    regions: Region[];
    versions: Version[];
  }

  export interface Item extends NamedAPIResource {
    id: number;
    name: string;
    cost: number;
    fling_power: number;
    fling_effect: ItemFlingEffect;
    attributes: ItemAttribute[];
    category: ItemCategory;
    effect_entries: VerboseEffect[];
    flavor_text_entries: VersionGroupFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[];
    baby_trigger_for: EvolutionChain;
    machines: MachineVersionDetail[];
  }

  export interface ItemSprites {
    default: string;
  }

  export interface ItemHolderPokemon {
    pokemon: string;
    version_details: ItemHolderPokemonVersionDetail[];
  }

  export interface ItemHolderPokemonVersionDetail {
    rarity: string;
    version: Version;
  }

  export interface ItemAttribute extends NamedAPIResource {
    id: number;
    name: string;
    items: Item[];
    names: Name[];
    descriptions: Description[];
  }

  export interface ItemCategory extends NamedAPIResource {
    id: number;
    name: string;
    items: Item[];
    names: Name[];
    pocket: ItemPocket;
  }

  export interface ItemFlingEffect extends NamedAPIResource {
    id: number;
    name: string;
    effect_entries: Effect[];
    items: Item;
  }

  export interface ItemPocket extends NamedAPIResource {
    id: number;
    name: string;
    categories: ItemCategory[];
    names: Name[];
  }

  export interface Location extends NamedAPIResource {
    id: number;
    name: string;
    region: Region;
    names: Name[];
    game_indices: GenerationGameIndex[];
    areas: LocationArea[];
  }

  export interface LocationArea extends NamedAPIResource {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: Location;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
  }

  export interface EncounterMethodRate {
    encounter_method: EncounterMethod;
    version_details: EncounterVersionDetails[];
  }

  export interface EncounterVersionDetails {
    rate: number;
    version: Version;
  }

  export interface PokemonEncounter {
    pokemon: Pokemon;
    version_details: VersionEncounterDetail[];
  }

  export interface PalParkArea extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    pokemon_encounters: PalParkEncounterSpecies[];
  }

  export interface PalParkEncounterSpecies {
    base_score: number;
    rate: number;
    pokemon_species: PokemonSpecies;
  }

  export interface Region extends NamedAPIResource {
    id: number;
    locations: Location[];
    name: string;
    names: Name[];
    main_generation: Generation;
    pokedexes: Pokedex[];
    version_groups: VersionGroup[];
  }

  export interface Machine extends APIResource {
    id: number;
    item: Item;
    move: Move;
    version_group: VersionGroup;
  }

  export type MoveDamageClass = NamedAPIResource;

  export interface Move extends NamedAPIResource {
    id: number;
    name: string;
    accuracy: number;
    effect_chance: number;
    pp: number;
    priority: number;
    power: number;
    contest_combos: ContestComboSets;
    contest_type: ContestType;
    contest_effect: ContestEffect;
    damage_class: MoveDamageClass;
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: MoveFlavorText[];
    generation: Generation;
    machines: MachineVersionDetail[];
    meta: MoveMetaData;
    names: Name[];
    past_values: PastMoveStatValues[];
    stat_changes: MoveStatChange[];
    super_contest_effect: SuperContestEffect;
    target: MoveTarget;
    type: Type;
  }

  export interface ContestComboSets {
    normal: ContestComboDetail;
    super: ContestComboDetail;
  }

  export interface ContestComboDetail {
    use_before: NamedAPIResource[];
    use_after: NamedAPIResource[];
  }

  export interface MoveFlavorText {
    flavor_text: string;
    language: Language;
    version_group: VersionGroup;
  }

  export interface MoveAilment extends NamedAPIResource {
    id: number;
    name: string;
    moves: Move[];
    names: Name[];
  }

  export interface MoveStatChange {
    change: number;
    stat: Stat;
  }

  export interface PastMoveStatValues {
    accuracy: PastMoveStatValues;
    effect_chance: number;
    power: number;
    pp: number;
    effect_entries: VerboseEffect[];
    type: Type;
    version_group: VersionGroup;
  }

  export interface MoveBattleStyle extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
  }

  export interface ModelName {
    id: number;
    name: string;
    descriptions: Description[];
    moves: Move[];
    names: Name[];
  }

  export interface MoveLearnMethod extends NamedAPIResource {
    id: number;
    name: string;
    descriptions: Description[];
    names: Name[];
    version_groups: VersionGroup[];
  }

  export interface MoveTarget extends NamedAPIResource {
    id: number;
    name: string;
    descriptions: Description[];
    moves: Move[];
    names: Name[];
  }

  export interface Ability extends NamedAPIResource {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: Generation;
    names: Name[];
    effect_entries: VerboseEffect[];
    effect_changes: AbilityEffectChange[];
    flavor_text_entries: AbilityFlavorText[];
    pokemon: AbilityPokemon[];
  }

  export interface AbilityEffectChange {
    effect_entries: Effect[];
    version_group: VersionGroup;
  }

  export interface AbilityFlavorText {
    flavor_text: string;
    language: Language;
    version_group: VersionGroup;
  }

  export interface AbilityPokemon {
    is_hidden: boolean;
    slot: number;
    pokemon: Pokemon;
  }

  export interface Characteristic extends APIResource {
    id: number;
    gene_modulo: number;
    possible_values: number[];
  }

  export interface EggGroup extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: PokemonSpecies[];
  }

  export interface Gender {
    id: number;
    name: string;
    pokemon_species_details: PokemonSpeciesGender[];
    required_for_evolution: PokemonSpecies[];
  }

  export interface PokemonSpeciesGender {
    rate: number;
    pokemon_species: PokemonSpecies;
  }

  export interface GrowthRate extends NamedAPIResource {
    id: number;
    name: string;
    formula: string;
    descriptions: Description[];
    levels: GrowthRateExperienceLevel[];
    pokemon_species: PokemonSpecies[];
  }

  export interface GrowthRateExperienceLevel {
    level: number;
    experience: number;
  }

  export interface Nature extends NamedAPIResource {
    id: number;
    name: string;
    decreased_stat: Stat;
    increased_stat: Stat;
    hates_flavor: BerryFlavor;
    likes_flavor: BerryFlavor;
    pokeathlon_stat_changes: NatureStatChange[];
    move_battle_style_preferences: MoveBattleStylePreference[];
    names: Name[];
  }

  export interface NatureStatChange {
    max_change: number;
    pokeathlon_stat: PokeathlonStat;
  }

  export interface MoveBattleStylePreference {
    low_hp_preference: number;
    high_hp_preference: number;
    move_battle_style: MoveBattleStyle;
  }

  export interface PokeathlonStat extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    affecting_natures: NaturePokeathlonStatAffectSets;
  }

  export interface NaturePokeathlonStatAffectSets {
    increase: NaturePokeathlonStatAffect[];
    decrease: NaturePokeathlonStatAffect[];
  }

  export interface NaturePokeathlonStatAffect {
    max_change: number;
    nature: Nature;
  }

  export interface Pokemon extends NamedAPIResource {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: PokemonForm[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    sprites: PokemonSprites;
    species: PokemonSpecies;
    stats: PokemonStat[];
    types: PokemonType[];
  }

  export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: Ability;
  }

  export interface PokemonType {
    slot: number;
    type: Type;
  }

  export interface PokemonHeldItem {
    item: Item;
    version_details: PokemonHeldItemVersion[];
  }

  export interface PokemonHeldItemVersion {
    version: Version;
    rarity: number;
  }

  export interface PokemonMove {
    move: Move;
    version_group_details: PokemonMoveVersion[];
  }

  export interface PokemonMoveVersion {
    move_learn_method: MoveLearnMethod;
    version_group: VersionGroup;
    level_learned_at: number;
  }

  export interface PokemonStat {
    stat: Stat;
    effort: number;
    base_stat: number;
  }

  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
  }

  export interface LocationAreaEncounter {
    location_area: LocationArea;
    version_details: VersionEncounterDetail[];
  }

  export interface PokemonColor extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: PokemonSpecies[];
  }

  export interface PokemonForm extends NamedAPIResource {
    id: number;
    name: string;
    order: number;
    form_order: number;
    is_default: boolean;
    is_battle_only: boolean;
    is_mega: boolean;
    form_name: string;
    pokemon: Pokemon;
    sprites: PokemonFormSprites;
    version_group: VersionGroup;
    names: Name[];
    form_names: Name[];
  }

  export interface PokemonFormSprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  }

  export interface PokemonHabitat extends NamedAPIResource {
    id: number;
    name: string;
    names: Name[];
    pokemon_species: PokemonSpecies[];
  }

  export interface PokemonShape extends NamedAPIResource {
    id: number;
    name: string;
    awesome_names: AwesomeName[];
    names: Name[];
    pokemon_species: PokemonSpecies[];
  }

  export interface AwesomeName {
    awesome_name: string;
    language: Language;
  }

  export interface PokemonSpecies extends NamedAPIResource {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happiness: number;
    is_baby: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: GrowthRate;
    pokedex_numbers: PokemonSpeciesDexEntry[];
    egg_groups: EggGroup[];
    color: PokemonColor;
    shape: PokemonShape;
    evolves_from_species: PokemonSpecies;
    evolution_chain: EvolutionChain;
    habitat: PokemonHabitat;
    generation: Generation;
    names: Name[];
    pal_park_encounters: PalParkEncounterArea[];
    flavor_text_entries: FlavorText[];
    form_descriptions: Description[];
    genera: Genus[];
    varieties: PokemonSpeciesVariety[];
  }

  export interface Genus {
    genus: string;
    language: Language;
  }

  export interface PokemonSpeciesDexEntry {
    entry_number: number;
    pokedex: Pokedex;
  }

  export interface PalParkEncounterArea {
    base_score: number;
    rate: number;
    area: PalParkArea;
  }

  export interface PokemonSpeciesVariety {
    is_default: boolean;
    pokemon: Pokemon;
  }

  export interface Stat extends NamedAPIResource {
    id: number;
    name: string;
    game_index: number;
    is_battle_only: boolean;
    affecting_moves: MoveStatAffectSets;
    affecting_natures: NatureStatAffectSets;
    characteristics: Characteristic;
    move_damage_class: MoveDamageClass;
    names: Name[];
  }

  export interface MoveStatAffectSets {
    increase: MoveStatAffect[];
    decrease: MoveStatAffect[];
  }

  export interface MoveStatAffect {
    change: number;
    move: Move;
  }

  export interface NatureStatAffectSets {
    increase: Nature[];
    decrease: Nature[];
  }

  export interface Type extends NamedAPIResource {
    id: number;
    name: string;
    damage_relations: TypeRelations;
    game_indices: GenerationGameIndex[];
    generation: Generation;
    move_damage_class: MoveDamageClass;
    names: Name[];
    pokemon: TypePokemon[];
    moves: Move[];
  }

  export interface TypePokemon {
    slot: number;
    pokemon: Pokemon;
  }

  export interface TypeRelations {
    no_damage_to: Type[];
    half_damage_to: Type[];
    double_damage_to: Type[];
    no_damage_from: Type[];
    half_damage_from: Type[];
    double_damage_from: Type[];
  }

  export interface APIResourceList {
    count: number;
    next: string;
    previous: boolean;
    results: APIResource[];
  }

  export interface NamedAPIResourceList {
    count: number;
    next: string;
    previous: boolean;
    results: NamedAPIResource[];
  }

  export interface Language extends NamedAPIResource {
    id: number;
    name: string;
    official: boolean;
    iso639: string;
    iso3166: string;
    names: Name[];
  }

  export interface APIResource {
    url: string;
  }

  export interface Description {
    description: string;
    language: Language;
  }

  export interface Effect {
    effect: string;
    language: Language;
  }

  export interface Encounter {
    min_level: number;
    max_level: number;
    condition_values: EncounterConditionValue[];
    chance: number;
    method: EncounterMethod;
  }

  export interface FlavorText {
    flavor_text: string;
    language: Language;
    version: Version;
  }

  export interface GenerationGameIndex {
    game_index: number;
    generation: Generation;
  }

  export interface MachineVersionDetail {
    machine: Machine;
    version_group: VersionGroup;
  }

  export interface Name {
    name: string;
    language: Language;
  }

  export interface NamedAPIResource {
    name: string;
    url: string;
  }

  export interface VerboseEffect {
    effect: string;
    short_effect: string;
    language: Language;
  }

  export interface VersionEncounterDetail {
    version: Version;
    max_chance: number;
    encounter_details: Encounter[];
  }

  export interface VersionGameIndex {
    game_index: number;
    version: Version;
  }

  export interface VersionGroupFlavorText {
    text: string;
    language: Language;
    version_group: VersionGroup;
  }
}
