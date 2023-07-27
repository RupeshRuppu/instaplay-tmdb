import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/App/Profile';
import {Path, Svg} from 'react-native-svg';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from 'react-native';
import DashboardStack from './DashboardStack';
import SearchStack from './SearchStack';
import useOrientation from '../hooks/useOrientation';
import {LANDSCAPE} from '../constants';
import Header from '../components/Header';

const AppStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const HomeIconSVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="m17.515 7.83-.002-.002L10.171.486A1.646 1.646 0 0 0 8.999 0c-.442 0-.859.172-1.172.485L.49 7.824l-.008.008a1.659 1.659 0 0 0 1.154 2.825h.293v5.404c0 1.069.87 1.939 1.94 1.939H6.74a.527.527 0 0 0 .527-.527v-4.237c0-.488.397-.885.885-.885h1.694c.488 0 .885.397.885.885v4.237c0 .29.236.527.527.527h2.873c1.07 0 1.94-.87 1.94-1.94v-5.403h.271c.443 0 .859-.172 1.172-.485a1.66 1.66 0 0 0 0-2.343Z"
    />
  </Svg>
);

const SearchIconSVG = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      fill={props.fill}
      d="m17.76 16.603-5.578-5.578a6.786 6.786 0 0 0 1.455-4.206A6.826 6.826 0 0 0 6.818 0 6.826 6.826 0 0 0 0 6.818a6.826 6.826 0 0 0 6.818 6.819 6.785 6.785 0 0 0 4.207-1.455l5.578 5.578a.816.816 0 0 0 1.157 0 .818.818 0 0 0 0-1.157ZM1.636 6.818a5.188 5.188 0 0 1 5.182-5.182 5.188 5.188 0 0 1 5.183 5.182 5.188 5.188 0 0 1-5.183 5.183 5.188 5.188 0 0 1-5.182-5.183Z"
    />
  </Svg>
);

function BottomTabs() {
  const orientation = useOrientation();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#26476F',
          display: orientation === LANDSCAPE ? 'none' : 'flex',
        },
        tabBarVisibilityAnimationConfig: {
          hide: orientation === LANDSCAPE,
        },
      }}>
      <Tabs.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIconSVG fill={focused ? '#FFFFFF' : '#89ACD7'} />
          ),
          tabBarLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? '#FFFFFF' : '#89ACD7'}}>Home</Text>
            );
          },
        }}
        name="DashboardStack"
        component={DashboardStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <SearchIconSVG fill={focused ? '#FFFFFF' : '#89ACD7'} />
          ),
          tabBarLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? '#FFFFFF' : '#89ACD7'}}>
                Search
              </Text>
            );
          },
        }}
        name="SearchStack"
        component={SearchStack}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              size={20}
              color={focused ? '#FFFFFF' : '#89ACD7'}
              name="user-circle-o"
            />
          ),
          tabBarLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? '#FFFFFF' : '#89ACD7'}}>
                Profile
              </Text>
            );
          },
        }}
        name="Profile"
        children={props => <Profile {...props} />}
      />
    </Tabs.Navigator>
  );
}

export default function () {
  return (
    <>
      <Header />
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="BottomTabs">
        <AppStack.Screen name="BottomTabs" component={BottomTabs} />
      </AppStack.Navigator>
    </>
  );
}
