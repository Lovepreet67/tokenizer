import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';
import {scaled, SIZES, verticalSacled} from '../../constants/sizes.ts';

interface primaryInputProps {
  name: string;
  control: any;
  rules: Object;
  secure?: boolean;
}

/**
 * @description Input form for primay importance forms like login, signupetc.
 * @param name
 * @param control
 * @param rules
 * @param secure
 */
const PrimaryInput: React.FC<primaryInputProps> = ({
  name,
  control,
  rules,
  secure,
}) => {
  return (
    <Controller
      control={control}
      name={name.toString()}
      render={({field: {onChange, value}}) => (
        <TextInput
          placeholder={name}
          autoCapitalize="none"
          value={value}
          autoCorrect={false}
          onChangeText={newValue => onChange(newValue)}
          style={styles.input}
          secureTextEntry={secure}
        />
      )}
      rules={rules}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: SIZES.primaryInput,
    borderWidth: scaled(3),
    borderRadius: scaled(20),
    paddingHorizontal: scaled(10),
    marginHorizontal: scaled(10),
    paddingVertical: verticalSacled(2),
  },
});
export default PrimaryInput;
