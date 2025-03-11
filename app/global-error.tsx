'use client'
import { Exo_2 } from 'next/font/google';
import { Provider } from "@/components/ui/provider";
import { Container } from "@chakra-ui/react";

const exo2 = Exo_2({ subsets: ['latin'] });

export default function GlobalError({
  reset,
}: {
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={exo2.className}>
        <Provider>
          <Container maxW="1200px" py={5}>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
          </Container>
        </Provider>
      </body>
    </html>
  )
}