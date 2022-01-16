import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { SimpleGrid, Flex, Box, Heading, Button, Tag, Center, Text, Container, VStack } from '@chakra-ui/react'
import { TagSelecter } from './components/tags'

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
          <TagSelecter></TagSelecter>
        </VStack>
      </Center>
      </main>
    </div>
  )
}

export default Home
