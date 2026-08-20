import React from 'react';
import { HomeScreen } from './UI/screens/HomeScreen/HomeScreen';
import { ErrorBoundary } from './UI/reusable/base/ErrorBoundary/ErrorBoundary';

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackTitle="Application Error" fallbackMessage="An unexpected error occurred in the portfolio platform.">
      <HomeScreen />
    </ErrorBoundary>
  );
};
