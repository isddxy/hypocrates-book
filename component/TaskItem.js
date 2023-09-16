import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function TaskItem({item}) {
  return (
    <View style={styles.item}>
      <Text style={styles.taskName}>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tasksView: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 300
  },
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
  title: {
    marginBottom: 10,
    textAlign: 'center',
    width: '100%'
  }
});