import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TasksScreen from './screens/TasksScreen'
import SpinScreen from './screens/SpinScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Task" component={TasksScreen} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        <Stack.Screen name="ViewTask" component={ViewTaskScreen} />
        <Stack.Screen name="Spin" component={SpinScreen} />
      </Stack.Navigator>
    
  )
}

export default StackNavigator