export interface Pokemon {
    name: string;
    url: string;
    officialArtworkUrl?: string;
    frontDefaultUrl?: string;
    types?: string[];
};

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
};

export interface PokemonState {
    pokemonList: Pokemon[];
    currentPage: number;
    limit: number;
    totalCount: number;
    loading: boolean;
    searchTerm: string;
    localSearchTerm: string;
    isPokeTypeModalOpen: boolean;
    isPokeGenerationModalOpen: boolean;
    filterPokemonTypeValue: string;
};

export type PokemonAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: PokemonListResponse }
    | { type: 'FETCH_FAILURE' }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_LIMIT'; payload: number }
    | { type: 'SET_POKEMON_DETAILS'; payload: { name: string; officialArtworkUrl: string; frontDefaultUrl: string; types: string[] } }
    | { type: 'SET_LOCAL_SEARCH_TERM'; payload: string }
    | { type: 'SET_SEARCH_TERM'; payload: string }
    | { type: 'SET_OPEN_POKE_TYPE_MODAL'; payload: boolean }
    | { type: 'SET_OPEN_POKE_GENERATION_MODAL'; payload: boolean }
    | { type: 'SET_FILTER_POKE_TYPE'; payload: string };

// Pokemon detail pages
export interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
        back_default: string;
        back_shiny: string;
    };
    types: string[];
    officialArtworkUrl?: string;
    stats: { base_stat: number; stat: { name: string } }[];
    moves: { move: { name: string }; version_group_details: { version_group: { name: string } }[] }[];
};


export type PokemonDetailsAction =
    | { type: "FETCH_START" }
    | { type: "FETCH_SUCCESS"; payload: PokemonDetails }
    | { type: "FETCH_FAILURE"; payload: string }

export interface PokemonDetailsState {
    pokemon: PokemonDetails | null;
    error: string | null;
    loading: boolean;
};
