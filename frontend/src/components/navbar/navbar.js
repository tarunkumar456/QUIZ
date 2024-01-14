import { HStack, Image, Heading, Button } from '@chakra-ui/react'
import { React, useState, useEffect } from 'react'
// import img1 from '../assets/1.png'
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
        `/api/v1/logout`, {}, { withCredentials: true }
      );
      Navigate('/login')
      setLogin(false)
    } catch (error) {
      alert.error(error.response.data.message)
    }
  }
  const profilehandler = () => {
    Navigate('/profile')
  }
  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(
          `/api/v1/islogin`,
          { withCredentials: true }
        );
      } catch (error) {
        // Navigate('/login')
        // console.log(error)
        // alert(error)
      }
    }
    check();
  })
  return (
    <HStack w={'full'} h={['10vh', '12vh']} pl={['3', '10']} bgColor={'blue.200'} alignItems={'center'} borderBottom={'1px solid blue'} position={'fixed'} zIndex={1000}>
      {/* <Image src={img1} alt={'loading'} w={['10', '20']} h={['7', '20']} ></Image> */}
      <Heading fontSize={['3xl', '6xl']} color={'blue.500'} fontFamily={'sans-serif'}>Quiz-Time</Heading>
      <Button colorScheme='blue' mt={'6'} fontSize={['1.5vmax', '1vmax']} onClick={profilehandler} margin={'1vmax'} style={{ marginLeft: 'auto' }}>Profile</Button>
      <Button colorScheme='blue' mt={'6'} fontSize={['1.5vmax', '1vmax']} onClick={logouthandler} margin={'1vmax'} >Logout</Button>
    </HStack>
  )
}

export default Header
