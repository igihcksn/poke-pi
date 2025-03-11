import { Spinner, Text, VStack } from "@chakra-ui/react"

export default function Loading() {
  return (
    <VStack colorPalette="teal" height={300} justifyContent="center">
      <Spinner color="yellow.500" size="lg" />
      <Text color="yellow.500">Loading...</Text>
    </VStack>
  )
}
