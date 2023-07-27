import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import Animated from 'react-native-reanimated';

export const URL_PREFIX = 'https://image.tmdb.org/t/p/original/';

const MovieCard = ({
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
        style={{height: 150, width: '100%'}}
        resizeMode="cover"
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
            size={20}
            color={'#FFE234'}
            style={{marginRight: 10}}
          />
          <Text style={{color: '#B3B3B3', fontWeight: '500', fontSize: 14}}>
            {(vote_average / 2).toFixed(1)} / {5}
          </Text>
        </View>

        <LinearGradient
          colors={['#FF9966', '#FF5E62']}
          style={styles.linear__gradient}>
          <Icon name="controller-play" size={18} color={'#FFFFFF'} />
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MovieCard;
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
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    width: 280,
  },
  icon__rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  touchableopacity: {
    height: 210,
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

/*

https://www.youtube.com/watch?v=O6P86uwfdR0&pp=ygUWd2ViIGRldiB1c2Ugc3RhdGUgaG9vaw%3D%3D

*/
