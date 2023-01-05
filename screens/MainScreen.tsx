import React, { useEffect, useState, useContext } from 'react'
import { Box, VStack, Button, Image, Pressable } from 'native-base'
import { SafeAreaView } from 'react-native'
import ActivityList from '../components/ActivityList'
import { fireStoreService } from '../helpers/firestore/firestore.service'
import { ActivityCategory } from '../helpers/firestore/types/types'
import { firestore } from '../firebase/config'
import { parseActivityCategory } from '../helpers/firestore/parsers/activity-category-parser'
import Minimap from '../components/Minimap'
import { UserContext } from '../context/user-context'

const activityService = fireStoreService<ActivityCategory>('ActivityCategory', firestore, parseActivityCategory)



const MainScreen: React.FC<{ navigation: any }> = (props) => {


    const handleCardNavigation = (id : string) => props.navigation.navigate('Map',{id: id})
        

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
                    <Button
                        onPress={() => {
                            props.navigation.navigate('Options')
                        }}
                        padding={1}
                        backgroundColor={'transparent'}
                        marginLeft={'auto'}>
                        <Image
                            width={'5'}
                            height={'5'}
                            source={require('../assets/hamburguer.png')} />

                    </Button>

                </Box>
            <Pressable h={40} onPress={() => props.navigation.navigate('Map',{id: 'RGtbFHHvFtI3dGy0IH22'})}>
                <Box h='full'>
                        <Minimap />
                </Box>
            </Pressable>
                <ActivityList onPressCard={handleCardNavigation} />
            </VStack>

        </SafeAreaView>

    )
}


export default MainScreen

