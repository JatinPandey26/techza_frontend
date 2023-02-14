import { Box, Container, Heading, VStack , Text , Button } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill} from 'react-icons/ri'
import { Link , useSearchParams} from 'react-router-dom'
const PaymentSuccess = () => {

    const reference = useSearchParams()[0].get('reference')

    return (
        <Container h='90vh' p='16' w='full'>
            <Heading textTransform={'uppercase'} children='You have pro pack' textAlign={'center'} />
            <VStack boxShadow={'lg'}  w='full' alignItems='stretch' my={'4'}>
                <Box bg={'pink.500'} p='4' css={{ borderRadius: '8px 8px 0 0' }} >
                    <Text children={`Payment Success`} fontWeight = 'bold' />
                </Box>
                <Box p='4'>
                    <VStack>
                        <Text children='Congratulations , You are now a pro member . You have access to premium content.' />
                        <Heading size={'3xl'} ><RiCheckboxCircleFill/></Heading>
                    </VStack>
                    <Link to={`/profile`}><Button mt={'8'} w='full' colorScheme={'blue'}>Go to profile</Button></Link>
                    <Heading size={'sm'} textAlign='center' mt='4' textTransform={'uppercase'} children= {`Reference Id : ${reference}`} />
                </Box>
                
            </VStack>
        </Container>
    )
}

export default PaymentSuccess