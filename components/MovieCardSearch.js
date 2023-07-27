import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
export const URL_PREFIX = 'https://image.tmdb.org/t/p/original/';
import Animated from 'react-native-reanimated';

const MovieCardSearch = ({
  movie: {
    id,
    backdrop_path,
    title,
    poster_path,
    vote_average,
    vote_count,
    release_date,
  },
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDetailsView', {
          id,
          uri: `${URL_PREFIX}${poster_path}`,
        })
      }
      activeOpacity={0.7}
      style={styles.touchableopacity}>
      <Animated.Image
        sharedTransitionTag={`image-element-shared-${id}`}
        source={{uri: `${URL_PREFIX}${poster_path}`}}
        style={{width: '44%'}}
        resizeMode="center"
      />
      <LinearGradient
        colors={['#0F182A', '#003675']}
        style={styles.bottom__container}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.icon__rating}>
          <Icon
            name="star"
            size={16}
            color={'#FFE234'}
            style={{marginRight: 10}}
          />
          <Text style={{color: '#B3B3B3', fontWeight: '500', fontSize: 14}}>
            {(vote_average / 2).toFixed(1)} / {5}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MovieCardSearch;
const styles = StyleSheet.create({
  linear__gradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top: 14,
  },
  bottom__container: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 0.4,
    width: '60%',
  },
  icon__rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  touchableopacity: {
    height: 80,
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
});
