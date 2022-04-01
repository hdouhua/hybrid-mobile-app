//
//  ViewController+Extensions.swift
//  WebViewDemo
//
//  Created by yl on 2019/10/9.
//  Copyright © 2019 Fortune. All rights reserved.
//

import Foundation
import WebKit

extension ViewController: WKNavigationDelegate {
    func webView(_: WKWebView, didFail _: WKNavigation!, withError error: Error) {
        NSLog(error.localizedDescription)
    }

    func webView(_: WKWebView, didFailProvisionalNavigation _: WKNavigation!, withError error: Error) {
        NSLog(error.localizedDescription)
    }
}

private typealias wkUIDelegate = ViewController
extension wkUIDelegate {
    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText _: String?, initiatedByFrame _: WKFrameInfo, completionHandler: @escaping (String?) -> Void) {
        let alert = UIAlertController(title: webView.title, message: prompt, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .cancel, handler: { _ in
            completionHandler(prompt)
        }))
        present(alert, animated: true, completion: nil)
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame _: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let alert = UIAlertController(title: webView.title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .cancel, handler: { _ in
            completionHandler()
        }))
        present(alert, animated: true, completion: nil)
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame _: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {
        let alert = UIAlertController(title: webView.title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { _ in
            completionHandler(true)
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: .default, handler: { _ in
            completionHandler(false)
        }))

        present(alert, animated: true, completion: nil)
    }
}

extension ViewController: WKScriptMessageHandler {
    func userContentController(_: WKUserContentController, didReceive message: WKScriptMessage) {
        print(message.name)
        print(message.body)
//        print(type(of: message.body))

        if message.name == "ibc" {
            if let dic = message.body as? NSDictionary {
                if let action = dic["action"] {
                    print(action)

                    // webview call js
                    wk.evaluateJavaScript("sendMessage('\(action)')", completionHandler: nil)
                } else {
                    print("action is nil")
                }
            }
        } else if message.name == "bcd" {
            // do something here ...
        }
    }
}
