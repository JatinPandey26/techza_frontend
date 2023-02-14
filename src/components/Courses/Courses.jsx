import { Container, Heading, HStack, Input, Button, Text, Stack, VStack, Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import './courses.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import demoPic from '../../assets/images/demo.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/actions/courseAction'
import toast from 'react-hot-toast'
import { addToPlayList } from '../../redux/actions/userAction'
import {getMyProfileReducer} from '../../redux/actions/userAction'

const CourseCard = ({ views, title, imgsrc, addToPlaylistHandler, description, lectureCount, creator, id , loading }) => {

    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imgsrc} boxSize='60' objectFit={'cover'}></Image>
            <Heading textAlign={['center', 'left']} children={title} fontFamily={"sans-serif"} size="md" />
            <Text noOfLines={2} children={description} />

            <HStack>
                <Text noOfLines={2} children={"Creator :"} fontWeight="bold" textTransform={'uppercase'} />
                <Text noOfLines={2} children={creator} />
            </HStack>

            <Text noOfLines={2} children={"Lectures : " + lectureCount} fontWeight="bold" textTransform={'uppercase'} />
            <Text noOfLines={2} children={"Views : " + views} fontWeight="bold" textTransform={'uppercase'} />
            <Stack direction={['column', 'row']} alignItems='center'>
                <Link to={`/course/${id}`}><Button colorScheme={"pink"} size='sm'> Wacth Now</Button></Link>
                <Button colorScheme={"pink"} size='sm' variant="ghost"  isLoading = {loading} onClick={() => addToPlaylistHandler(id)}> Add to playlist</Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("")
    const dispatch = useDispatch()
    const { loading, courses, error , message } = useSelector(state => state.course)

    useEffect(() => {
        dispatch(getAllCourses(category, keyword))

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' })
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }

    }, [category, keyword, dispatch, error])


    const categories = ["Web Development", "Machine Learning", "Artificial Intelligence", "Data Science", "App Development", " Game Development"]

    const addToPlaylistHandler = async ( id ) => {
       await dispatch(addToPlayList(id));

       dispatch(getMyProfileReducer());
    }


    return (
        <Container minH={"80vh"} maxW="container.xl" padding={"8"} className="flex flex-col gap-5">
            <Heading children="All Courses" />
            <Input focusBorderColor='pink.500' onChange={(e) => setKeyword(e.target.value)} placeholder="Search a course ..." />

            <HStack overflow={"auto"} css={{
                '&::-webkit-scrollbar': {
                    width: '2px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '2px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: "#3182ce",
                    borderRadius: '10px',
                },

            }} >
                {categories.map((category, index) => <Button key={index} minW={"40"} className="my-3" onClick={(e) => setCategory(category)}><Text children={category} /></Button>)}
            </HStack>

            <Stack direction={['column', 'row']} flexWrap='wrap' justifyContent={['flex-start', 'space-evenly']} alignContent={['center', 'flex-start']}>

                { 
                loading ? <></> : courses && courses.length > 0 ? courses.map(item => {
                    return <CourseCard key={item._id} title={item.title} description={item.description} id={item._id} creator={item.createdBy} imgsrc={item.poster.url} lectureCount={item.numOfVideos} views={item.views} addToPlaylistHandler={addToPlaylistHandler} loading = {loading} />
                })
                : <Heading children = {"Courses Not Found"}/>
            } 
 

            </Stack>
        </Container>
    )
}

export default Courses