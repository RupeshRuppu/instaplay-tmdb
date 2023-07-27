import {View, StatusBar, StyleSheet} from 'react-native';
import React from 'react';

const IOS_STATUSBAR_HEIGHT = 60;

const CustomStatusBar = ({backgroundColor, ...restProps}) => {
  return (
    <View style={styles.barStyles}>
      <StatusBar translucent backgroundColor={backgroundColor} {...restProps} />
    </View>
  );
};

export default CustomStatusBar;
const styles = StyleSheet.create({
  barStyles: {
    height: IOS_STATUSBAR_HEIGHT,
    backgroundColor: '#1D2F49',
  },
});
