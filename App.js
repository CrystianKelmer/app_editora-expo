import Login from './src/pages/Login';
import React from 'react';
import Home from './src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { DataProvider } from './src/context/DataContext';
//esta redirecionando a pagina para a respectiva no return 
//se não fizer o export default (name) ele n lê 

const Stack = createStackNavigator ();

const App = () => {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;