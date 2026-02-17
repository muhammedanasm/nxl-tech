import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useTaskStore from "./store/useTaskStore";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Styles
import "./styles/App.css";
import "./index.css";

/**
 * ProtectedRoute Component
 * ലോഗിൻ ചെയ്യാത്തവർ ഡാഷ്‌ബോർഡിൽ കയറാൻ ശ്രമിച്ചാൽ അവരെ ലോഗിൻ പേജിലേക്ക് തിരിച്ചുവിടും.
 */
const ProtectedRoute = ({ children }) => {
  const user = useTaskStore((state) => state.user);
  return user ? children : <Navigate to="/" replace />;
};

/**
 * PublicRoute Component
 * ലോഗിൻ ചെയ്ത ഒരാൾ വീണ്ടും ലോഗിൻ പേജിൽ പോകുന്നത് തടയാൻ.
 */
const PublicRoute = ({ children }) => {
  const user = useTaskStore((state) => state.user);
  return !user ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Login Route */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Dashboard Route (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route (404 redirect) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
