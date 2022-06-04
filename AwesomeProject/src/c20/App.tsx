import React from 'react';
import {SafeAreaView} from 'react-native';
import * as Sentry from '@sentry/react-native';
import MonitorSdk from './MonitorSdk';
import SimpleExample from './SimpleExample';
import PromiseExample from './PromiseExample';
import RenderExample from './RenderExample';

// 1, config sentry
Sentry.init({
  dsn: 'https://72635cdb6936414e8186fc7a77114fa3@o965846.ingest.sentry.io/6467184',
  //TODO: please adjust this value in production
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 5,
  beforeBreadcrumb(breadcrumb) {
    // filter out console from breadcrumb
    return breadcrumb.category === 'console' ? null : breadcrumb;
  },
});

function App(): React.ReactElement {
  return (
    <SafeAreaView>
      <SimpleExample />
      <PromiseExample />
      <RenderExample />
    </SafeAreaView>
  );
}

// 2, wrap by Sentry
export default Sentry.wrap(App);

// 3, set speical handlers
// if (!__DEV__) {
const monitor = new MonitorSdk();
monitor.setGlobalHandler();
monitor.enablePromiseRejectionTracker();
// }
