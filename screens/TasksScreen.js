import { StyleSheet, Text, View, Button, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { firebase } from '../config'


export default function TasksScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  const [tasks, setTask] = useState([]);
  const [inboxs, setInbox] = useState([]);

  useEffect(() => {
    getTasks()
    getInboxs()
  }, []);

  const getTasks = async () => {
    setTask({});
    const db = firebase.firestore();
    const taskRef = db.collection('tasks');
    //const snapshot = await taskRef.get();
    const snapshot = await taskRef.where('isInbox', '==', false).get();
    if (snapshot.empty) {
      console.log('Сегодня нет еще задач');
      return;
    }
    const allTasks = snapshot.docs.map(doc => doc.data());
    setTask(allTasks);
  };

  const getInboxs = async () => {
    setTask({});
    const db = firebase.firestore();
    const taskRef = db.collection('tasks');
    //const snapshot = await taskRef.get();
    const snapshot = await taskRef.where('isInbox', '==', true).get();
    if (snapshot.empty) {
      console.log('Сегодня нет еще задач');
      return;
    }
    const allInboxs = snapshot.docs.map(doc => doc.data());
    setInbox(allInboxs);
  };

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.taskName}>{title}</Text>
    </View>
  );


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

        // Paddings to handle safe area
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 10,
        paddingRight: insets.right + 10,
      }}
    >
      <Text style={styles.title}>Сегодня</Text>
      <FlatList
        style={
          {
            width: '100%',
          }
        }
        data={tasks}
        renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("ViewTask")}><Item title={item.name} /></TouchableOpacity>}
        keyExtractor={item => item.id}
      />

      <Text style={styles.title}>Входящие</Text>
      <FlatList
        style={
          {
            width: '100%',
            height: 100,
          }
        }
        data={inboxs}
        renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate("ViewTask")}><Item title={item.name} /></TouchableOpacity>}
        keyExtractor={item => item.id}
      />

      <Button
        title="Добавить задачу"
        onPress={() => navigation.navigate('AddTask')}
      />
      {/* <Button
        title="Давай крутить колесо"
        onPress={() => navigation.push('Spin')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#3F3F3F'
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    width: '100%'
  },
});
