import React from 'react';
import { TextInput, View, Text} from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const {inputStyle, labelStyle, containerStyle} = styles; 
    return(
        <View style = {containerStyle}>
            <Text style = {labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder ={placeholder}
                autoCorrect = {false}
                style = {inputStyle}
                value = {value}
                onChangeText = { onChangeText}
            />
        </View>
    )
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex:2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export { Input };

//flex 1, 2, etc. Whenever you give on child a flex 1 and another a flex 2, take the sum, so in this case 3. That means child with flex 1 will take 1/3 of the space and child with flex 2 will take 2/3 of the space. 

// const Input = ({ label, value, onChangeText, placeholder }) => { : props that we are receiving from parent to make component reusable 