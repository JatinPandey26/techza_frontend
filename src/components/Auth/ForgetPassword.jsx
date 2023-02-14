import React from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profileAction';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Forgetpassword = () => {
    const [formdata, setFormData] = useState({
        email: ""
    });
    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
        console.log(formdata);
    }

    const {loading,message ,error} = useSelector(state => state.profile)

    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(forgetPassword(formdata.email))
    }


    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch({type : 'clearError'})
        }

        if(message) {
            toast.success(message);
            dispatch({type : 'clearMessage'})
        }
    },[dispatch,error,message])

    return (
        <Container minH={'80vh'}>
            <VStack spacing={'16'} justifyContent='center' height={'full'}>
                <Heading textAlign={'center'} children='Forget Password' />
                <form className='w-full' onSubmit={handleSubmit} >
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address" />
                        <Input required id='email' value={formdata.email} onChange={e => handleChange(e)} placeholder='xyz@gmail.com' type='email' focusBorderColor='#3182ce' />
                    </Box>
                    
                    <Button size={'md'} my='4' colorScheme='blue' type='submit' isLoading = {loading}>Get reset link</Button>

                    
                </form>
            </VStack>
        </Container>
    )
}

export default Forgetpassword
