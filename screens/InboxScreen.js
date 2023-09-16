import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { streamInboxs } from '../db/firestore';
import InboxItem from '../component/InboxItem';
import Button from '../component/Button';
import { faArrowLeftLong, faCloudSun } from '@fortawesome/free-solid-svg-icons';



export default function ProjectScreen({ navigation, navigation: { goBack } }) {

    const insets = useSafeAreaInsets();

    const [inboxs, setInboxs] = useState([]);

    const mapDocToInbox = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            isTask: document.data().isTask,
            createdAt: document.data().createdAt,
            completedAt: document.data().completedAt
        }
    }

    useEffect(() => {
        const unsubscribe = streamInboxs({
            next: querySnapShot => {
            const inboxs = querySnapShot
                .docs.map(docSnapshot => mapDocToInbox(docSnapshot))
                setInboxs(inboxs)
            },
            error: (error) => console.log(error)
        })

        return unsubscribe;
    }, [setInboxs]);

    return (
            <SafeAreaView style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.title}>Входящие</Text>
                    {
                        inboxs?.map(inbox =><InboxItem item={inbox} key={inbox.id} type='inbox'/>)
                    }
                    <View style={styles.footer}>
                        <Button name='Подготовиться к завтру' bgColor='#FFF8EF' color='#B04B2B' icon={ faCloudSun } onPress={() => navigation.navigate("ReviewInbox")}/>
                        <Button name='Назад' bgColor='#' color='#7E7E7E' icon={ faArrowLeftLong } onPress={() => goBack()}/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        color: 'black',
        fontSize: 48,
        textAlign: 'left',
        width: '100%',
        lineHeight: 50,
        fontWeight: 'bold',
        marginVertical: 60
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        width: '100%',
        alignItems: 'center',
    },
});
