import React, {useCallback} from 'react';
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
import {useDispatch} from 'react-redux';
import {addUser} from '../../redux/user/userSlice.ts';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {AuthenticationStackNavigation} from '../../navigators/StackNavigatorAuthentication.tsx';
import {hideToast, showLoading, showSuccess} from '../../toast/toastApi.ts';
import {scaled} from '../../constants/sizes.ts';

interface signupFormInputs {
  username: string;
  password: string;
  email: string;
  fullname: string;
}

/**
 * @description Screen to show the signup fields to the user include email, fullname, username, password.
 * both email and username needed to be unique, and password must satisfy some strength protocol.
 */
const Signup: React.FC = () => {
  const navigation = useNavigation<AuthenticationStackNavigation>();
  const dispatch = useDispatch<any>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<signupFormInputs>({mode: 'onSubmit'});

  /**
   * @description Handler to handle the signup action. send data to the api which verifies for constraint .
   * show progress with the help of toast.
   */
  const onSubmit = useCallback(
    async (data: signupFormInputs) => {
      showLoading('Signing Up');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        name: data.fullname.toLowerCase(),
        password: data.password,
        userName: data.username,
        email: data.email.toLowerCase(),
      });
      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(`${API_URL}/signup`, requestOptions);
        const result = await response.json();
        hideToast();
        if (result.token) {
          dispatch(addUser({username: data.username, jwt: result.token}));
          showSuccess('Signed up');
        } else if (result.error && result.error.code === 'P2002') {
          if (result.error.meta.target === 'User_email_key') {
            setError('email', {
              type: 'unique constraint',
              message: 'Email already in use',
            });
          } else if (result.error.meta.target === 'User_userName_key') {
            setError('username', {
              type: 'unique constraint',
              message: 'userName already in use',
            });
          } else {
            throw result.error;
          }
        }
      } catch {
        hideToast();
        setError('root', {type: 'unknown', message: 'Try again later'});
      }
    },
    [dispatch, setError],
  );

  return (
    <Screen>
      <InputView offset={70}>
        <Text style={styles.selfCenter}>Tokenizer</Text>
        <PrimaryInput
          name={'fullname'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please enter fullname',
            },
          }}
        />
        <FormError text={errors.fullname?.message} />
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
        <PrimaryInput
          name={'username'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please enter your username',
            },
          }}
        />
        <FormError text={errors.username?.message} />
        <PrimaryInput
          name={'password'}
          control={control}
          secure={true}
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
        <FormError text={errors.password?.message} />
        {errors.root && <FormError text={errors.root?.message} />}
        <TextButton
          text={'Already have account'}
          align={'right'}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <PrimaryButton text={'Signup'} onPress={handleSubmit(onSubmit)} />
      </InputView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: 'center',
    fontSize: scaled(40),
    fontFamily:'roboto'
  },
});

export default Signup;
