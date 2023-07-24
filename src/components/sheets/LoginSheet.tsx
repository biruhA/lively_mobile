import React, {useEffect, useState} from 'react';
import {Actionsheet, Stack} from 'native-base';
import {useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';
import {LoginSheetBody} from '../organisms';
import {LoginSheetState, ScreenNames} from '../../constants';

interface Props {
  isOpen: any;
  onClose: any;
  setState: any;
}

export function LoginSheet({isOpen, onClose, setState}: Props) {
  return (
    <Stack bg={colors.pureWhite}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <LoginSheetBody setState={setState} onClose={onClose} />
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
}
