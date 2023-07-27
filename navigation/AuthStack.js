import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/Auth/SignIn';
import {API_KEY} from '../constants';

const AuthStack = createNativeStackNavigator();

export default function () {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
}
