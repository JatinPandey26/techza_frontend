import { Box, Container, Grid, Heading, Avatar, VStack, Input, Select, Image, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { fileUploadCss } from '../../Auth/SignUp'
import { useDispatch } from 'react-redux'
import { createCourse } from '../../../redux/actions/adminAction'
const fileUploadStyle = {
    '&::file-selector-button': { ...fileUploadCss, color: 'purple' }
}

const CreateCourse = () => {
    const [formdata, setFormData] = useState({ image: null });
    const [category, setCategory] = useState();

    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })

    }

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append('title', formdata.title);
        myForm.append('description', formdata.description);
        myForm.append('category', category);
        myForm.append('file', formdata.image);
        myForm.append('createdBy', formdata.createdBy);

        dispatch(createCourse(myForm));
    }

    function handleImageSelection(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFormData({ ...formdata, 'imagePreview': reader.result, 'image': file })
        }
    }

    const categories = ["Web Development", "Machine Learning", "Artificial Intelligence", "Data Science", "App Development", " Game Development"]

    return (
        <Grid minH={'80vh'} templateColumns={['1fr', '5fr 1fr']} >
            <Container py='16'  >
                <Heading textTransform={'uppercase'} children='Create Course' mb='8' textAlign={['center', 'left']} />

                <VStack
                    spacing={8}
                >
                    <form action="" style={{display : 'flex' , flexDirection : "column" , gap : '1rem'}} onSubmit={submitHandler}>
                        <Input id='title' value={formdata.title} onChange={e => handleChange(e)} placeholder='Title' type='text' focusBorderColor='purple.300' />
                        <Input id='description' value={formdata.description} onChange={e => handleChange(e)} placeholder='Description' type='text' focusBorderColor='purple.300' />
                        <Input id='createdBy' value={formdata.createdBy} onChange={e => handleChange(e)} placeholder='Creater Name' type='text' focusBorderColor='purple.300' />
                        <Select
                            focusBorderColor="purple.300"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="">Category</option>

                            {categories.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        <Box my={'4'} className='flex justify-center'>
                            {formdata.imagePreview === null ? <></> : <Image size={'xl'} boxSize='64' objectFit={'cover'} src={formdata.imagePreview} />}
                        </Box>
                        <Input required css={fileUploadStyle} id='image' accept='image/*' onChange={e => handleImageSelection(e)} type='file' focusBorderColor='purple.300' />

                        <Button colorScheme={'purple'} type='submit' w='full'>Create</Button>
                    </form>
                </VStack>
            </Container>
            <Sidebar />
        </Grid>
    )
}

export default CreateCourse