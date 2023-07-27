import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounce from '../../hooks/useDebouce';
import {produceSearchUrl} from '../../constants';
import Spinner from '../../components/Spinner';
import MovieCardSearch from '../../components/MovieCardSearch';

const Search = () => {
  const [text, setText] = useState('');
  const debounceValue = useDebounce(text);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    /* put a request to server whenever the debounceValue changes. */

    if (debounceValue) fetchBasedOnSearch(debounceValue);
    else setSearchResults([]);
  }, [debounceValue]);

  async function fetchBasedOnSearch() {
    setLoading(true);
    const url = produceSearchUrl(debounceValue);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setSearchResults(json.results);
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      <View style={styles.container}>
        <View>
          <TextInput
            selectionColor={'white'}
            autoCapitalize="none"
            style={styles.textinput}
            onChangeText={str => setText(str)}
          />
          <Icon
            name="search-outline"
            size={20}
            color={'#4F6492'}
            style={styles.iconStyles}
          />
        </View>

        {searchResults.length ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 40, paddingTop: 20}}>
            {searchResults.map(movie => {
              return <MovieCardSearch key={movie.id} movie={movie} />;
            })}
          </ScrollView>
        ) : !text ? (
          <View style={styles.flexcenter}>
            <Image
              source={require('../../images/search.png')}
              style={styles.searchimage}
            />
            <Text style={styles.searchtext}>Search for movies</Text>
          </View>
        ) : (
          <View style={styles.flexcenter}>
            <Image
              source={require('../../images/nosearch.png')}
              style={styles.searchimage}
            />
            <Text style={styles.searchtext}>No Search found</Text>
          </View>
        )}
      </View>

      {/* Spinner */}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textinput: {
    height: 44,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,.23)',
    backgroundColor: '#182135',
    alignSelf: 'center',
    width: '100%',
    fontSize: 14,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  iconStyles: {
    position: 'absolute',
    right: 16,
    top: 22 - 10,
  },
  searchimage: {
    width: 130,
    height: 145,
  },
  searchtext: {
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 0.3,
  },
  flexcenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
