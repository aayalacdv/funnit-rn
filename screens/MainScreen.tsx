import React from 'react'
import { Box, Button, Text} from 'native-base'



const MainScreen: React.FC<{navigation : any}> = (props) => {
    return (
        <Box>
            <Text>Hello This is the Screen</Text>
            <Button onPress={() => props.navigation.navigate('Login')}>Hello</Button>
        </Box>
    )
}


export default MainScreen