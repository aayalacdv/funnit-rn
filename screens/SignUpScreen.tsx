import React from 'react'
import { AuthService } from '../helpers/auth/auth.service'
import { auth } from '../firebase/config'
import { Button, Container,  KeyboardAvoidingView, Text } from 'native-base'
import InputField from './login-screen/InputField'
import { Platform } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import Logo from '../components/Logo'

const authService = AuthService(auth)
const BG_COLOR = 'rgb(255,77,77)'

const SignUpScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const handleCreateAccount = async (data: any) => {
        authService.signUpWithPasswordAndEmail(data.email, data.password)
            .then((newUser) => {
                authService.updateUserProfile(data.username).then(() => console.log('updated user display name'))
                navigation.navigate('Login')
            })
            .catch((e) => alert('check credentials'))
    }

    return (
        <KeyboardAvoidingView
            backgroundColor={BG_COLOR} w='full' h='full'
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            alignItems='center'

        >
            <Container w={'full'} marginY={5} alignItems='center'>
                <Logo />
            </Container>

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
                name='username'
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'password is required'
                    }

                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                        placeHolder='username'
                        type='text'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />

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

            <Button
                backgroundColor={'white'}
                shadow={9}
                w={'70%'}
                marginY={4}

                onPress={handleSubmit(handleCreateAccount)}>
                <Text>
                    Registrarse
                </Text>
            </Button>

            <Button
                backgroundColor={'white'}
                shadow={9}
                w={'70%'}

                onPress={() => navigation.navigate('Login')} >
                <Text>
                    Iniciar sesión
                </Text>
            </Button>
        </KeyboardAvoidingView>

    )
}


export default SignUpScreen