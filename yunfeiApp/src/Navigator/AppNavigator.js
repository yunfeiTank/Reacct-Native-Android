import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import HomePage from "../Pages/HomePage";
import HotPage from "../Pages/HotPage";
import MyPage from "../Pages/MyPage";
import ActivityIndicatorPage from "../Pages/ActivityIndicatorPage";
import WebViewPage from "../Pages/WebViewPage";
import ListPage from "../Pages/ListPage";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      //   header: null
      headerTitle: "首页"
    }
  },
  Hot: {
    screen: HotPage
  },
  My: {
    screen: MyPage
  },
  WebViewPage: {
    screen: WebViewPage
  },
  ActivityIndicatorPage: {
    screen: ActivityIndicatorPage
  },
  ListPage: {
    screen: ListPage
  }
});

export default createAppContainer(AppNavigator);
