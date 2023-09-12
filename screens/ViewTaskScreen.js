import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ViewTaskScreen() {

    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',

            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            }}
        >
            <Text>Название задачи</Text>
        </View>
    )
}