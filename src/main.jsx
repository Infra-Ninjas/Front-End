import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Context Providers
import AdminContextProvider from './contexts/AdminContextProvider';
import DoctorContextProvider from './contexts/DoctorContext';
import AppContextProvider from './contexts/adminAppContext';


// ✅ Use Correct Order of Providers
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <AppContextProvider> {/* ✅ Use only if needed */}
        <DoctorContextProvider> {/* ✅ Use only if needed */}
          <App />
        </DoctorContextProvider>
      </AppContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
