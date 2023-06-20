import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getProtectedData} from '../util';
import {setAuthData} from '../store/features/authSlice';

export const useSavedAuthData = () => {
  const dispatch = useDispatch();

  const getSavedData = async () => {
    const isLoggedIn = await getProtectedData('isLoggedIn');
    const user = await getProtectedData('user');
    const token = await getProtectedData('token');

    if (isLoggedIn) {
      dispatch(
        setAuthData({
          user,
          token,
          isLoggedIn,
        }),
      );
    }
  };

  useEffect(() => {
    getSavedData();
  }, []);
};
