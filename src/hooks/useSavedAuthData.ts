import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getProtectedData} from '../util';
import {setAuthData, setIsLoggedIn} from '../store/features/authSlice';
import Context from '../realm/config';
import {OnBoarding} from '../realm/OnBoarding';

const {useQuery} = Context;

export const useSavedAuthData = () => {
  const dispatch = useDispatch();
  const onboarding = useQuery(OnBoarding);

  const getSavedData = async () => {
    const isLoggedIn = onboarding?.[0]?.rememberMe;
    const user = await getProtectedData('user');
    const token = await getProtectedData('token');

    if (isLoggedIn) {
      dispatch(
        setAuthData({
          user,
          token,
        }),
      );
    }
  };

  useEffect(() => {
    if (onboarding?.[0]?.rememberMe === undefined) {
      dispatch(setIsLoggedIn(false));
    } else {
      dispatch(setIsLoggedIn(onboarding?.[0]?.rememberMe));
    }
    getSavedData();
  }, []);
};
