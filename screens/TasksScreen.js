import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { streamTasks } from '../db/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderClosed } from '@fortawesome/free-regular-svg-icons';
import TaskItem from '../component/TaskItem';



export default function TasksScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  const [tasks, setTasks] = useState([]);

  const mapDocToTask = (document) => {
    return {
      id: document.id,
      name: document.data().name,
      isTask: document.data().isTask,
      createdAt: document.data().createdAt,
      completedAt: document.data().completedAt
    }
  }

  useEffect(() => {
    const unsubscribe = streamTasks({
      next: querySnapShot => {
        const tasks = querySnapShot
          .docs.map(docSnapshot => mapDocToTask(docSnapshot))
        setTasks(tasks)
      },
      error: (error) => console.log(error)
    })
    console.log(tasks);

    return unsubscribe;
  }, [setTasks]);

  return (
    <View style={styles.container}>
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
      }}
    >
      <Text style={styles.title}>Сегодня</Text>
        <View style={styles.tasksView}>
          {
            tasks?.map(task =><TaskItem item={task} key={task.id}/>)
          }
        </View>
      </View> 
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnAddTask} onPress={() => navigation.navigate('AddTask')}>
          <FontAwesomeIcon icon={ faPlus } size={ 24 } color='#3F97E8' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnInbox} onPress={() => navigation.navigate('Inbox')}>
          <FontAwesomeIcon icon={ faBars } size={ 20 } color='#3F97E8' />
        </TouchableOpacity> 
        <TouchableOpacity style={styles.btnProject} onPress={() => navigation.navigate('Project')}>
          <FontAwesomeIcon icon={ faFolderClosed } size={ 18 } color='black' />
          <Text style={styles.btnTextProject}>Мои проекты</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  btnAddTask: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 30,
    borderRadius: 16,
    paddingVertical: 16,
    paddingVertical: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C0DDF7'
  },
  btnInbox: {
    backgroundColor: '#EFF7FF',
    width: '100%',
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnProject: {
    width: '100%',
    marginTop: 16,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTextProject: {
    marginLeft: 6,
  },
  footer: {
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 30,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  }
});
