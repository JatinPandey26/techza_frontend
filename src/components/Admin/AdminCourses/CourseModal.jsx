import { Button, Grid, Heading, Modal, ModalBody, ModalContent, ModalHeader, Image, ModalOverlay, Stack, Box, Text, Input, Select, VStack, ModalFooter, ModalCloseButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../../Auth/SignUp'
const fileUploadStyle = {
    '&::file-selector-button': { ...fileUploadCss, color: 'purple' }
}

const CourseModal = ({ isOpen, onClose, courseTitle, id = '3eq2h9d3q28dd', deleteLectureButtonHandler, lectures = [], addLectureHandler }) => {
    const [formdata, setFormData] = useState({ video : null });

    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
        console.log(formdata);
    }

    function handleVideoSelection(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFormData({ ...formdata, 'video': reader.result })
        }
    }

    const categories = ["Web Development", "Machine Learning", "Artificial Intelligence", "Data Science", "App Development", " Game Development"]

    const handleModalClose = () => {
        setFormData({video : null})
        onClose()
    }

    return (
        <Modal isOpen={isOpen} size='full' scrollBehavior='outside'>
            <ModalOverlay />
            <ModalContent>

                <ModalHeader>
                    {courseTitle}
                </ModalHeader>
                <ModalCloseButton onClick={handleModalClose}/>
                <ModalBody p='8'>
                    <Grid templateColumns={['1fr', '3fr 1fr']}>

                        <Box p={['0', '8']}>
                            <Box my='5'>
                                <Heading children={courseTitle} />
                                <Heading children={`#${id}`} size='sm' opacity={0.5} />
                            </Box>

                            <Heading children='Lectures' size={'lg'} />

                            <VideoCard
                                title='React Intro' num={1} description={'Basic of react'} deleteLectureButtonHandler={deleteLectureButtonHandler} courseId={'dahdowdoaopdwe99w2'} lectureId='892hr298lectureh4h97f8h'
                            />
                        </Box>
                        <Box>
                            <form onSubmit={e => addLectureHandler(e, formdata.id, formdata.title, formdata.description, formdata.video)}>
                                <VStack>
                                    <Heading children='Add Lecture' size={'md'} textTransform='uppercase'/>
                                    <Input id='title' value={formdata.title} onChange={e => handleChange(e)} placeholder='Title' type='text' focusBorderColor='purple.300' />
                                    <Input id='description' value={formdata.description} onChange={e => handleChange(e)} placeholder='Description' type='text' focusBorderColor='purple.300' />
                                    <Box my={'4'} className='flex justify-center'>
                                        {formdata.video === null ? <></> : <video controls controlsList='nodownload' src={formdata.video} />}
                                    </Box>
                                    <Input required css={fileUploadStyle} id='video' accept='video/mp4' onChange={e => handleVideoSelection(e)} type='file' focusBorderColor='purple.300' />

                                    <Button colorScheme={'purple'} type='submit' w='full'>Add Lecture</Button>
                                </VStack>
                            </form>
                        </Box>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleModalClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CourseModal

function VideoCard({ title, num, description, deleteLectureButtonHandler, courseId, lectureId }) {
    return (
        <Stack direction={['column', 'row']} borderRadius={'lg'} my='8' boxShadow={'0 0 10px rgba(107,70,103,0.5)'}
            justifyContent={['flex-start', 'space-between']} p={['4', '8']}
        >
            <Box>
                <Heading children={`#${num} ${title}`} size='md' />
                <Text children={description} />
            </Box>
            <Button color='purple.600' onClick={() => deleteLectureButtonHandler(courseId, lectureId)}>
                <RiDeleteBin7Fill />
            </Button>
        </Stack>
    )
}