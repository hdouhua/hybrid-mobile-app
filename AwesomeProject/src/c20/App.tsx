import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

// import {SentryInit} from './utils/MonitorSdk';
import {SentryInit, wrap} from '@shared/utils/monitoring';
import {sentryDsn} from '@app-json';
import AppNavigation from './navigations';
import {Styles} from './Styles';
import {store} from './redux/store';

// initialize sentry monitoring
SentryInit({
  debug: false,
  dsn: sentryDsn,
  enableCustomizedErrorHandler: true,
  enableAutoPerformanceTracking: true,
  // attachStacktrace: false,
});

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <SafeAreaView style={Styles.container}>
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
}

// wrapped by Sentry
export default wrap(App);
