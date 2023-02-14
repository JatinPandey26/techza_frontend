import { Container, Heading, VStack, Input, Button, } from '@chakra-ui/react'
import { useState } from 'react'
import React from 'react'
import { updateProfile } from '../../redux/actions/profileAction';
import { useDispatch } from 'react-redux';
import { getMyProfileReducer } from '../../redux/actions/userAction';

const UpdateProfile = () => {
    const [formdata, setFormData] = useState({});
    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
        console.log(formdata);
    }
    const dispatch = useDispatch();

    const handleSubmit = async  (e) => {
        e.preventDefault();
         await dispatch(updateProfile(formdata.name, formdata.email))
         dispatch(getMyProfileReducer())
    }
    return (
        <Container minH={'80vh'} p='8'>
            <form onSubmit={handleSubmit}>
                <Heading children='Update Profile' my='8' textTransform={'uppercase'} />
                <VStack spacing={'4'}>
                    <Input id='name' value={formdata.name} onChange={e => handleChange(e)} placeholder='Name' type='name' focusBorderColor='#3182ce' />
                    <Input id='email' value={formdata.email} onChange={e => handleChange(e)} placeholder='Email' type='email' focusBorderColor='#3182ce' />

                    <Button w={'full'} type='submit' colorScheme='blue'>Update Profile</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default UpdateProfile