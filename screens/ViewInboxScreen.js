import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import db from '../db/firestore';
import { faArrowLeftLong, faTrashCan, faCheck, faClipboard, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Button from '../component/Button';


export default function ViewInboxScreen({ route, navigation, navigation: { goBack } }) {

    const insets = useSafeAreaInsets();

    const task = route.params;
    console.log(task);

    function getBackground() {
        if (task.isTask) {
            return 'white';
        } else {
            return '#EFF7FF';
        }
    }
    

    const removeTask = async () => {
        await deleteDoc(doc(db, "tasks", task.id))
            .then(result => navigation.navigate("Home"));
    };

    const taskToArchive = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
            isActive: false,
        }).then(result => navigation.navigate("Home"));
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: getBackground(),
                justifyContent: 'flex-start',
                alignItems: 'left',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left + 20,
                paddingRight: insets.right + 20,
            }}
        >
            <Text  style={styles.header}>Просмотр задачи</Text>
            <View style={styles.top}>
                <View style={styles.removeBtn}>
                    <Button bgColor='#FFF3F3' color='#C34E4E' icon={ faTrashCan } onPress={() => taskToArchive()}/>
                </View>
            </View>

            <Text style={styles.title}>{task.name}</Text>

            <View style={styles.footer}>
                <Button name='Разобрать' bgColor='#FFF8EF' color='#B04B2B' icon={ faClipboard } onPress={() => navigation.navigate("ReviewInbox", task)}/>
                <Button name='Назад' bgColor='#' color='#7E7E7E' icon={ faArrowLeftLong } onPress={() => goBack()}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        textAlign: 'center',
    },
    top:{
        flexDirection: 'row',
        marginTop: 30
    },
    title: {
        color: 'black',
        fontSize: 48,
        textAlign: 'left',
        width: '80%',
        lineHeight: 50,
        fontWeight: 'bold',
    },
    removeBtn: {
        width: '20%',
    },
    info: {
        paddingTop: 30,
    },
    subtitle: {
        textAlign: 'left',
        fontSize: 16,
        color: '#7F7F7F'
    },
    text: {
        paddingVertical: 6,
        fontSize: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        left: 20,
        alignItems: 'center',
    },
});