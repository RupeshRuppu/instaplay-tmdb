import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {DASHBOARD_DATA, LANDSCAPE} from '../../constants';
import {useEffect, useRef, useState} from 'react';
import MovieCard from '../../components/MovieCard';
import Spinner from '../../components/Spinner';
import useOrientation from '../../hooks/useOrientation';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('screen');

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const animate = useRef(new Animated.Value(0)).current;
  const orientation = useOrientation();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const response = await (await fetch(DASHBOARD_DATA)).json();
      const {results} = response;

      if (Array.isArray(results)) {
        setData(results);
      }
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0C111B'}}>
      {/* COLLECTION OF MOVIES */}

      <Animated.View
        style={[
          {
            height: 200,
            width,
            position: 'absolute',
            opacity: animate.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: animate.interpolate({
                  inputRange: [0, 400],
                  outputRange: [1, 0.4],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
          }}
          style={[StyleSheet.absoluteFill, {marginBottom: 10, width: '100%'}]}
          resizeMode="cover"
        />
      </Animated.View>

      {/* to get some masked view effect. */}
      <LinearGradient
        colors={['rgba(0,0,0,.2)', '#0C111B', '#0C111B', '#0C111B', '#0C111B']}
        style={{width, height: 100, position: 'absolute', top: 100}}
      />

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animate}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{marginTop: 100}}>
        <View
          style={[
            orientation === LANDSCAPE ? styles.cards__landscape : styles.cards,
          ]}>
          {data.map(movie => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </View>
      </Animated.ScrollView>

      {/* Loader  */}
      {loading && <Spinner />}
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  trending: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 24,
    marginVertical: 10,
    letterSpacing: 0.3,
    paddingLeft: 16,
  },
  cards__landscape: {
    paddingHorizontal: 15,
    marginVertical: 30,
    paddingBottom: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cards: {
    paddingHorizontal: 15,
    marginVertical: 30,
    paddingBottom: 40,
  },
});
