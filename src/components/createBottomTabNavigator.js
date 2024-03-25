import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EpisodeList from '../screens/EpisodeList';
import FavoriteList from '../screens/FavoriteList';



const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {

 

  return (
    <View style={{ flex: 1}}>
      <Tab.Navigator screenOptions={{
        //tabBarActiveBackgroundColor: ,
        tabBarInactiveBackgroundColor: 'transparent',
        //tabBarLabelStyle: 'black',
        tabBarShowLabel: false,
        //tabBarActiveTintColor: 'black',
        //sceneContainerStyle: ,
        tabBarStyle: styles.tabBar,

      }}>
        <Tab.Screen name="EpisodeList" component={EpisodeList} options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ? 'grey': 'transparent', height: 40, width: 40, borderRadius: 20, marginTop: 2, opacity:0.7}}>
              <Image
                source={require('../assets/image/listicon2.png')}
                style={{
                  width: 30, height: 30, tintColor:'black',
                }}
              />
            </View>
          ),
        }} />

        <Tab.Screen name="FavoriteList" component={FavoriteList} options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: focused ?  'grey' : 'transparent', height: 40, width: 40, borderRadius: 20, marginTop: 2, opacity:0.7 }}>
              <Image
                source={require('../assets/image/favlist2.png')}
                style={{ width: 27, height: 27, }}
              />
            </View>
          ),
        }} />

    
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 8,
    right: 8,
    bottom: 8,
    height: 56,
    borderRadius: 50,
    backgroundColor: 'white',
    borderTopColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  }
})

export default BottomTabNavigator;
