import Header from '@/features/Header';
import GlobalStyle from '@/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from '@/features/Footer';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <Header />
                    <Component {...pageProps} />
                    <Footer />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
