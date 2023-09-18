import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import SpinScreen from './screens/SpinScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen';
import ProjectScreen from './screens/Project/ProjectScreen';
import InboxScreen from './screens/InboxScreen';
import ReviewInboxScreen from './screens/Review/ReviewInboxScreen';
import ReviewAllInboxesScreen from './screens/Review/ReviewAllInboxesScreen';

const Stack = createNativeStackNavigator();

export default StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
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