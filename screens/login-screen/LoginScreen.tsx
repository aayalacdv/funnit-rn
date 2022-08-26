import React, { useEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, Center, Heading, Text } from 'native-base'
import { Platform } from 'react-native'
import InputField from './InputField'
import CustomButton from './CustomButton'
import { auth } from '../../firebase/config'
import { AuthService } from '../../helpers/auth/auth.service'
import { UserContext, UserContextType, UserType } from '../../context/user-context'
import { Controller, useForm } from 'react-hook-form'

const authService = AuthService(auth)


const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleLogin = async (data: any) => {
        authService.authenticateWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                if (!userCredential?.user.emailVerified) {
                    alert('please verify email')
                    return
                }
                navigation.navigate('Main')
            })
            .catch((e) => alert('check credentials'))

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Center h='100%'>
                <Heading marginY={2}> Login Screen</Heading>
                <Controller
                    name='email'
                    control={control}
                    rules={{
                        required: {
                            value: true, 
                            message: 'email is required'
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputField
                            placeHolder='email'
                            type='text'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text>{errors.email.message}</Text>}

                <Controller
                    name='password'
                    control={control}
                    rules={{
                        required: {
                            value: true, 
                            message: 'password is required'
                        },
                        minLength: {
                            value: 6, 
                            message: 'minimun lenght is 6'
                        }
                    }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        placeHolder='password'
                        type='password'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                />
                {errors.password && <Text>{errors.password.message}</Text>}

                <CustomButton text='Login' onPress={handleSubmit(handleLogin)} />
                <CustomButton text='Create an account' onPress={() => navigation.navigate('SignUp')} />
            </Center>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen