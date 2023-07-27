import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetailsView from '../screens/App/MovieDetailsView';
import Search from '../screens/App/Search';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          animationDuration: 800,
        }}
        name="MovieDetailsView"
        component={MovieDetailsView}
      />
    </Stack.Navigator>
  );
}
