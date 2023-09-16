import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getTasks } from '../db/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faListAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderClosed } from '@fortawesome/free-regular-svg-icons';
import TaskItem from '../component/TaskItem';



export default function TasksScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  const [tasks, setTask] = useState([]);


  useEffect(() => {
    getTasks().then(tasks => setTask(tasks))
    console.log(tasks);
  }, []);

  // const getTasks = async () => {
  //   setTask({});
  //   const db = firebase.firestore();
  //   const taskRef = db.collection('tasks');
  //   //const snapshot = await taskRef.get();
  //   const snapshot = await taskRef.where('isTask', '==', true).get();
  //   if (snapshot.empty) {
  //     console.log('Сегодня нет еще задач');
  //     return;
  //   }
  //   const allTasks = snapshot.docs.map(doc => doc.data());
  //   setTask(allTasks);
  // };

  return (
    <View style={{
      flex: 1,
    }}
    >
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 10,
        paddingRight: insets.right + 10,
      }}
    >
      <Text style={styles.title}>Сегодня</Text>
        <View style={styles.tasksView}>
      {/* <FlatList
        style={
          {
            width: '100%',
          }
        }
        data={tasks}
        renderItem={({item}) => <TouchableOpacity  onPress={() => {
          navigation.navigate('ViewTask', {item});
        }}><Item title={item.name} /></TouchableOpacity>}
        //keyExtractor={item => item.id}
      />
      */}
      {/* {
        tasks?.map(task => <View style={styles.item}>
          <Text style={styles.taskName}>{task.name}</Text>
          </View>)
      } */}
          {
            tasks?.map(task => <TouchableOpacity key={task.id} onPress={() => {
              navigation.navigate('ViewTask', task.id);
            }}><TaskItem item={task} /></TouchableOpacity>)
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
