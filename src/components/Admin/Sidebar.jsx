import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  
  return (
    <VStack spacing={'8'} p='8' boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'} alignItems='flex-start'>
      <LinkButton url={'dashboard'} Icon={RiDashboardFill} text='Dashboard' active={location.pathname === '/admin/dashboard'} />
      <LinkButton url={'createcourse'} Icon={RiAddCircleFill} text='Create Course' active={location.pathname === '/admin/createcourse'} />
      <LinkButton url={'courses'} Icon={RiEyeFill} text='Courses' active={location.pathname === '/admin/courses'} />
      <LinkButton url={'users'} Icon={RiUser3Fill} text='Users' active={location.pathname === '/admin/users'} />

    </VStack>
  )
}

export default Sidebar

function LinkButton({ url, Icon, text, active }) {
  return <Link to={`/admin/${url}`}>
    <Button fontSize={'lg'} variant={'ghost'} colorScheme={active ? 'purple' : ''}>
      <Icon style={{ margin: '4px' }} />
      {text}
    </Button>
  </Link>
}