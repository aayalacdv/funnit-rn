import React from 'react'
import { Input } from 'native-base'

type InputType = 'text' | 'password'

type InputFieldProps = {
    type : InputType
    placeHolder: string,
    value : string, 
    onBlur: () => void,
    onChangeText: (value: string) => void
}

const InputField : React.FC<InputFieldProps> = (props) => {


    return (
        <Input 
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
        placeholder={props.placeHolder}
        onBlur={props.onBlur}
        backgroundColor='white'
        w='70%' 
        p={2} 
        marginY={2}
        type={props.type}
        shadow={9}
        borderRadius={5}/>
    )

}


export default InputField