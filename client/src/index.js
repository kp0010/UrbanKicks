import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import ShopContextProvider from './Context/ShopContext';

import AuthProvider from './Components/AuthContext/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <ShopContextProvider>
      <App/>
    </ShopContextProvider>
=======
    <AuthProvider>
      <App />
    </AuthProvider>
>>>>>>> Stashed changes
  </React.StrictMode>
);
