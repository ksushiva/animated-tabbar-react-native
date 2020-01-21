/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './src/screens/home';
import Settings from './src/screens/settings';
import Search from './src/screens/search';
import Planning from './src/screens/planning';
import Icon from './src/components/icon';
import TabBar from './src/components/tabbar';

const App = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} />,
      },
    },
    Planning: {
      screen: Planning,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="planning" color={tintColor} />,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="search" color={tintColor} />,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="settings" color={tintColor} />,
      },
    },
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      activeTintColor: '#2FC7FF',
      inactiveTintColor: '#C5C5C5',
    },
  },
);

export default createAppContainer(App);
