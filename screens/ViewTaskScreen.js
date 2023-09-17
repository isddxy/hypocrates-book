import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import db from '../db/firestore';
import { faArrowLeftLong, faTrashCan, faCheck, faClipboard, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Button from '../component/Button';


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
                return <Button bgColor='#C2FFC0' color='#186C15' icon={ faCheck } onPress={() => setDone()}/>;
            } else {
                return <Button name='Не готово' bgColor='#F5F5F5' color='#7C8694' icon={ faRotateRight } onPress={() => setNotDone()}/>;
            }
        } 
    }
    

    const removeTask = async () => {
        await deleteDoc(doc(db, "tasks", task.id))
            .then(result => navigation.navigate("Tasks"));
    };

    const taskToArchive = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
            isActive: false,
        }).then(result => navigation.navigate("Tasks"));
    };

    const setDone = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
                completedAt: new Date(),
            }).then(result => navigation.navigate("Tasks"));
    };

    const setNotDone = async () => {
        await updateDoc(doc(db, 'tasks', task.id), {
                completedAt: null,
            }).then(result => navigation.navigate("Tasks"));
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
            <Text>Просмотр задачи</Text>
            <View style={styles.top}>
                <Text style={styles.title}>{task.name}</Text>
                <View style={styles.removeBtn}>
                    <Button bgColor='#FFF3F3' color='#C34E4E' icon={ faTrashCan } onPress={() => taskToArchive()}/>
                </View>
            </View>
            
            <View style={styles.info}>
                <Text style={styles.subtitle}>Первое действие</Text>
                <Text style={styles.text}>- Написать Алексею в телеграм</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.subtitle}>Результат, который я хочу получить</Text>
                <Text style={styles.text}>- Вот здесь будет написан результат</Text>
            </View>


            <View style={styles.info}>
                <Button name='Разобрать' bgColor='#FFF8EF' color='#B04B2B' icon={ faClipboard } onPress={() => navigation.navigate("ReviewInbox")}/>
               
            </View>
            <View style={styles.footer}>
                {
                    getDoneButton()
                }
                <Button name='Назад' bgColor='#' color='#7E7E7E' icon={ faArrowLeftLong } onPress={() => goBack()}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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