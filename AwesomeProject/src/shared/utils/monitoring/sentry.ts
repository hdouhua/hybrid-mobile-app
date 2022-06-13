import type {Integration, Breadcrumb} from '@sentry/types';
import {
  init,
  ReactNavigationInstrumentation,
  ReactNativeTracing,
} from '@sentry/react-native';
import {ReactNativeErrorHandlers} from './integrations/ErrorHandler';
import {
  MySentryOptions,
  IntegrationOptions,
  ReactNavigationOptions,
  getIntegrations,
} from './utils';
import {Lazy} from '../Lazy';

// https://github.com/getsentry/sentry-react-native/blob/main/src/js/sdk.tsx#L28
// https://github.com/getsentry/sentry-react-native/blob/main/src/js/options.ts#L9
const DEFAULT_OPTIONS = {
  debug: false,
  tracesSampleRate: 1.0,
  maxBreadcrumbs: 10,
  enableCustomizedErrorHandler: true,

  // Opt In/Out automatic instrumentation
  enableAutoPerformanceTracking: true,

  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,
  attachStacktrace: true,

  beforeBreadcrumb(breadcrumb: Breadcrumb) {
    // filter out console from breadcrumb
    return breadcrumb.category === 'console' ? null : breadcrumb;
  },
};

//FIXME: find a better way to create & configure ReactNavigationInstrumentation
let _navigationOptions: ReactNavigationOptions;
export const routingInstrumentation = new Lazy<ReactNavigationInstrumentation>(
  () => new ReactNavigationInstrumentation(_navigationOptions),
);

// https://github.com/expo/sentry-expo/blob/master/src/sentry.ts#L43
// https://github.com/getsentry/sentry-react-native/blob/main/src/js/sdk.tsx#L41
export function SentryInit(options: MySentryOptions = {}) {
  const nativeOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  } as MySentryOptions;

  //#region merge Integrations
  const defaultIntegrations: Integration[] = [];
  if (nativeOptions.enableCustomizedErrorHandler) {
    // to use our own ErrorHandlers
    defaultIntegrations.push(
      new ReactNativeErrorHandlers({
        onerror: true,
        onunhandledrejection: true,
      }),
    );
  }
  if (nativeOptions.enableAutoPerformanceTracking) {
    // to use our own ReactNativeTracing
    if (nativeOptions.routeChangeTimeoutMs) {
      _navigationOptions = {
        routeChangeTimeoutMs: nativeOptions.routeChangeTimeoutMs,
      };
    }
    defaultIntegrations.push(
      new ReactNativeTracing({
        routingInstrumentation: routingInstrumentation.value,
        tracingOrigins: ['localhost', /^\//, /^https:\/\//],
        maxTransactionDuration: 60,
      }),
    );
  }
  nativeOptions.integrations = getIntegrations({
    defaultIntegrations,
    userIntegrations: nativeOptions.integrations ?? [],
  } as IntegrationOptions);
  //#endregion

  // console.debug(nativeOptions);
  init({...nativeOptions});
}
