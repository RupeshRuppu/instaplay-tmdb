import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import {getMovieDataUrl, getVideoDataUrl} from '../../constants';
import {useEffect, useRef, useState} from 'react';
import Spinner from '../../components/Spinner';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, {Mask, Path, G} from 'react-native-svg';
import YoutubeIframe from 'react-native-youtube-iframe';

const {width} = Dimensions.get('screen');

const MovieDetailsView = ({route, navigation}) => {
  const params = route.params;
  const URL = getMovieDataUrl(params.id);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const animateHeader = useSharedValue(0);
  const videoRef = useRef(null);
  const opacity = useAnimatedStyle(() => {
    return {
      opacity: animateHeader.value,
    };
  });

  useEffect(() => {
    fetchMovieData();
    animateHeader.value = withTiming(1, {duration: 1500});
    setTimeout(() => {
      fetchVideoTrailerKey(params.id);
    }, 1000);
  }, []);

  async function fetchMovieData() {
    setLoading(true);
    try {
      const resObj = await (await fetch(URL)).json();
      setMovie(resObj);
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchVideoTrailerKey() {
    const URL = getVideoDataUrl(params.id);
    setLoading(true);
    try {
      const {results: resObj} = await (await fetch(URL)).json();
      const trailerObject = resObj.find(obj => obj.type === 'Trailer');
      let key;
      if (trailerObject) {
        key = trailerObject.key;
        setVideoLink(key);
      }
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      {/* if videoLink is fetched show the video CMP else show the shared element image . */}
      <View>
        {!videoLink ? (
          <Animated.Image
            sharedTransitionTag={`image-element-shared-${params.id}`}
            source={{uri: params.uri}}
            style={{height: 200}}
          />
        ) : (
          <YoutubeIframe play ref={videoRef} videoId={videoLink} height={220} />
        )}

        <Animated.View
          style={[{position: 'absolute', top: 10, left: 10}, opacity]}>
          <Icon
            name="arrow-back"
            size={24}
            color={'#FFFFFF'}
            onPress={() => navigation.goBack()}
          />
        </Animated.View>
      </View>
      {movie && (
        <Animated.View
          style={[
            {
              paddingHorizontal: 14,
              marginVertical: 20,
              gap: 10,
            },
            opacity,
          ]}>
          <Text style={styles.movie__title}>{movie.title}</Text>
          <Text style={styles.rating}>
            Rating: {(movie.vote_average / 2).toFixed(1)} / {5}
          </Text>
          <Text numberOfLines={6} style={styles.overview}>
            {movie.overview}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{flex: 0.5, color: '#FFFFFF', letterSpacing: 0.3}}>
              Release Date
            </Text>
            <Text style={[styles.release_date, {flex: 0.5}]}>
              {movie.release_date}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Text style={{flex: 0.5, color: '#FFFFFF', letterSpacing: 0.3}}>
              Orginal Language
            </Text>
            <Text style={[styles.release_date, {flex: 0.5}]}>
              {movie.spoken_languages
                .reduce((acc, item) => (acc += item.english_name + ','), '')
                .slice(0, -1)}
            </Text>
          </View>
        </Animated.View>
      )}
      {/* Spinner */}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default MovieDetailsView;

const styles = StyleSheet.create({
  volume_resize: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movie__title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
  rating: {color: '#FFFFFF', fontWeight: '400', fontSize: 16},
  overview: {fontSize: 16, lineHeight: 24, color: '#FFFFFF', opacity: 0.7},
  release_date: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },
  soundIcon: {position: 'absolute', top: 84, left: width / 2 - 16},
});
