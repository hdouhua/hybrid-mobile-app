import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {ErrorBoundary as SentryErrorBoundary} from '@sentry/react-native';
import {ErrorBoundary} from './ErrorBoundary';
import {Styles} from './Styles';

export default function RenderExample() {
  const [renderError, setRenderError] = useState(false);

  return (
    // <SentryErrorBoundary
    //   fallback={({eventId}) => (
    //     <Text>Error boundary caught with event id: {eventId}</Text>
    //   )}>
    <ErrorBoundary>
      <View style={Styles.contentContainer}>
        <Text
          style={Styles.textButton}
          onPress={() => {
            setRenderError(true);
          }}>
          throw a Render error
        </Text>
        {renderError && <div />}
      </View>
    </ErrorBoundary>
    // </SentryErrorBoundary>
  );
}
