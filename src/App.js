import React, {useEffect} from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EpisodeList from './screens/EpisodeList';
import EpisodeDetail from './screens/EpisodeDetail';
import CharacterDetail from './screens/CharacterDetail';
import FavoriteList from './screens/FavoriteList';
import BottomTabNavigator from './components/createBottomTabNavigator';
import PushNotification from 'react-native-push-notification';





const Stack = createStackNavigator();

const App = () => {


  PushNotification.createChannel(
    {
      channelId: "test-channel", // Kanal kimliği
      channelName: "Test Channel", // Kanal adı
    },
    created => console.log(`PushNotification channel 'test-channel' created: ${created}`)
  );





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
