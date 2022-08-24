import React, { useState } from 'react'
import { AuthService } from '../helpers/auth/auth.service'
import { auth } from '../firebase/config'
import { Center, Heading, KeyboardAvoidingView } from 'native-base'
import InputField from './login-screen/InputField'
import CustomButton from './login-screen/CustomButton'
import { Platform } from 'react-native'

const authService = AuthService(auth)

const SignUpScreen: React.FC<{navigation : any}> = ({navigation}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const handleCreateAccount= async () => {
        await authService.onAuthStateChange(() => navigation.navigate('Login'), () => alert('Create Account failed'))
        await authService.signUpWithPasswordAndEmail(email, password)
        auth.currentUser?.reload()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Center h='100%'>
                <Heading marginY={2}> Create an account</Heading>
                <InputField placeHolder='Email' value={email} onChangeText={setEmail} type={'text'} />
                <InputField placeHolder='Password' value={password} onChangeText={setPassword} type={'password'} />
                <InputField placeHolder='Repeat password' value={confirmPassword} onChangeText={setConfirmPassword} type={'password'} />
                <CustomButton text='Create Account' onPress={() => handleCreateAccount()} />
                <CustomButton text='Login' onPress={() => navigation.navigate('Login')} />
            </Center>

        </KeyboardAvoidingView>
    )
}


export default SignUpScreen