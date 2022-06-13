import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ErrorBoundary as SentryErrorBoundary} from '@shared/utils/monitoring';
import {ErrorBoundary as CustomizedErrorBoundary} from '@shared/components/ErrorBoundary';
import {Styles} from '../Styles';

export default function RenderExample() {
  const [renderError, setRenderError] = useState(false);
  const [renderError2, setRenderError2] = useState(false);

  return (
    <View style={Styles.contentContainer}>
      <CustomizedErrorBoundary onReset={() => setRenderError(false)}>
        <Text
          style={Styles.textButton}
          onPress={() => {
            setRenderError(true);
          }}>
          throw a Render error by CustomizedErrorBoundary
        </Text>
        {renderError && <section />}
      </CustomizedErrorBoundary>
      <SentryErrorBoundary
        fallback={FallbackUI}
        onReset={() => setRenderError2(false)}>
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

function FallbackUI({
  eventId,
  resetError,
}: {
  eventId: string | null;
  resetError(): void;
}) {
  return (
    <View>
      <Text>Error boundary caught with event id: {eventId}</Text>
      <Button title="reset error" onPress={resetError} />
    </View>
  );
}
