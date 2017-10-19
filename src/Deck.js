import React, { Component } from 'react';
import { 
    View, 
    Animated, 
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager 
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; 
const SWIPE_OUT_DURATION = 250; 

class Deck extends Component { 
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }

    constructor(props){
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx , y: gesture.dy })
            }, 
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipe('right');
                }else if (gesture.dx < -SWIPE_THRESHOLD){
                    this.forceSwipe('left'); 
                }else{
                    this.resetPosition();
                }
                
            }
        });

        this.position = position; 

        this.state = { panResponder, position, index:0 };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data) {
            this.setState({ index: 0})
        }

    }

    //called when component will be rerendered with new set of props

    componentWillUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring(); 
    }

    forceSwipe(direction){
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(this.state.position,{
            toValue: { x, y: 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
        
    }

    onSwipeComplete(direction){
        const { onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index]

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 }) //reset the position to 0
        //mutating the value of the position 
        //opinion > not assigning animation to state
        this.setState({ index: this.state.index + 1}); 
    }

    resetPosition(){
        Animated.spring(this.state.position, {
            toValue: {x:0, y:0}
        }).start();
    }


    getCardStyle(){
        const { position } = this.state;
        const rotate = position.x.interpolate({
             inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
             outputRange: ['-120deg', '0deg', '120deg']
        })  


        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }; 

    }

    renderCards(){
        const {data, renderNoMoreCards} = this.props;
        if (this.state.index >= data.length){
            return renderNoMoreCards(); 
        }
        return data.map((item, i) =>{
            if(i < this.state.index) {return null;}

            if (i === this.state.index){
                return(
                    <Animated.View
                    key = {item.id}
                    style = {[this.getCardStyle(), styles.cardStyle]}
                    {...this.state.panResponder.panHandlers}
                    >                         
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View 
                    key = {item.id} 
                    style = {[styles.cardStyle, { top: 10 * ( i - this.state.index) }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse(); 
    }

    render(){
        return(
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
};


export default Deck; 

//PanResponder is local variable inside the constructor 
//it's its own self-defining object 
//don't update the state of panResponder 
//the {...this} is taking all the callbacks from panHandlers and passing it to View
//debugger stops the execution to better examine code 
//console.log to record response
//forceSwipeLeft(){
//     Animated.timing(this.setState.position,{
//         toValue: { x: -SCREEN_WIDTH, y: 0},
//         duration: SWIPE_OUT_DURATION
//     }).start();
// } << instead of making a seperate function for left, just create one method and pass in args right or left
//const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH >> ternary expression
//if direction = right, return code btwn ? and before colon, if not right, return code after colon 
