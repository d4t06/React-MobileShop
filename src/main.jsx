import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
// import GlobalStyle from './assets/GlobalStyle';
// import ContextProvider from './store/Provider';
import AuthProvider from './store/AuthContext';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <AuthProvider>
               <App />
            </AuthProvider>
      </Provider>
);
