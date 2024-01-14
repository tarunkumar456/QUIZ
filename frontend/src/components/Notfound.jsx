import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'

function Notfound() {
  return (
    <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'70vh'} >
      <Heading color={'blue.300'} opacity={'0.7'} >Page not found</Heading>
      <a href='/'><Button colorScheme='blue' mt={'6'} fontSize={'1.2vmax'}>Go to Home</Button></a>
    </Box>
  )
}


export default Notfound
