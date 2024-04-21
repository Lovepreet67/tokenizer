import React, {useCallback} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  FormError,
  InputView,
  PrimaryButton,
  PrimaryInput,
  Screen,
  TextButton,
} from '../../components';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {addUser} from '../../redux/user/userSlice.ts';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import {type AuthenticationStackNavigation} from '../../navigators/StackNavigatorAuthentication.tsx';
import Toast from 'react-native-toast-message';
import {showLoading, showSuccess} from '../../toast/toastApi.ts';
import {scaled} from '../../constants/sizes.ts';

type LoginFormInputs = {
  username: string;
  password: string;
};

/**
 * @description Screen to show login fields to the user , display input for the username and password, login button and text button to handle forgotten password, signup screen.
 */

const Login: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<AuthenticationStackNavigation>();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginFormInputs>({mode: 'onSubmit'});
  /**
   * @description request api to verify user and send the JWT
   */
  const onSubmit = useCallback(
    async (data: LoginFormInputs) => {
      showLoading('Logging In');
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        userName: data.username,
        password: data.password,
      });
      const requestOptions: RequestInit = {
        method: 'POST',
        headers,
        body: raw,
        redirect: 'follow',
      };
      try {
        const response = await fetch(`${API_URL}/login`, requestOptions);
        console.log(response);
        if (!response.ok) {
          Toast.hide();
          setError('root', {
            type: 'authentication',
            message: 'Invalid username or password',
          });
          return;
        }
        const result = await response.json();
        dispatch(
          addUser({
            jwt: result.token.toString(),
            username: result.username.toString(),
          }),
        );
        showSuccess('Logged In');
      } catch (error) {
        console.log(error);
        setError('root', {
          type: 'local',
          message: 'unable to access local storage',
        });
      }
    },
    [dispatch, setError],
  );
  return (
    <Screen>
      <InputView offset={70}>
        <Text style={styles.selfCenter}>Welcome Back!</Text>
        <PrimaryInput
          name={'username'}
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Please enter username',
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
          }}
        />
        <FormError text={errors.password?.message} />
        {errors.root && <FormError text={errors.root?.message} />}
        <TextButton
          text={'Forgotten credentials!'}
          align={'right'}
          onPress={() => {
            navigation.navigate('Forgotten Credentials');
          }}
        />
        <TextButton
          text={'Create account'}
          align={'left'}
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
        <PrimaryButton text={'Login'} onPress={handleSubmit(onSubmit)} />
      </InputView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  selfCenter: {
    alignSelf: 'center',
    fontSize: scaled(40),
  },
});
