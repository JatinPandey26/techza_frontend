import React from 'react'
import { Heading, Stack, VStack, Text, Button, Image, Box, HStack, Container } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { CgGoogle, CgYoutube, CgInstagram, CgFacebook, CgTwitter, CgTwilio, CgWindows } from "react-icons/cg"
import { SiCoursera, SiUdemy, SiZendesk } from "react-icons/si"

import './home.scss'
import hometitlepic from '../../assets/images/hometitlepic.png'
import introVideo from '../../assets/videos/introVideo.mp4'

const Home = () => {
    return (
        <div className='home'>
            <Box className='container1' margin="0" padding="1">
                <Stack className='stack ' direction={["column", "row"]} height="full" width={"full"} justifyContent={["center"]} alignItems={"center"} spacing={['16', '18', '20', '56']}>
                    <VStack className='flex md:items-end' width={"full"} height={"full"} spacing={"10"} >
                        <Heading size={"xl"} textAlign={"center"}>
                            LEARN FROM EXPERTS
                        </Heading>
                        <Text fontSize={"lg"} textAlign={"center"} children="Get all the best courses you ever needed" />
                        <Link to="/courses">
                            <Button size={"lg"} colorScheme="pink" _hover={{ bgColor: "#3182ce" }}>
                                Explore Now
                            </Button>
                        </Link>
                    </VStack>
                    <div className="imageContainer m-2!important">
                        <Image className='hometitlepic m-0' src={hometitlepic} boxSize="sm" objectFit={"contain"} cla />
                    </div>
                </Stack>
            </Box>
            <Box className='brandBox' padding={"8"} bg="blackAlpha.800" >
                <Heading textAlign={"center"} fontFamily="body" color={"blue.500"} children="OUR BRANDS" />
                <HStack className='brandsBanner' justifyContent={"space-evenly"} >
                    <CgFacebook />
                    <CgTwilio />
                    <CgGoogle />
                    <CgInstagram />
                    <CgWindows />
                    <CgYoutube />
                    <CgTwitter />
                    <SiCoursera />
                    <SiUdemy />
                    <SiZendesk />
                </HStack>
            </Box>

            <Box>
                <div className="videoContainer mb-10">
                    <video  src={introVideo} controls controlsList='nodownload nofullscreen noremoteplayback' disablePictureInPicture disableRemotePlayback></video>
                </div>
            </Box>
        </div>
    )
}

export default Home