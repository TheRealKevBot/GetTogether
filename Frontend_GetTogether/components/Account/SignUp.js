import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


export default class SignUp extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        fName: '',
        lName: '',
    }

    handleRegister = () => {
        this.props.signUp(this.state)
    }

    handleRedirect = () => {
        this.props.navigation.navigate('Home')
    }

    combinedRegister = () => {
        this.handleRegister()
        this.handleRedirect()
    }

   render() {
       return (
            <KeyboardAvoidingView 
                style={styles.main}
                behavior='position'
                keyboardVerticalOffset={10} 
            >
                <ScrollView style={styles.scroll}>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.message1}>We appreciate your interest in GetTogether!</Text>
                        <Text style={styles.message2}>Please Complete to Continue</Text>
                        <View style={styles.signUpForm}>
                            <Text style={styles.signUpText}>Username</Text>
                            <View style={styles.input}>
                                <TextInput 
                                style={styles.signUpInput} 
                                name='username'
                                onChangeText={(username) => {this.setState({ username })}}
                                value={this.state.username}
                                />
                            </View>
                            <Text style={styles.signUpText}>Email</Text>
                            <View style={styles.input}>
                                <TextInput 
                                style={styles.signUpInput}
                                name='email'
                                onChangeText={(email) => {this.setState({ email })}}
                                value={this.state.email} 
                                />
                            </View>
                            <Text style={styles.signUpText}>Password</Text>
                            <View style={styles.input}>
                                <TextInput 
                                style={styles.signUpInput} 
                                name='password'
                                onChangeText={(password) => {this.setState({ password })}}
                                value={this.state.password}
                                />
                            </View>
                            <Text style={styles.signUpText}>First Name</Text>
                            <View style={styles.input}>
                                <TextInput 
                                style={styles.signUpInput}
                                name='fName'
                                onChangeText={(fName) => {this.setState({ fName })}}
                                value={this.state.fName} 
                                />
                            </View>
                            <Text style={styles.signUpText}>Last Name</Text>
                            <View style={styles.input}>
                                <TextInput 
                                style={styles.signUpInput}
                                name='lName'
                                onChangeText={(lName) => {this.setState({ lName })}}
                                value={this.state.lName} 
                                />
                            </View>
                            <View style={styles.registerButton}>
                                <Button 
                                title='Register'
                                onPress={this.combinedRegister}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>   
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
    },
    scroll: {
        backgroundColor: 'black',
        flex: 1,
    },
    signUpContainer: {
        backgroundColor: 'black',
        paddingTop: 44,
        alignItems: 'center',
        flex: 1,
    },
    message1: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
        padding: 15,
    },
    message2: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    signUpForm: {
        padding: 20,
    },
    signUpText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        padding: 5,
    },
    input: {
        alignItems: 'center',
    },
    signUpInput: {
        backgroundColor: 'white',
        color: 'black',
        width: 250,
        padding: 5,
    },
    verifyButton: {
        paddingTop: 20,
        padding: 10,
    },
    registerButton: {
        padding: 35,
        paddingTop: 25,
        width: 250,
    },
});