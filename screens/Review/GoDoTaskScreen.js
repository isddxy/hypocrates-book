import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import Button from '../../component/Button';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function GoDoTaskScreen({ navigation, navigation: { goBack } }) {

    return (
            <SafeAreaView style={styles.main}>
                <View style={styles.container}>
                    <Text style={styles.title}>Иди выполняй</Text>
                    
                    <View style={styles.footer}>
                        <Button name='На главную' bgColor='#FFF8EF' color='#B04B2B' icon={ faHome } onPress={() => navigation.navigate("Home")}/>
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
