import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useUserContext} from '../context/UserContext';

export default function () {
  const {token} = useUserContext();
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      {!token ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}
