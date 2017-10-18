import React, { Component } from 'react';
import { 
    View, 
    Animated, 
    PanResponder 
} from 'react-native';

class Deck extends Component { 
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx , y: gesture.dy })
            },
            onPanResponderRelease: () => {}
        });

        this.position = position; 

        this.state = { panResponder, position };
    }

    renderCards(){
        return this.props.data.map(item =>{
            return this.props.renderCard(item)
        })
    }

    render(){
        return(
            <Animated.View 
                style = {this.state.position.getLayout()}{...this.state.panResponder.panHandlers}>
                {this.renderCards()}
            </Animated.View>
        );
    }
}



export default Deck; 

//PanResponder is local variable inside the constructor 
//it's its own self-defining object 
//don't update the state of panResponder 
//the {...this} is taking all the callbacks from panHandlers and passing it to View
//debugger stops the execution to better examine code 
//console.log to record response