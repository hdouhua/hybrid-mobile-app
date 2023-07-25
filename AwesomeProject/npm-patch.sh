#!/usr/bin/env bash

# # patch package recyclerlistview
# cd node_modules/recyclerlistview
# npm run build
# cd -
# npx patch-package recyclerlistview

# # patch package metro-runtime
# npx patch-package metro-runtime

# patch package @react-navigation/drawer
cd node_modules/@react-navigation/drawer
mv lib lib-bak
npm install
npm run prepack
cp lib/commonjs/views/modern/Drawer.js lib-bak/commonjs/views/modern/
cp lib/module/views/modern/Drawer.js lib-bak/module/views/modern/
rm -rf lib
mv lib-bak lib
rm -rf node_modules package-lock.json
cd -
npx patch-package @react-navigation/drawer

#
