import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../assets/back7.jpg'
import Loader from './Loader/Loader';
import {
    Box,
    VStack,
    Stack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';

function Leaderboard() {
    const [board, setboard] = useState([]);
    const Navigate = useNavigate();
    const [loading,setloading]=useState(true)

    useEffect(() => {
        const fun = async () => {
            const check = async () => {
                try {
                    await axios.get(`https://quiz-backend-one-fawn.vercel.app/api/v1/islogin`, { withCredentials: true });
                } catch (error) {
                    alert.error(error.response.data.message);
                    Navigate('/login');
                }
            };
            check();
            try {
                const { data } = await axios.get(
                    `https://quiz-backend-one-fawn.vercel.app/api/v1/data`,
                    { withCredentials: true }
                );
                const arr = data.quiz;

                const arr1 = [];
                arr.map((i) => {
                    // console.log(i) 
                    let total = 0, time = 0, acc = 0, l = i.quiz.length;
                    i.quiz.map(
                        (q) => {
                            // console.log(q)
                            acc += q.accuracy;
                            total += q.marks;
                            time += q.averagetime;
                        }
                    )
                    if (l) {
                        time /= l;
                        acc /= l;
                    }
                    let rating = 0;
                    if (l) {
                        rating = (total / (l * time));
                    }
                    const ele = {
                        name: i.name,
                        totalMarks: total,
                        averageTime: time,
                        accuracy: acc,
                        quiz: l,
                        rating: rating
                    }
                    arr1.push(ele);
                })
                arr1.sort((a, b) => b.rating - a.rating);
                setboard(arr1);
                setloading(false)


            } catch (error) {
                console.log(error);
                alert.error(error.response.data.message);
                setloading(false)
            }
        };
        fun();
    }, []);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Box display={'flex'} justifyContent={'center'} width={'full'} pt={'10vh'} bgColor={'blue.100'} minH={'100vh'} bgImg={`url(${img})`} bgSize="cover" inset={'0'}>
                    <Box overflowX={'scroll'}>
                        <Table variant="simple" size={['sm', 'lg']}>
                            <TableCaption placement="top" fontSize={['5vh', '7vh']} fontWeight={'bold'}>
                                LEADERBOARD
                            </TableCaption>
                            <Thead  >
                                <Tr>
                                    <Th>Rank</Th>
                                    <Th>Name</Th>
                                    <Th>Rating</Th>
                                    <Th>Total marks</Th>
                                    <Th>Average time</Th>
                                    <Th>Accuracy</Th>
                                    <Th>Quiz attempted</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {board.map((i, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{i.name}</Td>
                                        <Td>{i.rating.toFixed(2)}</Td>
                                        <Td>{i.totalMarks}</Td>
                                        <Td>{i.averageTime.toFixed(2)}</Td>
                                        <Td>{i.accuracy.toFixed(2)}</Td>
                                        <Td>{i.quiz}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Leaderboard
