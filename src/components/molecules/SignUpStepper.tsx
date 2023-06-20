import {View, Text} from 'react-native';
import React from 'react';
import {HStack, Progress} from 'native-base';
import {colors} from '../../theme/colors';

interface Props {
  step: number;
}

export function SignUpStepper({step}: Props) {
  return (
    <HStack
      position={'absolute'}
      top={100}
      px={16}
      space={1}
      justifyContent={'center'}>
      {[1, 2, 3, 4, 5]?.map(item => {
        return (
          <Progress
            key={item}
            size={'xs'}
            bg="#E9EAE9"
            _filledTrack={{
              bg: colors.primary,
            }}
            w={'20%'}
            value={item <= step ? 100 : 0}
          />
        );
      })}
    </HStack>
  );
}
