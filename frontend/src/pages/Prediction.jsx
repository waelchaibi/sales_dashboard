import { useEffect, useState } from "react";
import { api, clearToken } from "../api";

function money(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Prediction() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/forecast")
      .then(setForecast)
      .catch((caught) => {
        if (caught.status === 401) {
          clearToken();
          window.location.assign("/");
          return;
        }
        setError(caught.message);
      });
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!forecast) {
    return <p>Calcul de la prévision…</p>;
  }

  const points = [
    ...forecast.history.map((row) => ({ ...row, forecast: false })),
    { month: forecast.nextMonth, ca: forecast.prediction, forecast: true },
  ];
  const max = Math.max(...points.map((point) => point.ca));

  return (
    <section className="prediction">
      <article className="hero">
        <p className="eyebrow">Chiffre d'affaires prévu</p>
        <h1>{money(forecast.prediction)}</h1>
        <p>
          Mois suivant : <strong>{forecast.nextMonth}</strong>
        </p>
        <p className="note">{forecast.note}</p>
      </article>
      <article className="panel">
        <div className="bars">
          {points.map((point) => (
            <div className={point.forecast ? "bar forecast" : "bar"} key={point.month}>
              <span style={{ height: `${Math.max(8, (point.ca / max) * 100)}%` }} />
              <small>{point.month.slice(5)}</small>
            </div>
          ))}
        </div>
      </article>
      <article className="panel">
        <table>
          <thead>
            <tr>
              <th>Mois</th>
              <th>CA</th>
            </tr>
          </thead>
          <tbody>
            {forecast.history.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>{money(row.ca)}</td>
              </tr>
            ))}
            <tr>
              <td>{forecast.nextMonth} (prévision)</td>
              <td>{money(forecast.prediction)}</td>
            </tr>
          </tbody>
        </table>
        <p className="source">
          Remplacez <code>{forecast.source}</code> par votre export (colonnes month et ca).
        </p>
      </article>
    </section>
  );
}
