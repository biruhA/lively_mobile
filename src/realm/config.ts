import {createRealmContext} from '@realm/react';
import {OnBoarding} from './OnBoarding';

const config = {
  schema: [OnBoarding],
};
export default createRealmContext(config);
