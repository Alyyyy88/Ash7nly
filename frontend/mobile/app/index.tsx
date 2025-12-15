import { Redirect } from 'expo-router';
import * as React from 'react';

export default function Index() {
  // TODO: Replace with your actual auth check
  // Example: const { user } = useAuth();
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // If authenticated, redirect to main app
  return <Redirect href="/(tabs)/home" />
             
}


