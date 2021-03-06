import React from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
const moment = require("moment");
import { Toast } from '../util/Toast';
import SizeUtil from '../util/SizeUtil';
import { login } from '../Server/login';
import { getRule } from '../Server/getRule';
import { getKeyWord } from '../Server/getKeyWord';
import LoadingView from '../util/LoadingView';
import AuthorizationScreen from './AuthorizationScreen';
import AsyncStorage from '@react-native-community/async-storage';


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: null,
    header: null
  };
  state = {
    // userid: 'bwcsuser',
    // PhoneNum: '13552739927',
    // password: '1',
    userid: '',
    PhoneNum: '',
    password: '',
    focus: '',
    loadingflag: false,
  }

  componentDidMount() {
  }
  _login = () => {
    this.setState({ loadingflag: true });
    const { userid, password, PhoneNum } = this.state;
    login(userid, password, PhoneNum).then((res) => {
      console.log(res)
      if (res.Code == 200) {
        this._signInAsync()
      } else {
        this.setState({ loadingflag: false });
        Alert.alert(
          '登录失败！',
          res.Message,
          [{ text: '关闭' }],
          { cancelable: false }
        );
      }
    }).catch((error) => {
      console.log(error)
      alert('服务端异常！请联系管理员');
      this.setState({ loadingflag: false });
    });
  }
  render() {
    const { focus, loadingflag } = this.state;
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={{ uri: 'https://facebook.github.io/react-native/img/tiny_logo.png' }} style={{ */}
        <ImageBackground
          source={require('../assets/img/login_bg.jpg')}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}>
          <View>
            <View style={{
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Image
                style={{
                  width: 180,
                  height: 50,
                  resizeMode: 'cover'
                }}
                source={require('../assets/img/logo.png')}
              />
            </View>
            <View
              style={styles.center}>
              <View style={focus == 1 ? styles.view_focus : styles.view}>
                <View
                  style={styles.view_l}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/img/user.png')}
                  />
                </View>
                <View
                  style={styles.view_r}>
                  <TextInput
                    onFocus={() => this.setState({ focus: 1 })}
                    maxLength={20}
                    style={{ padding: 0 }}
                    placeholder="请输入您的账号"
                    value={this.state.userid}
                    placeholderTextColor='#c5c5c5'
                    onChangeText={(userid) => this.setState({ userid })}
                  />
                </View>
              </View>
              <View style={focus == 2 ? styles.view_focus : styles.view}>
                <View style={styles.view_l}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/img/phone.png')}
                  />
                </View>
                <View style={styles.view_r}>
                  <TextInput
                    maxLength={20}
                    style={{ padding: 0 }}
                    placeholder="请输入您的手机号"
                    placeholderTextColor='#c5c5c5'
                    value={this.state.PhoneNum}
                    onFocus={() => this.setState({ focus: 2 })}
                    onChangeText={(PhoneNum) => this.setState({ PhoneNum })}
                  />
                </View>
              </View>
              <View style={focus == 3 ? styles.view_focus : styles.view}>
                <View
                  style={styles.view_l}>
                  <Image
                    style={styles.icon}
                    source={require('../assets/img/password.png')}
                  />
                </View>
                <View
                  style={styles.view_r}>
                  <TextInput
                    maxLength={20}
                    type='password'
                    style={{ padding: 0 }}
                    secureTextEntry={true}
                    placeholder="请输入您的密码"
                    value={this.state.password}
                    placeholderTextColor='#c5c5c5'
                    onFocus={() => this.setState({ focus: 3 })}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <ImageBackground
                  style={{ width: 250, height: 35, resizeMode: 'contain' }}
                  source={require('../assets/img/bt_bg.png')}
                >
                  <Text
                    onPress={this._login}
                    style={{ textAlign: 'center', lineHeight: 30, color: '#fff', fontWeight: '700' }}
                  >立即登录</Text>
                  {/* <Button style={{ height: 60 }} title="登录" onPress={this._signInAsync} /> */}
                </ImageBackground>
              </View>
            </View>
          </View>
        </ImageBackground>
        {/* 权限 */}
        <AuthorizationScreen />
        <LoadingView showLoading={loadingflag}></LoadingView>

      </View >
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    await AsyncStorage.setItem('Time', moment(new Date()).format('YYYY-MM-DD'));
    await AsyncStorage.setItem('userInfo', JSON.stringify({
      name: this.state.userid,
      password: this.state.password,
      PhoneNum: this.state.PhoneNum,
    }));
    await getRule().then(res => {
      Toast({
        visible: true,
        message: '税务短信规则加载完成'
      })
    });
    // await getKeyWord().then(res => {
    //   Toast({
    //     visible: true,
    //     message: '税务短信关键字加载完成'
    //   })
    // })
    this.setState({ loadingflag: false });
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  center: {
    padding: 30,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  view: {
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#f5f5f5',
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  view_focus: {
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: '#88bfff',
    backgroundColor: '#f5f5f5'
  },
  view_l: {
    flex: 1,
    paddingTop: SizeUtil.autoheight(4),
    paddingBottom: SizeUtil.autoheight(4),
    paddingLeft: SizeUtil.autoWidth(10),
  },
  icon: {
    width: SizeUtil.autoWidth(16),
    height: SizeUtil.autoheight(20),
    resizeMode: 'contain',
  },
  view_r: {
    // paddingLeft: 15,
    flex: 6
  }
})
