import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import MainNavigation from './src/navigation/MainNavigation';

export default function App() {

  const [loaded, error] = useFonts({
    'open-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-regular': require('./assets/fonts/OpenSans-Regular.ttf')
  });

  if(!loaded){
    return null;
  }

  return (
    <>
      <MainNavigation/>
      <StatusBar style="auto" />
    </>
  );
};
