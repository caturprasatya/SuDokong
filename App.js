import React from 'react'
import store from './src/store/'
import { Provider } from 'react-redux'
import { StyleSheet } from 'react-native';
import { Home, Game, Finish } from './src/screens'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ Home } />
          <Stack.Screen name="Game" component={ Game }/>
          <Stack.Screen name="Finish" component={ Finish }/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
