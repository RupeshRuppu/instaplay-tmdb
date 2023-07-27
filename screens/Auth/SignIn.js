import {
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {useRef, useState} from 'react';
import {REQUEST_TOKEN_URL, LOGIN_URL} from '../../constants';
import Spinner from '../../components/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUserContext} from '../../context/UserContext';
import Header from '../../components/Header';

const {width} = Dimensions.get('screen');
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const SignIn = ({navigation}) => {
  const abwUsername = useSharedValue(0);
  const abwPassword = useSharedValue(0);
  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const requestToken = useRef(null);
  const {setToken} = useUserContext();

  async function handleLogin() {
    /* validate username and password. */
    if (username.length < 4) {
      setUserError('Username must contain atleast 4 characters!');
      return;
    }
    if (password.length < 4) {
      setPasswordError('Password must contain atleast 4 characters!');
      return;
    }

    /* make an api call to get logged in */
    setFetching(true);

    const {request_token} = await getRequestToken();
    requestToken.current = request_token;
    if (request_token) sendRequestToLogin();
    if (!requestToken) setFetching(false);
  }

  async function sendRequestToLogin() {
    /* PUT A CALL TO LOGIN AND STORE THE ACCESS TOKEN IN ASYNC STORAGE */

    try {
      const response = await (
        await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            request_token: requestToken.current,
          }),
        })
      ).json();

      if (response.success && response.request_token === requestToken.current) {
        await AsyncStorage.multiSet([
          ['USER_TOKEN', response.request_token],
          ['USER_NAME', username],
        ]);
        setToken(response.request_token);
      } else {
        setError('Please enter valid credentials!');
        setPasswordError('');
      }
    } catch (err) {
      console.log('error', err.message);
    } finally {
      setFetching(false);
    }
  }

  async function getRequestToken() {
    try {
      return await (await fetch(REQUEST_TOKEN_URL)).json();
    } catch (err) {
      console.log('error happened', err.message);
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#0C111B'}}>
        {/* Header part. */}
        <Header />

        {/* form wrapper */}
        <View style={{justifyContent: 'center', flexGrow: 0.7}}>
          <View style={styles.form__wrapper}>
            <View style={{marginBottom: 20}}>
              <Text style={styles.signin}>Sign in</Text>
              <Text style={styles.signin__secondarytext}>
                Sign in to your Self Service Portal
              </Text>
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={styles.label}>Username</Text>
              <AnimatedTextInput
                style={[styles.text__input, {borderWidth: abwUsername}]}
                placeholder="Username"
                placeholderTextColor={'#4F6492'}
                selectionColor={'#FFFFFF'}
                autoCapitalize={`none`}
                onFocus={() => {
                  abwUsername.value = withTiming(1, {duration: 100});
                }}
                onBlur={() => {
                  setError('');
                  setPasswordError('');
                  setUserError('');
                  abwUsername.value = withTiming(0, {duration: 100});
                }}
                onChangeText={str => setUsername(str)}
              />
              {userError && (
                <Text style={styles.usernameError}>{userError}</Text>
              )}
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.label}>Password</Text>
              <AnimatedTextInput
                style={[styles.text__input, {borderWidth: abwPassword}]}
                placeholder="Password"
                placeholderTextColor={'#4F6492'}
                selectionColor={'#FFFFFF'}
                secureTextEntry
                autoCapitalize={`none`}
                onFocus={() =>
                  (abwPassword.value = withTiming(1, {duration: 100}))
                }
                onBlur={() => {
                  setError('');
                  setPasswordError('');
                  setUserError('');
                  abwPassword.value = withTiming(0, {duration: 100});
                }}
                onChangeText={str => setPassword(str)}
              />
              {passwordError && (
                <Text style={styles.passwordError}>{passwordError}</Text>
              )}
            </View>

            {/* SHOW ERROR LOGIN TEXT IF ERROR_STATE=TRUE */}
            {error && <Text style={styles.error__text}>{error}</Text>}

            {/* Login button */}
            <TouchableOpacity
              disabled={fetching}
              onPress={handleLogin}
              activeOpacity={0.7}
              style={[styles.login__button, {opacity: fetching ? 0.5 : 1}]}>
              <Text style={styles.login__button__text}>LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {fetching && <Spinner />}
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  logo__wrapper: {
    backgroundColor: '#263F61',
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  signin: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    lineHeight: 30,
    letterSpacing: 0.4,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  signin__secondarytext: {
    color: '#E0E0E0',
    fontFamily: 'Helvetica Neue',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16.5,
    color: '#E0E0E0',
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.4,
    paddingLeft: 4,
  },
  text__input: {
    width: width * 0.9,
    height: 50,
    backgroundColor: '#182135',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderColor: '#164AB2',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  login__button: {
    backgroundColor: '#FF7D65',
    height: 42,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.31,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    marginTop: 20,
  },
  login__button__text: {
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 14,
    lineHeight: 26,
  },
  form__wrapper: {
    height: 306,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  error__text: {
    textAlign: 'left',
    color: 'tomato',
    letterSpacing: 0.3,
    marginVertical: 2,
  },
  passwordError: {
    textAlign: 'left',
    color: 'tomato',
    letterSpacing: 0.3,
    marginVertical: 2,
    paddingLeft: 4,
    marginVertical: 1,
  },
  usernameError: {
    textAlign: 'left',
    color: 'tomato',
    letterSpacing: 0.3,
    marginVertical: 2,
    paddingLeft: 4,
    marginVertical: 1,
  },
});
