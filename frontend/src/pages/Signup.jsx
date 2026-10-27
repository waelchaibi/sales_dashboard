import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api, getToken, setToken } from "../api";
import SiteHeader from "../SiteHeader";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  if (getToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    try {
      const result = await api("/api/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setToken(result.token);
      navigate("/dashboard");
    } catch (caught) {
      setError(caught.message);
    }
  }

  return (
    <div className="auth-page">
      <SiteHeader />
      <div className="auth-body">
        <form className="login-card" onSubmit={submit}>
          <h1>Créer un compte</h1>
          <p>Le compte est enregistré localement pour ouvrir le tableau de bord.</p>
          {error ? <div className="error">{error}</div> : null}
          <label>
            Nom
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Adresse e-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirmer le mot de passe
            <input
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          <button className="primary" type="submit">
            Créer le compte
          </button>
          <p className="auth-switch">
            Déjà un compte ? <Link to="/connexion">Se connecter</Link>
          </p>
        </form>
        <aside className="auth-visual">
          <img src="/images/b2m-lobby.jpg" alt="" />
          <div>
            <p>B2M IT</p>
            <span>Tableaux de bord et lecture du chiffre d'affaires.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
