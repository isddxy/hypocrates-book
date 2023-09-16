import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { firebase } from '../db/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export default function InboxScreen({ navigation }) {

    const [inboxs, setInbox] = useState([]);

    useEffect(() => {
        getInboxs()
    }, []);

    const insets = useSafeAreaInsets();

    const getInboxs = async () => {
        //getInboxs({});
        const db = firebase.firestore();
        const taskRef = db.collection('tasks');
        const snapshot = await taskRef.where('isTask', '==', false).get();
        if (snapshot.empty) {
            console.log('Сегодня нет еще задач');
            return;
        }


        const allInboxs = snapshot.docs.map(doc => doc.data());
        setInbox(allInboxs);
    };

    const Item = ({title}) => (
        <View style={styles.item}>
            <Text style={styles.taskName}>{title}</Text>
        </View>
    );

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left + 10,
                paddingRight: insets.right + 10,
            }}
        >
            <Text>Входящие</Text>
            <FlatList
                style={
                    {
                        width: '100%',
                        alignContent: 'flex-end'
                    }
                }
                data={inboxs}
                renderItem={({item}) => <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('ViewTask', {item});
                }}><Item title={item.name} /></TouchableOpacity>}
                keyExtractor={item => item}
            />
            <TouchableOpacity style={styles.btnsView} onPress={() => navigation.navigate("Tasks")}>
                <View style={styles.btnBack}>
                    <FontAwesomeIcon icon={ faArrowLeftLong } size={ 18 }/>
                    <Text style={styles.btnTextBack}>Назад</Text>
                </View>    
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#FBFBFB',
        borderRadius: 16,
        padding: 12,
        paddingLeft: 16,
        marginVertical: 6,
        width: '100%',
    },
    taskName: {
        fontSize: 18,
        color: '#3F3F3F',
    },
    title: {
        marginBottom: 10,
        textAlign: 'center',
        width: '100%'
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnBack: {
        backgroundColor: 'white',
        width: '96%',
        marginBottom: 0,
        borderRadius: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTextBack: {
        color: 'black',
        fontSize: 18,
        marginLeft: 6
    }
});