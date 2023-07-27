import {View} from 'react-native';
import AppLogo from '../images/logo.svg';
import CustomStatusBar from './CustomStatusBar';

const AppInterface = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C111B',
      }}>
      <CustomStatusBar backgroundColor="#1D2F49" barStyle="light-content" />
      <AppLogo style={{width: 200, height: 200}} />
    </View>
  );
};

export default AppInterface;
