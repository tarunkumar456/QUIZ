import React, { useEffect, useState } from 'react'
import { Box, HStack, VStack, Text, Button } from '@chakra-ui/react'

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from 'react-alert';
import Loader from './Loader/Loader';
import { useParams } from 'react-router-dom';

// import { FaXmark } from "react-icons/fa6";
function Quiz() {
    const [loading, setloading] = useState(true)
    const [ques, setques] = useState([
        { q: "What does html stand for?", a: "Hyper text Prepaljlslks", b: "Hyper text Prepaljlslks", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'a' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' },
        { q: "What does www stand for?", a: "Hyper text Prepaljlslks", b: "World wide web", c: "Hyper text Prepaljlslks", d: "Hyper text Prepaljlslks", correct: 'b' }
    ]);

    const alert = useAlert();
    const { id } = useParams();
    const [time, settime] = useState(10);
    const [marks, setmarks] = useState(0);
    const [qnum, setqnum] = useState(1);
    const [ans, setans] = useState('');
    const [a, seta] = useState(0);
    const [b, setb] = useState(0);
    const [c, setc] = useState(0);
    const [d, setd] = useState(0);
    const [finsihed, setfinished] = useState(0);
    const [stop, setstop] = useState(0);
    const [totaltime, settotaltime] = useState(0);
    const [totalcorrect, settotalcorrect] = useState(0);
    const [totalattempt, settotalattempt] = useState(0);
    const [accuracy, setaccuracy] = useState(0);

    let correct = ques[qnum - 1].correct;
    const Navigate = useNavigate();
    const nexthandler = () => {
        settime(10);
        setqnum(qnum + 1);
        setans('')
        seta(0)
        setb(0)
        setc(0)
        setd(0)
        setstop(0)
    }
    useEffect(() => {
        const check = async () => {
            try {
                await axios.get(
                    `https://quiz-backend-one-fawn.vercel.app/api/v1/islogin`,
                    { withCredentials: true }
                );

            } catch (error) {
                alert.error(error.response.data.message)
                Navigate('/login')
            }
        }
        check();
        const getques = async () => {
            try {
                const { data } = await axios.get(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`);
                const arr = [];

                data.results.map((list) => {
                    const questions = list.incorrect_answers;
                    const correct = list.correct_answer;
                    const incorrect = list.incorrect_answers;
                    let ans;
                    const insert = () => {
                        const ind = Math.floor(Math.random() * (incorrect.length + 1));
                        if (ind == 0) ans = 'a';
                        else if (ind == 1) ans = 'b'
                        else if (ind == 2) ans = 'c'
                        else if (ind == 3) ans = 'd'
                        // console.log(ind);
                        // console.log(correct)
                        questions.splice(ind, 0, correct);
                    }
                    insert();
                    const quesdata = {

                        "q": list.question,
                        "a": questions[0],
                        "b": questions[1],
                        "c": questions[2],
                        "d": questions[3],
                        "correct": ans
                    }
                    arr.push(quesdata)
                })
                // console.log(response)
                setques(arr);
            } catch (error) {
                alert.error(error.response.data.message)
                Navigate('/login')
            }
            setloading(false)
            settime(10)
        }
        getques();
    }, [])
    const finishhandler = async () => {
        if (totalattempt)
            setaccuracy((totalcorrect * 100) / totalattempt);
        setfinished(1);
        try {
            let acc = 0;
            if (totalattempt)
                acc = ((totalcorrect * 100) / totalattempt);
            const { data } = await axios.put(
                `https://quiz-backend-one-fawn.vercel.app/api/v1/adddata`,
                {
                    "marks": marks,
                    "correct": totalcorrect,
                    "accuracy": acc,
                    "avg": totaltime / 10
                },
                { withCredentials: true }
            );

        } catch (error) {
            console.log(error)
            alert.error(error.response.data.message)
        }

    }
    const handleOptionClick = (option) => {
        if (!ans) {
            if (option == correct) {
                setmarks(marks + time * 1);
                settotalcorrect(totalcorrect + 1)
            }
            setans(option);
            setstop(1)
            settotaltime(totaltime + (10 - time));
            if (time > 0) settotalattempt(totalattempt + 1)
        }
    };
    const gotohome = () => {
        Navigate('/');
    }
    useEffect(() => {
        let timerInterval;
        if (!stop) {
            if (time > 0) {
                timerInterval = setInterval(() => {
                    settime((prevTime) => prevTime - 1);
                }, 1000);
            }

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [time]);
    useEffect(
        () => {
            if (ans == 'a') seta(1)
            else if (ans == 'b') setb(1)
            else if (ans == 'c') setc(1)
            else if (ans == 'd') setd(1)
        }
        , [ans]
    )

    return (
        <>{(loading) ? (
            <Loader />
        ) : (
            <Box className='home' h='100vh' bg='#bad7f0' display='flex'  justifyContent='center' alignItems='center'>
                {(finsihed == 1) &&
                    <Box w='550px' bg='aliceblue' borderRadius='5px' h={'440px'} mt={'15vh'}>
                        <Box as='header' pos='relative' zIndex='2' h='70px' p='0 30px' bg={'blue.300'} borderRadius='5px 5px 0 0' display='flex' alignItems='center' justifyContent='center' boxShadow='0px 3px 5px 1px rgba(0,0,0,0.1)'>
                            <Text fontSize='20px' fontWeight='600' className='title' textColor={'white'}>Report Analysis</Text>
                            {/* <Box className='timer' color='#004085' bg='#cce5ff' border='1px solid #b8daff' h='45px' p='0 8px' borderRadius='5px' display='flex' alignItems='center' justifyContent='space-between' w='145px'>
                            <Text fontSize='17px' fontWeight='400' userSelect='none'>Time Left :</Text>
                            <Text fontSize='18px' fontWeight='500' h='30px' w='45px' color='#fff' borderRadius='5px' lineHeight='30px' textAlign='center' bg='#343a40' border='1px solid #343a40' userSelect='none' className='timer_sec'>{time}</Text>
                        </Box> */}
                            <Box pos='absolute' bottom='0px' left='0px' h='3px' bg='#007bff' className='time_line'></Box>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'space-evenly'} h={'72%'} ml={'10%'}>
                            <Box display={'flex'} width={'80%'} justifyContent={'space-between'}> <Text>Marks obtained </Text><Text> {marks}</Text></Box>
                            <Box display={'flex'} width={'80%'} justifyContent={'space-between'}> <Text>Accuracy </Text><Text> {accuracy.toFixed(2)} %</Text></Box>
                            <Box display={'flex'} width={'80%'} justifyContent={'space-between'}> <Text>Total Attempts </Text><Text> {totalattempt}</Text></Box>
                            <Box display={'flex'} width={'80%'} justifyContent={'space-between'}> <Text>Total Correct </Text><Text> {totalcorrect}</Text></Box>
                            <Box display={'flex'} width={'80%'} justifyContent={'space-between'}> <Text>Average Time </Text><Text> {(totaltime / 10).toFixed(2)} s</Text></Box>

                        </Box>
                        <Box as='footer' h='60px' display='flex' bg={'blue.300'} alignItems='center' justifyContent='space-between' borderTop='1px solid lightgrey'>
                            <Box className='total_que' display='flex' alignItems='center' justifyContent='center' w='100%' >
                                <Button className='next_btn' textColor={'white'} height='40px' fontSize='18px' fontWeight='400' cursor='pointer' borderRadius='5px' bg='#007bff' border='1px solid white' lineHeight='10px' _hover={{ bg: '#0263ca', cursor: "pointer" }} onClick={gotohome}> Home</Button>
                            </Box>
                        </Box>
                    </Box>
                }
                {!finsihed && <Box className='quiz_box' w='550px' bg='#fff' borderRadius='5px' mt={'15vh'}>
                    <Box as='header' pos='relative' zIndex='2' h='70px' p='0 30px' bg='#fff' borderRadius='5px 5px 0 0' display='flex' alignItems='center' justifyContent='space-between' boxShadow='0px 3px 5px 1px rgba(0,0,0,0.1)'>
                        <Text fontSize='20px' fontWeight='600' className='title'>Quiz-time</Text>
                        <Box className='timer' color='#004085' bg='#cce5ff' border='1px solid #b8daff' h='45px' p='0 8px' borderRadius='5px' display='flex' alignItems='center' justifyContent='space-between' w='145px'>
                            <Text fontSize='17px' fontWeight='400' userSelect='none'>Time Left :</Text>
                            <Text fontSize='18px' fontWeight='500' h='30px' w='45px' color='#fff' borderRadius='5px' lineHeight='30px' textAlign='center' bg='#343a40' border='1px solid #343a40' userSelect='none' className='timer_sec'>{time}</Text>
                        </Box>
                        <Box pos='absolute' bottom='0px' left='0px' h='3px' bg='#007bff' className='time_line'></Box>
                    </Box>
                    <Box as='section' p='25px 30px 20px 30px' bg='#fff'>
                        <Box className='que_text' fontSize='15px' fontWeight='600'>
                            <Text as='span'>Q.{qnum} {ques[qnum - 1].q}</Text>
                        </Box>
                        <Box p='20px 0px' display={'flex'} flexDir={'column'} justifyContent={'space-between'}>

                            <Button width={'100%'} display={'flex'} justifyContent={'flex-start'} bgColor={'aliceblue'} border={`1px solid #84c5fe`} mb={'1vw'} onClick={() => handleOptionClick('a')}>
                                <Text as='span'>{ques[qnum - 1].a}</Text>
                                {(ans && correct == 'a') ? <Text position={'absolute'} right={'2'}><IoIosCheckmarkCircleOutline size={'25'} /></Text> : <></>}
                                {(a && !(correct == 'a')) ? <Text position={'absolute'} right={'2'} ><CancelTwoToneIcon /></Text> : <></>}

                            </Button>
                            <Button width={'100%'} display={'flex'} justifyContent={'flex-start'} bgColor={'aliceblue'} border={`1px solid #84c5fe`} mb={'1vw'} onClick={() => handleOptionClick('b')}>
                                <Text as='span'>{ques[qnum - 1].b}</Text>
                                {(ans && correct == 'b') ? <Text position={'absolute'} right={'2'}><IoIosCheckmarkCircleOutline size={'25'} /></Text> : <></>}
                                {(b && !(correct == 'b')) ? <Text position={'absolute'} right={'2'}><CancelTwoToneIcon /></Text> : <></>}

                            </Button>
                            <Button width={'100%'} display={'flex'} justifyContent={'flex-start'} bgColor={'aliceblue'} border={'1px solid #84c5fe'} mb={'1vw'} onClick={() => handleOptionClick('c')}>
                                <Text as='span'>{ques[qnum - 1].c}</Text>
                                {(ans && correct == 'c') ? <Text position={'absolute'} right={'2'}><IoIosCheckmarkCircleOutline size={'25'} /></Text> : <></>}
                                {(c && !(correct == 'c')) ? <Text position={'absolute'} right={'2'}><CancelTwoToneIcon /></Text> : <></>}
                            </Button>
                            <Button width={'100%'} display={'flex'} justifyContent={'flex-start'} bgColor={'aliceblue'} border={'1px solid #84c5fe'} onClick={() => handleOptionClick('d')}>
                                <Text as='span'>{ques[qnum - 1].d}</Text>
                                {(ans && correct == 'd') ? <Text position={'absolute'} right={'2'}><IoIosCheckmarkCircleOutline size={'25'} /></Text> : <></>}
                                {(d && !(correct == 'd')) ? <Text position={'absolute'} right={'2'}><CancelTwoToneIcon /></Text> : <></>}
                            </Button>


                        </Box>
                    </Box>
                    <Box as='footer' h='60px' p='0 30px' display='flex' alignItems='center' justifyContent='space-between' borderTop='1px solid lightgrey'>
                        <Box className='total_que' display='flex' alignItems='center' justifyContent='space-between' w='100%'>
                            <Text as='span' userSelect='none' display={'flex'}>
                                <Text as='p' fontWeight='500' p='0 5px'>Marks :</Text>
                                <Text as='p' fontWeight='500' p='0 5px'>{marks} / 100</Text>
                                {/* <Text as='p' fontWeight='500' p='0 5px'></Text> */}
                            </Text>
                            {(ans && qnum != 10) && <Button className='next_btn' height='40px' p='0 13px' fontSize='18px' fontWeight='400' cursor='pointer' borderRadius='5px' bg='#007bff' border='1px solid #007bff' lineHeight='10px' _hover={{ bg: '#0263ca', cursor: "pointer" }} onClick={nexthandler}>Next</Button>}
                            {(ans && qnum == 10) && <Button className='next_btn' height='40px' p='0 13px' fontSize='18px' fontWeight='400' cursor='pointer' borderRadius='5px' bg='#007bff' border='1px solid #007bff' lineHeight='10px' _hover={{ bg: '#0263ca', cursor: "pointer" }} onClick={finishhandler}>Finish</Button>}
                        </Box>
                    </Box>
                </Box>}
            </Box>)}
        </>
    )
}

export default Quiz