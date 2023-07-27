import {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {LANDSCAPE, PORTRAIT} from '../constants';

const {width, height} = Dimensions.get('window');
const currerntState = width > height ? LANDSCAPE : PORTRAIT;

export default function useOrientation() {
  const [orientation, setOrientation] = useState(currerntState);

  useEffect(() => {
    const eventListener = ({window: {width, height}}) => {
      if (width > height) setOrientation(LANDSCAPE);
      else setOrientation(PORTRAIT);
    };

    const subsriber = Dimensions.addEventListener('change', eventListener);
    return () => {
      subsriber.remove();
    };
  }, []);

  return orientation;
}
