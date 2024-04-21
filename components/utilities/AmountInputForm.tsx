import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {scaled, SIZES, verticalSacled} from '../../constants/sizes.ts';
import {COLORS} from '../../constants/colors.ts';

interface formData {
  amount: number;
}

interface amountInputFormProps {
  handler: (
    data: formData,
  ) => Promise<{type: string; message: string} | undefined>;
}

/**
 * @description It is an input form which takes number as input and verify if its valid amount and display errors it any.
 * Also contain the submit button which will use handler passed as a prop to it.
 * @param handler
 */
const AmountInputForm: React.FC<amountInputFormProps> = ({handler}) => {
  const {
    handleSubmit,
    formState: {errors},
    control,
    setError,
  } = useForm<formData>({mode: 'onSubmit'});
  const onSubmit = useCallback(
    async (data: formData) => {
      const error = await handler(data);
      if (error) {
        setError('amount', error);
      }
    },
    [handler, setError],
  );
  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Controller
          control={control}
          name="amount"
          render={({field: {onChange}}) => (
            <TextInput
              placeholder="Amount"
              keyboardType={'number-pad'}
              onChangeText={currentValue => onChange(currentValue)}
              style={styles.input}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Please enter Amount',
            },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Enter Valid Amount',
            },
          }}
        />
        {errors.amount && (
          <Text style={styles.inputBoxError}>{errors.amount.message}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleSubmit(onSubmit)}>
        <Image
          source={require('../../resources/png/back_arrow.png')} // You need to provide the image source
          style={{
            width: 30,
            height: 30,
            // resizeMode: 'contain',
            transform: [{rotate: '180deg'}],
            marginRight: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 8,
  },
  payButton: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalSacled(55),
  },
  payButtonText: {
    backgroundColor: '#fff',
    fontSize: scaled(45),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: scaled(2),
    borderColor: 'black',
    width: '100%',
    fontSize: 24,
    borderRadius: 24,
    paddingHorizontal: 10,
  },
  inputBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '75%',
    marginHorizontal: 7,
  },
  inputBoxError: {
    backgroundColor: '#fff',
    color: COLORS.error,
    fontSize: SIZES.error,
    fontWeight: '400',
  },
});

export default AmountInputForm;
