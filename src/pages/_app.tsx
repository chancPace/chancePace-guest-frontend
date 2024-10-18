import Header from '@/features/Header';
// import '@/styles/globals.css';
import GlobalStyle from '@/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
