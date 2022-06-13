/**
 * to overwrite this
 * https://github.com/getsentry/sentry-react-native/blob/main/src/js/integrations/reactnativeerrorhandlers.ts
 */

import {getCurrentHub} from '@sentry/core';
import {Integration} from '@sentry/types';
import {Severity} from '@sentry/react-native';

declare const global: {
  HermesInternal: null | {
    hasPromise: () => boolean;
    enablePromiseRejectionTracker: (options: object) => void;
  };
};

interface ReactNativeErrorHandlersOptions {
  onerror: boolean;
  onunhandledrejection: boolean;
}

export class ReactNativeErrorHandlers implements Integration {
  public static id = 'ReactNativeErrorHandlers';
  public name: string = ReactNativeErrorHandlers.id;

  private readonly _options: ReactNativeErrorHandlersOptions;

  public constructor(options?: ReactNativeErrorHandlersOptions) {
    this._options = {
      onerror: true,
      onunhandledrejection: true,
      ...options,
    };
  }

  public setupOnce(): void {
    if (this._options.onunhandledrejection) {
      this._handleUnhandledRejections();
    }

    if (this._options.onerror) {
      this._handleOnError();
    }
  }

  /**
   * Attach the unhandled rejection handler
   */
  private _handleUnhandledRejections(): void {
    // https://github.com/facebook/react-native/blob/main/Libraries/promiseRejectionTrackingOptions.js
    const rejectionTrackingOptions = {
      allRejections: true,
      onUnhandled: (id: string, error: Error) => {
        if (__DEV__) {
          console.warn(
            `Possible Unhandled Promise Rejection (id: ${id}):\n${error}`,
          );
        }

        getCurrentHub().captureException(error, {
          data: {id},
          originalException: error,
        });
      },
      onHandled: (id: string) => {
        console.warn(
          `Promise Rejection Handled (id: ${id})\n` +
            'This means you can ignore any previous messages of the form ' +
            `"Possible Unhandled Promise Rejection (id: ${id}):"`,
        );
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

  /**
   * Handle errors
   */
  private _handleOnError(): void {
    const defaultHandler =
      ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();

    // https://github.com/facebook/react-native/blob/main/Libraries/Core/setUpErrorHandling.js#L20
    const errorHandler = (error: Error, isFatal?: boolean) => {
      // https://github.com/expo/sentry-expo/blob/master/src/integrations/managed.ts#L65
      getCurrentHub().withScope(scope => {
        if (isFatal) {
          scope.setLevel(Severity.Fatal);
        }
        getCurrentHub().captureException(error, {
          originalException: error,
        });
      });

      const client = getCurrentHub().getClient();
      if (client && !__DEV__) {
        // https://github.com/getsentry/sentry-javascript/pull/2669
        client.flush(client.getOptions().shutdownTimeout || 2000).then(() => {
          defaultHandler(error, isFatal);
        });
      } else {
        defaultHandler(error, isFatal);
      }
    };

    console.debug('set GlobalHandler');
    ErrorUtils.setGlobalHandler(errorHandler);
  }
}
