import { Link } from "react-router-dom";
import { getToken } from "./api";

export default function SiteHeader() {
  const connected = Boolean(getToken());

  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        <span />
        B2M IT
      </Link>
      <nav className="site-nav">
        <a href="/#societe">La société</a>
        <a href="/#expertise">Expertise</a>
        <a href="/#presence">Présence</a>
        {connected ? (
          <Link className="site-cta" to="/dashboard">
            Tableau de bord
          </Link>
        ) : (
          <>
            <Link to="/connexion">Connexion</Link>
            <Link className="site-cta" to="/inscription">
              Créer un compte
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
