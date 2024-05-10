//App.js
import React from 'react';
import { Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import Signup from './Signup';
import Welcome from './Welcome';
import StoryPage from './StoryPage';
import Chatpage from './Chatpage';
import Account from './Account';
import MoodTracker from './MoodTracker';
import COLORS from './constants/colors';
import First from './Questions/First';
import Second from './Questions/Second';
import Third from './Questions/Third';
import Fourth from './Questions/Fourth';
import Fifth from './Questions/Fifth';
import Sixth from './Questions/Sixth';
import Seventh from './Questions/Seventh';
import Eighth from './Questions/Eight';
import Ninth from './Questions/Ninth';
import Tenth from './Questions/Tenth';
import StoryDetails from './StoryDetails';
import ForgotPassword from './ForgotPassword';
import TodayPage from './MoodLogin/today';
import Summary from './MoodLogin/summary';
import CalendarPage from './MoodLogin/calender';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='StoryPage'>
      <Tab.Screen
        name="StoryPage"
        component={StoryPage}
        options={{
          title: 'StoryPage', 
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/bottomtab/read.png')} style={{ height: 30, width: 30 }} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Chatpage"
        component={Chatpage}
        options={{
          title: 'Chatpage',
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/bottomtab/chat.png')} style={{ height: 30, width: 30 }} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="moodpage"
        component={MoodTracker}
        options={{
          title: 'MoodTracker',
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/bottomtab/plant.png')} style={{ height: 30, width: 30 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <Image source={require('./assets/bottomtab/user.png')} style={{ height: 30, width: 30 }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return ( 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        name='Tenth'
        component={Tenth}
        options={{
          headerShown: false,
        }}
        />
         <Stack.Screen
        name='calender'
        component={CalendarPage}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='today'
        component={TodayPage}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='Summary'
        component={Summary}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='StoryDetails'
        component={StoryDetails}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Ninth'
        component={Ninth}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Eighth'
        component={Eighth}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Seventh'
        component={Seventh}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Sixth'
        component={Sixth}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Fifth'
        component={Fifth}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Fourth'
        component={Fourth}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='First'
        component={First}
        options={{
          headerShown: false,
        }}
        />
      <Stack.Screen
        name='Third'
        component={Third}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='Second'
        component={Second}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='Signup'
        component={Signup}
        options={{
          headerShown: false,
        }}
        />
        <Stack.Screen
        name='StoryPage'
        component={TabNavigator}
        options={{
          headerShown:false,
        }}
          />
          <Stack.Screen
        name='Chatpage'
        component={Chatpage}
        options={{
          headerShown: false,
        }}
        />
        {/* <Stack.Screen
        name='moodpage'
        component={MoodTracker}
        options={{
          headerShown: false,
        }}
        /> */}
        <Stack.Screen
        name='Account'
        component={Account}
        options={{
          headerShown: false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


