import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { BACK_HIT_AREA, DESCRIPTION, TITLE } from "./config";
import Animated from "react-native-reanimated";
import BackIcon from "~assets/icons/BackIcon";
import SearchIcon from "~assets/icons/SearchIcon";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSlideToHeader from "~hooks/useSlideToHeader";

const SlideToHeader: React.FC = () => {
  const slideToHeader = useSlideToHeader();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const headerStyle = [styles.header, { paddingTop: insets.top + 8 }];

  return (
    <View>
      <Animated.View style={headerStyle}>
        <TouchableOpacity onPress={navigation.goBack} hitSlop={BACK_HIT_AREA}>
          <BackIcon />
        </TouchableOpacity>
        <Animated.View style={slideToHeader.style.headerTitle}>
          <Text style={styles.headerTitle}>{TITLE}</Text>
        </Animated.View>
        <Animated.View>
          <SearchIcon />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={styles.content}
        onScroll={slideToHeader.handler}
      >
        <Animated.Text
          ref={slideToHeader.titleRef}
          style={[styles.title, slideToHeader.style.title]}
        >
          {TITLE}
        </Animated.Text>
        <Text style={styles.description}>{DESCRIPTION}</Text>
      </Animated.ScrollView>
    </View>
  );
};

export default SlideToHeader;
