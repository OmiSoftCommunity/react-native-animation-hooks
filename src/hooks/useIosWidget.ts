import {useEffect} from 'react';
import {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const {CLAMP} = Extrapolation;

const LOOP_ANIMATION = {duration: 10000, easing: Easing.linear};
const PROGRESS_INPUT = [0, 25, 50, 75, 100];
const X_OUTPUT_DEGREES = [5, 5, -5, -5, 5];
const Y_OUTPUT_DEGREES = [-5, 5, 5, -5, -5];

function useIosWidget() {
  const progress = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(100, LOOP_ANIMATION), Infinity);
  }, []);

  useAnimatedReaction(
    () => progress.value,
    data => {
      x.value = interpolate(data, PROGRESS_INPUT, X_OUTPUT_DEGREES, CLAMP);
      y.value = interpolate(data, PROGRESS_INPUT, Y_OUTPUT_DEGREES, CLAMP);
    },
    [progress],
  );

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 600},
        {rotateX: `${x.value}deg`},
        {rotateY: `${y.value}deg`},
      ],
    };
  }, [x, y]);

  return {style};
}

export {useIosWidget};
