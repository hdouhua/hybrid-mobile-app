#!/usr/bin/env bash

# patch package recyclerlistview
cd node_modules/recyclerlistview
npm run build
cd -
npx patch-package recyclerlistview
