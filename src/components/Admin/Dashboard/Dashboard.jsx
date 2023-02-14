import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import Sidebar from '../Sidebar'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashBoardStats } from '../../../redux/actions/adminAction'
import Loader from '../../Layout/Loader/Loader'

const DataBox = ({ title, qty, qtypercentage, profit }) => {
  return (
    <Box w={['full', '30%']} boxShadow='-2px 0 10px rgba(107,70,193,0.5)' p={8} borderRadius='lg'>
      <Text children={title} />
      <HStack spacing={2}>
        <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
        <HStack spacing={1}>
          <Text children={`${qtypercentage}%`} />
          {
            profit ? <RiArrowUpLine color='green' /> : <RiArrowDownLine color='red' />
          }
        </HStack>
      </HStack>
      <Text children='since last month' opacity={0.5} />
    </Box>
  )
}

const Bar = ({ title, value, profit }) => (
  <Box py={4} px={[0, 12]}>
    <Heading size={'sm'} children={title} mb='2' />
    <HStack width={'full'}>
      <Text children={profit ? `${value}%` : `${-value}%`} />
      <Progress width={'full'} value={profit ? value : 0} colorScheme='purple' />
      <Text children={value > 100 ? `${value}%` : '100%'}></Text>
    </HStack>
  </Box>
)

const Dashboard = () => {

  const dispatch = useDispatch();
  const { loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    subscriptionsPercentage,
    viewsPercentage,
    usersProfit,
    subscriptionsProfit,
    viewsProfit, } = useSelector(state => state.admin)

  useEffect(() => {
    dispatch(getDashBoardStats())
  }, [dispatch])


  return (
    <Grid minH={'80vh'} templateColumns={['1fr', '5fr 1fr']} >
      {loading ? <Loader /> : <Box boxSizing='border-box' py={'16'} >
       
        <Heading children='Dashboard' ml={[0, 8]} mb='16' textAlign={['center', 'left']} />
        <Stack
          direction={['column', 'row']}
          minH='24'
          justifyContent={'space-evenly'}
        >
          <DataBox title='Views' qty={viewsCount} qtypercentage={viewsPercentage} profit={true} />
          <DataBox title='Users' qty={usersCount} qtypercentage={usersPercentage} profit={true} />
          <DataBox title='Subscription' qty={subscriptionCount} qtypercentage={subscriptionsPercentage} profit={false} />
        </Stack>
        <Box
          margin={[0, 8]}
          borderRadius='lg'
          padding={[0, 8]}
          boxShadow='-2px 0 10px rgba(107,70,193,0.5)'
        >
          <Heading textAlign={['center', 'left']} size='md' children='Views' />

          <LineChart views = { stats &&  stats.map(item=>(item.views))} />
        </Box>

        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p={4}>
            <Heading textAlign={['center', 'left']} size='md' my='4' children='Progress Bar' />
            <Box>
              <Bar title='Views' value={viewsPercentage} profit={viewsProfit} />
              <Bar title='Users' value={usersPercentage} profit={usersProfit} />
              <Bar title='Subscription' value={subscriptionsPercentage} profit={subscriptionsProfit} />
            </Box>
          </Box>

          <Box p={[0, 8]} boxSizing='border-box' py='4'>
            <Heading textAlign={'center'} size='md' children='Users' />
            <DoughnutChart data = {[subscriptionCount,usersCount-subscriptionCount]}/>
          </Box>
        </Grid>
      </Box>}
      <Sidebar />
    </Grid>
  )
}

export default Dashboard