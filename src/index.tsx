import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './components/app/App';
import ThemeContextProvider from './context/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>,
);
