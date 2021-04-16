import React, { Component } from 'react'
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default class Plans extends Component {

    state = {
        name: '',
        location: '', 
        date: '', 
        time: '',
        description: '',
        user: '' 

    }

    handlePlans = () => {
        this.props.makePlans(this.state)
    }

    handleRedirect = () => {
        this.props.navigation.navigate('Home')
    }

    combinedHandle = () => {
        this.handlePlans
        this.handleRedirect
    }

    setUser = () => {this.setState({ user: this.props.plan.username})}

    render () {
        return (
            <KeyboardAvoidingView
                style={styles.main}
                behavior='position'
                keyboardVerticalOffset={25} 
            >
                <ScrollView style={styles.scroll}>
                    <View style={styles.plansContainer}>
                        <Text style={styles.welcome1}>Lets Make Some Plans {this.props.user.username} !</Text>
                        <Text style={styles.welcome2}>We just need some info to get this party started !</Text>
                        <View style={styles.plansForm}>
                            <Text style={styles.plansText}>Name</Text>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.plansInput} 
                                    name='name'
                                    onChangeText={(name) => {this.setState({ name })}}
                                    value={this.state.name}
                                />
                            </View>
                            <Text style={styles.plansText}>Location</Text>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.plansInput} 
                                    name='location'
                                    onChangeText={(location) => {this.setState({ location })}}
                                    value={this.state.location}
                                />
                            </View>
                            <Text style={styles.plansText}>Date</Text>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.plansInput} 
                                    name='date'
                                    onChangeText={(date) => {this.setState({ date })}}
                                    value={this.state.date}
                                />
                            </View>
                            <Text style={styles.plansText}>Time</Text>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.plansInput} 
                                    name='time'
                                    onChangeText={(time) => {this.setState({ time })}}
                                    value={this.state.time}
                                />
                            </View>
                            <Text style={styles.plansText}>Description</Text>
                            <View style={styles.input}>
                                <TextInput
                                    style={styles.plansInput} 
                                    name='description'
                                    onChangeText={(description) => {this.setState({ description })}}
                                    value={this.state.description}
                                />
                            </View>
                            <View style={styles.plansButton}>
                                <Button 
                                    title="! Let's Party !"
                                    onPress={this.handlePlans}
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
    plansContainer: {
        backgroundColor: 'black',
        paddingTop: 44,
        alignItems: 'center',
        flex: 1,
    },
    welcome1: {
        color: 'white',
        fontSize: 26,
        textAlign: 'center',
        padding: 15,
    },
    welcome2: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
    },
    plansForm: {
        padding: 20,
    },
    plansText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        padding: 5,
    },
    input: {
        alignItems: 'center',
    },
    plansInput: {
        backgroundColor: 'white',
        color: 'black',
        width: 250,
        padding: 5,
    },
    plansButton: {
        paddingTop: 20,
        padding: 10,
    },
});
