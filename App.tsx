import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useResources } from './hooks/useResources';
import Navigation from './navigation';

export default function App() {

  const isLoaded = useResources();

  return (
      isLoaded && <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
