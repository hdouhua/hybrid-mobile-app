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

// please refer to
// https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {hasError: false};

  resetState() {
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    // console.debug('getDerivedStateFromError');
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.debug('componentDidCatch');
    // You can also log the error to an error reporting service
    Sentry.captureException(error);
    this.resetState();
  }

  render() {
    // console.debug('come here already');
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong with rendering [children]</Text>;
    }

    return this.props?.children;
  }
}
