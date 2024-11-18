import Header from '@/features/Header';
import GlobalStyle from '@/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from '@/features/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 10px;
  @media screen and (min-width: 1025px) {
    padding: 0 40px;
  }
`;

const MainContent = styled.main`
  flex: 1;
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Header />
          <Layout>
            <MainContent>
              <Component {...pageProps} />
            </MainContent>

            <ScrollToTop />
          </Layout>
          <Footer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
