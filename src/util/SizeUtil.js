/**
 * date:2019/10/25
 * description:适配
 * author:yunfei
 */
import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';

const SizeUtil = {
    uiWidth: 375,//这里的值，是设计稿中的宽度，你们根据自己的设计稿改动
    uiHeight: 667,//这里的值，是设计稿中的高度，你们根据自己的设计稿改动
    pixel: 1 / PixelRatio.get(),
    screenWidth: Dimensions.get('window').width,
    screenHeith: Dimensions.get('window').height,
    pixelRatio: PixelRatio.get(),
    fontScale: PixelRatio.getFontScale(),
    scale: Math.min(Dimensions.get('window').height / 667, Dimensions.get('window').width / 375),

    /*宽度适配，例如我的设计稿某个样式宽度是50pt，那么使用就是：SizeUtil.autoWidth(50)*/
    autoWidth: function (value) {
        return Dimensions.get('window').width * value / this.uiWidth;
    },
    /*高度适配，例如我的设计稿某个样式高度是50pt，那么使用就是：SizeUtil.autoheight(50)*/
    autoheight: function (value) {
        return Dimensions.get('window').height * value / this.uiHeight;
    },
    get: function (url, successCallback, failCallback) {
        fetch(url).then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            }).catch(function (err) {
                failCallback(err);
            });
    },
    /*字体大小适配，例如我的设计稿字体大小是17pt，那么使用就是：SizeUtil.setSpText(17)*/
    setSpText: function (number) {
        number = Math.round((number * this.scale + 0.5) * this.pixelRatio / this.fontScale);
        return number / PixelRatio.get();
    },
    /*通过value删除数组元素*/
    removeByValue: function (arr, value) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            }
        }
    },
    /*判断是否存在数组*/
    isInArray: function (arr, value) {
        let i = arr.length;
        while (i--) {
            if (arr[i] === value) {
                return true
            }
        }
    }
};

module.exports = SizeUtil;