import { toaster } from "@/components/ui/toaster";
import { ENDPOINTS } from "./constants";
import { Pokemon, PokemonAction } from "@/types/pokemon";

export async function fetchPokemonData(limit: number, offset: number, dispatch: (action: PokemonAction) => void, searchTerm: string) {
    dispatch({ type: 'FETCH_START' });
    try {

        if (searchTerm) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.POKEMON}/${searchTerm}`
            );

            if (!response.ok) {
                console.log('masuk sini')
                dispatch({ type: 'FETCH_FAILURE' });
                return null;
            }

            const data = await response.json();

            console.log('===>search', data)

            if (response.ok && data) {
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
                return data.results;

            }
        } else {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/${ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`
            );

            if (!response.ok) {
                console.log('masuk sini')
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

export async function fetchPokemonDetailsAndDispatch(pokemon: Pokemon, dispatch: (action: PokemonAction) => void) {
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