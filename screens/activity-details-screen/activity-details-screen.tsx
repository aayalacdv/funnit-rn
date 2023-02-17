import { Button, HStack, Pressable, ScrollView, Text, VStack, View } from "native-base";
import React from "react";
import Banner from "../../components/Banner";
import Svg, { Path } from "react-native-svg";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]


const ActivityDetailsScreen: React.FC = (props: any) => {
    return (
        <VStack>
            <Banner onPress={() => props.navigation.navigate('Options')} />
            <ScrollView horizontal={true} >
                {items.map((item) => <View margin={2} width={40} height={40} bgColor={"blue.200"} />)}
            </ScrollView>
            <View width={'full'} height={60} bgColor={'red.200'} margin={2}>
                <Text>Contact Details</Text>
            </View>
            <View width={'full'} height={"30%"} bgColor={'yellow.200'} margin={2}>
                <Text>Contact Details</Text>
            </View>

            <View borderColor={"black"} borderWidth={1} borderRadius={'full'} width={8} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <AntDesign name="hearto" size={24} color="black" />
            </View>
            <View borderColor={"black"} borderWidth={1} borderRadius={'full'} width={8} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Entypo name="cross" size={24} color="black" />
            </View>
        </VStack>
    )
}


export default ActivityDetailsScreen;