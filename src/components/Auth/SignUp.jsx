import React from 'react'
import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpReducer } from '../../redux/actions/userAction';

export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#D53F8C',
    background: 'transparent'
}

const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss
}

const SignUp = () => {

    const [formdata, setFormData] = useState({
        email: ""
    });

    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
    }

    function handleImageSelection(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFormData({
                ...formdata, 'avatar': reader.result
                , 'image': file
            })
        }
    }

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append('name', formdata.name);
        myForm.append('email', formdata.email);
        myForm.append('password', formdata.password);
        myForm.append('file', formdata.image);

        dispatch(signUpReducer(myForm))
    }

    return (
        <Container minH={'80vh'}>
            <VStack spacing={'16'} justifyContent='center' height={'full'}>
                <Heading textAlign={'center'} children='Welcome To Techza' />
                <form className='w-full' onSubmit={handleSubmit}>
                    <Box my={'4'} className='flex justify-center'>
                        <Avatar size={'xl'} src={formdata.avatar} />
                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='name' children="Name" />
                        <Input required id='name' value={formdata.name} onChange={e => handleChange(e)} placeholder='name' type='name' focusBorderColor='#3182ce' />
                    </Box>
                    <Box my='4'>
                        <FormLabel htmlFor='email' children="Email Address" />
                        <Input required id='email' value={formdata.email} onChange={e => handleChange(e)} placeholder='xyz@gmail.com' type='email' focusBorderColor='#3182ce' />
                    </Box>
                    <Box my='4' >
                        <FormLabel htmlFor='password' children="Password" />
                        <Input required id='password' value={formdata.password} onChange={e => handleChange(e)} placeholder='password' type='password' focusBorderColor='#3182ce' />
                    </Box>
                    <Box my='4' >
                        <FormLabel htmlFor='chooseAvatar' children="Choose Avatar" />
                        <Input required css={fileUploadStyle} id='avatar' accept='image/*' onChange={e => handleImageSelection(e)} type='file' focusBorderColor='#3182ce' />
                    </Box>
                    {/* <Box><Link to='/forgetPassword'><Button padding='0' size={'sm'} variant={'ghost'} colorScheme='red'>Forget Password ?</Button></Link></Box> */}
                    <Button size={'md'} my='4' colorScheme='blue' type='submit'>Sign Up</Button>

                    <Box my={'4'}>
                        Already a user ? {" "}   <Link to={'/login'}><Button size={'sm'} colorScheme={'pink'}>Login</Button> {" "} Here</Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default SignUp