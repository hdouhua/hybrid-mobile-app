import {
  init,
  captureException,
  ReactNativeTracing,
  ReactNavigationInstrumentation,
  ReactNavigationTransactionContext,
} from '@sentry/react-native';
import {sentryDsn} from '@app/app.json';

export const routingInstrumentation = new ReactNavigationInstrumentation();

/**
 * this is deprecated, please try to use it under @shared/utils/monitoring
 */
export function SentryInit() {
  init({
    dsn: sentryDsn,
    tracesSampleRate: 1.0,
    maxBreadcrumbs: 10,
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 5000,
    attachStacktrace: true,
    debug: true,

    beforeBreadcrumb(breadcrumb) {
      return breadcrumb.category === 'console' ? null : breadcrumb;
    },
    integrations: [
      new ReactNativeTracing({
        // The time to wait in ms until the transaction will be finished, For testing, default is 1000 ms
        idleTimeout: 5000,
        routingInstrumentation,
        tracingOrigins: ['localhost', /^\//, /^https:\/\//],
        maxTransactionDuration: 60,

        beforeNavigate: context => {
          // Decide to not send a transaction by setting sampled = false
          if (
            (context as ReactNavigationTransactionContext).data.route.name ===
            'ManualTracker'
          ) {
            context.sampled = false;
          }

          // // Modify the transaction context
          // context.name = context.name.toUpperCase();
          // context.tags = {
          //   ...context.tags,
          //   customTag: 'value',
          // };

          return context;
        },
      }),
    ],
  });

  // if (!__DEV__) {
  setGlobalHandler();
  enablePromiseRejectionTracker();
  // }
}

//#region global error handler
declare const global: {
  HermesInternal: null | {
    hasPromise: () => boolean;
    enablePromiseRejectionTracker: (options: object) => void;
  };
};
export function enablePromiseRejectionTracker(): void {
  // https://github.com/facebook/react-native/blob/main/Libraries/promiseRejectionTrackingOptions.js
  const rejectionTrackingOptions = {
    allRejections: true,
    onUnhandled: (id: string, error: Error) => {
      captureException(error);
      console.debug('onUnhandled:', error.message);
    },
    onHandled: (id: string) => {
      console.debug('Promise Rejection Handled:', id);
    },
  };

  // https://github.com/facebook/react-native/blob/main/Libraries/Core/polyfillPromise.js
  if (global?.HermesInternal?.hasPromise?.()) {
    console.debug('enable PromiseRejectionTracker for [hermes] JS engine');
    global.HermesInternal?.enablePromiseRejectionTracker?.(
      rejectionTrackingOptions,
    );
  } else {
    console.debug('enable PromiseRejectionTracker for JS engine');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('promise/setimmediate/rejection-tracking').enable(
      rejectionTrackingOptions,
    );
  }
}

export function setGlobalHandler(): void {
  // https://github.com/facebook/react-native/blob/main/Libraries/Core/setUpErrorHandling.js#L22
  const errorHandler = (error: Error, isFatal?: boolean) => {
    try {
      console.warn(isFatal ? '[Fatal]' : '', 'My Global Error Handled:', error);
      captureException(error);
    } catch (ex) {
      console.error('Failed to send error to server:', ex);
    }
  };

  console.debug('set GlobalHandler');
  ErrorUtils.setGlobalHandler(errorHandler);
}
//#endregion
