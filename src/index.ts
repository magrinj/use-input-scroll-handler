import { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  UIManager,
  findNodeHandle,
  Keyboard,
  KeyboardEventName,
  KeyboardEventListener,
  NativeSyntheticEvent,
  NativeScrollEvent,
  NativeScrollPoint,
  Platform,
  TextInput,
  useWindowDimensions,
} from 'react-native';

import { useLayout } from './utils/useLayout';

const _keyboardWillShow: KeyboardEventName = Platform.select({
  ios: 'keyboardWillShow',
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});
const _keyboardWillHide: KeyboardEventName = Platform.select({
  ios: 'keyboardWillHide',
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

export interface Options {
  extraScrollHeight?: number;
  keyboardOpeningTime?: number;
}

export default function useInputScrollHandler(options: Options = {}) {
  // Refs
  const ref = useRef<ScrollView>(null);
  const offset = useRef<NativeScrollPoint>();

  // Window
  const screen = useWindowDimensions();

  // Layout
  const { onLayout, ...layout } = useLayout();

  // Variables
  const extraScrollHeight = options?.extraScrollHeight ?? 0;
  const keyboardOpeningTime = options?.keyboardOpeningTime ?? 250;
  const bottomSpace = screen.height - (layout.y + layout.height);

  // States
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  // Functions
  const getScrollResponder = () => {
    const responder = (ref.current?.getScrollResponder() as unknown) as ScrollView;

    return responder;
  };

  const scrollToFocusedInput = (reactNode: any) => {
    setTimeout(() => {
      const responder = getScrollResponder();

      responder &&
        responder.scrollResponderScrollNativeHandleToKeyboard(
          reactNode,
          extraScrollHeight,
          true
        );
    }, keyboardOpeningTime);
  };

  const scrollToFocusedInputWithNodeHandle = (nodeID: number) => {
    const reactNode = findNodeHandle(nodeID);

    scrollToFocusedInput(reactNode);
  };

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    offset.current = e.nativeEvent.contentOffset;
  };

  const handleUpdateKeyboardSpace: KeyboardEventListener = (e) => {
    // @ts-ignore
    const currentlyFocusedField = TextInput.State.currentlyFocusedInput
      ? // @ts-ignore
        findNodeHandle(TextInput.State.currentlyFocusedInput())
      : TextInput.State.currentlyFocusedField();
    const responder = getScrollResponder();

    setKeyboardSpace(
      e.endCoordinates.height + (options.extraScrollHeight ?? 0) - bottomSpace
    );

    if (!currentlyFocusedField || !responder) {
      return;
    }

    // @ts-ignore
    UIManager.viewIsDescendantOf(
      currentlyFocusedField,
      responder.getInnerViewNode(),
      (isAncestor: boolean) => {
        if (isAncestor) {
          UIManager.measureInWindow(
            currentlyFocusedField,
            (_x: number, y: number, _width: number, height: number) => {
              const textInputBottomPosition = y + height;
              const keyboardPosition = e.endCoordinates.screenY;
              const totalExtraHeight = options.extraScrollHeight ?? 0;

              if (Platform.OS === 'ios') {
                if (
                  textInputBottomPosition >
                  keyboardPosition - totalExtraHeight
                ) {
                  scrollToFocusedInputWithNodeHandle(currentlyFocusedField);
                }
              } else {
                responder.scrollTo({
                  y: (offset.current?.y ?? 0) + extraScrollHeight,
                  animated: true,
                });
              }
            }
          );
        }
      }
    );
  };

  const handleResetKeyboardSpace: KeyboardEventListener = () => {
    setKeyboardSpace(0);
  };

  // Effects
  useEffect(() => {
    Keyboard.addListener(_keyboardWillShow, handleUpdateKeyboardSpace);
    Keyboard.addListener(_keyboardWillHide, handleResetKeyboardSpace);

    return () => {
      Keyboard.removeListener(_keyboardWillShow, handleUpdateKeyboardSpace);
      Keyboard.removeListener(_keyboardWillHide, handleResetKeyboardSpace);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    scrollHandler: {
      ref,
      contentContainerStyle: { paddingBottom: keyboardSpace },
      onScroll: handleOnScroll,
      scrollEventThrottle: 16,
      onLayout,
    },
    keyboardSpace,
  };
}
