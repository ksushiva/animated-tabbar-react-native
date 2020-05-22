/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from './icon';
import withDimensions from './with-dimensions';

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 54,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activeTab: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabInner: {
    width: 48,
    height: 48,
    backgroundColor: '#E1F5FE',
    borderRadius: 24,
  },
});

function TabBar({
  state,
  descriptors,
  navigation,
  dimensions,
  activeTintColor,
  inactiveTintColor,
}) {
  const {routes, index: activeRouteIndex} = state;
  const tabWidth = dimensions.width / routes.length;
  const [translateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    translateValue.setValue(activeRouteIndex * tabWidth);
  }, [tabWidth]);

  const onTabPress = (route, routeIndex) => {
    const isFocused = state.index === routeIndex;

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const updatePositioning = (route, routeIndex) => {
    onTabPress(route.route, routeIndex);
    Animated.spring(translateValue, {
      toValue: routeIndex * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <View style={S.container}>
        <View>
          <View style={StyleSheet.absoluteFillObject}>
            <Animated.View
              style={[
                S.activeTab,
                {
                  width: tabWidth,
                  transform: [{translateX: translateValue}],
                },
              ]}>
              <View style={S.activeTabInner} />
            </Animated.View>
          </View>
        </View>

        {routes.map((route, routeIndex) => {
          const options = descriptors[route.key];
          const isRouteActive = routeIndex === activeRouteIndex;

          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          isRouteActive && updatePositioning({route}, routeIndex);

          return (
            <TouchableOpacity
              key={routeIndex}
              style={S.tabButton}
              onPress={() => {
                updatePositioning({route}, routeIndex);
              }}
              onLongPress={() => {
                updatePositioning({route}, routeIndex);
              }}
              accessibilityLabel={options.tabBarAccessibilityLabel}>
              <Icon name={route.name} color={tintColor} />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export default withDimensions(TabBar);
