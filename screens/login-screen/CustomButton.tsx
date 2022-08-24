import React from 'react'
import { Button } from 'native-base'

type CustomButtonProps = {
    text: string
    onPress : () => void
}

const CustomButton : React.FC<CustomButtonProps> = (props) => {

    return (
        
        <Button
        w='70%'
        p={3}
        marginY={2}
        borderRadius={15}
        onPress={() => props.onPress()}
        >{props.text}</Button>

    )
}

export default CustomButton



