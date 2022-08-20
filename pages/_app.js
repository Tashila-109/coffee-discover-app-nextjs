import '../styles/globals.css';

import StoreProvider from '../store/store-context';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
      <footer>
        <p>2022 Tashila</p>
      </footer>
    </StoreProvider>
  );
}

export default MyApp;
