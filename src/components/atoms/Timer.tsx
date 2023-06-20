import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '../../theme/colors';

interface Props {
  initTime: number;
  setIsFinished: any;
}

export function Timer({setIsFinished, initTime}: Props) {
  const [time, setTime] = React.useState(initTime);
  const timerRef = React.useRef(time);

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        setIsFinished(true);
      } else {
        setTime(timerRef.current);
        setIsFinished(false);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <View>
      <Text style={styles.notRegistered}>
        {Math.floor(time / 60)} : {time - Math.floor(time / 60) * 60}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notRegistered: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.pureBlack,
  },
});
