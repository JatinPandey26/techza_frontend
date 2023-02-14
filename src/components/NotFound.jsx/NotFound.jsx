import React from 'react'
import {  Container, Heading, VStack, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RiErrorWarningFill } from 'react-icons/ri'
const NotFound = () => {
    return (
        <Container h='90vh' p='16' w='full' className='flex flex-col justify-center'>
            <VStack boxShadow={'lg'} w='full' justifyContent={'center'} p='4' alignItems='center' my={'4'}>
                <RiErrorWarningFill size={'5rem'} />
                <Heading textTransform={'uppercase'} children='Page Not Found' textAlign={'center'} />
                <Link to={`/`}><Button mt={'8'} w='full' colorScheme={'blue'}>Go to home</Button></Link>
            </VStack>
        </Container>
    )
}

export default NotFound