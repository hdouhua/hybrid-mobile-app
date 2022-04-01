//
//  ViewController.swift
//  WebViewDemo
//
//  Created by yl on 2019/10/9.
//  Copyright © 2019 Fortune. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate {
    var wk: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.

        setupUI()
    }

    class func clean() {
        HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)
        print("[WebCacheCleaner] All cookies deleted")
        
        WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
            records.forEach { record in
                WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
                print("[WebCacheCleaner] Record \(record) deleted")
            }
        }
    }

    func setupUI() {
        ViewController.clean()
        let contentController = WKUserContentController()

        // webview call js
        let scriptSource = "startup();"
//        let scriptSource = "window.alert('welcome')"
//        let scriptSource = "window.webkit.messageHandlers.ibc.postMessage(`Hello, world!`);"
        let script = WKUserScript(source: scriptSource, injectionTime: .atDocumentEnd, forMainFrameOnly: true)
        contentController.addUserScript(script)

        // js call webview
        contentController.add(self, name: "ibc")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController

        wk = WKWebView(frame: view.frame, configuration: config)
        view.addSubview(wk)

        wk.navigationDelegate = self
        wk.uiDelegate = self

        if let url = URL(string: "http://localhost:5000/") {
            wk.load(URLRequest(url: url))
        }
    }
}
