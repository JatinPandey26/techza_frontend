import { Container, Heading, VStack, Box, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import logo from '../../assets/images/hometitlepic.png'
import toast from 'react-hot-toast'
import { server } from '../../redux/store'
import { buySubscription } from '../../redux/actions/userAction'
import axios from 'axios'
const Subscribe = ({user}) => {

    const dispatch = useDispatch()

    const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'Techza',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: '6 pack programmer at youtube',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

    return (
        <Container minH={'80vh'}>

            <Heading children='Welcome' textAlign={'center'} margin='1rem' />
            <VStack boxShadow={'lg'} alignItems='stretch' spacing={'0'}>
                <Box bg={'pink.500'} p='4' css={{ borderRadius: '8px 8px 0 0' }}>
                    <Text children={`Pro Pack - ₹501`} />
                </Box>
                <Box p='4'>
                    <VStack>
                        <Text children='Join Pro Pack and get access to all content.' />
                        <Heading size={'md'} children='₹ 501 only' />
                    </VStack>
                    <Button mt={'8'} w='full' colorScheme={'blue'} onClick = {subscribeHandler}>Buy Now</Button>
                </Box>
                <Box bg={'blackAlpha.500'} css={{ borderRadius: '0px 0px 8px 8px' }} p='2'>
                    <Heading size={'sm'} color='white' textTransform={'uppercase'} children='100% refund at cancellation' />
                    <Text fontSize={'xs'} color='white' children='*Terms And Conditions Apply' />
                </Box>
            </VStack>
        </Container>
    )
}

export default Subscribe