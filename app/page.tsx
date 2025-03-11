"use client"

import HeaderBox from "@/components/header-box";
import { Button, Grid, GridItem, Group, IconButton, Input, Popover, Portal, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";
import Loading from "./loading";
import { LuSearch } from "react-icons/lu";
import { Pokemon, PokemonAction, PokemonState } from "@/types/pokemon";
import { fetchPokemonData, fetchPokemonDetailsAndDispatch } from "@/utils/pokemon";
import PokemonList from "@/components/pokemon-list";

// Initial State and Reducer
const initialState: PokemonState = {
  pokemonList: [],
  currentPage: 0,
  limit: 21,
  totalCount: 0,
  loading: true,
  searchTerm: '',
  localSearchTerm: '',
  isPokeTypeModalOpen: false,
  isPokeGenerationModalOpen: false,
};

function pokemonReducer(state: PokemonState, action: PokemonAction): PokemonState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        pokemonList: action.payload.results,
        totalCount: action.payload.count,
        loading: false,
      };
    case 'FETCH_FAILURE':
      return { ...state, pokemonList: [], loading: false };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload };
    case 'SET_POKEMON_DETAILS':
      return {
        ...state,
        pokemonList: state.pokemonList.map((pokemon: Pokemon) =>
          pokemon.name === action.payload.name
            ? { ...pokemon, officialArtworkUrl: action.payload.officialArtworkUrl, frontDefaultUrl: action.payload.frontDefaultUrl, types: action.payload.types }
            : pokemon
        ),
      };
    case 'SET_LOCAL_SEARCH_TERM':
      return { ...state, localSearchTerm: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_OPEN_POKE_TYPE_MODAL':
      return { ...state, isPokeTypeModalOpen: action.payload };
    case 'SET_OPEN_POKE_GENERATION_MODAL':
      return { ...state, isPokeGenerationModalOpen: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  const {
    pokemonList,
    currentPage,
    limit,
    totalCount,
    loading,
    localSearchTerm,
    searchTerm,
    isPokeTypeModalOpen,
    isPokeGenerationModalOpen,
  } = state;

  useEffect(() => {
    async function fetchData() {
      const offset = currentPage * limit;
      console.log(offset)
      const results = await fetchPokemonData(limit, offset, dispatch, searchTerm);

      if (results) {
        await Promise.all(results.map((pokemon: Pokemon) => fetchPokemonDetailsAndDispatch(pokemon, dispatch)));
      }
    }

    fetchData();
  }, [currentPage, limit, searchTerm]);

  const handlePageChange = ({ page }: { page: number }) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: localSearchTerm });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 0 });
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <HeaderBox />
      <Stack as="main" direction="column" gap={{ base: 4, xl: 8 }} mt={{ base: 4, xl: 8 }}>
        <Grid templateColumns="repeat(4, 1fr)" gap="2">
          <GridItem colSpan={4}>
            <Group attached width="full">
              <Input
                placeholder="Poke name"
                borderColor="yellow.400"
                value={localSearchTerm}
                onChange={(e) => dispatch({ type: 'SET_LOCAL_SEARCH_TERM', payload: e.target.value })} />
              <IconButton aria-label="Search database" backgroundColor="yellow.400" onClick={handleSearch}>
                <LuSearch />
              </IconButton>
            </Group>
          </GridItem>
          <GridItem colSpan={2} rowStart={{ base: 2, xl: 0 }}>
            <Popover.Root
              open={isPokeTypeModalOpen}
              onOpenChange={(e) => dispatch({ type: 'SET_OPEN_POKE_TYPE_MODAL', payload: e.open })}>
              <Popover.Trigger asChild>
                <Button background="yellow.500" variant="solid" width="full">
                  <RiMailLine /> Email
                </Button>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content width="full">
                    <Popover.Arrow />
                    <Popover.Body>
                      This is a popover with the same width as the trigger button
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </GridItem>
          <GridItem colSpan={2} rowStart={{ base: 2, xl: 0 }}>
            <Button colorPalette="teal" variant="outline" width="full">
              Call us <RiArrowRightLine />
            </Button>
          </GridItem>
        </Grid>
        {loading && <Loading />}
        {
          !loading && pokemonList.length ?
            <PokemonList
              pokemonList={pokemonList}
              currentPage={currentPage}
              totalCount={totalCount}
              totalPages={totalPages}
              handlePageChange={handlePageChange} /> :
            <VStack colorPalette="teal" height={250} justifyContent="center" hidden={loading}>
              <Text color="yellow.500">Data not found</Text>
            </VStack>
        }
      </Stack>
    </>
  );
}
