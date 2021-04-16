import React from 'react'
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';

export default function Groups(props) {
    return (
        <View style={styles.groupsContainer}>
            <Text style={styles.welcome}>{props.user.username}'s current groups</Text>  
        </View>
    )
}

const styles = StyleSheet.create({
    groupsContainer: {
        backgroundColor: 'black',
        // viewHeight: 100,
        // viewWidth: 100,
        flex: 1,
    },
    welcome: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        padding: 15,
    },
});

