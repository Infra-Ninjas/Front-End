import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Context Providers
import AppContextProvider from "./contexts/AppContext"; // Existing global context
import AdminContextProvider from "./contexts/Admin-Context/AdminContextProvider.jsx";
import UserContextProvider from "./contexts/Users-Context/UserContextProvider.jsx"; // New user context provider
import DoctorContextProvider from "./contexts/Doctors-Context/DoctorContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <UserContextProvider>
          <DoctorContextProvider>
            <App />
          </DoctorContextProvider>
        </UserContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
