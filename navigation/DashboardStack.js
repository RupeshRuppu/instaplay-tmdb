import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/App/Dashboard';
import MovieDetailsView from '../screens/App/MovieDetailsView';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
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
