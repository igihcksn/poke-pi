"use client"

import { Pokemon } from "@/types/pokemon";
import { POKEMON_TYPE_ICON } from "@/utils/constants";
import { Card, Grid, HStack, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "./ui/pagination";

export default function PokemonList(
  {
    pokemonList,
    currentPage,
    totalCount,
    handlePageChange,
  }:
    {
      pokemonList: Pokemon[],
      currentPage: number,
      totalCount: number,
      handlePageChange: ({ page }: { page: number }) => void,
    }
) {
  return (
    <>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap="6">
        {
          pokemonList?.map((data: Pokemon) => {
            return data.officialArtworkUrl && data.types && (
              <Link href={`details/${data.name}`} key={`Pokemon-${data.name}`}>
                <Card.Root
                  maxW="sm"
                  overflow="hidden"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
                  transition="all 0.3s ease"
                  _hover={{
                    boxShadow: '0px 0px 20px 5px rgba(255, 208, 0, 0.6), 0px 0px 20px 5px rgba(0, 255, 255, 0.6)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease',
                  }}>
                  <Image
                    src={data.officialArtworkUrl}
                    alt={`Pokemon-${data.name}`}
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                  <Card.Body gap="2">
                    <Card.Title textTransform="uppercase" textAlign="center" color="yellow.600" fontSize={{ base: 16, xl: 24 }}>{data.name}</Card.Title>
                  </Card.Body>
                  <Card.Footer gap={{ base: 0, xl: 2 }} display="flex" direction="row" justifyContent="center">
                    {
                      data.types && data.types.map((type) => (
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
              </Link>
            );
          })
        }
      </Grid>
      <Stack alignItems="center">
        <PaginationRoot
          page={currentPage}
          count={totalCount - (21*2)}
          pageSize={21}
          onPageChange={handlePageChange}
          defaultPage={1}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Stack>
    </>
  )
}