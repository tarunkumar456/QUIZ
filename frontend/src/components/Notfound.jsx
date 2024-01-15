import React from 'react'
import { Box, Heading, Button } from '@chakra-ui/react'
import img from '../assets/back7.jpg'

function Notfound() {
  return (
    <Box display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} h={'70vh'} bgImg={`url(${img})`} bgSize="cover" inset={'0'}>
      <Heading color={'blue.300'} opacity={'0.7'} >Page not found</Heading>
      <a href='/'><Button colorScheme='blue' mt={'6'} fontSize={'1.2vmax'}>Go to Home</Button></a>
    </Box>
  )
}


export default Notfound
