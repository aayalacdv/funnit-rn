import React from 'react'
import { Image } from 'native-base'



const Logo : React.FC = () => {
    return <Image source={require('../assets/logo.png')} w={40} h={40} margin={2} alt='logo' /> 
} 


export default Logo