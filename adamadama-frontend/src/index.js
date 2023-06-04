import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from './context/SessionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SessionProvider>
        <App />
    </SessionProvider>
);

