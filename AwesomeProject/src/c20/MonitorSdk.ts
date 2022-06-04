// import uuid from 'react-native-uuid';
// import {MMKV} from 'react-native-mmkv';
// import DeviceInfo from 'react-native-device-info';
import {ErrorInfo} from 'react';
import * as Sentry from '@sentry/react-native';

declare const global: {
  HermesInternal: null | {
    hasPromise: () => boolean;
    enablePromiseRejectionTracker: (options: object) => void;
  };
};

// interface DeviceInfoType {
//   systemName: string;
//   systemVersion: string;
//   brand: string;
//   appName: string;
//   appVersion: string;
// }

export default class MonitorSdk {
  // userId: string;
  // deviceInfo: DeviceInfoType;

  // constructor() {
  //   this.userId = this.getUserId();
  //   this.deviceInfo = this.getDeviceInfo();
  // }

  // getUserId(): string {
  //   let userId = '';

  //   const storage = new MMKV();
  //   const hasUserId = storage.contains('userId');

  //   if (hasUserId) {
  //     userId = storage.getString('userId') ?? 'default userId';
  //   } else {
  //     userId = uuid.v4() as string;
  //     storage.set('userId', userId);
  //   }

  //   return userId;
  // }

  // getDeviceInfo(): DeviceInfoType {
  //   return {
  //     systemName: DeviceInfo.getSystemName(),
  //     systemVersion: DeviceInfo.getSystemVersion(),
  //     brand: DeviceInfo.getBrand(),
  //     appName: DeviceInfo.getApplicationName(),
  //     appVersion: DeviceInfo.getVersion(),
  //   };
  // }

  enablePromiseRejectionTracker(): void {
    // https://github.com/facebook/react-native/blob/main/Libraries/promiseRejectionTrackingOptions.js
    const rejectionTrackingOptions = {
      allRejections: true,
      onUnhandled: (id: string, error: Error) => {
        Sentry.captureException(error);
        console.debug('onUnhandled:', error.message);
      },
      onHandled: (id: string) => {
        console.debug('Promise Rejection Handled:', id);
      },
    };

    // https://github.com/facebook/react-native/blob/main/Libraries/Core/polyfillPromise.js
    if (global?.HermesInternal?.hasPromise?.()) {
      console.debug('enable PromiseRejectionTracker for hermes JS engine');
      global.HermesInternal?.enablePromiseRejectionTracker?.(
        rejectionTrackingOptions,
      );
    } else {
      console.debug('enable PromiseRejectionTracker for previous JS engine');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('promise/setimmediate/rejection-tracking').enable(
        rejectionTrackingOptions,
      );
    }
  }

  setGlobalHandler(): void {
    // https://github.com/facebook/react-native/blob/main/Libraries/Core/setUpErrorHandling.js#L22
    const errorHandler = (error: Error, isFatal?: boolean) => {
      try {
        console.warn(
          isFatal ? '[Fatal]' : '',
          'My Global Error Handled:',
          error,
        );
        Sentry.captureException(error);
      } catch (ee) {
        console.error('Failed to print error: ', ee.message);
      }
    };

    console.debug('set GlobalHandler');
    ErrorUtils.setGlobalHandler(errorHandler);
  }
}

export function logComponentStack(error: Error, info: ErrorInfo): void {
  console.debug('Component Stack:', error, info);
  Sentry.captureException({error, info});
}
