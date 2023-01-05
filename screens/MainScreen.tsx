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
import Banner from '../components/Banner'

const activityService = fireStoreService<ActivityCategory>('ActivityCategory', firestore, parseActivityCategory)


const MainScreen: React.FC<{ navigation: any }> = (props) => {


    const handleCardNavigation = (id: string) => props.navigation.navigate('Items', { id: id })
    const handleOptionNavigation = () => props.navigation.navigate('Options')

    return (
        <SafeAreaView >
            <Banner onPress={handleOptionNavigation} />
            <VStack h='full' bgColor={'amber.100'}>
                <Pressable h={40} onPress={() => props.navigation.navigate('Map', { id: 'RGtbFHHvFtI3dGy0IH22' })}>
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

