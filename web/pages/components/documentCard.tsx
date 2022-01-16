
import { Image, Flex, Badge, Box } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Document } from './documents'
import { CreateTag } from './tags';

export function CreateCard(props: {document: Document}){
    const document = props.document
    const property = {
      imageUrl: document.url,
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
    };
  
    return (
        <Box
          bg={useColorModeValue("white", "gray.900")}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
        >
          <Image
            src={document.url}
            alt={document.name}
            roundedTop="lg"
          />
  
          <Box p="6">
              {document.tags.map((tag) => <CreateTag tag={tag} key={tag.name}/>)}
          </Box>
        </Box>
    );
  };