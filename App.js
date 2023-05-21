
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screen/Home';
import SelectCurrencies from './Screen/SelectCurrencies';
import WishList from './Screen/WishList';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerTitle:"Currency Converter"
        }} />
        <Stack.Screen name="Select" component={SelectCurrencies} options={{
          headerTitle:"Select Currency"
        }} />
         <Stack.Screen name="Wish" component={WishList} options={{
          headerTitle:"WishList"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;