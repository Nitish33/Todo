import React from 'react';
import {StatusBar} from 'react-native';
import {queryClient} from '@query/queryClient';
import NetworkStatus from '@components/NetworkStatus';
import {QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigator from './src/navigation/Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {/* I will show my custom status bar in the screen container */}
        <StatusBar hidden={true} translucent={true} />
        <Navigator />
        <NetworkStatus />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
