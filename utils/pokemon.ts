import { toaster } from "@/components/ui/toaster";
import { ENDPOINTS } from "./constants";
import { Pokemon, PokemonAction, PokemonDetailsAction } from "@/types/pokemon";

export async function fetchPokemonData(limit: number, offset: number, dispatch: React.Dispatch<PokemonAction>, searchTerm: string) {
    dispatch({ type: 'FETCH_START' });
    try {

        if (searchTerm) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.POKEMON}/${searchTerm}`
            );

            if (!response.ok) {
                dispatch({ type: 'FETCH_FAILURE' });
                return null;
            }

            const data = await response.json();

            if (response.ok && data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                return data.results;

            }
        } else {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`
            );

            if (!response.ok) {
                dispatch({ type: 'FETCH_FAILURE' });
                return null;
            }

            const data = await response.json();

            if (response.ok && data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                return data.results;

            }
        }
    } catch (error) {
        toaster.create({
            title: `Error fetching pokemon list: ${error}`,
            type: 'error',
        })
    }

};

export async function fetchPokemonDetailsAndDispatch(pokemon: Pokemon, dispatch: React.Dispatch<PokemonAction>) {
    try {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        if (details && details.sprites) {
            const typeNames = details.types.map((type: { type: { name: string } }) => type.type.name);
            dispatch({
                type: 'SET_POKEMON_DETAILS',
                payload: {
                    name: pokemon.name,
                    officialArtworkUrl: details.sprites.other['official-artwork'].front_default,
                    frontDefaultUrl: details.sprites.front_default,
                    types: typeNames,
                },
            });
        }
    } catch (error) {
        toaster.create({
            title: `Error fetching details for ${pokemon.name}: ${error}`,
            type: 'error',
        })
    }
};

export async function fetchPokemonDetailsWithParams(
    pokemonName: string,
    dispatch: React.Dispatch<PokemonDetailsAction>
) {
    if (!pokemonName) return;

    dispatch({ type: "FETCH_START" });

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.POKEMON}/${pokemonName.toLowerCase()}`);

        if (!response.ok) {
            if (response.status === 404) {
                dispatch({ type: "FETCH_FAILURE", payload: "Pokemon not found." });
            } else {
                dispatch({ type: "FETCH_FAILURE", payload: "An error occurred while fetching data." });
            }
            return;
        }

        const pokemon = await response.json();
        if (pokemon && pokemon.sprites) {
            const typeNames = pokemon.types.map((type: { type: { name: string } }) => type.type.name);

            dispatch({
                type: "FETCH_SUCCESS",
                payload: {
                    ...pokemon,
                    types: typeNames,
                    officialArtworkUrl: pokemon.sprites.other['official-artwork'].front_default,
                }
            });
        }
    } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: "An error occurred while fetching data." });
        toaster.create({
            title: `Error fetching details with params: ${error}`,
            type: 'error',
        })
    }
};