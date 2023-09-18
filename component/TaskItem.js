import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function TaskItem({item, type}) {

  const navigation = useNavigation()

  let typeStyle = styles.task

  if (item.completedAt) {
    typeStyle = styles.inbox;
  }

  if (item.isSpinned) {
    typeStyle = styles.spinned;
  }

  console.log(item)

  return (
      <TouchableOpacity style={typeStyle} onPress={() => {navigation.navigate('ViewTask', item)}}>
        <Text style={styles.taskName}>{item.name}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#FBFBFB',
    borderRadius: 16,
    padding: 12,
    paddingLeft: 16,
    marginVertical: 6,
    width: '100%',
  },
  inbox: {
    borderRadius: 16,
    padding: 12,
    paddingLeft: 16,
    marginVertical: 6,
    width: '100%',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ACB2BC'
  },
  spinned: {
    backgroundColor: '#E3CBFF',
    borderRadius: 16,
    padding: 12,
    paddingLeft: 16,
    marginVertical: 6,
    width: '100%',
    borderWidth: 4,
    borderStyle: 'dashed',
    borderColor: '#F5F5F5'
  },
  taskName: {
    fontSize: 18,
    color: '#3F3F3F',
  },
});
