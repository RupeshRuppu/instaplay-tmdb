import {StyleSheet, View} from 'react-native';
import {Chase} from 'react-native-animated-spinkit';

const Spinner = () => {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Chase size={48} color="#FFF"></Chase>
    </View>
  );
};

export default Spinner;
