import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, ImageBackground   } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const FavoriteList = ({ navigation }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => { //kullanıcı focus olduğunda fetch işlemini çekiyoruz performansı kaybı olmaması için.
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavoriteItems();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchFavoriteItems = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteItems');
      if (storedFavorites !== null) {
        setFavoriteItems(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error fetching favorite items:', error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const updatedFavorites = favoriteItems.filter(item => item.id !== itemId);
      await AsyncStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
      setFavoriteItems(updatedFavorites);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleRemove = (itemId) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => removeItem(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}>
      <View style={styles.item}>
      <Image
        source={{ uri: item.image }} 
        style={{ width: 50, height: 50, marginRight: 10, borderRadius:50 }} 
      />
        <Text style={{color:'white', fontWeight:'bold'}}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Icon name="trash-can" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={StyleSheet.absoluteFillObject}
        //blurRadius={3}
        source={require('../assets/image/RMcool.jpg')} />
      <Text style={styles.heading}>Favorite Characters</Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{marginBottom:42}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'white',
    alignSelf:'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'rgba(128, 128, 128, 0.5)',
    borderRadius:16,
    marginVertical:2,
  },
});

export default FavoriteList;
