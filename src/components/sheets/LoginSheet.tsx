import React, {useCallback} from 'react';
import {Actionsheet, Stack} from 'native-base';
import {useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';
import {LoginSheetBody} from '../organisms';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';

interface Props {
  isOpen: any;
  onClose: any;
  action: any;
  payload: any;
}

export function LoginSheet({isOpen, onClose, action, payload}: Props) {
  return (
    <Stack bg={colors.pureWhite}>
      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        action={action}
        payload={payload}>
        <Actionsheet.Content>
          <LoginSheetBody onClose={onClose} action={action} payload={payload} />
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
}
