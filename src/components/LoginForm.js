import React, { Component } from 'react';
import { Card, CardSection, Input, Buttons } from './common';

class LoginForm extends Component {
    render(){
        return(
            <Card> 
                <CardSection>
                    <Input
                        label = "Email"
                        placeholder = "email@gmail.com"
                    />
                </CardSection> 

                <CardSection>
                    <Input
                        secureTextEntry 
                        label = "Password"
                        placeholder = "password"
                    />
                </CardSection> 

                <CardSection>
                    <Buttons>
                        Login
                    </Buttons>
                </CardSection> 
            </Card>
        );
    }
}

export default LoginForm; 