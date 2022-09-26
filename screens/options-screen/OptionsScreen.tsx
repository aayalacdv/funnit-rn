import { Box, IconButton, Text, Icon, VStack, Image } from "native-base";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';


import { auth } from '../../firebase/config';
import { AuthService } from "../../helpers/auth/auth.service";
import { UserContext } from "../../context/user-context";

const authService = AuthService(auth)

const OptionsScreen: React.FC<{navigation : any}> = (props) => {
    const userData = useContext(UserContext)

    return (
        <SafeAreaView>
            <VStack w='full' height={'full'} alignItems='center'>
                <Box
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flexDirection='row'
                    w='full'
                    backgroundColor={'red.500'}
                >
                    <IconButton
                        onPress={() => {
                            props.navigation.navigate('Main')
                        }}
                        icon={<Icon as={AntDesign} name="left" size={7} color="white" />} />
                    <Text
                    fontWeight={'bold'}
                    fontSize={'xl'}
                    textAlign={'center'}
                    marginRight={10}
                    flex={2}
                        color={'white'}
                    >{auth.currentUser?.displayName} </Text>
                </Box>

                <VStack w='full'  alignItems='center'>

                    <Image source={require('../../assets/avatar.png')} marginTop={5} w={20} h={20} />

                    <Box w='full' flexDirection='row' alignItems={'center'} justifyContent={'space-between'} p={2} marginTop={1} borderBottomColor='black' borderTopColor='black' borderWidth={1}>
                        <Text fontSize={20}>Mis datos</Text>
                        <AntDesign name="right" size={20} color="black" />
                    </Box>

                    <Box w='full' flexDirection='row' alignItems={'center'} justifyContent={'space-between'} p={2} borderBottomColor='black' borderWidth={1}>
                        <Text fontSize={20}>Lugares visitados</Text>
                        <AntDesign name="right" size={20} color="black" />
                    </Box>

                    <Box w='full' flexDirection='row' alignItems={'center'} justifyContent={'space-between'} p={2} borderBottomColor='black' borderWidth={1}>
                        <Text fontSize={20}>Añadir local</Text>
                        <AntDesign name="right" size={20} color="black" />
                    </Box>

                    <Box w='full' flexDirection='row' alignItems={'center'} justifyContent={'space-between'} p={2} borderBottomColor='black' borderWidth={1}>
                        <Text fontSize={20}>Ajustes</Text>
                        <AntDesign name="right" size={20} color="black" />
                    </Box>

                </VStack>


                <Box
                    marginTop={'auto'}
                    marginBottom={10}
                >
                <IconButton
                    borderColor={'black'}
                    borderRadius={'full'}
                    borderWidth={2}
                    onPress={() => {
                        authService.signUserOut()
                        userData.updateAuthStatus(false)

                    }}
                    icon={<Icon as={AntDesign} name="poweroff" size={5} color="black" />} />
                    <Text>
                        Cerrar sesión
                    </Text>

                </Box>





            </VStack>



        </SafeAreaView>
    )
}

export default OptionsScreen