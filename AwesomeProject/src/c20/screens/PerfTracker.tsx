/**
 * overwrite the example
 * https://github.com/getsentry/sentry-react-native/blob/main/sample/src/screens/ManualTrackerScreen.tsx
 */
import React, {useRef, useEffect, useCallback} from 'react';
import {View, StyleSheet, Button, Text, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  withProfiler,
  startTransaction,
  configureScope,
  Transaction,
} from '@shared/utils/monitoring';

function getLatestDateRange() {
  return {
    from:
      new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10) + 'T00:00:00Z',
    to: new Date().toISOString().substring(0, 10) + 'T00:00:00Z',
  };
}

/**
 * An example of how to add a Sentry Transaction to a React component manually.
 * So you can control all spans that belong to that one transaction.
 *
 * This screen calls an API to get the latest COVID-19 Data to display. We attach a span
 * to the fetch call and track the time it takes for Promise to resolve.
 */
const PerfTrackerScreen = () => {
  const [cases, setCases] = React.useState<{
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number;
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    Date: string;
  } | null>(null);

  const transaction = useRef<Transaction>();

  const loadData = () => {
    setCases(null);

    // Create a child span for the API call.
    const span = transaction.current?.startChild({
      op: 'http',
      description: 'Fetch Covid19 data from API',
    });

    const {from, to} = getLatestDateRange();
    // API document:
    // https://documenter.getpostman.com/view/10808728/SzS8rjbc#intro
    fetch(`https://api.covid19api.com/world?from=${from}&to=${to}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(data => {
        span?.setTag('http.content_length', data.length);
        span?.finish();
        setCases(JSON.parse(data)[0]);
      });
  };

  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    useCallback(() => {
      // Initialize the transaction for the screen.
      transaction.current = startTransaction({
        name: 'manual-tracker',
        op: 'screen',
      });

      return () => {
        // Finishing the transaction triggers sending the data to Sentry.
        transaction.current?.finish();
        //transaction.current = null;
        configureScope(scope => {
          scope.setSpan(undefined);
        });
      };
    }, []),
  );

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>World COVID-19 Cases</Text>
      </View>
      <View style={styles.card}>
        {cases ? (
          <>
            <Statistic
              title="New Confirmed"
              info={cases.NewConfirmed}
              textColor="#C83852"
            />
            <Statistic
              title="New Deaths"
              info={cases.NewDeaths}
              textColor="#362D59"
            />
            <Statistic
              title="Confirmed"
              info={cases.TotalConfirmed}
              textColor="#C83852"
            />
            <Statistic
              title="Deaths"
              info={cases.TotalDeaths}
              textColor="#362D59"
            />
            <Statistic title="Updated" info={cases.Date} textColor="#69C289" />
          </>
        ) : (
          <ActivityIndicator size="large" color="gray" />
        )}
      </View>
      <Button title="Refresh" onPress={loadData} />
    </View>
  );
};

export default withProfiler(PerfTrackerScreen);

const Statistic = (props: {
  title: string;
  info: number | string;
  textColor: string;
}): React.ReactElement => {
  const formatInfo = () => {
    const {info} = props;
    return typeof info === 'number'
      ? `${info}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      : info;
  };
  return (
    <View style={styles.statisticContainer}>
      <Text>{props.title}</Text>
      <Text style={[styles.statisticCount, {color: props.textColor}]}>
        {formatInfo()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  titleContainer: {
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    width: '100%',
    height: 240,
    padding: 12,
    borderWidth: 1,
    borderColor: '#79628C',
    borderRadius: 6,
    backgroundColor: '#F6F6F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statisticContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statisticTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  statisticCount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
