import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { firebase } from '../db/config';
import { doc, deleteDoc } from "firebase/firestore";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function ViewTaskScreen({ route, navigation }) {

    const insets = useSafeAreaInsets();


    const { item } = route.params;
    console.log(item);

    function getBackground() {
        if (item.isTask) {
            return 'white'
        } else {
            return '#EFF7FF'
        }
    }

    const removeTask = async () => {
        // firebase.collection('tasks').doc(id).delete()
        // .then(() => {
        //     console.log('Taskr deleted!');
        // });

        await deleteDoc(doc(db, "tasks", item));
        // .then(querySnapshot => {
        //     querySnapshot.docs[0].ref.delete();
        // });
    };

    return (
        <View
            style={{
            flex: 1,
            backgroundColor: getBackground(),
            justifyContent: 'flex-start',
            alignItems: 'center',

            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            }}
        >
            <Text>Просмотр задачи</Text>
            <Text style={styles.title}>{item.name}</Text>
            <TouchableOpacity style={styles.btnRemove} onPress={() => removeTask()}>
                <View style={styles.btnBack}>
                    <FontAwesomeIcon icon={ faTrashCan } size={ 18 }/>
                    <Text style={styles.btnTextBack}>Удалить</Text>
                </View>    
            </TouchableOpacity>

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
    title: {
        color: 'black',
        fontSize: 48,
        textAlign: 'left',
        paddingBottom: 300,
        width: '86%',
    },
    btnsView: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
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