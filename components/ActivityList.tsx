import {Text, Heading, HStack, Spinner, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl, } from "react-native";
import { useQuery } from "react-query";
import { firestore } from "../firebase/config";
import { fireStoreService } from "../helpers/firestore/firestore.service";
import { parseActivityCategory } from "../helpers/firestore/parsers/activity-category-parser";
import { ActivityCategory } from "../helpers/firestore/types/types";
import { useActivities } from "../hooks/useActivities";
import ActivityCard from "./ActivityCard";




const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const ActivityList: React.FC = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const { data, isLoading, isError } = useActivities()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    if (isLoading) {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
            >
                <HStack w='full' h='full' space={2} justifyContent="center" alignItems='center'>
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading
                    </Heading>
                </HStack>

            </ScrollView >
        )
    }


    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
            bounces={true}
            bgColor={'blue.100'}>
            {
                data?.map((activity) =>
                    <ActivityCard key={activity.id} title={activity.title} imageUrl={activity.image} />)
            }
        </ScrollView>

    )

}


export default ActivityList