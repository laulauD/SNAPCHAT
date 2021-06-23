import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons  } from '@expo/vector-icons';

import SnapScreen from '../screens/SnapScreen';
import StoryScreen from '../screens/StoryScreen';
import ChatScreen from '../screens/ChatScreen';

const TabBar = () => {
const Tab = createBottomTabNavigator();
  
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#ffc93c',
            inactiveTintColor: 'gray',
          }}>

            <Tab.Screen name="Snap" component={SnapScreen}  options={{ pageNumber: 1, tabBarIcon: () => (
                <FontAwesome5 name="snapchat-ghost" size={24} color="#ffe268" />
            )}} 
            />

            <Tab.Screen name="Chat" component={ChatScreen}  options={{ 
              tabBarIcon: () => (
              <Ionicons name="ios-chatbubbles" size={24} color="#3d84b8" />
            )}}  
            />

            <Tab.Screen name="Story" component={StoryScreen}   options={{ tabBarIcon: () => (
                <FontAwesome5 name="user-friends" size={24} color="#542e71" />
            )}}  
            />
            

        </Tab.Navigator>
      );
    };
    
    export default TabBar;

    
