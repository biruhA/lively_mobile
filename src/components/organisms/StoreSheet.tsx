import React, {useState} from 'react';
import {Actionsheet, Stack} from 'native-base';
import {StoreSheetBody1, StoreSheetBody2} from '../molecules';
import {useAppSelector} from '../../store/hooks';
import {colors} from '../../theme/colors';
import {LoginSheetBody} from './LoginSheetBody';

export enum storeSheetState {
  notLoggedIn = 'notLoggedIn',
  LoggingIn = 'LoggingIn',
  LoggedIn = 'LoggedIn',
}
interface Props {
  isOpen: any;
  onClose: any;
}
export function StoreSheet({isOpen, onClose}: Props) {
  const {token} = useAppSelector(state => state.auth);
  const [state, setState] = useState(
    token ? storeSheetState.LoggedIn : storeSheetState.notLoggedIn,
  );

  function onPress() {
    setState(storeSheetState.LoggingIn);
  }

  return (
    <Stack bg={colors.pureWhite}>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {state === storeSheetState.notLoggedIn && (
            <StoreSheetBody1 onPress={onPress} />
          )}
          {state === storeSheetState.LoggingIn && (
            <LoginSheetBody setState={setState} />
          )}
          {state === storeSheetState.LoggedIn && <StoreSheetBody2 />}
        </Actionsheet.Content>
      </Actionsheet>
    </Stack>
  );
}
