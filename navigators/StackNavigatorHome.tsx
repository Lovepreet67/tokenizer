import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {Home, Interactions} from '../screens';

export type HomeScreenNames = ['Home', 'Interactions']; // type these manually
export type RootHomeStackParamList = {
  Home: undefined;
  Interactions: {friendUsername: string};
};
export type HomeStackNavigation = NavigationProp<RootHomeStackParamList>;

const HomeStack = createNativeStackNavigator<RootHomeStackParamList>();
/**
 * @description stack navigator for transaction between home page and token transaction page of friend etc.
 */
const StackNavigatorHome: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <HomeStack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
        <HomeStack.Screen
          name="Home"
          component={Home}
        />
        <HomeStack.Screen name="Interactions" component={Interactions} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};
export default StackNavigatorHome;
