import React, { useState } from 'react'
import { KeyboardAvoidingView, Center, Heading } from 'native-base'
import { Platform } from 'react-native'
import InputField from './InputField'
import CustomButton from './CustomButton'
import { auth } from '../../firebase/config'
import { AuthService } from '../../helpers/auth/auth.service'

const authService = AuthService(auth)


const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        await authService.onAuthStateChange(() => navigation.navigate('Main'), () => alert('Login failed'))
        await authService.authenticateWithEmailAndPassword(email, password)
        auth.currentUser?.reload()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Center h='100%'>
                <Heading marginY={2}> Login Screen</Heading>
                <InputField placeHolder='Email' value={email} onChangeText={setEmail} type={'text'} />
                <InputField placeHolder='Password' value={password} onChangeText={setPassword} type={'password'} />
                <CustomButton text='Login' onPress={() => handleLogin()} />
                <CustomButton text='Create an account' onPress={() => navigation.navigate('SignUp')} />
            </Center>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen