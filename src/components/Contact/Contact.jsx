import React, { useEffect } from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/otherAction';
import toast from 'react-hot-toast'
const Contact = () => {
    const [formdata, setFormData] = useState({});

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        await dispatch(contactUs(formdata.name, formdata.email, formdata.message))
        setFormData({name : "",email : "" , message : ""})
    }

    const { loading, error, message } = useSelector(state => state.other);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" })
        }

        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" })
        }
    })


    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
    }
    return (
        <Container minH={'80vh'}>
            <VStack spacing={'16'} justifyContent='center' height={'full'}>
                <Heading textAlign={'center'} children='Contact Us' />
                <form className='w-full' onSubmit={submitHandler} >

                    <Box my='4'>
                        <FormLabel htmlFor='name' children="Name" />
                        <Input required id='name' value={formdata.name} onChange={e => handleChange(e)} placeholder='name' type='name' focusBorderColor='#3182ce' />
                    </Box>

                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email" />
                        <Input required id='email' value={formdata.email} onChange={e => handleChange(e)} placeholder='xyz@gmail.com' type='email' focusBorderColor='#3182ce' />
                    </Box>

                    <Box my='4'>
                        <FormLabel htmlFor='message' children="Message" />
                        <Textarea required id='message' value={formdata.message} onChange={e => handleChange(e)} placeholder='Your Message' focusBorderColor='#3182ce' />
                    </Box>

                    <Button size={'md'} my='4' colorScheme='blue' type='submit' isLoading = {loading}>Send Mail</Button>

                    <Box my={'4'}>
                        Request for a course ? {" "}   <Link to={'/request'}><Button size={'sm'} colorScheme={'pink'}>Course Request</Button> {" "} Here</Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Contact