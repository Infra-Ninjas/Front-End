import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Context Providers
import AppContextProvider from './contexts/AppContext';   // ✅ Use AppContext correctly
import AdminContextProvider from './contexts/Admin-Context/AdminContextProvider.jsx';
import DoctorContextProvider from './contexts/Doctors-Context/DoctorContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider> {/* ✅ Place AppContextProvider outside so it's accessible to all */}
      <AdminContextProvider>
        <DoctorContextProvider>
          <App />
        </DoctorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
