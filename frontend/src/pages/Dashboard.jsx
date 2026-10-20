import { useEffect, useState } from "react";
import { api, clearToken } from "../api";

export default function Dashboard() {
  const [embedUrl, setEmbedUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/dashboard")
      .then((result) => {
        setEmbedUrl(result.embedUrl);
        setReady(true);
      })
      .catch((caught) => {
        if (caught.status === 401) {
          clearToken();
          window.location.assign("/");
          return;
        }
        setError(caught.message);
      });
  }, []);

  return (
    <section className="frame">
      {error ? <div className="empty-state">{error}</div> : null}
      {!error && embedUrl ? (
        <iframe title="Tableau de bord Power BI" src={embedUrl} />
      ) : null}
      {!error && ready && !embedUrl ? (
        <div className="empty-state">
          <div>
            <h2>Rapport non relié</h2>
            <p>
              Publiez le rapport dans Power BI, puis collez son adresse dans
              <code> app/backend/settings.json </code>
              sous la clé <code>embedUrl</code>.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
