import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SimpleGrid, Flex, Box, Heading, Spacer, Tag, Center, Text, Container, VStack } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tagger</title>
        <meta name="description" content="Tagger" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <Center>
        <VStack mt='20px' spacing='40px'>
          <Container maxW='container.md' centerContent>
            <Text fontSize='4xl'>
              Tagger
            </Text>
            <Text fontSize='xl'>
              Upload a document and add tags to find for future reference
            </Text>
          </Container>
          { /* Tags section */ }
          <Box>
            <Tag colorScheme='blue' mx='3px'>
              Normal
            </Tag>
            <Tag variant='outline' colorScheme='blue'mx='3px'
              _hover={{ background: "blue.800" }}
            >
              Outline
            </Tag>
            <Tag colorScheme='blue'
              _hover={{ background: "blue.800" }}
            >
              Normal
            </Tag>
          </Box>
        </VStack>
      </Center>
      </main>
    </div>
  )
}

export default Home
