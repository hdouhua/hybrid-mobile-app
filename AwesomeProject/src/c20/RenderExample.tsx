import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {ErrorBoundary as SentryErrorBoundary} from '@sentry/react-native';
import {ErrorBoundary as CustomizedErrorBoundary} from './ErrorBoundary';
import {Styles} from './Styles';

export default function RenderExample() {
  const [renderError, setRenderError] = useState(false);
  const [renderError2, setRenderError2] = useState(false);

  return (
    <View style={Styles.contentContainer}>
      <CustomizedErrorBoundary>
        <Text
          style={Styles.textButton}
          onPress={() => {
            setRenderError(true);
          }}>
          throw a Render error by CustomizedErrorBoundary
        </Text>
        {renderError && <div />}
      </CustomizedErrorBoundary>
      <SentryErrorBoundary
        fallback={({eventId, resetError}) => (
          <View>
            <Text>Error boundary caught with event id: {eventId}</Text>
            <Pressable
              onPress={() => {
                resetError();
                setRenderError2(false);
              }}
              style={({pressed}) => [
                Styles.resetButton,
                {opacity: pressed ? 0.5 : 1},
              ]}>
              <Text>Reset Error</Text>
            </Pressable>
          </View>
        )}>
        <Text
          style={Styles.textButton}
          onPress={() => {
            setRenderError2(true);
          }}>
          throw a Render error by SentryErrorBoundary
        </Text>
        {renderError2 && <div />}
      </SentryErrorBoundary>
    </View>
  );
}
