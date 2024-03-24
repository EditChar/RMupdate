
import { StyleSheet } from 'react-native';



const globalStyles = StyleSheet.create({
  // Genel stil tanımlarını burada yapabilirsiniz.
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color : 'black'
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color:'black'
  },
  itemEpisode: {
    fontSize: 16,
    color: '#888',
  },
  itemAirDate: {
    fontSize: 16,
    color: '#888',
  },
  charactersHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black'
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#50C2F5',
    borderRadius: 24,
    opacity: .9,

  },
  characterDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'stretch',
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color : 'black'
  },
  characterSpecies: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,

  },
  characterStatus: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 10,
  },
  characterLocation: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#888',

  },
  backIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  backContainer: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row'
  },
});

export default globalStyles;
