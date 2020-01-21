import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from '../screens/home';
import Settings from '../screens/settings';
import Search from '../screens/search';
import Planning from '../screens/planning';
import Icon from './icon';
import TabBar from './tabbar';

const Router = createBottomTabNavigator(
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

export default createAppContainer(Router);
