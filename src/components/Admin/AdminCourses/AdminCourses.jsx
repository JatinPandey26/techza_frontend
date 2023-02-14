import { Box, Grid, Heading, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Td, HStack, Button, Image, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import Sidebar from '../Sidebar'
import demoPic from '../../../assets/images/demo.png'
import CourseModal from './CourseModal'
const AdminCourses = () => {

    const courses = [{
        _id: "vbdjag6r454w3049w3gwae3",
        title: "Sample course",
        category: "web development",
        createdBy: 'Jatin Pandey',
        views: 103,
        numOfVideos: 12,
        poster: {
            url: demoPic
        },

    }]

    const { isOpen, onClose, onOpen } = useDisclosure()

    const [courseId , setCourseId] = useState();

    const courseDetailsHandler = (userId) => {
        onOpen()
        console.log(userId);
    }

    const deleteCourseHandler = (userId) => {
        console.log(userId);
    }

    const deleteLectureButtonHandler = ( courseId, lectureId ) => {
        console.log(courseId, lectureId);
    }

    const addLectureHandler = ({ e, courseId, title ,description , video}) => {
        e.preventDefault();
        console.log('course added');
    }


    return (
        <Grid minH={'80vh'} templateColumns={['1fr', '5fr 1fr']} >
            <Box p={['0', '8']} overflowX='auto'>
                <Heading textTransform={'uppercase'} children='All Users' mb='8' textAlign={['center', 'left']} />
                <TableContainer w={['100vw', 'full']}>

                    <Table variant={'simple'} size='lg'>
                        <TableCaption children='All available courses in the database' />
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>
                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {
                                courses.map(course => <Row key={course._id} course={course} courseDetailsHandler={courseDetailsHandler} deleteCourseHandler={deleteCourseHandler} />)
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <CourseModal isOpen={isOpen} onClose={onClose} deleteLectureButtonHandler={deleteLectureButtonHandler} id = 'dahde89fwhwoefwjo'  addLectureHandler={addLectureHandler} courseTitle='React Tutorial' />
            </Box>
            <Sidebar />
        </Grid>
    )
}

export default AdminCourses

function Row({ course, courseDetailsHandler, deleteCourseHandler }) {
    return (
        <Tr>
            <Td>#{course._id}</Td>
            <Td>{<Image src={course.poster.url} />}</Td>
            <Td>{course.title}</Td>
            <Td textTransform={'uppercase'}>{course.category}</Td>
            <Td>{course.createdBy}</Td>
            <Td isNumeric>{course.views}</Td>
            <Td isNumeric>{course.numOfVideos}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button variant={'outline'} onClick={() => courseDetailsHandler(course._id)} color='purple.500'> View Lectures</Button>
                    <Button variant={'outline'} onClick={() => deleteCourseHandler(course._id)} color='purple.600'><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}