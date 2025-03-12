"use client"

import HeaderBox from "@/components/header-box";
import { Button, CloseButton, Drawer, Grid, GridItem, Group, IconButton, Input, Portal, RadioGroup, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import Loading from "./loading";
import { LuSearch } from "react-icons/lu";
import { Pokemon, PokemonAction, PokemonState } from "@/types/pokemon";
import { fetchPokemonData, fetchPokemonDetailsAndDispatch } from "@/utils/pokemon";
import PokemonList from "@/components/pokemon-list";
import { POKEMON_TYPE_LABEL } from "@/utils/constants";
import Image from "next/image";

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
  filterPokemonTypeValue: '',
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
        pokemonList: 
          state.pokemonList.map((pokemon: Pokemon) =>
            pokemon.name === action.payload.name
              ? { 
                  ...pokemon,
                  officialArtworkUrl: action.payload.officialArtworkUrl,
                  frontDefaultUrl: action.payload.frontDefaultUrl,
                  types: action.payload.types
                }
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
    case 'SET_FILTER_POKE_TYPE':
      return { ...state, filterPokemonTypeValue: action.payload };
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
    filterPokemonTypeValue,
  } = state;

  useEffect(() => {
    async function fetchData() {
      const offset = currentPage * limit;
      const results = await fetchPokemonData({limit, offset, dispatch, searchTerm, filterPokemonTypeValue});
      if (results) {
        await Promise.all(results.map((pokemon: Pokemon) => fetchPokemonDetailsAndDispatch(pokemon, dispatch)));
      }
    }

    fetchData();
  }, [currentPage, filterPokemonTypeValue, limit, searchTerm]);

  const handlePageChange = ({ page }: { page: number }) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: localSearchTerm });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 0 });
  };

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
            <Drawer.Root open={isPokeTypeModalOpen}
              onOpenChange={(e) => dispatch({ type: 'SET_OPEN_POKE_TYPE_MODAL', payload: e.open })}>
              <Drawer.Trigger asChild>
                <Button background="yellow.500" variant="solid" width="full">
                  Pokemon Type
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Please select pokemon type</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <RadioGroup.Root value={filterPokemonTypeValue} onValueChange={(e) => dispatch({ type: 'SET_FILTER_POKE_TYPE', payload: e.value })}>
                        <Stack gap="6">
                          {POKEMON_TYPE_LABEL.map((type) => (
                            <RadioGroup.Item key={`pokemon-type-${type.label}`} value={type.label}>
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemText>
                                <Image
                                  src={type.icon}
                                  alt={`Icon ${type.label}`}
                                  width={100}
                                  height={100}
                                  loading="lazy"
                                />
                              </RadioGroup.ItemText>
                            </RadioGroup.Item>
                          ))}
                        </Stack>
                      </RadioGroup.Root>
                    </Drawer.Body>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </GridItem>
          <GridItem colSpan={2} rowStart={{ base: 2, xl: 0 }}>
            <Button borderColor="yellow.500" variant="outline" width="full">
              Pokemon Generation
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
              handlePageChange={handlePageChange} /> :
            <VStack colorPalette="teal" height={250} justifyContent="center" hidden={loading}>
              <Text color="yellow.500">Data not found</Text>
            </VStack>
        }
      </Stack>
    </>
  );
}
