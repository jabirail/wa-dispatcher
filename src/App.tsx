import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Navigation } from '@navigation/RootNavigator';
import { COLORS } from '@utils/constants';
import { useAppStore } from '@store/useAppStore';

const App: React.FC = () => {
  const { settings } = useAppStore();
  const isDarkMode = settings.theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? COLORS.backgroundDark
            : COLORS.background,
        },
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.primary}
      />
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
