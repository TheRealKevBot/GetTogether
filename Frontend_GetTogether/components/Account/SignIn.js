import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


export default class SignIn extends Component {

    state = {
        username: '',
        password: '',
    }

    componentDidMount() {
        fetch('https://get-to-gether.herokuapp.com/plans')
        .then(response => response.json())
        .then(result => console.log("Heroku Wakey Wakey"))
    }

    handleRegister = () => {
        this.props.navigation.navigate('SignUp')
    }

    handleVerify = () => {
        this.props.signIn(this.state.username, this.state.password)
    }

    componentDidUpdate = () => {
        if (this.props.user.username === this.state.username) {
            this.props.navigation.navigate('Home')
        } 
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.main}
                behavior='margin'
            >
                <ScrollView style={styles.scroll}>
                    <View style={styles.signInContainer}>
                        <Text style={styles.message1}>Welcome To GetTogether!</Text>
                        <Text style={styles.message2}>Please Verify to Continue</Text>
                        <View style={styles.logInForm}>
                            <Text style={styles.logInText}>Username</Text>
                            <View style={styles.input}>
                                <TextInput 
                                    style={styles.logInInput}
                                    name="username"
                                    onChangeText={(username) => {this.setState({ username })}}
                                    value={this.state.username} 
                                />
                            </View>
                            <Text style={styles.logInText}>Password</Text>
                            <View style={styles.input}>
                                <TextInput 
                                    style={styles.logInInput}
                                    name="password"
                                    onChangeText={(password) => {this.setState({ password })}}
                                    value={this.state.password} 
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.error}> 
                                {this.props.error ? <Text style={styles.errorText}>{this.props.error}</Text> : null }
                            </View>
                            <View style={styles.verifyButton}>
                                <Button
                                    title='Authenticate'
                                    onPress={this.handleVerify}
                                />
                            </View>
                            <View style={styles.registerButton}>
                                <Button 
                                    title='Register'
                                    onPress={this.handleRegister}
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
    signInContainer: {
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
    logInForm: {
        padding: 40,
    },
    logInText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        padding: 5,
    },
    input: {
        alignItems: 'center',
    },
    logInInput: {
        backgroundColor: 'white',
        color: 'black',
        width: 250,
        padding: 5,
    },
    verifyButton: {
        paddingTop: 20,
        padding: 10,
        width: 250,
    },
    registerButton: {
        padding: 10,
        paddingTop: 10,
        width: 250,
    },
    error: {
        textAlign: 'center',
        padding: 10, 
    },
    errorText: {
        color: 'red',
    },
});