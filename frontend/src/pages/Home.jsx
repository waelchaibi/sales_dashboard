import { Link } from "react-router-dom";
import { getToken } from "../api";
import SiteHeader from "../SiteHeader";

const MILESTONES = [
  ["2008", "Création de la société mère B2M IT et lancement des activités ERP Navision / Microsoft."],
  ["2010", "Lancement de B2M Tunisie."],
  ["2018", "Création de la filiale ivoirienne B2M CI à Abidjan."],
  ["2021", "Création de la filiale sénégalaise B2M SN à Dakar."],
  ["2022", "Filiale marocaine Anfa Solutions, et filiale DMS à Tunis pour les solutions de gestion automobile."],
];

export default function Home() {
  const connected = Boolean(getToken());
  const appLink = connected ? "/dashboard" : "/connexion";

  return (
    <div className="home">
      <SiteHeader />
      <section className="hero">
        <img
          src="/images/b2m-hero.jpg"
          alt="Quartier de tours de bureaux en verre au crépuscule"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker">Société de services en ingénierie logicielle</p>
          <h1>Accompagner la transformation digitale, de la PME à la grande entreprise.</h1>
          <p>
            B2M IT intègre des solutions durables et conseille ses clients tout au
            long de la collaboration, pour renforcer leur compétitivité.
          </p>
          <div className="hero-actions">
            <Link className="site-cta" to={appLink}>
              {connected ? "Ouvrir le tableau de bord" : "Accéder à l'espace"}
            </Link>
            <a className="site-ghost" href="#expertise">
              Voir l'expertise
            </a>
          </div>
        </div>
      </section>

      <section id="societe" className="band">
        <div className="band-intro">
          <p className="kicker">La société</p>
          <h2>Un intégrateur, et un partenaire de confiance.</h2>
        </div>
        <div className="prose">
          <p>
            La raison sociale est B2M IT. La société exerce dans les services en
            ingénierie logicielle et accompagne des organisations de tailles et de
            secteurs variés. Elle a été créée en 2008, année du lancement de ses
            activités ERP Navision / Microsoft. B2M Tunisie a été lancée en 2010.
          </p>
          <p>
            Implantée en Tunisie à travers B2M Tunisie, l'entreprise propose des
            solutions informatiques performantes, robustes et pérennes, adaptées
            au besoin et au secteur de chaque client, et appuyées sur les
            technologies récentes.
          </p>
          <p>
            Le site du groupe est{" "}
            <a href="https://b2m-it.com" target="_blank" rel="noreferrer">
              b2m-it.com
            </a>
            .
          </p>
        </div>
      </section>

      <section id="presence" className="band presence">
        <div>
          <div className="band-intro">
            <p className="kicker">Présence</p>
            <h2>De Tunis à Abidjan, Dakar et le Maroc.</h2>
          </div>
          <ol className="timeline">
            {MILESTONES.map(([year, text]) => (
              <li key={year}>
                <strong>{year}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
        <figure>
          <img
            src="/images/b2m-tower.jpg"
            alt="Tour de bureaux en verre, vue en contre-plongée"
          />
        </figure>
      </section>

      <section id="expertise" className="band">
        <div className="band-intro">
          <p className="kicker">Expertise</p>
          <h2>Cinq axes de services, trois piliers pour ce projet.</h2>
        </div>
        <div className="cards">
          <article>
            <span>01</span>
            <h3>Intégration de solutions ERP</h3>
            <p>
              Cœur de l'offre. B2M IT intègre et adapte Microsoft Dynamics 365
              Business Central, anciennement Microsoft Dynamics NAV. L'ERP
              centralise les fonctions de l'entreprise dans une base unique.
              L'équipe l'ajuste au secteur de chaque client.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Infrastructure et réseaux</h3>
            <p>
              Mise en place et maintien de l'infrastructure et des réseaux, pour
              que les applications et les échanges de données tiennent. Côté
              décisionnel, l'accès aux sources, la disponibilité des services et
              la protection des identifiants comptent autant que les indicateurs.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Business Analytics</h3>
            <p>
              Tableaux de bord et aide à la décision. Une page de ventes éclaire
              les produits qui portent la croissance. Une page de stock signale
              les articles à surveiller. Les indicateurs sont choisis avant les
              graphiques, et reliés à un usage précis.
            </p>
          </article>
        </div>
      </section>

      <section className="analytics">
        <img
          src="/images/b2m-lobby.jpg"
          alt="Hall vitré d'un immeuble de bureaux"
        />
        <div>
          <p className="kicker">Cet espace</p>
          <h2>Le tableau de bord s'inscrit dans l'axe Business Analytics.</h2>
          <p>
            Il réunit le rapport de gestion et une estimation du chiffre
            d'affaires du mois suivant. L'accès est réservé aux comptes créés
            ici.
          </p>
          <Link className="site-cta" to={appLink}>
            {connected ? "Ouvrir le tableau de bord" : "Se connecter"}
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <strong>B2M IT</strong>
        <span>Ingénierie logicielle depuis 2008</span>
        <a href="https://b2m-it.com" target="_blank" rel="noreferrer">
          b2m-it.com
        </a>
      </footer>
    </div>
  );
}
