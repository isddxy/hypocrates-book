import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import db from '../db/firestore';


export default function AddTaskScreen({ navigation }) {

    const [inputContent, setInputContent] = useState({});
    const [errorStyle, setErrorStyle] = useState('none');
    const [isErrorStatus, setErrorStatus] = useState(false);
    const [errorText, setErrorText] = useState('');

    function checkLength(text) {
        setInputContent({value: text});
        if (!text)
            setError('Необходимо название') 
        else 
            hideError();
    }

    function showError() {
        setErrorStyle('flex');
        setErrorStatus(true);
    }

    function hideError() {
        setErrorStyle('none');
        setErrorStatus(false);
    }

    function setError(textError) {
        setErrorText(textError);
        showError();
    }

    function clearInput() {
        setInputContent({value: ''})
        setErrorStatus(true);
    }

    const saveTask = async () => {
        console.log(isErrorStatus);
        if (!isErrorStatus) {
            db.collection('tasks').add({
                name: inputContent.value,
                isTask: false,
                createdAt: new Date(),
                completedAt: null
            }).then(result => navigation.navigate("Tasks"))
                .catch(err => console.log(err))
        } else {
            setError('Введите текст');
        }
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Запись задачи</Text>
                    <View style={styles.btnsView}>
                        <TextInput
                            placeholder="Введите название"
                            style={styles.textInput}
                            autoFocus={true}
                            returnKeyType='send'
                            value={inputContent.value}
                            onSubmitEditing={() => saveTask()}
                            onChangeText={(text) => checkLength(text)}
                        />
                        <TouchableOpacity onPress={() => clearInput()} style={styles.btnClear}>
                            <FontAwesomeIcon icon={ faTrashCan } size={ 20 } color='#9A9A9A'/>
                        </TouchableOpacity>
                        <View style={styles.error}>
                            <Text style={{display: errorStyle, color: '#E56363'}}>{ errorText }</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnsView} onPress={() => navigation.navigate("Tasks")}>
                        <View style={styles.btnBack}>
                            <FontAwesomeIcon icon={ faArrowLeftLong } size={ 18 }/>
                            <Text style={styles.btnTextBack}>Назад</Text>
                        </View>    
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
    },
    header: {
        fontSize: 36,
        marginBottom: 48,
    },
    textInput: {
        height: 40,
        fontSize: 20,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        width: '80%',
    },
    error: {
        position: 'absolute',
        marginTop: 60,
        color: '#E56363',
    },
    btnClear: {
        backgroundColor: '#E3E3E3',
        //flex: 0.45,
        width: '14%',
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnBack: {
        backgroundColor: 'white',
        //flex: 0.45,
        width: '100%',
        marginTop: 12,
        borderRadius: 16,
        paddingVertical: 10,
        marginBottom: -70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextBack: {
        color: 'black',
        fontSize: 18,
        marginLeft: 6
    }
});