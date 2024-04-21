import React, {useCallback, useState} from 'react';
import {
  FormError,
  InputView,
  PrimaryButton,
  PrimaryInput,
  Screen,
  TextButton,
} from '../../components';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationStackNavigation} from '../../navigators/StackNavigatorAuthentication.tsx';
import {hideToast, showLoading, showSuccess} from '../../toast/toastApi.ts';
import {scaled} from '../../constants/sizes.ts';

interface forgottenInputs {
  email: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

/**
 * @description screen to display form which contain input fields for email first and after otp request it will show otp, password and confirm password fields.
 */

const Forgotten: React.FC = () => {
  const [action, setAction] = useState('Get OTP');
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    getValues,
  } = useForm<forgottenInputs>({mode: 'onSubmit'});
  const navigation = useNavigation<AuthenticationStackNavigation>();
  /**
   * @description handler which handles the otp mechanism and getting send api request , requesting otp for password reset of mentioned account.show progress with toast.
   */
  const onEmailSubmit = useCallback(
    async (data: forgottenInputs) => {
      showLoading('Confirming Email');
      setAction('Sending...');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: data.email.toLowerCase(),
      });

      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(`${API_URL}/getotp`, requestOptions);
        hideToast();
        if (!response.ok) {
          const result = await response.json();
          setError('email', {
            type: 'Invalid',
            message: result.msg,
          });
          setAction('Get OTP');
          return;
        } else {
          showSuccess('OTP Sent');
          setAction('Reset password');
        }
      } catch (error) {
        hideToast();
        setError('email', {
          type: 'Invalid',
          message: 'Something went wrong!',
        });
        setAction('Get OTP');
      }
    },
    [setError, setAction],
  );
  /**
   * @description handle the password reset functionality request api to verify entered otp and change password . navigate user to login page if everything goes well.
   */
  const onOtpSubmit = useCallback(
    async (data: forgottenInputs) => {
      showLoading('Reseting Password');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: data.email.toLowerCase(),
        newPassword: data.newPassword,
        otp: data.otp,
      });

      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(
          `${API_URL}/getotp/newPassword`,
          requestOptions,
        );
        hideToast();
        if (!response.ok) {
          const result = await response.json();
          setError('confirmPassword', {
            type: 'OTP error',
            message: result.msg,
          });
        } else {
          showSuccess('Password Changed');
          navigation.navigate('Login');
        }
      } catch (error) {
        hideToast();
        setError('confirmPassword', {
          type: 'OTP error',
          message: 'Something went wrong',
        });
      }
    },
    [navigation, setError],
  );

  return (
    <Screen>
      <InputView offset={100}>
        <Text style={styles.selfCenter}>Reset Password</Text>
        {action !== 'Reset password' && (
          <>
            <PrimaryInput
              name={'email'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter your email',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              }}
            />
            <FormError text={errors.email?.message} />
          </>
        )}
        {action === 'Reset password' && (
          <>
            <PrimaryInput
              name={'otp'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter OTP',
                },
                validate: (value: string | any[]) =>
                  value.length === 6 || 'Please enter valid OTP',
              }}
              secure={true}
            />
            <FormError text={errors.otp?.message} />
            <PrimaryInput
              name={'newPassword'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please enter password',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Use strong password',
                },
              }}
            />
            <FormError text={errors.newPassword?.message} />
            <PrimaryInput
              name={'confirmPassword'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please renter password',
                },
                validate: (value: any) =>
                  value === getValues('newPassword') ||
                  'Please enter same password',
              }}
            />
            <FormError text={errors.confirmPassword?.message} />
          </>
        )}
        {action === 'Reset password' && (
          <TextButton
            text={"Doesn't recieve OTP"}
            align={'right'}
            onPress={() => {
              setAction('Get OTP');
            }}
          />
        )}
        <PrimaryButton
          text={action}
          onPress={
            action === 'Get OTP'
              ? handleSubmit(onEmailSubmit)
              : handleSubmit(onOtpSubmit)
          }
        />
      </InputView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: 'center',
    fontSize: scaled(40),
  },
});

export default Forgotten;
