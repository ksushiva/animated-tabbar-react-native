import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth / 4;

const S = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  tabButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activeTab: {
    width: tabWidth,
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

const TabBar = props => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const {routes, index: activeRouteIndex} = navigation.state;
  const [translateValue] = useState(new Animated.Value(0));

  const toValue = {
    0: 0,
    1: tabWidth,
    2: tabWidth * 2,
    3: tabWidth * 3,
  };

  const onTabBarPress = (route, routeIndex) => {
    console.log(routeIndex);
    console.log('toValue', toValue[routeIndex]);
    onTabPress(route);
    Animated.spring(translateValue, {
      toValue: toValue[routeIndex],
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={S.container}>
      <View>
        <View style={StyleSheet.absoluteFillObject}>
          <Animated.View
            style={[S.activeTab, {transform: [{translateX: translateValue}]}]}>
            <View style={S.activeTabInner} />
          </Animated.View>
        </View>
      </View>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabBarPress({route}, routeIndex);
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            {renderIcon({route, focused: isRouteActive, tintColor})}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default TabBar;
