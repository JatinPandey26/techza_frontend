import { Avatar, Button, Container, Heading, Stack, Text, VStack, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import introVideo from '../../assets/videos/introVideo.mp4'
import data from '../../assets/docs/termsAndConditions'

const Founder = () => {
    return (
        <Stack direction={['column', 'row']} spacing={['4', '16']} padding='4'>
            <VStack>
                <Avatar src='' boxSize={'36'} />
                <Text children="Founder" opacity={0.8} fontSize='1.5rem' />
            </VStack>
            <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>

                <Heading children="Jatin Pandey" size={['md', 'lg']} />
                <Text children='Hi , I am a full-stack web developer and a techer. My goal is to provide best lectures at affordable prices' textAlign={['center', 'left']} />
            </VStack>
        </Stack>
    )
}

const VideoPlayer = () => {
    return (
        <Box>
            <div className="videoContainer mt-10 w-full h-[40vh]">
                <video src={introVideo} autoPlay loop muted controls controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture disableRemotePlayback className='object-cover w-[100vw] h-full'></video>
            </div>
        </Box>
    )
}

const TandC = ({ termsAndConditions }) => {
    return (
        <Box my={'16'} maxH = '25vh' overflowY='scroll' css={{
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-track': {
                width: '10px',
                backgroundColor : 'lightgrey'
            },
            '&::-webkit-scrollbar-thumb': {
                background: "#3182ce",
                borderRadius: '10px',
            },}} >
            <Heading children={'Terms & Conditions'} size='md' />

            <Box p='4' >
                <Text children={termsAndConditions} letterSpacing='wider' textAlign='justify' />
                <Heading size={'xs'} my = '4' children = 'Refund only applicable for cancellation within 7 days'/>
            </Box>
        </Box>
    )
}

const About = () => {
    return (
        <Container minH={'80vh'} maxW={'100vw'} padding={['6', '16']} boxShadow='lg'>
            <Heading children={"About Us"} textAlign={['center', 'left']} />
            <Founder />
            <Stack direction={['column', 'row']} alignItems='center' spacing={'4'}>
                <Text textAlign={'justify'}>
                    We continue to provide academically sound content of the highest caliber and welcome input from our users as we address issues of equity, diversity, inclusivity and representation. Since we know there are many different approaches to teaching and education, we develop our materials to complement these different philosophies across subjects and grades.
                </Text>
                <Link to='/subscribe'><Button variant={'ghost'} colorScheme='blue'>Checkout our plan</Button></Link>
            </Stack>
            <VideoPlayer />
            <TandC termsAndConditions={data} />
            <HStack my={6} >
                <RiSecurePaymentFill />
                <Heading size={'sm'} fontFamily='sans-serif' textTransform='uppercase' children='Payments are secured by razorpay' />
            </HStack>
        </Container>
    )
}

export default About