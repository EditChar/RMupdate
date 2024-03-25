import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const [search, setSearch] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    fetchEpisodes('https://rickandmortyapi.com/api/episode');
  }, []);

  const fetchEpisodes = (url) => {
    axios.get(url)
      .then((response) => {
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...response.data.results]);
        setNextPageUrl(response.data.info.next);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPage = async (page) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${page}`);
      const { data, total_pages } = response.data;
      setEpisodes(data);
      setTotalPages(total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching page:', error);
    }
  };

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    // Arama terimi boşsa veya öğe ismi, bölüm veya hava tarihi içeriyorsa gösterir
    if (
      search === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.episode.toLowerCase().includes(search.toLowerCase()) ||
      item.air_date.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <View style={styles.item}>
          <TouchableOpacity style={globalStyles.itemContainer} onPress={() => handleEpisodePress(item.id)}>
            <Image style={style.imagestyle} source={require('../assets/image/RMlogo.png')}></Image>
            <View style={style.viewContainer}>
              <Text style={globalStyles.itemName}>{item.name}</Text>
              <Text style={globalStyles.itemEpisode}>Episode: {item.episode}</Text>
              <Text style={globalStyles.itemAirDate}>Air Date: {item.air_date}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null; // Arama terimine uymayan öğeleri gösterme
    }
  };

  const keyExtractor = (item, index) => index.toString();

  const handleEpisodePress = (episodeId) => {
    navigation.navigate('EpisodeDetail', { episodeId });
  };

  const handleLoadMore = () => {
    if (nextPageUrl) {
      fetchEpisodes(nextPageUrl);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={StyleSheet.absoluteFillObject}
        //blurRadius={3}
        source={require('../assets/image/RMsky.jpg')} />
      <View style={[styles.searchListContainer, { borderColor: 'white' }]}>
              <Image source={require('../assets/image/search.png')} style={{ width: 24, height: 24, marginLeft: 10, tintColor: 'grey' }} />
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
                  <Icon name='close' size={20}  color={'black'}
                    stlye={{}} />
                </TouchableOpacity>
              )}
            </View>

      {isLoading ? <ActivityIndicator /> : (
        <FlatList style={style.container}
          data={episodes}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}


    </SafeAreaView>
  );
};

const style = StyleSheet.create({

  container: {
    marginBottom: 66,
    marginHorizontal:12
  },
  imagestyle: {
    width: 40,
    marginTop: 5,
    flexDirection: 'row'
  }, 
  viewContainer: {
    flexDirection: 'column',
    marginLeft: 6,
  },
  RMbackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:2,
  },
  fontSize: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: .3,
    shadowRadius: 20,
    padding: 10,
  },
  searchListContainer: {
    width: '95%', height: 50, borderRadius: 2, borderWidth: 2, flexDirection: 'row', alignItems: 'center', margin:5, backgroundColor: '#EEEEEE',
  },
})

export default EpisodeList;
