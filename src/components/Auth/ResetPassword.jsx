import React, { useEffect } from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/profileAction';
import { toast } from 'react-hot-toast';
const ResetPassword = () => {
    const [formdata, setFormData] = useState({
        password : '',
    });

    const params = useParams()
    
    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
    }

    const {loading,message ,error} = useSelector(state => state.profile)

    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        dispatch(resetPassword(params.token,formdata.password))
        setFormData({password : ''})
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
                <Heading textAlign={'center'} children='Reset Password' />
                <form className='w-full' onSubmit={handleSubmit} >
                    <Box my='4'>
                        <FormLabel htmlFor='password' children="New Password" />
                        <Input required id='password' value={formdata.password} onChange={e => handleChange(e)} placeholder='password' type='password' focusBorderColor='#3182ce' />
                    </Box>

                    <Button size={'md'} my='4' colorScheme='blue' type='submit' isLoading = {loading}>Reset password</Button>

                    
                </form>
            </VStack>
        </Container>
    )
}

export default ResetPassword