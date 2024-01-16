import { useState, useEffect } from 'react';
import {
  HStack,
  Image,
  Heading,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import img1 from '../../assets/1.png';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const [login, setLogin] = useState(false);
  const alert = useAlert();
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logouthandler = async () => {
    try {
      await axios.post(`/api/v1/logout`, {}, { withCredentials: true });
      Navigate('/login');
      setLogin(false);
    } catch (error) {
      alert.error(error.response.data.message);
    }
  };

  const profilehandler = () => {
    Navigate('/profile');
    onClose();
  };

  const boardhandler = () => {
    Navigate('/leaderboard');
    onClose();
  };
  const homehandler = () => {
    Navigate('/');
    onClose();
  };

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(`/api/v1/islogin`, { withCredentials: true });
        setLogin(true);
      } catch (error) {
        // console.log(error)
      }
    };
    check();
  }, []);

  return (
    <>
      <HStack
        w={'100vw'}
        h={['10vh', '12vh']}
        pl={['3', '10']}
        bgColor={'blue.200'}
        alignItems={'center'}
        borderBottom={'1px solid blue'}
        position={'fixed'}
        zIndex={1000}
      >
        <Image src={img1} alt={'loading'} w={['8', '16']} h={['8', '16']} />
        <Heading fontSize={[ '4xl','6xl']} color={'blue.500'} fontFamily={'sans-serif'} >
          Quiz-Time
        </Heading>
        {login && <Box style={{ marginLeft: 'auto' }} display={{ base: 'none', md: 'block', lg: 'block' }}>
          <Button variant={'unstyled'} h={['7', '10']} fontSize={['1.3vmax']} onClick={homehandler} color={'blue.800'} textShadow='1px 1px #f0eded'>
            Home
          </Button>
          <Button variant={'unstyled'} h={['7', '10']} fontSize={['1.3vmax']} onClick={boardhandler} marginLeft={['2vmax']} color={'blue.800'} textShadow='1px 1px #f0eded'>
            Leaderboard
          </Button>
          <Button variant={'unstyled'} h={['7', '10']} fontSize={['1.3vmax']} onClick={profilehandler} marginLeft={['2vmax']} color={'blue.800'} textShadow='1px 1px #f0eded'>
            Profile
          </Button>
          <Button
            variant={'unstyled'} h={['7', '10']} fontSize={['1.3vmax']}
            onClick={logouthandler}
            color={'blue.800'}
            marginLeft={['2vmax']}
            marginRight={'2vmax'}
            textShadow='1px 1px #f0eded'
          >
            Logout
          </Button>
        </Box>}
        <Box display={{ base: 'block', md: 'none', lg: 'none' }}
          style={{ marginLeft: 'auto' }}
          >
          <Button
            onClick={onOpen}
            marginRight={'4vmax'}
          >
            <GiHamburgerMenu/>
          </Button>
        </Box>
      </HStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Button onClick={homehandler} w="100%" mb="2"   >
                Home
              </Button>
              <Button onClick={boardhandler} w="100%" mb="2">
                Leaderboard
              </Button>
              <Button onClick={profilehandler} w="100%" mb="2">
                Profile
              </Button>
              <Button onClick={logouthandler} w="100%">
                Logout
              </Button>
            </DrawerBody>
            
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Header;
