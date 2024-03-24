import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';
import globalStyles from './styles/globalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';



const EpisodeDetail = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episodeData, setEpisodeData] = useState(null);
  const [characters, setCharacters] = useState([]);

  const searchRef = useRef();
  const [search, setSearch] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetchEpisodeData();
  }, []);

  const fetchEpisodeData = () => {
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then((response) => {
        setEpisodeData(response.data);
        fetchCharacters(response.data.characters);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCharacters = (characterUrls) => {
    const requests = characterUrls.map((url) => axios.get(url));
    Promise.all(requests)
      .then((responses) => {
        const charactersData = responses.map((response) => response.data);
        setCharacters(charactersData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!episodeData) {
    return <Text>Loading...</Text>;
  }

  const renderItem = ({ item }) => {
    // Arama terimi boşsa veya öğe ismi, bölüm veya hava tarihi içeriyorsa göster
    if (
      search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) 
    ) {
      return (
        <TouchableOpacity
        style={globalStyles.characterItem}
        onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
      >
      <Text style={globalStyles.characterDetail} >{item.name} - {item.species}</Text>
      </TouchableOpacity>

      );
    } else {
      return null; // Arama terimine uymayan öğeleri gösterme
    }
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.backContainer}>
      <TouchableOpacity style={globalStyles.backIcon} onPress={handleGoBack}>
      <Image style={styles.imageStyle} source={require('./assets/image/prevpng.png')}></Image>
      </TouchableOpacity>
      </View>
      
      <Text style={globalStyles.heading} >Episode Detail</Text>
      <View>
      <Text style={globalStyles.itemName}>{episodeData.name}</Text>
      <Text style={globalStyles.itemEpisode}>Episode: {episodeData.episode}</Text>
      <Text style={globalStyles.itemAirDate}>Air Date: {episodeData.air_date}</Text>

      <Text style={globalStyles.charactersHeading}>Characters:</Text>
      </View>

      <View style={[styles.searchListContainer, { borderColor: 'black' }]}>
              <Image source={require('./assets/image/search.png')} style={{ width: 24, height: 24, marginLeft: 10, tintColor: 'grey' }} />
              <TextInput
                ref={searchRef}
                placeholder='Search to List'
                placeholderTextColor={'#9E9E9E'}
                style={{ width: '75%', height: 50, color: 'black' }}
                value={search}
                onChangeText={(text) => {
                  //onSearch(text);
                  setSearch(text);
                }}
                autoCapitalize='none'
                autoCorrect={false}
              />
              {search == '' ? null : (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => {
                  searchRef.current.clear();
                  setSearch('');
                }}>
                  <Icon name='close' size={20}  color={'black'} />
                </TouchableOpacity>
              )}
            </View>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex:1,
    padding:16,
  },
  imageStyle: {
    flex: 1,
    width: 32,
    height: 32,
    resizeMode: 'contain'
  },
  searchListContainer: {
    width: '95%', height: 40, borderRadius: 2, borderWidth: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginBottom: 5, backgroundColor: '#EEEEEE',
  },
});


export default EpisodeDetail;
