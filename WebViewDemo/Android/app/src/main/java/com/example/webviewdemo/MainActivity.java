package com.example.webviewdemo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.LinearLayout;


public class MainActivity extends AppCompatActivity {

    private WebView myWebView = null;
    private LinearLayout ll_root;
    private EditText et_message;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupUI();
    }

    private void setupUI() {
        ll_root = findViewById(R.id.ll_root);
        et_message = findViewById(R.id.et_message);

        // init WebView
        myWebView = new WebView(this);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
        myWebView.setLayoutParams(params);
        ll_root.addView(myWebView);

        this.myWebView.addJavascriptInterface(new WebAppInterface(this.myWebView), Constants.JS_BRIDGE_ABC);
        // enhance
        this.myWebView.setWebViewClient(new MyWebViewClient(this));
        this.myWebView.clearCache(true);
        this.myWebView.setWebChromeClient(new WebChromeClient());

        WebSettings webSettings = this.myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);

        this.myWebView.loadUrl("http://192.168.20.99:5000/");
    }


    public void click(android.view.View view) {
        Editable message = et_message.getText();
        myWebView.evaluateJavascript("sendMessage('" + message + "')", null);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && this.myWebView.canGoBack()) {
            this.myWebView.goBack();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        this.myWebView.removeJavascriptInterface( Constants.JS_BRIDGE_ABC);
        this.myWebView.stopLoading();
        this.myWebView.destroy();
        super.onDestroy();
    }
}

