# Seif dashboard

Local wrapper around the published Power BI report, with a login and a next-month revenue (CA) estimate.

You need Python 3.11 or newer and Node.js with npm. Run the commands below in PowerShell from this `app` folder.

## 1. Python API

Create a virtual environment inside `backend` and install the API packages into it.

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Start the API:

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

Leave this window open. The API listens on `http://127.0.0.1:8000`.

## 2. React app

Open a second PowerShell window, still from the `app` folder.

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The page sends `/api` calls to the Python server on port 8000.

## Login

- Email: `admin@seif.local`
- Password: `Seif2026!`

The account is stored in `backend/users.json`. The password there is a hash.

## Dashboard

The Tableau de bord page embeds the published report. Publish the report in Power BI Service, then paste the embed address into `backend/settings.json`:

```json
{
  "embedUrl": "https://app.powerbi.com/...",
  "tokenSecret": "seif-local-token-secret-7c4e9a"
}
```

Restart the API after you change that file. The app does not open the `.pbip` file. Anyone who already has the Power BI address can still open the report outside this app.

## Prediction

Prévision reads `backend/data/monthly_ca.csv`. The columns are `month` (`YYYY-MM`) and `ca`. The file shipped with the app is sample data. Replace it with a monthly export from the report, then reload the page. The model needs at least four months. It uses the month order and the previous month’s CA, and the page states that a short history makes the figure a rough estimate.
