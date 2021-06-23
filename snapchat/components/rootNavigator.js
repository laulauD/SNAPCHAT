import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabBar from './TabBar';

const RootNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <TabBar />
    </NavigationContainer>
  );
};

export default RootNavigator;