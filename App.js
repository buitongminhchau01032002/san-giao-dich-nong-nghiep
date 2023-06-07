import React from 'react';
import { NativeBaseProvider, Box, StatusBar } from 'native-base';
import theme from './configs/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/RootNavigator';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NativeBaseProvider theme={theme}>
                    <Navigation />
                    <StatusBar translucent />
                </NativeBaseProvider>
            </SafeAreaProvider>
        </Provider>
    );
}
