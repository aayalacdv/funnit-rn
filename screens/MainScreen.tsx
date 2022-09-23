import React from 'react'
import { Box, Text, VStack, Button, ScrollView, Image } from 'native-base'
import { SafeAreaView } from 'react-native'
import ActivityCard from '../components/ActivityCard'




const MainScreen: React.FC<{ navigation: any }> = (props) => {

    return (
        <SafeAreaView >
            <VStack h='full' bgColor={'amber.100'}>
                <Box padding={5} bgColor='red.500' justifyContent={'center'} alignItems='center' flexDirection={'row'} >
                    <Box w={'full'} alignItems='center'>
                        <Image
                            width={'1/3'}
                            height={10}
                            source={require('../assets/funit_text.png')} />

                    </Box>
                    <Button marginLeft={'auto'}>xd</Button>

                </Box>
                <Box h={'1/6'} bgColor='red.200'></Box>
                <ScrollView 
                bounces={true}
                bgColor={'blue.100'}>
                    <ActivityCard title='Tecno Experience' />
                    <ActivityCard title='Tecno Experience' />
                    <ActivityCard title='Tecno Experience' />
                    <ActivityCard title='Tecno Experience' />
                </ScrollView>
            </VStack>

        </SafeAreaView>

    )
}


export default MainScreen

