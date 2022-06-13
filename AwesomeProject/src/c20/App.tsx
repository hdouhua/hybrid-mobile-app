import React from 'react';
import {SafeAreaView} from 'react-native';

// import {SentryInit} from './MonitorSdk';
import {SentryInit, wrap} from '@shared/utils/monitoring';
import {sentryDsn} from '@app/app.json';
import AppNavigation from './navigations';
import {Styles} from './Styles';

// init sentry monitoring
SentryInit({
  debug: false,
  dsn: sentryDsn,
  enableAutoPerformanceTracking: true,
  enableCustomizedErrorHandler: true,
});

function App(): React.ReactElement {
  return (
    <SafeAreaView style={Styles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
}

// wrapped by Sentry
export default wrap(App);
