import React from 'react';
import StackNavigatorHome from './StackNavigatorHome.tsx';
import {MoneyTransactions, Profile, TokenTransactions} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {
  HomeIcon,
  Logo,
  MoneyTransactionIcon,
  ProfileIcon,
} from '../resources/svgs';
import {COLORS} from '../constants/colors.ts';

const MainTab = createBottomTabNavigator();

/**
 * @description Main navigator for home, token transactions, money transactions and profile screens. it will be displayed after user log-in .
 */
const MainBottomTabNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <MainTab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <MainTab.Screen
          name="Home"
          component={StackNavigatorHome}
          // component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <HomeIcon
                width={'40px'}
                height={'40px'}
                color={focused ? COLORS.primaryBlack : COLORS.primaryGrey}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Transactions"
          component={TokenTransactions}
          options={{
            tabBarIcon: ({focused}) => (
              <Logo
                width={'40px'}
                height={'40px'}
                color={focused ? COLORS.primaryBlack : COLORS.primaryGrey}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Money"
          component={MoneyTransactions}
          options={{
            tabBarIcon: ({focused}) => (
              <MoneyTransactionIcon
                width={'40px'}
                height={'40px'}
                color={focused ? COLORS.primaryBlack : COLORS.primaryGrey}
              />
            ),
          }}
        />
        <MainTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <ProfileIcon
                width={'40px'}
                height={'40px'}
                color={focused ? COLORS.primaryBlack : COLORS.primaryGrey}
              />
            ),
          }}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  );
};
export default MainBottomTabNavigator;
