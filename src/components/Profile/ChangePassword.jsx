import { Container, Heading, VStack, Input, Button, } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import React from 'react'
import { changePassword } from '../../redux/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const ChangePassword = () => {
    const [formdata, setFormData] = useState({});
    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.id]: e.target.value
        })
        
    }
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword(formdata.oldPassword , formdata.newPassword))
    }

    const { loading, message, error } = useSelector(state => state.profile)

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' })
        }
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearMessage' })
        }
    }, [dispatch,error,message])

    return (
        <Container minH={'80vh'} p='8'>
            <form onSubmit={handleSubmit}>
                <Heading children='Change password' my='8' textTransform={'uppercase'} />
                <VStack spacing={'4'}>
                    <Input required id='oldPassword' value={formdata.oldPassword} onChange={e => handleChange(e)} placeholder='Enter old password' type='password' focusBorderColor='#3182ce' />
                    <Input required id='newPassword' value={formdata.newPassword} onChange={e => handleChange(e)} placeholder='Enter new password' type='password' focusBorderColor='#3182ce' />
                    <Button w={'full'} type='submit' colorScheme='blue'>Change Password</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ChangePassword