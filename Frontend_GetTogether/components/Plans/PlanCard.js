import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function PlanCard(props) {

    return (
        <View style={styles.planCard}>
            <Text style={styles.name}>{props.plan.name}</Text>
            
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    source={{
                        uri: 'https://img.pngio.com/hang-out-by-katerina-limpitsouni-dribbble-dribbble-hang-out-png-1200_900.png',
                    }} 
                />
            </View>
            <Text style={styles.location}>Location: {props.plan.location}</Text>
            <Text style={styles.date}>Date: {props.plan.date}</Text>
            <Text style={styles.time}>Time: {props.plan.time}</Text>
            <Text style={styles.description}>Description: {props.plan.description}</Text>
            <Button 
                style={styles.chat}
                title='Chat'
                onPress={props.handleChat}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    planCard: {
        borderRadius: 10,
        // boxSizing: 'border-box',
        paddingRight: 15,
        paddingLeft: 15,
        paddingBottom: 20,
    },
    name: {
        color: 'white',
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    creator: {
        color: 'white',
        padding: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        padding: 5,
    },
    image: {
        width: 360,
        height: 180,
    },
    location: {
        color: 'white',
        padding: 5,
        fontSize: 16,
    },
    date: {
        color: 'white',
        padding: 5,
        fontSize: 16,
    },
    time: {
        color: 'white',
        padding: 5,
        fontSize: 16,
    },
    description: {
        color: 'white',
        padding: 5,
        paddingBottom: 10,
        fontSize: 16,
    },
    chat: {
        width: 250,
        padding: 5,
    },
});