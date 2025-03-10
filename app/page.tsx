import { Box, Group, Heading, IconButton, Input, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";

export default function Home() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        py={12}
        borderRadius={10}
        bgImage="url('/header.jpg')"
        backgroundPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        mb={2}
        as="header"
      >
        <Stack gap="10">
          <Image
            src="https://mypocketmonsters.vercel.app/static/media/pokemon_icon.3e1660a9.svg"
            alt="Pokemon Logo"
            width={500}
            height={500}
          />
          <Heading as="h1" >
            Find Every Pokémon You’re Looking For with Our Pokedex!
          </Heading>
          <Group attached>
            <Input placeholder="Poke name" borderColor="yellow.400" />
            <IconButton aria-label="Search database" backgroundColor="gray-800">
              <LuSearch />
            </IconButton>
          </Group>
        </Stack>
      </Box>
    </>
  );
}
