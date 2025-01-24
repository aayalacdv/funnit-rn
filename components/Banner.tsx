import { Box, Button, Image} from "native-base"
import React from "react"

type Props = {
    onPress : () => void

}

const Banner : React.FC<Props> = (props) => {
    return (
                <Box padding={5} bgColor='red.500' justifyContent={'center'} alignItems='center' flexDirection={'row'} >
                    <Box w={'full'} alignItems='center'>
                        <Image
                            width={'1/3'}
                            height={10}
                            source={require('../assets/funit_text.png')} />

                    </Box>
                    <Button
                        onPress={() => props.onPress()}
                        padding={1}
                        backgroundColor={'transparent'}
                        marginLeft={'auto'}>
                        <Image
                            width={'5'}
                            height={'5'}
                            source={require('../assets/hamburguer.png')} />

                    </Button>

                </Box>

    )
}

export default Banner