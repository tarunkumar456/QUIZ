import { HStack, Image, Heading, Button } from '@chakra-ui/react'
import { React, useState, useEffect } from 'react'
import img1 from '../../assets/1.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
function Header() {
  const [login, setLogin] = useState(false)
  const alert = useAlert();
  const Navigate = useNavigate();
  const logouthandler = async () => {
    try {
      await axios.post(
        `https://quiz-backend-one-fawn.vercel.app/api/v1/logout`, {}, { withCredentials: true }
      );
      Navigate('/login')
      setLogin(false)
    } catch (error) {
      alert.error(error.response.data.message)
    }
  }
  const boardhandler = () => {
    Navigate('/leaderboard')
  }
  const profilehandler = () => {
    Navigate('/profile')
  }
  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(
          `https://quiz-backend-one-fawn.vercel.app/api/v1/islogin`,
          { withCredentials: true }

        );
        setLogin(true)
      } catch (error) {
        // Navigate('/login')
        // console.log(error)
        // alert(error)
      }
    }
    check();
  })
  return (
    <HStack w={'100vw'} h={['10vh', '12vh']} pl={['3', '10']} bgColor={'blue.200'} alignItems={'center'} borderBottom={'1px solid blue'} position={'fixed'} zIndex={1000}>
      <Image src={img1} alt={'loading'} w={['8', '16']} h={['8', '16']} ></Image>
      <Heading fontSize={['2xl', '6xl']} color={'blue.500'} fontFamily={'sans-serif'}>Quiz-Time</Heading>
      <Box style={{ marginLeft: 'auto' }}>
        {login && <Button colorScheme='blue' mt={'6'} p={['1.5', '3']} h={['7', '10']} fontSize={['1vmax', '1vmax']} onClick={boardhandler} margin={['0.2vmax', '0.5vmax']} >Leaderboard</Button>}
        {login && <Button colorScheme='blue' mt={'6'} p={['1.5', '3']} h={['7', '10']} fontSize={['1vmax', '1vmax']} onClick={profilehandler} margin={['0.2vmax', '0.5vmax']} >Profile</Button>}
        {login && <Button colorScheme='blue' mt={'6'} p={['1.5', '3']} h={['7', '10']} fontSize={['1vmax', '1vmax']} onClick={logouthandler} marginLeft={['0.2vmax', '0.5vmax']} marginY={['0.2vmax', '0.5vmax']} marginRight={'2vmax'}>Logout</Button>}
      </Box>
    </HStack>
  )
}

export default Header
