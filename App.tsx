import React from 'react';
import RootNavigator from '~navigation/RootNavigator';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <RootNavigator />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default gestureHandlerRootHOC(App);
