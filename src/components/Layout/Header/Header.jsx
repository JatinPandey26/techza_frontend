import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill, RiProfileLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../../../redux/actions/userAction'

const LinkButton = ({ url = "/", title = "Home", onclose }) => {
    return <Link to={url} onClick={onclose}>
        <Button variant={"ghost"}>
            {title}
        </Button>
    </Link>
}

const Header = ({isAuthenticated = false , user}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    
    const dispatch = useDispatch();
     
    const logoutHandler = () => {
        dispatch(logoutReducer());
        onClose();
    }


    return (
        <nav className='min-h-[10vh] m-0 z-[100] '>
            <ColorModeSwitcher />

            <Button onClick={onOpen} zIndex = '100' width={"12"} height={"12"} rounded="full" position={"fixed"} top="4" left={"4"} colorScheme="pink" _hover={{ bgColor: "#3182ce" }}>
                <RiMenu5Fill />
            </Button>

            <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                <DrawerOverlay backdropFilter={"blur(1px)"} />
                <DrawerContent>
                    <DrawerHeader borderBottom={"1px"}>TECHZA</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems={"flex-start"}>
                            <LinkButton onClick={onclose} url='/' title='Home' onclose={onClose} />
                            <LinkButton url='/courses' title='Courses' onclose={onClose} />
                            <LinkButton url='/request' title='Request a course' onclose={onClose} />
                            <LinkButton url='/contact' title='Contact us' onclose={onClose} />
                            <LinkButton url='/about' title='About' onclose={onClose} />

                            <HStack width={"100%"} justifyContent={"space-evenly"} position="absolute" left={0} bottom={"2rem"}>
                                {isAuthenticated ? (<>
                                    <VStack>
                                        <HStack>
                                            <Link onClick={onClose} to={"/profile"}>
                                                <Button colorScheme={"blue"} variant="ghost">
                                                    <RiProfileLine className='mr-1' />Profile</Button>
                                            </Link>
                                            <Link onClick={onClose} to={"/logout"}>

                                                <Button colorScheme={"red"} onClick={logoutHandler}><RiLogoutBoxLine className='mr-1' /> Logout</Button>
                                            </Link>
                                        </HStack>

                                        {
                                            user && user.role === 'admin' ? (
                                                <Link onClick={onClose} to="/admin/dashboard"><Button colorScheme={"pink"} variant="ghost"><RiDashboardFill className='mr-1' /> Dashboard</Button></Link>) : (<></>)
                                        }
                                    </VStack>
                                </>) : (<>
                                    <Link onClick={onClose} to={"/login"}>
                                        <Button colorScheme={"blue"}>Login</Button>
                                    </Link>
                                    <p>OR</p>
                                    <Link onClick={onClose} to={"signup"} >
                                        <Button colorScheme={"blue"}>Sign up</Button>
                                    </Link>
                                </>)}
                            </HStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </nav>
    )
}


export default Header
