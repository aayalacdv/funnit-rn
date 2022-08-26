import React, { useState } from 'react'
import { AuthService } from '../helpers/auth/auth.service'
import { auth } from '../firebase/config'
import { Center, Heading, KeyboardAvoidingView, Text} from 'native-base'
import InputField from './login-screen/InputField'
import CustomButton from './login-screen/CustomButton'
import { Platform } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

const authService = AuthService(auth)

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: '', 
            confirmPassword: ''
        }
    });

    const handleCreateAccount = async (data : any) => {
        authService.signUpWithPasswordAndEmail(data.email, data.password)
            .then((newUser) => {
                navigation.navigate('Login')
            })
            .catch((e) => alert('check credentials'))
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Center h='100%'>
                <Heading marginY={2}> Create an account</Heading>
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

                <Controller
                    name='confirmPassword'
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'password is required'
                        },
                        validate: {
                            value: (value) => value === getValues().password
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
                {errors.confirmPassword && <Text>Passwords must match</Text>}

                <CustomButton text='Create Account' onPress={handleSubmit(handleCreateAccount)} />

                <CustomButton text='Login' onPress={() => navigation.navigate('Login')} />
            </Center>

        </KeyboardAvoidingView>
    )
}


export default SignUpScreen