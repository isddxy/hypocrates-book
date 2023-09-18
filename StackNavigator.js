import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TasksScreen from './screens/TasksScreen'
import SpinScreen from './screens/SpinScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen';
import ProjectScreen from './screens/ProjectScreen';
import InboxScreen from './screens/InboxScreen';
import ReviewInboxScreen from './screens/ReviewInboxScreen';
import ReviewAllInboxesScreen from './screens/ReviewAllInboxesScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="ViewTask" component={ViewTaskScreen} />
        <Stack.Screen name="Spin" component={SpinScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="Project" component={ProjectScreen} />
        <Stack.Screen name="ReviewInbox" component={ReviewInboxScreen} />
        <Stack.Screen name="ReviewAllInboxes" component={ReviewAllInboxesScreen} />
      </Stack.Navigator>
    
  )
}

export default StackNavigator