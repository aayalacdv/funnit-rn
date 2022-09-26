import React, { useEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, Heading, Text, Image, VStack, Button, Container } from 'native-base'
import { Platform } from 'react-native'
import InputField from './InputField'
import { auth } from '../../firebase/config'
import { AuthService } from '../../helpers/auth/auth.service'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Controller, useForm } from 'react-hook-form'
import Logo from '../../components/Logo'
import { UserContext } from '../../context/user-context'

const authService = AuthService(auth)

const BG_COLOR = 'rgb(255,77,77)'

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const userData = useContext(UserContext)
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

                const credentials = JSON.stringify({ email: data.email, password: data.password })
                
                AsyncStorage.setItem('@credentials', credentials).then(() =>userData.updateAuthStatus(true))

            })
            .catch((e) => alert('check credentials'))

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            backgroundColor={BG_COLOR}
        >
            <VStack h='100%' alignItems='center' justifyContent={'space-around'} paddingY={30}>
                <Logo />
                <VStack marginY={40}>
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

                    <Button
                        shadow={5}
                        backgroundColor={'red.300'}
                        margin={2}
                        alignItems={'center'}
                        onPress={handleSubmit(handleLogin)}>
                        Iniciar sesión
                    </Button>

                </VStack>

                <Button shadow={9} backgroundColor={'white'} h={10} w={'70%'} onPress={() => navigation.navigate('SignUp')}>
                    <Text>
                        Crear una cuenta
                    </Text>
                </Button>
            </VStack>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen