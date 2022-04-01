//
//  ThemeManager.swift
//  Multi-Theme
//
//  Created by YL on 7/3/22.
//

import Foundation

class ThemeManager {
    static let shared = ThemeManager()
    private var theme: Theme = RedTheme()
    
    
    public func applyTheme(theme: Theme){
        self.theme = theme
    }
    
    public func getTheme() -> Theme {
        return self.theme
    }
    
}
