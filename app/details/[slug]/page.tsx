"use client"

import Loading from "@/app/loading";
import BreadcrumbCustom from "@/components/breadcrumb";
import { PokemonDetailsAction, PokemonDetailsState } from "@/types/pokemon";
import { POKEMON_TYPE_ICON } from "@/utils/constants";
import { fetchPokemonDetailsWithParams } from "@/utils/pokemon";
import { Badge, Card, DataList, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";

const reducer = (state: PokemonDetailsState, action: PokemonDetailsAction): PokemonDetailsState => {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null, pokemon: null };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, pokemon: action.payload };
        case "FETCH_FAILURE":
            return { ...state, loading: false, error: action.payload, pokemon: null };
        default:
            return state;
    }
};

export default function PokemonDetails() {
    const [state, dispatch] = useReducer(reducer, {
        pokemon: null,
        error: null,
        loading: false,
    });

    const searchParams = useParams();

    useEffect(() => {
        fetchPokemonDetailsWithParams(searchParams.slug as string, dispatch);
    }, [searchParams, dispatch]);

    return (
        <Stack gap={5}>
            <BreadcrumbCustom />
            {state.loading && <Loading />}
            {
                !state.loading && state.pokemon &&
                <Grid
                    templateRows={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                    templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                    gap={4}
                >
                    <GridItem rowSpan={2} colSpan={1}>
                        <Card.Root
                            maxW="sm"
                            overflow="hidden"
                            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                            transition="all 0.3s ease">
                            <Image
                                src={state.pokemon?.officialArtworkUrl as string}
                                alt={`Pokemon-${state.pokemon?.name}`}
                                width={500}
                                height={500}
                                loading="lazy"
                            />
                            <Card.Body gap="2">
                                <Card.Title textTransform="uppercase" textAlign="center" color="yellow.600" fontSize={{ base: 16, xl: 24 }}>{state.pokemon?.name}</Card.Title>
                            </Card.Body>
                            <Card.Footer gap={{ base: 0, xl: 2 }} display="flex" direction="row" justifyContent="center">
                                {
                                    state.pokemon?.types && state.pokemon.types.map((type) => (
                                        <Image
                                            key={`Icon-${type}`}
                                            src={POKEMON_TYPE_ICON[type]}
                                            alt={`Icon ${type}`}
                                            width={100}
                                            height={100}
                                            loading="lazy"
                                        />
                                    ))
                                }
                            </Card.Footer>
                        </Card.Root>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>Pokemon Stats</Text>
                        <DataList.Root orientation="horizontal">
                            {state.pokemon.stats.map((item) => (
                                <DataList.Item key={`Pokemon-stat-${item.stat.name}`}>
                                    <DataList.ItemLabel>{item.stat.name.toUpperCase()}</DataList.ItemLabel>
                                    <DataList.ItemValue>{item.base_stat}</DataList.ItemValue>
                                </DataList.Item>
                            ))}
                        </DataList.Root>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text>Pokemon Spirites</Text>
                        <HStack>
                            <Image
                                src={state.pokemon.sprites.back_default}
                                alt={`Pokemon-spirites`}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                            <Image
                                src={state.pokemon.sprites.back_shiny}
                                alt={`Pokemon-spirites`}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                            <Image
                                src={state.pokemon.sprites.front_default}
                                alt={`Pokemon-spirites`}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                            <Image
                                src={state.pokemon.sprites.front_shiny}
                                alt={`Pokemon-spirites`}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Text>Pokemon Moves</Text>
                        <HStack flexWrap="wrap">
                            {
                                state.pokemon?.moves.map((item, index) => (
                                    <Badge colorPalette="purple" key={`Pokemon-moves-${item.move.name}-${index}`}>
                                        {item.move.name}
                                    </Badge>
                                ))
                            }
                        </HStack>
                    </GridItem>
                </Grid>
            }
        </Stack>
    );
}