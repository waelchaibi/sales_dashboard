import { Navigate, Route, Routes } from "react-router-dom";
import { getToken } from "./api";
import Shell from "./Shell";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";

function PrivateRoute({ children }) {
  if (!getToken()) {
    return <Navigate to="/connexion" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Login />} />
      <Route path="/inscription" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Shell>
              <Dashboard />
            </Shell>
          </PrivateRoute>
        }
      />
      <Route
        path="/prevision"
        element={
          <PrivateRoute>
            <Shell>
              <Prediction />
            </Shell>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
