//
//  ContentView.swift
//  Shared
//
//  Created by YL on 7/3/22.
//

import SwiftUI

struct ContentView: View {
    init() {
        self.applyTheme()
    }
    var body: some View {
        let theme = ThemeManager.shared.getTheme()
        
        Text("Hello, world!")
            .foregroundColor(theme.textColor)
            .padding()
            .background(
                theme.background)
    }
    
    func applyTheme(){
        ThemeManager.shared.applyTheme(theme: RedTheme())
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
