import React from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import TopBar from './features/TopBar';
import List from './features/List';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 1}},
});

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <TopBar />
        <List />
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
