/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ErrorInfo} from 'react';
import {Text, View, Button} from 'react-native';
import * as Sentry from '@sentry/react-native';

export interface FallbackProps {
  error: Error;
  eventId: string | null;
  resetError(): void;
}

export type Props = {
  children: React.ReactNode;
  fallback?: React.ReactElement | ((props: FallbackProps) => React.ReactNode);
  onReset?(): void;
};
type State = {
  error: Error | null;
  eventId: string | null;
};
const INITIAL_STATE: State = {
  error: null,
  eventId: null,
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.resetState = this.resetState.bind(this);
  }

  state: State = INITIAL_STATE;

  resetState() {
    const {onReset} = this.props;
    if (onReset) {
      onReset();
    }
    this.setState(INITIAL_STATE);
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    const eventId = Sentry.captureException(error);
    this.setState({error, eventId});
  }

  render() {
    const {fallback} = this.props;
    const {error, eventId} = this.state;

    if (error) {
      // You can render any custom fallback UI

      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback({
            error,
            eventId,
            resetError: this.resetState,
          });
        } else {
          return fallback;
        }
      }
      return (
        <FallbackUI
          error={error}
          eventId={eventId}
          resetError={this.resetState}
        />
      );
    }

    return this.props?.children;
  }
}

function FallbackUI({eventId, resetError}: FallbackProps) {
  return (
    <View>
      <Text>Something went wrong when rendering [children]</Text>
      {eventId ? <Text>event id: {eventId}</Text> : null}
      <Button title="reset error" onPress={resetError} />
    </View>
  );
}
