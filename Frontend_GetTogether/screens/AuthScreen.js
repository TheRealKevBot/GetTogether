import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../components/Account/SignUp'
import SignIn from '../components/Account/SignIn'

const Stack = createStackNavigator()

export default class AuthScreen extends Component {
    render() {
        return (
            <Stack.Navigator >
                <Stack.Screen name='SignIn'>
                    {(stackProps) => <SignIn {...stackProps} user={this.props.user} signIn={this.props.signIn} signUp={this.props.signUp} error={this.props.error}/> }
                </Stack.Screen>
                <Stack.Screen name='SignUp'>
                    {(stackProps) => <SignUp {...stackProps} user={this.state.user} signUp={this.props.signUp} /> }
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}
