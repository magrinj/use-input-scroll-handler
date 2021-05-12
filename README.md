# react-native-use-input-scroll-handler

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
