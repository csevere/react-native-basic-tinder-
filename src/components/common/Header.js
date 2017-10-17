import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const {textStyle, viewStyle} = styles; 
    return(
        <View style = {viewStyle}>
            <Text style = {textStyle}>{props.headerText}</Text>
        </View>
    );
};

//make a new object of styles and put them in Header

const styles = {
    viewStyle:{
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        elevation: 2,
        position: 'relative'
    },
    
    textStyle:{
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Avenir-Roman'

    }

};

export { Header }; 

//View tag used for positioning elements, sets height 
//justifyContent property positions elements vertically 
//alignItems property positions elements horizontally 
//the values for both are : flex-start, center, flex-end
