import {
  wrap,
  withProfiler,
  captureException,
  captureMessage,
  ErrorBoundary,
  nativeCrash,
  startTransaction,
  getCurrentHub,
} from '@sentry/react-native';

export {
  wrap,
  withProfiler,
  captureException,
  captureMessage,
  ErrorBoundary,
  nativeCrash as mockNativeCrash,
  startTransaction,
  getCurrentHub,
};
export * from './sentry';
export type {MySentryOptions} from './utils';
