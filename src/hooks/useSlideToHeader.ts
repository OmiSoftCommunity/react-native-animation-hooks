import {
  Extrapolation,
  getRelativeCoords,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { CLAMP } = Extrapolation;
const TITLE_HEIGHT = 40;

function useSlideToHeader() {
  const titleRef = useAnimatedRef();
  const headerTitleY = useSharedValue(TITLE_HEIGHT);

  const handler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      const { y: titleY } = contentOffset;
      const { y: relativeY } = getRelativeCoords(titleRef, 0, titleY);

      headerTitleY.value = -relativeY;
    },
  });

  const headerTitleStyle = useAnimatedStyle(() => {
    const { value } = headerTitleY;

    const translateIn = [-TITLE_HEIGHT, 0];
    const translateOut = [0, TITLE_HEIGHT];
    const translateY = interpolate(value, translateIn, translateOut, CLAMP);

    const opacityThreshold = TITLE_HEIGHT / 2;
    const opacity = interpolate(translateY, [0, opacityThreshold], [1, 0]);

    return { transform: [{ translateY }], opacity: opacity };
  });

  const titleStyle = useAnimatedStyle(() => {
    const opacityThreshold = -TITLE_HEIGHT / 2;
    const opacityIn = [TITLE_HEIGHT, opacityThreshold];
    const opacityOut = [1, 0.1];
    const opacity = interpolate(headerTitleY.value, opacityIn, opacityOut);

    return { opacity };
  });

  const style = {
    headerTitle: headerTitleStyle,
    title: titleStyle,
  };

  return { handler, style, titleRef };
}

export default useSlideToHeader;
