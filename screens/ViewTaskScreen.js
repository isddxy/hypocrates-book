import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import db from '../db/firestore';
import { faArrowLeftLong, faTrashCan, faCheck, faClipboard, faRotateRight, faEdit } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Button from '../component/Button';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default function ViewTaskScreen({ route, navigation, navigation: { goBack } }) {

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

    function getDoneButton() {
        if (task.isTask) {
            if (!task.completedAt) {
                return (
                    <TouchableOpacity style={styles.btnDone} onPress={() => setDone()}>
                        <FontAwesomeIcon icon={ faCheck } size={ 32 } color='#186C15' />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <View style={{marginBottom: 20}}>
                        <Button name='Не готово' bgColor='#F5F5F5' color='#7C8694' icon={ faRotateRight } onPress={() => setNotDone()}/>
                    </View>
                );
            }
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

    const setDone = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
                completedAt: new Date(),
            }).then(result => navigation.navigate("Home"));
    };

    const setNotDone = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
                completedAt: null,
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
            <Text style={styles.header}>Просмотр задачи</Text>
            <View style={styles.top}>
                <Text style={styles.title}>{task.name}</Text>
                <View style={styles.removeBtn}>
                    <Button bgColor='#FFF3F3' color='#C34E4E' icon={ faTrashCan } onPress={() => removeTask()}/>
                </View>
            </View>
            
            <View style={styles.info}>
                <Text style={styles.subtitle}>Первое действие</Text>
                <Text style={styles.text}>- { task.firstAction }</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.subtitle}>Результат, который я хочу получить</Text>
                <Text style={styles.text}>- { task.wantResult }</Text>
            </View>


            <View style={styles.info}>
                
            </View>
            <View style={styles.footer}>

                {
                    getDoneButton()
                }

                <Button name='Изменить' bgColor='#FFF8EF' color='#B04B2B' icon={ faEdit } onPress={() => navigation.navigate("ReviewInbox", task)}/>
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
    btnDone: {
        backgroundColor: '#C2FFC0',
        width: '100%',
        marginVertical: 20,
        borderRadius: 24,
        paddingVertical: 16,
        paddingVertical: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});