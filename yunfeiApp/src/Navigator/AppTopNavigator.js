import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomePage from "../Pages/HomePage";
import HotPage from "../Pages/HotPage";
import MyPage from "../Pages/MyPage";
import DetailPage from "../Pages/DetailPage";
import ListPage from "../Pages/ListPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TopNavigator = createMaterialTopTabNavigator(
  {
    HomePage: {
      screen: HomePage
    },
    HotPage: {
      screen: HotPage
    },
    MyPage: {
      screen: MyPage
    },
    DetailPage: {
      screen: DetailPage
    }
  },
  {
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true
    },
    initialRouteName: "HotPage"
  }
);

class AppTopNavigator extends Component {
  render() {
    const AppTNavigator = createAppContainer(TopNavigator);

    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <AppTNavigator />
      </View>
    );
  }
}

export default AppTopNavigator;
