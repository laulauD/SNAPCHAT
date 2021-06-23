// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from './components/rootNavigator';
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import ConversationScreen from "./screens/ConversationScreen";
import Root from "./screens/Root";

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
   
     <Navigator>
        <Screen name="Welcome" component={ WelcomeScreen } options={options => { return{ headerShown: false};}}/>
        <Screen name="Root" component={ Root } options={options => { return{ headerLeft: null, headerShown: false};}}/>
        <Screen name="TabBar" component={ RootNavigator } options={options => { return{ headerShown: false};}}/>
        <Screen name="ConversationScreen" component={ ConversationScreen } />
     </Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
