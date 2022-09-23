import { Box, Image, Text } from "native-base";

import React from "react";
const vrIcon = require('../assets/vr_icon.png')


type ActivityCardProps = {
    title: string,
    imageUrl?: string,
}
const ActivityCard: React.FC<ActivityCardProps> = (props) => {

    return (
        <Box
            backgroundColor={'blue.400'}
            height={40}
            padding={5}
            marginBottom={1}
            flexDirection='row'
            justifyContent={'space-between'}
            alignItems={'center'}
        >
            <Text
                fontSize={30}
                fontWeight='bold'
                color='white'
            >{props.title}</Text>
            <Image
                w={20}
                h={20}
                source={vrIcon}
            />
        </Box>
    )
}

export default ActivityCard