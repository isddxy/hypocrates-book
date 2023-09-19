import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function InboxItem({item, type}) {

    const navigation = useNavigation()
    console.log(item)

    return (
            <TouchableOpacity style={styles.inbox} onPress={() => navigation.navigate("ReviewInbox", item)}>
            <Text style={styles.taskName}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

const styles = StyleSheet.create({
    inbox: {
        borderRadius: 16,
        padding: 12,
        paddingLeft: 16,
        marginVertical: 6,
        width: '100%',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#C0DDF7'
    },
    taskName: {
        fontSize: 18,
        color: '#3F3F3F',
    },
});
