import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {G, Mask, Path, Svg} from 'react-native-svg';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useUserContext} from '../../context/UserContext';

const LogoutIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#040508"
        d="M15.325 16.275a1.11 1.11 0 0 1-.275-.737c0-.276.092-.505.275-.688l1.85-1.85H10a.967.967 0 0 1-.713-.287A.968.968 0 0 1 9 12c0-.283.096-.52.287-.713A.967.967 0 0 1 10 11h7.175l-1.85-1.85c-.2-.2-.3-.438-.3-.713 0-.274.1-.512.3-.712.183-.2.413-.3.688-.3.274 0 .504.092.687.275l3.6 3.6c.1.1.17.208.212.325.042.117.063.242.063.375s-.02.258-.063.375a.877.877 0 0 1-.212.325l-3.6 3.6c-.217.217-.454.313-.712.287a1.054 1.054 0 0 1-.663-.312ZM5 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 3 19V5c0-.55.196-1.02.587-1.413A1.926 1.926 0 0 1 5 3h6c.283 0 .52.096.713.288.191.191.287.429.287.712s-.096.52-.287.713A.968.968 0 0 1 11 5H5v14h6c.283 0 .52.096.713.288.191.191.287.429.287.712s-.096.52-.287.712A.968.968 0 0 1 11 21H5Z"
      />
    </G>
  </Svg>
);

const Profile = () => {
  const [user, setUser] = useState('');
  const firstChar = user?.at(0)?.toUpperCase();
  const animated = useSharedValue(0);
  const {setToken} = useUserContext();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animated.value,
        [0, 1],
        ['transparent', 'rgba(0,0,0,.45)'],
      ),
      zIndex: interpolate(animated.value, [0, 1], [-1, 2]),
    };
  });

  const animatedBoxStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: interpolate(animated.value, [0, 1], [0, 1])}],
    };
  });

  const profileBoxAnimStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: interpolate(animated.value, [0, 1], [0, 130])}],
    };
  });

  useEffect(() => {
    (async () => {
      const username = await AsyncStorage.getItem('USER_NAME');
      setUser(username);
    })();
  }, []);

  async function handleLogout() {
    /* CLEAR ASYNC STORGE AND UPDATE USER STATE IN USER-CONTEXT */

    try {
      await AsyncStorage.clear();
      setToken(null);
    } catch (err) {
      console.log('error while clearing async storage', err.message);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View style={[styles.profile_box, profileBoxAnimStyles]}>
        <View style={styles.end__container}>
          <View style={styles.top}>
            <View style={styles.circleWrapper}>
              <Text>{firstChar}</Text>
            </View>
            <Text style={styles.username}>
              {firstChar}
              {user.slice(1)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              animated.value = withSpring(1, {duration: 300});
            }}
            activeOpacity={0.6}
            style={styles.bottom}>
            <LogoutIcon />
            <Text style={styles.logouttext}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableWithoutFeedback
        onPress={() => {
          animated.value = withSpring(0, {duration: 300});
        }}
        style={styles.modal}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.animatedView,
            animatedStyles,
          ]}>
          <Animated.View style={[styles.box, animatedBoxStyles]}>
            <Text style={styles.logouttext}>Are you sure want to logout?</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                onPress={() => {
                  animated.value = withSpring(0, {duration: 300});
                }}
                activeOpacity={0.6}
                style={styles.button}>
                <Text>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.6}
                style={styles.button}>
                <LinearGradient
                  colors={['#FF9966', '#FF5E62']}
                  style={styles.button}>
                  <Text>Yes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  end__container: {
    height: 128,
    backgroundColor: 'red',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#DDE1EE',
    overflow: 'hidden',
  },
  top: {
    height: 56,
    backgroundColor: '#BBC4DD',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottom: {
    height: 72,
    padding: 24,
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleWrapper: {
    width: 32,
    height: 32,
    backgroundColor: '#AC9FC6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    color: '#040508',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    marginLeft: 16,
  },
  logouttext: {
    color: '#040508',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
  },
  animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 250,
    height: 122,
    gap: 16,
    borderRadius: 8,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 37,
    width: 93,
    borderWidth: 1,
    borderColor: '#FF9966',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_box: {flex: 1, justifyContent: 'flex-end'},
});
