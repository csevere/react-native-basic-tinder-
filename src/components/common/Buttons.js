import React from 'react';
import {Text, TouchableOpacity} from 'react-native';


const Buttons = ({ pressIt, children }) => {
    const {buttonStyle, textStyle} = styles; 
    return(
        <TouchableOpacity onPress = {pressIt} style = {buttonStyle}>
            <Text style = {textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle:{
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10

    },

    buttonStyle: {
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5, 
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Buttons };

//handling click events from user: onPress = {()=> console.log('pressed!')}
//use TouchableHighlight or TouchableOpacity 
//wanna make a general logic for the button to reuse it elsewhere