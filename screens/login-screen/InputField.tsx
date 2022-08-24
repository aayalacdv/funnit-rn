import React from 'react'
import { Input } from 'native-base'

type InputType = 'text' | 'password'

type InputFieldProps = {
    type : InputType
    placeHolder: string,
    value : string, 
    onChangeText: (value: string) => void
}

const InputField : React.FC<InputFieldProps> = (props) => {


    return (
        <Input 
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
        placeholder={props.placeHolder}
        w='70%' 
        p={4} 
        marginY={2}
        type={props.type}
        borderRadius={15}/>
    )

}


export default InputField