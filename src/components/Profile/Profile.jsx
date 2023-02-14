import {
    Avatar, Button, Container, Heading, HStack, Stack, VStack, Text, Image, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input
} from '@chakra-ui/react'


import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import hometitlepic from '../../assets/images/hometitlepic.png'
import { updateProfilePicture } from '../../redux/actions/profileAction'
import { cancelSubscription, getMyProfileReducer, removeFromPlayList } from '../../redux/actions/userAction'


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


const Profile = ({ user }) => {

    // image change 

    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const changeImageSubmitHandler = async (e, image) => {

        e.preventDefault();

        const myForm = new FormData();

        myForm.append('file', image);


      await  dispatch(updateProfilePicture(myForm))
      dispatch(getMyProfileReducer())
        onClose()

    }
    // image change


    const removeFromPlaylistHandler = async(courseId) => {
        await dispatch(removeFromPlayList(courseId))
        dispatch(getMyProfileReducer());
    }


    const cancelSubscriptionHandler = () => {
        dispatch(cancelSubscription())
    }

    const { loading, error , message } = useSelector(state => state.user)
    const { loading:subscriptionLoading, error:subscriptionError , message:subscriptionMessage } = useSelector(state => state.subscription)

    useEffect(() => {
       

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' })
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' })
        }

        if(subscriptionError){
            toast.error(subscriptionError);
            dispatch({ type: 'clearError' })
        }

        if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch({ type: 'clearMessage' })
        }

    }, [dispatch, error , message , subscriptionError , subscriptionMessage])


    return (
        <Container minH={'80vh'} maxW='container.lg' py={'8'}>
            <Heading children='Profile' textTransform={'uppercase'} />
            <Stack justifyContent={'flex-start'} direction={['column', 'row']} m='4' alignItems='center' spacing={['4', '8']}>
                <VStack>
                    <Avatar boxSize={'28'} src={user.avatar.url} />
                    <Button onClick={onOpen} size={'sm'} colorScheme={'blue'} variant='ghost' children='Change Photo' />
                </VStack>

                <VStack alignItems={['center', 'flex-start']}>
                    <HStack>
                        <Text children="Name : " />
                        <Text children={user.name} />
                    </HStack>
                    <HStack>
                        <Text children="Email : " />
                        <Text children={user.email} />
                    </HStack>
                    <HStack>
                        <Text children="Created At :" />
                        <Text children={user.createdAt.split('T')[0]} />
                    </HStack>

                    {user.role !== 'admin' && <HStack>
                        <Text children="Subscription" fontWeight={'bold'} />
                        {user.subscription && user.subscription.status ? <Button size={'sm'} colorScheme={'red'} variant='ghost' on onClick={cancelSubscriptionHandler} isLoading = {subscriptionLoading}>Cancel Subscription</Button> : <Link to={'/subscribe'}><Button size={'sm'} colorScheme={'blue'}>Subscribe</Button></Link>}
                    </HStack>}
                    <Stack direction={['column', 'row']} m='4' alignItems='center'>
                        <Link to={'/updateprofile'}>
                            <Button size={'sm'}>Update Profile</Button>
                        </Link>
                        <Link to={'/changepassword'}>
                            <Button size={'sm'}>Change Password</Button>
                        </Link>
                    </Stack>
                </VStack>

            </Stack>
            <Heading children='Playlist' size='md' />

            {
                user.playlist.length > 0 && <Stack direction={['column', 'row']} p='4' w={'full'} alignItems='center' flexWrap={'wrap'}>
                    {user.playlist.map((element) => <VStack w={'60'} m='2' key={element.course}>
                        <Image
                            boxSize={'full'}
                            objectFit='contain'
                            src={element.poster}
                        ></Image>

                        <HStack>
                            <Link to={`/course/${element.course}`}>
                                <Button variant={'ghost'} colorScheme={'pink'} onClick = {console.log(element.course)}>Wacth Now</Button>
                            </Link>
                            <Button onClick={e => removeFromPlaylistHandler(element.course)}>
                                <RiDeleteBin7Fill />
                            </Button>
                        </HStack>
                    </VStack>)}
                </Stack>
            }
            <ChangePhotoBox onClose={onClose} isOpen={isOpen} changeImageSubmitHandler={changeImageSubmitHandler} />

        </Container>
    )
}

export default Profile

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler }) {

    const [previmage, setPrevImage] = useState(undefined);
    const [image, setImage] = useState(undefined);

    function handleImageSelection(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPrevImage(reader.result)
            setImage(file)
            console.log('new profilepic selected');
        }
    }

    return (
        <>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay backdropFilter={'blur(1px)'} />
                <ModalContent>
                    <ModalHeader>Change Photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
                                <VStack spacing={'8'}>
                                    {previmage && <Avatar src={previmage} boxSize={'36'} />}
                                    <Input required css={fileUploadStyle} id='avatar' accept='image/*' type='file' focusBorderColor='#3182ce' onChange={e => handleImageSelection(e)} />
                                    <Button type='submit' colorScheme='blue' mr={3} >
                                        Change Profile Pic
                                    </Button>
                                </VStack>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>

                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}