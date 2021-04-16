import React, { Component } from 'react'
import { RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PubNub from 'pubnub'
import { PubNubProvider } from "pubnub-react";

import User from './User'
import SignIn from '../components/Account/SignIn'
import SignUp from '../components/Account/SignUp'
import Plans from '../components/Users/Plans'
import Groups from '../components/Users/Groups'
import Account from '../components/Users/Account'
import Chats from '../components/Users/Chats'
import PlanChat from '../components/Plans/PlanChat'



const Stack = createStackNavigator()

const pubnub = new PubNub({
    subscribeKey: "sub-c-527de0ca-6bf9-11eb-a2ab-226faaaba132",
    publishKey: "pub-c-144097f2-7a8a-48fc-a0aa-8c38bf66fce2",
  });

export default class Main extends Component {

    state = {
        error: '',
        plan: [],
        refreshing: false,
        user: {},
    }

    componentDidMount() {
        let token = AsyncStorage.getItem('token')
        if(token){
            fetch("https://get-to-gether.herokuapp.com/profile", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            })
            .then(response => response.json())
            .then(result => {
                if(result.id){
                    this.setState({ user: result })
                }
            })
            .then(fetch("https://get-to-gether.herokuapp.com/plans")
            .then(response => response.json())
            .then(result => this.setState({ plan: result})))
        } 
        else {
            navigate('SignIn')
        }
    }
    
    signUp = user => {
        fetch("https://get-to-gether.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    f_name: user.fName,
                    l_name: user.lName
                }
            })
        })
        .then(response => response.json())
        .then(user => this.setState({ user }))
    }
    
    signIn = (username, password) => {
        fetch("https://get-to-gether.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.token){
                AsyncStorage.setItem('token', result.token)
                this.setState({ user: result.user })
            }
            else {
                this.setState({ error: result.error })
            }
        })
    }
    
    logOut = (user) => {
        this.setState({ user: null })
        navigate('SignIn')
    }
    
    deleteUser = (user) => {
        fetch(`https://get-to-gether.herokuapp.com/users/${user.id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .then(this.setState({ user: null }))
    }

    makePlans = (plan) => {
        fetch("https://get-to-gether.herokuapp.com/plans", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                plan: {
                    name: plan.name,
                    date: plan.date,
                    location: plan.location,
                    time: plan.time,
                    description: plan.description,
                    user_id: this.state.user.id
                }
            })
        })
        .then(response => response.json())
        .then( result => this.setState({ plan: [...this.state.plan, result ]}))
    }

    onRefresh = () => {
        this.setState({ plan: [] });
        this.setState({ refreshing: true });
        fetch('https://get-to-gether.herokuapp.com/plans')
            .then(response => response.json())
            .then(result => this.setState({ plan: result}))
            wait(1000).then(this.setState({ refreshing: false }))
    }

    // currentPlan = () => {
    //     this.setState({currentPlan: })
    // }
    render() {
        return (
            <NavigationContainer>
                <PubNubProvider client={pubnub}>
                    <Stack.Navigator>
                        <Stack.Screen name='SignIn'>
                            {(stackProps) => <SignIn {...stackProps} user={this.state.user} signIn={this.signIn} signUp={this.signUp} error={this.state.error} /> }
                        </Stack.Screen>
                        <Stack.Screen name='SignUp'>
                            {(stackProps) => <SignUp {...stackProps} user={this.state.user} signUp={this.signUp} /> }
                        </Stack.Screen>
                        <Stack.Screen name='Home'> 
                            {(stackProps) => <User {...stackProps} user={this.state.user} plan={this.state.plan} onRefresh={this.onRefresh} refreshing={this.state.refreshing}/> }
                        </Stack.Screen>
                        <Stack.Screen name="Groups">
                            {(stackProps) => <Groups {...stackProps} user={this.state.user} plan={this.state.plan} /> }
                        </Stack.Screen>
                        <Stack.Screen name='Chats'>
                            {(stackProps) => <Chats {...stackProps} user={this.state.user} plan={this.state.plan} /> }
                        </Stack.Screen>
                        <Stack.Screen name='Plans'>
                            {(stackProps) => <Plans {...stackProps} user={this.state.user} plan={this.state.plan} makePlans={this.makePlans}/> }
                        </Stack.Screen>
                        <Stack.Screen name='Account'>
                            {(stackProps) => <Account {...stackProps} user={this.state.user} plan={this.state.plan} /> }
                        </Stack.Screen>
                        <Stack.Screen name='PlanChat'>
                            {(stackProps) => <PlanChat {...stackProps} user={this.state.user} plan={this.state.plan} /> }
                        </Stack.Screen>
                    </Stack.Navigator>
                </PubNubProvider>
            </NavigationContainer>
        )
    }
}


