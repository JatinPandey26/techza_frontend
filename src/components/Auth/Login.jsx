import React from 'react'
import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../../redux/actions/userAction';
const Login = () => {
    const dispatch = useDispatch();

    const [formdata, setFormData] = useState({
    });
    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
    } 

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(loginReducer(formdata.email, formdata.password))
    }
    return (
        <Container minH={'80vh'}>
            <VStack spacing={'16'} justifyContent='center' height={'full'}>
                <Heading textAlign={'center'} children='Welcome Back To Techza' />
                <form className='w-full' onSubmit={submitHandler}>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address" />
                        <Input required id='email' value={formdata.email} onChange={e => handleChange(e)} placeholder='xyz@gmail.com' type='email' focusBorderColor='#3182ce' />
                    </Box>
                    <Box my='4' >
                        <FormLabel htmlFor='password' children="Password" />
                        <Input required id='password' value={formdata.password} onChange={e => handleChange(e)} placeholder='password' type='password' focusBorderColor='#3182ce' />
                    </Box>
                    <Box><Link to='/forgetPassword'><Button padding='0' size={'sm'} variant={'ghost'} colorScheme='red'>Forget Password ?</Button></Link></Box>
                    <Button size={'md'} my='4' colorScheme='blue' type='submit' >Login</Button>

                    <Box my={'4'}>
                        New User ? {" "}   <Link to={'/signup'}><Button size={'sm'} colorScheme={'pink'}>Sign Up</Button> {" "} Here</Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Login