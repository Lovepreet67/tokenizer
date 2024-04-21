import React from 'react';
import {Forgotten, Login, Signup} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';

export type AuthenticationScreenNames = [
  'Signup',
  'Login',
  'Forgotten Credentials',
]; // type these manually
export type RootAuthenticationStackParamList = Record<
  AuthenticationScreenNames[number],
  undefined
>;
export type AuthenticationStackNavigation =
  NavigationProp<RootAuthenticationStackParamList>;

const AuthenticationStack =
  createNativeStackNavigator<RootAuthenticationStackParamList>();
/**
 * @description stack navigator to handle transactions between login , signup and forgotten password screens. show signup screen by default.
 */
const StackNavigatorAuthentication: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthenticationStack.Navigator
        initialRouteName={'Signup'}
        screenOptions={{headerShown: false}}
      >
        <AuthenticationStack.Screen name="Signup" component={Signup} />
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen
          name="Forgotten Credentials"
          component={Forgotten}
          options={{headerShown: true}}
        />
      </AuthenticationStack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigatorAuthentication;
