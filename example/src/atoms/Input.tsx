import React, { ComponentProps } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 8,
  },
});

interface Props extends ComponentProps<typeof TextInput> {}

const Input = ({ style, ...rest }: Props) => (
  <TextInput {...rest} style={[styles.input, style]} />
);

export default Input;
