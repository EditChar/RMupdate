import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import axios from 'axios';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';


const CharacterDetail = ({ route, navigation }) => {
  const { characterId } = route.params;
  const [characterData, setCharacterData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [iconStatus, setIconStatus] = useState({});


  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchCharacterData();
    checkIfFavorite();
  }, []);

  const fetchCharacterData = () => {
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        setCharacterData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkIfFavorite = async () => {
    try {
      const favoriteItems = await AsyncStorage.getItem('favoriteItems');
      if (favoriteItems !== null) {
        const parsedFavorites = JSON.parse(favoriteItems);
        const isCharacterFavorite = parsedFavorites.some(item => item.id === characterId);
        setIsFavorite(isCharacterFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite items:', error);
    }
  };

  const addToFavorites = async () => {
    try {
      let favoriteItems = await AsyncStorage.getItem('favoriteItems');
      if (favoriteItems === null) {
        favoriteItems = [];
      } else {
        favoriteItems = JSON.parse(favoriteItems);
      }
      //favoriList'de item kontrolü
      const isCharacterFavorite = favoriteItems.some(item => item.id === characterId);

      if (!isCharacterFavorite && favoriteItems.length >= 10) {
        // Alert.alert('“Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
        showLocalNotification();

        return;
      }


      if (isCharacterFavorite) {
        // Remove 
        const updatedFavorites = favoriteItems.filter(item => item.id !== characterId);
        await AsyncStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        // Add
        favoriteItems.push({ id: characterId, name: characterData.name, image: characterData.image });
        await AsyncStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error adding/removing from favorites:', error);
    }
  };


  
  // Local Notification fonk.
  const showLocalNotification = () => {
    
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: "test-channel", 
      title: "Favori karakter ekleme sayısını aştınız.",
      message: " Başka bir karakteri favorilerden çıkarmalısınız.", 
      largeIcon: "RMlogo.png",
      smallIcon: "RMlogo.png",
      bigLargeIcon: "RMlogo.png",
    });
    console.log('max list bildirimi gönderildi');
  };

  if (!characterData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={style.container}>
      <View style={globalStyles.backContainer}>
        <TouchableOpacity style={globalStyles.backIcon} onPress={handleGoBack}>
          <Image style={style.imageStyle} source={require('../assets/image/prevpng.png')}></Image>
        </TouchableOpacity>
      </View>
      <Text style={globalStyles.heading}>Character Detail</Text>
      {characterData.image && (
        <Image
          source={{ uri: characterData.image }} // API'den gelen görüntü URL'si
          style={{ width: 250, height: 250, alignSelf:'center' }} // Görüntü boyutları (istediğiniz boyutlara göre ayarlayabilirsiniz)
        />
      )}
      <Text style={globalStyles.characterName}>{characterData.name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight:30 }}>
          <Text style={globalStyles.characterStatus}>Status: {characterData.status}</Text>
        <TouchableOpacity onPress={addToFavorites}>
          <Icon name={isFavorite ? 'heart' : 'heart-o'} size={50} color={isFavorite ? 'red' : 'black'} />
        </TouchableOpacity>
      </View>
      <Text style={globalStyles.characterSpecies}>Species: {characterData.species}</Text>
      <Text style={globalStyles.characterSpecies}>Gender: {characterData.gender}</Text>
      <Text style={globalStyles.characterLocation}>Location: {characterData.location.name}</Text>
    </View>
  );
  
};

const style = StyleSheet.create({

  container: {
    padding: 16,
  },
  imageStyle: {
    flex: 1,
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }
});



export default CharacterDetail;
