import {
  interpolate,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Keyboard, LayoutChangeEvent } from "react-native";
import { ANDROID_DEVICE, IOS_DEVICE } from "~config/device";

const CONTAINER_MIN_WIDTH_PERCENT = 75;

enum KeyboardState {
  Closed,
  Open,
}

const { Closed, Open } = KeyboardState;

function useAnimatedSearch() {
  const initialContainerWidth = useSharedValue(0);
  const placeholderWidth = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);

  const keyboardState = useDerivedValue(() => {
    const input = [-keyboardHeight.value, Math.abs(keyboardHeight.value)];

    return interpolate(keyboardHeight.value, input, [Closed, Open]);
  }, [keyboardHeight]);

  const containerWidth = useDerivedValue(() => {
    const output = [100, CONTAINER_MIN_WIDTH_PERCENT];
    const width = interpolate(keyboardState.value, [Closed, Open], output);

    return withTiming(width);
  }, [keyboardState]);

  const setInitialContainerWidth = ({ nativeEvent }: LayoutChangeEvent) => {
    runOnUI((value) => {
      initialContainerWidth.value = value;
    })(nativeEvent.layout.width);
  };

  const setPlaceholderWidth = ({ nativeEvent }: LayoutChangeEvent) => {
    runOnUI((value) => {
      placeholderWidth.value = value;
    })(nativeEvent.layout.width);
  };

  const setKeyboardHeight = (height: number) => {
    keyboardHeight.value = height;
  };

  useEffect(() => {
    if (IOS_DEVICE) {
      const event = Keyboard.addListener("keyboardWillChangeFrame", (evt) => {
        const { screenY: startY } = evt.startCoordinates;
        const { screenY: endY } = evt.endCoordinates;

        runOnUI(setKeyboardHeight)(startY - endY);
      });

      return () => {
        Keyboard.removeListener(event);
      };
    }
  }, []);

  useEffect(() => {
    if (ANDROID_DEVICE) {
      const didShowEvent = Keyboard.addListener("keyboardDidShow", (evt) => {
        const { screenY: endY } = evt.endCoordinates;

        runOnUI(setKeyboardHeight)(endY);
      });
      const didHideEvent = Keyboard.addListener("keyboardDidHide", (evt) => {
        const { screenY: endY } = evt.endCoordinates;

        runOnUI(setKeyboardHeight)(-endY);
      });

      return () => {
        Keyboard.removeListener(didShowEvent);
        Keyboard.removeListener(didHideEvent);
      };
    }
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    width: `${containerWidth.value}%`,
  }));

  const placeholderStyle = useAnimatedStyle(() => {
    const containerCenter = -(initialContainerWidth.value / 2);
    const placeholderCenter = placeholderWidth.value / 2;
    const paddingLeft = IOS_DEVICE ? 16 : 22;
    const input = [100, CONTAINER_MIN_WIDTH_PERCENT];
    const output = [0, containerCenter + placeholderCenter + paddingLeft];

    const translateX = interpolate(containerWidth.value, input, output);

    return { transform: [{ translateX }] };
  });

  const cancelStyle = useAnimatedStyle(() => {
    const input = [100, CONTAINER_MIN_WIDTH_PERCENT];
    const opacity = interpolate(containerWidth.value, input, [0, 1]);

    return { opacity };
  });

  const style = {
    container: containerStyle,
    placeholder: placeholderStyle,
    cancel: cancelStyle,
  };

  return { style, setInitialContainerWidth, setPlaceholderWidth };
}

export default useAnimatedSearch;
