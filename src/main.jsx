// Corrected version
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // CSS Import
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS Import (for Bootstrap components)
import AdminContextProvider from './contexts/AdminContextProvider';
import DoctorContextProvider from './contexts/DoctorContext';
import AppContextProvider from './contexts/adminAppContext';

// Correct `createRoot()` function
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
