package com.example.webviewdemo;

import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
//import com.google.gson.Gson;
//import com.google.gson.JsonElement;
//import com.google.gson.JsonObject;
//import com.google.gson.JsonParser;
import org.json.JSONException;
import org.json.JSONTokener;
import org.json.JSONObject;


class WebAppInterface {

    private WebView webView = null;

    WebAppInterface(WebView webView){
        this.webView = webView;
    }

    @JavascriptInterface
    public void quitBrowser() {
        Log.i(Constants.LOG_TAG_TEST,"quitting...");

        this.webView.post(new Runnable() {
            @Override
            public void run() {
                webView.evaluateJavascript("sendMessage('quitting...')", null);
            }
        });

    }

    @JavascriptInterface
    public void quitBrowser(final String json) {
        Log.i(Constants.LOG_TAG_TEST, "quit...");

        this.webView.post(new Runnable() {
            @Override
            public void run() {
                String action = "action is null";

                // using gson
                /*
                JsonElement jsonTree = new JsonParser().parse(json);
                if (jsonTree.isJsonObject()) {
                JsonObject jsonObject = jsonTree.getAsJsonObject();
                action = jsonObject.get("action").getAsString();

                System.out.println(action);
                }
                using build in JSON parser
                */

                try {
                    JSONObject jObject = new JSONObject(new JSONTokener(json));
                    action = jObject.getString("action");
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                webView.evaluateJavascript("sendMessage('" + action + "')", null);
            }
        });

    }
}
