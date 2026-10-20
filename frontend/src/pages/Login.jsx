import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, getToken, setToken } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (getToken()) {
    return <Navigate to="/dashboard" replace />;
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await api("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(result.token);
      navigate("/dashboard");
    } catch (caught) {
      setError(caught.message);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={submit}>
        <h1>Connexion</h1>
        <p>Accédez au tableau de bord et à la prévision du chiffre d'affaires.</p>
        {error ? <div className="error">{error}</div> : null}
        <label>
          Adresse e-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button className="primary" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
