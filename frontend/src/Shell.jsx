import { NavLink, useNavigate } from "react-router-dom";
import { clearToken } from "./api";

export default function Shell({ children }) {
  const navigate = useNavigate();

  function logout() {
    clearToken();
    navigate("/");
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          B2M IT
        </NavLink>
        <NavLink to="/dashboard">Tableau de bord</NavLink>
        <NavLink to="/prevision">Prévision</NavLink>
        <button className="logout" onClick={logout} type="button">
          Déconnexion
        </button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
