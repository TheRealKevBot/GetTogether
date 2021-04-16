import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, Text, View, Button } from 'react-native';
import { usePubNub } from "pubnub-react";

export default function Chats(props) {

    const pubnub = usePubNub();
    const userAvatar = props.user.username 

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(pubnub) {
            pubnub.setUUID(userAvatar);
            const listen = {
                message: envelope => {
                    setMessages(msgs => [
                        ...msgs, 
                        {
                            id: envelope.message.id,
                            author: envelope.publisher,
                            content: envelope.message.content,
                            timetoken: envelope.timetoken
                        }
                    ]);
                }
            };
            pubnub.addListener(listen)
            pubnub.subscribe({channels: ['chat'], triggerEvents: true, withPresence: true, autoload: 30})
            pubnub.hereNow({channels: ['chat'], includeUUIDs: true, includeState: true})           
            return () => {
                pubnub.removeListener(listen)
                pubnub.unsubscribeAll()
            }
        }
    }, [pubnub])

    const handleSubmit = () => {
        setInput("")
        const message = {
            content: input,
            id: Math.random().toString(16).substr(2)
        }
        pubnub.publish({ channel: 'chat', message})
    }
    
    return (
        <KeyboardAvoidingView 
            style={styles.main}
            behavior='padding'
            keyboardVerticalOffset={52}  
        >
            <View style={styles.messagesContainer}>
            <Text style={styles.welcome}>Welcome to the chat {props.user.username}!</Text>
                        {/*  */}
            <ScrollView 
            style={styles.scroll}
            >
                <View style={styles.topContainer}>
                    {messages.map(message => (
                        <View key={message.timetoken} style={styles.messageContainer}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarContent}>{message.author}</Text>
                            </View>
                            <View style={styles.messageContent}>
                                <Text>{message.content}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
                <View style={styles.bottomContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={handleSubmit}
                        returnKeyType="send"
                        enablesReturnKeyAutomatically={true}
                        placeholder="Type message here..."
                    />
                    <View style={styles.submitButton}>
                        {input !== "" && <Button title="Send" onPress={handleSubmit} />}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const randomColor1 = "#" + Math.floor(Math.random()*16777215).toString(16);
const randomColor2 = "#" + Math.floor(Math.random()*16777215).toString(16);

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'black',
        flex: 1,
    },
    scroll: {
        backgroundColor: 'black',
        flex: 1,
    },
    messagesContainer: {
        backgroundColor: 'black',
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute"
    },
    welcome: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        padding: 15,
    },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      topContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingHorizontal: 16,
        color: 'white'
      },
      messageContainer: {
        flexDirection: "row",
        marginTop: 16,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 4
      },
      avatar: {
        width: 38,
        height: 38,
        borderRadius: 50,
        overflow: "hidden",
        marginRight: 16,
        backgroundColor: randomColor1,
      },
      avatarContent: {
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: 'center',
        color: randomColor2,
      },
      messageContent: {
        flex: 1,
        color: 'white',
      },
      bottomContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
      },
      textInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 4,
        padding: 16,
        elevation: 2
      },
      submitButton: {
        position: "absolute",
        right: 32
      },
});
