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
import db from '../../db/firestore';
import Button from '../../component/Button';

export default function AddFirstActionScreen({ route, navigation, navigation: { goBack } }) {

    const task  = route.params;

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

    const saveFirstAction = async () => {
        const firstActionText = inputContent.value; 
        navigation.navigate('AddWantResult', [task, firstActionText]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Text style={styles.header}>Какое первое действие нужно?</Text>
                    <View style={styles.btnsView}>
                        <TextInput
                            placeholder="Введите текст"
                            style={styles.textInput}
                            autoFocus={true}
                            returnKeyType='send'
                            value={inputContent.value}
                            onSubmitEditing={() => saveFirstAction()}
                            onChangeText={(text) => checkLength(text)}
                        />
                        <TouchableOpacity onPress={() => clearInput()} style={styles.btnClear}>
                            <FontAwesomeIcon icon={ faTrashCan } size={ 20 } color='#9A9A9A'/>
                        </TouchableOpacity>
                        <View style={styles.error}>
                            <Text style={{display: errorStyle, color: '#E56363'}}>{ errorText }</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: -70 }}>
                        <Button name='Назад' bgColor='white' color='#323232' icon={ faArrowLeftLong } onPress={() => goBack()}/>
                    </View>
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