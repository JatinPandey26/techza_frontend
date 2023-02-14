import { Box, Grid, Heading, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, Td, HStack, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/adminAction'
import Sidebar from '../Sidebar'

import Loader from './../../Layout/Loader/Loader'

const Users = () => {

    const { users = [], loading } = useSelector(state => state.admin)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])


    const updateHandler = async (userId) => {
       await dispatch(updateUserRole(userId))
        dispatch(getAllUsers());

    }

    const deleteUserHandler = async (userId) => {

        await dispatch(deleteUser(userId))
        dispatch(getAllUsers());
    }

    return (
        <Grid minH={'80vh'} templateColumns={['1fr', '5fr 1fr']} >
            {<Box p={['0', '8']} overflowX='auto'>
                <Heading textTransform={'uppercase'} children='All Users' mb='8' textAlign={['center', 'left']} />
                <TableContainer w={['100vw', 'full']}>

                    <Table variant={'simple'} size='lg'>
                        <TableCaption children='All available users in the database' />
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Subscription</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {users &&
                                users.map(user => <Row key={user._id} user={user} updateHandler={updateHandler} deleteUserHandler={deleteUserHandler} loading={loading} />)
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>}
            <Sidebar />
        </Grid>
    )
}

export default Users

function Row({ user, updateHandler, deleteUserHandler, loading }) {
    return (
        <Tr>
            <Td>#{user._id}</Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.role}</Td>
            <Td>{user.subscription && user.subscription.status ? 'Active' : 'Not Active'}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button variant={'outline'} isLoading={loading} onClick={() => updateHandler(user._id)} color='purple.500'>Change Role</Button>
                    <Button variant={'outline'} isLoading={loading} onClick={() => deleteUserHandler(user._id)} color='purple.600'><RiDeleteBin7Fill /></Button>
                </HStack>
            </Td>
        </Tr>
    )
}