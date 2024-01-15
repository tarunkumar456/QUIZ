import React, { useState, useEffect } from 'react'
import { Box, Text, Select, Button } from '@chakra-ui/react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'
import Loader from './Loader/Loader'
import img from '../assets/back7.jpg'

function Home() {
  const Navigate = useNavigate();
  const alert = useAlert();
  const [category, setCategory] = useState('');
  const [loading, setloading] = useState(true);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const starthandler = () => {
    if (category) {
      Navigate(`/quiz/${category}`);
    } else {
      alert.info('Select Category');
    }
  }

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(
          `https://quiz-backend-one-fawn.vercel.app/api/v1/islogin`,
          { withCredentials: true }
        );
        setloading(false);

      } catch (error) {
        alert.error(error.response.data.message)
        setloading(false);
        Navigate('/login')
      }
    }
    check();
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box bgColor='#bad7f0' h='100vh' display='flex' justifyContent='center' alignItems='center' bgImg={`url(${img})`} bgSize="cover" inset={'0'}>
          <Box w='550px' bg='aliceblue' borderRadius='5px' h='440px' mt='15vh'>
            <Box as='header' pos='relative' zIndex='2' h='70px' p='0 30px' bg='blue.300' borderRadius='5px 5px 0 0' display='flex' alignItems='center' justifyContent='space-between' boxShadow='0px 3px 5px 1px rgba(0,0,0,0.1)'>
              <Text fontSize='20px' fontWeight='600' className='title'>General Instructions :</Text>
              <Box pos='absolute' bottom='0px' left='0px' h='3px' bg='#007bff' className='time_line'></Box>
            </Box>
            <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='space-evenly' h='65%' ml='5%'>
              <Text fontSize='15px' fontWeight='600' className='title'>1) You have only 10 seconds per question</Text>
              <Text fontSize='15px' fontWeight='600' className='title'>2) Each question is of 10 marks</Text>
              <Text fontSize='15px' fontWeight='600' className='title'>3) Marks will be decreased per second by unity</Text>
              <Text fontSize='15px' fontWeight='600' className='title'>4) You can't change your answer once marked</Text>
              <Text fontSize='15px' fontWeight='600' className='title'>5) You can't exit the test once started</Text>
            </Box>
            <Box as='footer' h='60px' display='flex' bg='white' alignItems='center' justifyContent='space-between' borderTop='1px solid blue'>
              <Select
                placeholder='Select Category'
                w='50%'
                ml='5%'
                mt='3vh'
                border={'2px solid rgb(57, 157, 250)'}
                onChange={handleCategoryChange}
              >
                <option value='21'>Sports</option>
                <option value='9'>General Knowledge</option>
                <option value='18'>Computer</option>
                <option value='23'>History</option>
                <option value='24'>Politics</option>
                <option value='19'>Mathematics</option>
              </Select>
              <Button
                className='next_btn'
                height='40px'
                mt='3vh'
                mr='10%'
                fontSize='18px'
                fontWeight='500'
                cursor='pointer'
                borderRadius='5px'
                bg='blue.400'
                border='1px solid #007bff'
                lineHeight='10px'
                _hover={{ bg: '#0263ca', cursor: "pointer" }}
                onClick={starthandler}
              >
                Start Quiz
              </Button>
            </Box>
          </Box>
        </Box>)}
    </>
  )
}

export default Home
