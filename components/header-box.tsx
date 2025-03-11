import { Box, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";

export default function HeaderBox() {
    return (
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
            <Stack gap="5" padding={{ base: 5, xl: 0 }}>
                <Image
                    src="https://mypocketmonsters.vercel.app/static/media/pokemon_icon.3e1660a9.svg"
                    alt="Pokemon Logo"
                    width={500}
                    height={500}
                />
                <Heading as="h1" color="yellow.400" textShadow="3px 4px 2px rgba(0,0,0,0.34)">
                    Find Every Pokémon You’re Looking For with Our Pokedex!
                </Heading>
            </Stack>
        </Box>
    );
};