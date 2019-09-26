/**
 * SMSReceiver
 * 
 * 监听手机接收短信
 * 读取手机短信
 * 
 */
package com.yunfeiapp;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.telephony.SmsManager;
import android.widget.Toast;
import android.util.Log;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SMSReceiver extends BroadcastReceiver {
    private static final String SMS_RECEIVED_ACTION = "android.provider.Telephony.SMS_RECEIVED";

    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, 1234, Toast.LENGTH_LONG).show();// 短信内容

        String action = intent.getAction();
        // // 判断广播消息
        // if (action.equals(SMS_RECEIVED_ACTION)) {
        // Bundle bundle = intent.getExtras();
        // // 如果不为空
        // if (bundle != null) {
        // // 将pdus里面的内容转化成Object[]数组
        // Object pdusData[] = (Object[]) bundle.get("pdus");
        // // 解析短信
        // SmsMessage[] msg = new SmsMessage[pdusData.length];
        // for (int i = 0; i < msg.length; i++) {
        // byte pdus[] = (byte[]) pdusData[i];
        // msg[i] = SmsMessage.createFromPdu(pdus);
        // }
        // StringBuffer content = new StringBuffer();// 获取短信内容
        // StringBuffer phoneNumber = new StringBuffer();// 获取地址
        // StringBuffer receiveData = new StringBuffer();// 获取时间
        // // 分析短信具体参数
        // for (SmsMessage temp : msg) {
        // content.append(temp.getMessageBody());
        // phoneNumber.append(temp.getOriginatingAddress());
        // receiveData.append(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS")
        // .format(new Date(temp.getTimestampMillis())));
        // }
        // /**
        // * 这里还可以进行好多操作，比如我们根据手机号进行拦截（取消广播继续传播）等等
        // */
        // Toast.makeText(context, phoneNumber.toString() + content + receiveData,
        // Toast.LENGTH_LONG).show();// 短信内容
        // }
        // }
    }
}
