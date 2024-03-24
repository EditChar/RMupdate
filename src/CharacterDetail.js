import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import globalStyles from './styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToast} from './components/ToastService';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const addToFavorites = async (item) => {
    try {
      // Favori öğeleri yerel depolamadan al
      const savedFavorites = await AsyncStorage.getItem('favoriteCharacters');
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      // Eklemek istediğiniz itemin favorilerde olup olmadığını kontrol et
      const isAlreadyFavorited = favorites.some((favItem) => favItem.name === item.name);

      if (!isAlreadyFavorited) {
        // Eklemek istediğimiz itemi favorilere ekledik
        favorites.push(item);

        // Yerel depolamada güncellenmiş favori listesini sakladık
        await AsyncStorage.setItem('favoriteCharacters', JSON.stringify(favorites));

        showToast(`${characterData.name}`, 'addFavorite', 20);
        console.log('karakter: ',characterData.name )

        // Favori öğeleri güncelledik
        setFavoriteItems(favorites);

        // Icon durumunu güncelle
        const updatedIconStatus = { ...iconStatus, [item.id]: true };
        setIconStatus(updatedIconStatus);
        // İcon durumlarını AsyncStorage'e kaydet
        await AsyncStorage.setItem('iconStatus', JSON.stringify(updatedIconStatus));

      } else {
        showToast('Bu öğe zaten favorilere eklenmiş.');
      }
    } catch (error) {
      console.error('Favori eklerken hata:', error);
    }
  };



  if (!characterData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={style.container}>
    <View style={globalStyles.backContainer}>
      <TouchableOpacity style={globalStyles.backIcon} onPress={handleGoBack}>
      <Image style={style.imageStyle} source={require('./assets/image/prevpng.png')}></Image>

      </TouchableOpacity>
    </View>
      <Text style={globalStyles.heading}>Character Detail</Text>
      <Text style={globalStyles.characterName}>{characterData.name}</Text>
      <Text style={globalStyles.characterStatus}>Status: {characterData.status}</Text>
      <Text style={globalStyles.characterSpecies}>Species: {characterData.species}</Text>
      <Text style={globalStyles.characterLocation}>Location: {characterData.location.name}</Text>
      <TouchableOpacity onPress={addToFavorites}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color={isFavorite ? 'red' : 'black'} />
      </TouchableOpacity>
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
