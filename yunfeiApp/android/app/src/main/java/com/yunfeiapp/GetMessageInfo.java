package com.yunfeiapp;

// import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

// import android.app.ListActivity;
import android.content.Context;
import android.content.ContentResolver;
import android.database.Cursor;
// import android.database.sqlite.SQLiteException;
import android.net.Uri;
// import android.os.Bundle;
// import android.provider.ContactsContract;
// import android.provider.ContactsContract.CommonDataKinds.Phone;
// import android.provider.ContactsContract.PhoneLookup;
import android.util.Log;
// import android.widget.SimpleAdapter;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class GetMessageInfo extends ReactContextBaseJavaModule {

    private Uri SMS_INBOX = Uri.parse("content://sms/");
    private Context mContext;
    List<Object> list = new ArrayList<Object>(); // 短信来源

    public GetMessageInfo(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "GetMessageInfo";
    }

    // ----------收到的短息信息------------
    @ReactMethod
    private void getSmsInPhone(Callback successCallback) {
        ContentResolver cr = mContext.getContentResolver();
        String[] projection = new String[] { "_id", "address", "person", "body", "date", "type" };
        Cursor cur = cr.query(SMS_INBOX, projection, null, null, "date desc");
        if (null == cur) {
            Log.i("ooc", "************cur == null");
            return;
        }
        while (cur.moveToNext()) {
            String number = cur.getString(cur.getColumnIndex("address"));// 手机号
            String name = cur.getString(cur.getColumnIndex("person"));// 联系人姓名列表
            String body = cur.getString(cur.getColumnIndex("body"));// 短信内容
            // 至此就获得了短信的相关的内容, 以下是把短信加入map中，构建listview,非必要。
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("num", number);
            map.put("mess", body);
            list.add(map);
        }
        // successCallback.invoke(list.toString());
        // successCallback.invoke(JSONObject.fromObject(list).toString());
        successCallback.invoke(JSONObject.toJSONString(list));
    }

}