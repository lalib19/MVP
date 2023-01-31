import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Favorites from './Screens/Favorites';
import GymProfile from './Screens/GymProfile';
import Home from './Screens/Home';
import LogIn from './Screens/LogIn';
import Map from './Screens/Map';
import SignUp from './Screens/SignUp';
import Navigator from './Components/Navigator';

const Stack = createNativeStackNavigator<RouteParams>();

export type RouteParams = {
  Navigator: undefined;
  Home: undefined;
  SignUp: undefined;
  LogIn: undefined;
  Map: undefined;
  GymProfile: undefined;
  Favorites: undefined;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen name="Navigator" component={Navigator} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="GymProfile" component={GymProfile} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;

// test