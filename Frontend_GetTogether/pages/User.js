import React from 'react'
import { Button, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';

import PlanCard from '../components/Plans/PlanCard'

export default function User(props) {

    const handlePlans = () => {
        props.navigation.navigate('Plans')
    }
    const handleGroups = () => {
        props.navigation.navigate('Groups')
    }
    const handleChats = () => {
        props.navigation.navigate('Chats')
    }
    const handleAccount = () => {
        props.navigation.navigate('Account')
    }

    const handleChat = () => {
        props.navigation.navigate('PlanChat')
    }

    const plan = props.plan.map(plan => {
        return <PlanCard plan={plan} user={props.user} handleChat={handleChat}/>
    })

    return (
        <View style={styles.userContainer}>
            <View style={styles.buttonsContainer}>
                <View style={styles.groupsButton}>
                    <Button 
                        title='Groups'
                        onPress={handleGroups}
                    />
                </View>
                <View style={styles.plansButton}>
                    <Button 
                        title='Chats'
                        onPress={handleChats}
                    />
                </View>
                <View style={styles.chatsButton}>
                    <Button 
                        title='Plans'
                        onPress={handlePlans}
                    />
                </View>
                <View style={styles.accountButton}>
                    <Button 
                        title='Account'
                        onPress={handleAccount}
                    />
                </View>
            </View>
            <ScrollView 
                style={styles.main}
                refreshControl={
                    <RefreshControl
                        refreshing={props.refreshing} 
                        onRefresh={props.onRefresh}
                    />
                }
            >
                <Text style={styles.feedMessage}>{props.user.username}'s Feed</Text>
                <View style={styles.feed}>
                    {plan.reverse()}
                </View>   
            </ScrollView>
        </View>
     
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'black',
    },
    userContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    buttonsContainer: {
    },
    plansButton: {
    },
    chatsButton: {
    },
    groupsButton: {
    },
    accountButton: {
    },
    feedMessage: {       
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        padding: 15,
    },
    feed: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row',      
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 15,
    },
});
