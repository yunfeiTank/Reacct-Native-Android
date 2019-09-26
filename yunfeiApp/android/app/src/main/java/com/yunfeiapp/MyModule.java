package com.yunfeiapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yunfeiapp.Test; // <-- 引入读取当前机型

/**
 * Created by Administrator on 2016/10/30.
 */

public class MyModule extends ReactContextBaseJavaModule {
    // Test Text = new Test();
    public MyModule(ReactApplicationContext reactContext) {

        super(reactContext);

        // 给上下文对象赋值
        Test.myContext = reactContext;
    }

    @Override
    public String getName() {

        return "MyModule";
    }
    @ReactMethod
    public static void NativeMethod(String val) {
        // 调用Test类中的原生方法。
        new Test().fun(val);
    }
}
