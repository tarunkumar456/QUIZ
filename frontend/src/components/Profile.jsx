import { React, useState, useEffect, useRef } from 'react';
import {
    HStack,
    Radio,
    RadioGroup,
    Button,
    Flex,
    Heading,
} from '@chakra-ui/react';
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
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from './Loader/Loader';
import img from '../assets/back7.jpg'

function Profile() {
    const [userData, setuserdata] = useState({});
    const alert = useAlert();
    const [loading, setloading] = useState(true);
    const [quizResults, setquizResults] = useState([]);
    const [report, setreport] = useState([]);
    const [download, setdownload] = useState(false);
    const componentpdf = useRef();

    const generatepdf = useReactToPrint({
        content: () => componentpdf.current,
        documentTitle: 'Test Report',
    });

    const Navigate = useNavigate();

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
                    `https://quiz-backend-one-fawn.vercel.app/api/v1/getdata`,
                    { withCredentials: true }
                );
                setquizResults(data.quiz.quiz);
                const arr = [];
                data.quiz.quiz.map((result, index) => {
                    let data = {
                        'Quiz No': index + 1,
                        'Total Marks': result.marks,
                        'Total correct': result.correct,
                        'Accuracy': result.accuracy,
                        'Average Time':result.averagetime
                    };
                    arr.push({ data });
                });
                setreport(arr);
                let totalmarks = 0,
                    totalaccuracy = 0,
                    averagetime = 0,
                    attempted = 0;

                data.quiz.quiz.forEach((i) => {
                    totalaccuracy += i.accuracy;
                    totalmarks += i.marks;
                    averagetime += i.averagetime;
                    attempted++;
                });
                let rating=0;

                if (attempted) {
                    totalaccuracy /= attempted;
                    averagetime /= attempted;
                    rating=(totalmarks)/(attempted*averagetime);
                }
                setuserdata({
                    name: data.quiz.name,
                    totalMarks: totalmarks,
                    accuracy: totalaccuracy,
                    email: data.quiz.email,
                    averageTime: averagetime,
                    attempted: attempted,
                    rating:rating
                });
                setloading(false);
            } catch (error) {
                console.log(error);
                alert.error(error.response.data.message);
            }
        };
        fun();
    }, []);

    const gotohome = () => {
        Navigate('/');
    };

    return (
        <Box minH={['150vh', '120vh']}
            width={['100vw', 'full']}
            bgColor={'#bad7f0'}
            overflowX={'scroll'}
            bgImg={`url(${img})`} bgSize="cover" inset={'0'}  
            color={'white'}
            >
            
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div ref={componentpdf} style={{ width: '100vw'}}>
                        <Box
                            display={'flex'}
                            flexDirection={{ base: 'column', md: 'column', lg: 'row' }}

                            alignItems={'flex-start'}
                            p={2}

                        >
                            <Box
                                width={['100%', '100%', '30%']}
                                position={{ base: 'relative', md: 'relative', lg: 'fixed' }}
                                top={['10vh', '20vh']}
                                ml={[0, 0, '6vw']}
                            >
                                <VStack alignItems={'flex-start'} ml={2} spacing={4}>
                                    <Heading mb={4}>Profile</Heading>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Name:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'1px'}>
                                            {userData.name}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Rating:
                                        </Text>
                                        <Text fontSize={'medium'} fontWeight="bold" pb={'1px'}>
                                            {userData.rating.toFixed(2)}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Accuracy:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'1px'}>
                                            {userData.accuracy.toFixed(2)}%
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Total Marks:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'1px'}>
                                            {userData.totalMarks}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Email:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'2px'}>
                                            {userData.email}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Average Time:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'1px'}>
                                            {userData.averageTime.toFixed(2)}
                                        </Text>
                                    </HStack>
                                    <HStack alignItems={'flex-end'}>
                                        <Text fontSize={["md","xl"]} fontWeight="bold">
                                            Total quiz attempted:
                                        </Text>
                                        <Text fontSize={["sm","md"]} fontWeight={'semibold'} pb={'2px'}>
                                            {userData.attempted}
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>
                            <Box width={['100vw', '100vw', '70%']} ml={[0, 0, '5%', '30%']} mt={['10vh', '15vh']}>
                                <Table variant="simple" overflowX="auto">
                                    <TableCaption placement="top" fontSize={['4vh', '5vh']} color={'white'}>
                                        Quiz Report
                                    </TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Quiz No</Th>
                                            <Th>Marks Obtained</Th>
                                            <Th>Total Correct</Th>
                                            <Th>Accuracy</Th>
                                            <Th>Average Time</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {quizResults.map((result, index) => (
                                            <Tr key={result._id}>
                                                <Td>{index + 1}</Td>
                                                <Td>{result.marks}</Td>
                                                <Td>{result.correct}</Td>
                                                <Td>{result.accuracy.toFixed(2)}</Td>
                                                <Td>{result.averagetime}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </Box>
                    </div>
                    <HStack position={{ base: 'relative', md: 'relative', lg: 'fixed' }} bottom={'9vh'} left={'7vw'} mt={['4vh','0vh']}>
                        <Button
                            className="next_btn"
                            height="40px"
                            mt={'9vh'}
                            p={'0 13px'}
                            fontSize="18px"
                            fontWeight="400"
                            cursor="pointer"
                            borderRadius="5px"
                            bg="#007bff"
                            border="1px solid #007bff"
                            lineHeight="10px"
                            _hover={{ bg: '#0263ca', cursor: 'pointer' }}
                            onClick={generatepdf}
                            color={'white'}
                        >
                            Download report
                        </Button>
                    </HStack>
                </>
            )}
        </Box>
    );
}

export default Profile;
