# react-native-use-input-scroll-handler

> **This library is deprecated and no longer maintained.** Please use one of the actively maintained alternatives below.

## Alternatives

- **[react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller)** - The modern solution. Native approach with Reanimated support, compatible with Fabric/New Architecture.
- **[react-native-keyboard-aware-scroll-view](https://github.com/JEONG99/react-native-keyboard-aware-scroll-view)** - Drop-in keyboard-aware ScrollView, actively maintained.
- **[KeyboardAwareScrollView (Expo)](https://docs.expo.dev/versions/latest/sdk/keyboard-controller/)** - Built on `react-native-keyboard-controller`, available in Expo SDK 51+.

---

<details>
<summary>Original README (archived)</summary>

<img src="https://user-images.githubusercontent.com/3551795/118034222-bc615280-b337-11eb-944e-6dc0a3631176.gif" width="200">

A react-native hook that handle auto-scroll when input is focused and behind keyboard.

## Installation

```sh
yarn add react-native-use-input-scroll-handler
```

## Usage

```js
import useInputScrollHandler from "react-native-use-input-scroll-handler";

// ...

const { scrollHandler } = useInputScrollHandler();

<ScrollView {...scrollHandler}>
```

## API

Custom options can be passed to this hook.

| **Option**                  | **Type**                         | **Description**                                                                                |
| --------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `ref`                       | `MutableRefObject`               | Use this if you need to use your own scroll view ref.                                          |
| `extraScrollHeight`         | `number`                         | Adds an extra offset to the keyboard. Useful if you want to stick elements above the keyboard. |
| `keyboardOpeningTime`       | `number`                         | Sets the delay time before scrolling to new position, default is 250                           |

## License

MIT

</details>
