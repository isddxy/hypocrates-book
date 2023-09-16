import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function Button({name, bgColor, color, icon, onPress}) {


    function getText() {
        
        if (name) {
            return (
                <Text style={{
                    color: color,
                    fontSize: 18,
                    marginLeft: 6
                }}>{name}</Text>
            )
        }
    }

    return (
        <TouchableOpacity style={styles.btnsView} onPress={onPress}>
            <View style={{
                    backgroundColor: bgColor,
                    width: '100%',
                    marginBottom: 0,
                    borderRadius: 16,
                    paddingVertical: 24,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <FontAwesomeIcon icon={ icon } size={ 18 } color={color}/>
                {
                    getText()
                }
            </View>  
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
});