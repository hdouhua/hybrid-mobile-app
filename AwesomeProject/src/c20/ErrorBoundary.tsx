/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ErrorInfo} from 'react';
import {Text, View} from 'react-native';
import * as Sentry from '@sentry/react-native';

type Props = {
  children?: React.ReactNode;
};
type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {hasError: false};

  resetState() {
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service

    // // with scope
    // Sentry.withScope(scope => {
    //   // errorInfo && scope.setExtras(errorInfo);
    //   errorInfo && scope.setExtras({...errorInfo});
    //   scope.setExtra('fireman', 'dao');
    //   Sentry.captureException(error);
    // });

    Sentry.captureException(error);

    this.resetState();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong when rendering [children]</Text>;
    }

    return this.props?.children;
  }
}
