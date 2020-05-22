import React from 'react';

// React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import Home from '../screens/home';
import Settings from '../screens/settings';
import Search from '../screens/search';
import Planning from '../screens/planning';

// TabBar and Icon components.
import Icon from './icon';
import TabBar from './tabbar';

const Tab = createBottomTabNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({tintColor}) => {
            return <Icon name={route} color={tintColor} />;
          },
        })}
        tabBar={(props) => <TabBar {...props} />}
        tabBarOptions={{
          activeTintColor: '#2FC7FF',
          inactiveTintColor: '#C5C5C5',
          showLabel: false,
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Planning" component={Planning} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
