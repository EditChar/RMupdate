import React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EpisodeList from './EpisodeList';
import EpisodeDetail from './EpisodeDetail';
import CharacterDetail from './CharacterDetail';
import FavoriteList from './FavoriteList';
import BottomTabNavigator from './components/createBottomTabNavigator';



const Stack = createStackNavigator();

const App = () => {
  return (
    <>
    <NavigationContainer>
    <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerTitle: '', headerTransparent: true }}>
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false } } />
        <Stack.Screen name="EpisodeList" component={EpisodeList} options={{ headerShown: false } } />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetail} options={{ headerShown: false }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
