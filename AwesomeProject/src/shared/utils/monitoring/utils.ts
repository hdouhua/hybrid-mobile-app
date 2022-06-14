import type {Integration} from '@sentry/types';
import type {ReactNativeOptions} from '@sentry/react-native';
// import uuid from 'react-native-uuid';
// import {MMKV} from 'react-native-mmkv';
// import DeviceInfo from 'react-native-device-info';

export interface MySentryOptions extends ReactNativeOptions {
  /**
   * Enable customized ErrorHandler: global error handler & unhandled Promise rejection handler. Enabled by default
   */
  enableCustomizedErrorHandler?: boolean;
  /**
   * The time the transaction will wait for route to mount before it is discarded.
   */
  routeChangeTimeoutMs?: number;
}

export type ReactNavigationOptions = {
  routeChangeTimeoutMs: number;
};

export type IntegrationOptions = {
  defaultIntegrations: Integration[];
  userIntegrations:
    | Integration[]
    | ((integrations: Integration[]) => Integration[]);
};

// https://github.com/getsentry/sentry-javascript/blob/master/packages/core/src/integration.ts#L25
export function getIntegrations(options: IntegrationOptions): Integration[] {
  const {defaultIntegrations, userIntegrations} = options;

  let integrations: Integration[] = defaultIntegrations;

  if (Array.isArray(userIntegrations)) {
    // Filter out integrations that are also included in user options
    integrations = [
      ...integrations.filter(it =>
        userIntegrations.every(
          userIntegration => userIntegration.name !== it.name,
        ),
      ),
      // And filter out duplicated user options integrations
      ...userIntegrations,
    ];
  } else if (typeof userIntegrations === 'function') {
    integrations = userIntegrations(integrations);
    integrations = Array.isArray(integrations) ? integrations : [integrations];
  }

  return integrations;
}

//#region context info
// export interface DeviceInfoType {
//   systemName: string;
//   systemVersion: string;
//   brand: string;
//   appName: string;
//   appVersion: string;
// }

// export function getUserId(): string {
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

// export function getDeviceInfo(): DeviceInfoType {
//   return {
//     systemName: DeviceInfo.getSystemName(),
//     systemVersion: DeviceInfo.getSystemVersion(),
//     brand: DeviceInfo.getBrand(),
//     appName: DeviceInfo.getApplicationName(),
//     appVersion: DeviceInfo.getVersion(),
//   };
// }
//#endregion
