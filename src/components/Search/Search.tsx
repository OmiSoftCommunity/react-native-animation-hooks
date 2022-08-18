import React, { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
} from "react-native";
import styles from "./styles";
import Animated, { FadeIn } from "react-native-reanimated";
import useAnimatedSearch from "~hooks/useAnimatedSearch";

const Search: React.FC = () => {
  const [text, setText] = useState("");
  const search = useAnimatedSearch();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.search, search.style.container]}
        onLayout={search.setInitialContainerWidth}
      >
        <TextInput style={styles.input} onChangeText={setText} />

        {!text && (
          <Animated.Text
            style={[styles.placeholder, search.style.placeholder]}
            entering={FadeIn}
            onLayout={search.setPlaceholderWidth}
          >
            Search
          </Animated.Text>
        )}
      </Animated.View>

      <Animated.View style={[styles.cancel, search.style.cancel]}>
        <TouchableOpacity onPress={Keyboard.dismiss}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Search;
