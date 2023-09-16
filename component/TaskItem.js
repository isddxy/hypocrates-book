import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function TaskItem({item}) {

  const navigation = useNavigation()

  return (
      <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('ViewTask', item)}}>
        <Text style={styles.taskName}>{item.name}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
});