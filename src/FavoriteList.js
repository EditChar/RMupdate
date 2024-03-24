import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FavoriteList = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  useEffect(() => {
    // Favori karakterleri AsyncStorage'den al
    getFavoriteCharacters();
  }, []);

  const getFavoriteCharacters = async () => {
    try {
      const storedFavoriteCharacters = await AsyncStorage.getItem('favoriteCharacters');
      if (storedFavoriteCharacters) {
        // AsyncStorage'den alınan favori karakterler listesi state'e atılır
        setFavoriteCharacters(JSON.parse(storedFavoriteCharacters));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderFavoriteCharacter = ({ item }) => (
    <View>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Favorite Characters</Text>
      <FlatList
        data={favoriteCharacters}
        renderItem={renderFavoriteCharacter}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FavoriteList;
