import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function QuestionCard({ question }) {
    return (
        <View style={styles.card}>
            <Text style={styles.question}>{ question.name }</Text>
            <Text style={styles.icon}>{ question.emoji }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#DEC9E5',
        width: '90%',
        height: '70%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        shadowColor: '#7B5388',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.30,
        shadowRadius: 30,
        elevation: 11,
    },
    question: {
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        lineHeight: 42,
    },
    icon: {
        fontSize: 100,
    },
});