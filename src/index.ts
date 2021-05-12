import { useRef, useEffect, useState, MutableRefObject } from 'react';
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
  ref?: MutableRefObject<ScrollView>;
  extraScrollHeight?: number;
  keyboardOpeningTime?: number;
}

export default function useInputScrollHandler(options: Options = {}) {
  // Refs
  const ref = useRef<ScrollView>(options.ref?.current ?? null);
  const offset = useRef<NativeScrollPoint>();
  const handledOffset = useRef<NativeScrollPoint>();

  // Window
  const screen = useWindowDimensions();

  // Variables
  const extraScrollHeight = options?.extraScrollHeight ?? 0;
  const keyboardOpeningTime = options?.keyboardOpeningTime ?? 250;

  // States
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  // Functions
  const getScrollResponder = () => {
    const responder = (ref.current?.getScrollResponder() as unknown) as ScrollView;

    return responder;
  };

  const scrollToFocusedInput = (reactNode: any, additionalOffset: number) => {
    setTimeout(() => {
      const responder = getScrollResponder();

      responder &&
        responder.scrollResponderScrollNativeHandleToKeyboard(
          reactNode,
          additionalOffset + extraScrollHeight,
          false
        );
    }, keyboardOpeningTime);
  };

  const scrollToFocusedInputWithNodeHandle = (
    nodeID: number,
    additionalOffset: number
  ) => {
    const reactNode = findNodeHandle(nodeID);

    scrollToFocusedInput(reactNode, additionalOffset);
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

    if (!currentlyFocusedField || !responder) {
      return;
    }

    handledOffset.current = offset.current;

    // Calculate scroll view position
    UIManager.measure(
      responder.getScrollableNode(),
      (
        _scrollX: number,
        _scrollY: number,
        _scrollWidth: number,
        scrollHeight: number,
        _scrollPageX: number,
        scrollPageY: number
      ) => {
        const bottomSpace = screen.height - (scrollPageY + scrollHeight);

        setKeyboardSpace(
          e.endCoordinates.height + extraScrollHeight - bottomSpace
        );

        // @ts-ignore
        UIManager.viewIsDescendantOf(
          currentlyFocusedField,
          responder.getInnerViewNode(),
          (isAncestor: boolean) => {
            if (!isAncestor) {
              return;
            }

            UIManager.measureInWindow(
              currentlyFocusedField,
              (
                _inputX: number,
                inputY: number,
                _inputWidth: number,
                inputHeight: number
              ) => {
                const textInputBottomPosition = inputY + inputHeight;
                const keyboardPosition = e.endCoordinates.screenY;
                const totalExtraHeight = extraScrollHeight;

                if (Platform.OS === 'ios') {
                  if (
                    textInputBottomPosition >
                    keyboardPosition - totalExtraHeight
                  ) {
                    scrollToFocusedInputWithNodeHandle(
                      currentlyFocusedField,
                      scrollPageY
                    );
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
        );
      }
    );
  };

  const handleResetKeyboardSpace: KeyboardEventListener = () => {
    setKeyboardSpace(0);

    if (handledOffset.current) {
      const responder = getScrollResponder();

      responder.scrollTo({
        x: handledOffset.current.x,
        y: handledOffset.current.y,
        animated: true,
      });
    }
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
    },
    keyboardSpace,
  };
}
