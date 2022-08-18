import React from "react";
import RootNavigator from "~navigation/RootNavigator";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
};

export default App;
