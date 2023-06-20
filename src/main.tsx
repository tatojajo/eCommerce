import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import './Translation';

import App from './App';

import './index.css';
import AppTheme from './theme/AppTheme';
import ModeWrapper from './theme/ModeWrapper';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModeWrapper mode='dark'>
          <AppTheme>
            <ToastContainer />
            <App />
          </AppTheme>
        </ModeWrapper>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
