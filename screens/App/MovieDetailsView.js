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
          <YoutubeIframe
            play
            ref={videoRef}
            videoId={videoLink}
            height={'100%'}
          />
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

        {/* {videoLink && (
          <Animated.View style={[opacity, styles.soundIcon]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setPlay(p => !p)}>
              {play ? (
                <Icon
                  name="pause-circle-outline"
                  size={38}
                  color={'#FFF'}
                  style={{top: -2, left: -2}}
                />
              ) : (
                <PlaySVG />
              )}
            </TouchableOpacity>
          </Animated.View>
        )} */}

        {/* {videoLink && (
          <Animated.View style={[styles.volume_resize, opacity]}>
            <Icon
              name="resize"
              size={24}
              color={'#FFFFFF'}
              onPress={() => console.log('resize icon')}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => console.log('sound icons')}>
              <SoundSVG />
            </TouchableOpacity>
          </Animated.View>
        )} */}
      </View>
      {movie && (
        <Animated.View
          style={[
            {paddingHorizontal: 14, marginVertical: 20, gap: 10},
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

const SoundSVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={-3}
      y={-3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="#D9D9D9" d="M-3-3h24v24H-3z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#fff"
        d="M12.35 17.3a.888.888 0 0 1-.925-.125c-.283-.217-.425-.517-.425-.9 0-.183.054-.346.162-.488a.958.958 0 0 1 .413-.312 6.972 6.972 0 0 0 3.213-2.55C15.595 11.758 16 10.442 16 8.975s-.404-2.783-1.213-3.95a6.972 6.972 0 0 0-3.212-2.55.838.838 0 0 1-.425-.325.882.882 0 0 1-.15-.5c0-.367.142-.658.425-.875A.888.888 0 0 1 12.35.65a8.904 8.904 0 0 1 4.1 3.275c1.033 1.5 1.55 3.183 1.55 5.05s-.517 3.55-1.55 5.05a8.904 8.904 0 0 1-4.1 3.275ZM1 12a.967.967 0 0 1-.713-.288A.967.967 0 0 1 0 11V7c0-.283.096-.52.287-.713A.968.968 0 0 1 1 6h3l3.3-3.3c.317-.317.68-.388 1.087-.213.409.175.613.488.613.938v11.15c0 .45-.204.762-.613.937-.408.175-.77.105-1.087-.212L4 12H1Zm10 1V4.95c.75.35 1.354.892 1.813 1.625.458.733.687 1.542.687 2.425 0 .883-.23 1.683-.688 2.4A4.251 4.251 0 0 1 11 13ZM7 5.85 4.85 8H2v2h2.85L7 12.15v-6.3Z"
      />
    </G>
  </Svg>
);

const PlaySVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="m13.84 22.148 7.8-4.926c.373-.237.56-.565.56-.986 0-.42-.187-.748-.56-.985l-7.8-4.926c-.4-.263-.807-.282-1.22-.059-.413.223-.62.571-.62 1.044v9.853c0 .473.207.82.62 1.044.413.223.82.203 1.22-.06ZM16 32c-2.213 0-4.293-.414-6.24-1.241-1.947-.828-3.64-1.951-5.08-3.37a15.91 15.91 0 0 1-3.42-5.005C.42 20.466 0 18.417 0 16.236c0-2.18.42-4.23 1.26-6.147a15.908 15.908 0 0 1 3.42-5.005c1.44-1.419 3.133-2.542 5.08-3.37C11.707.887 13.787.473 16 .473s4.293.414 6.24 1.241c1.947.828 3.64 1.951 5.08 3.37a15.908 15.908 0 0 1 3.42 5.005c.84 1.918 1.26 3.967 1.26 6.147 0 2.181-.42 4.23-1.26 6.148a15.91 15.91 0 0 1-3.42 5.005c-1.44 1.419-3.133 2.542-5.08 3.37C20.293 31.586 18.213 32 16 32Zm0-3.153c3.573 0 6.6-1.221 9.08-3.665 2.48-2.443 3.72-5.425 3.72-8.946 0-3.52-1.24-6.502-3.72-8.945C22.6 4.847 19.573 3.626 16 3.626c-3.573 0-6.6 1.221-9.08 3.665-2.48 2.443-3.72 5.425-3.72 8.945 0 3.521 1.24 6.503 3.72 8.946 2.48 2.444 5.507 3.665 9.08 3.665Z"
    />
  </Svg>
);

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
