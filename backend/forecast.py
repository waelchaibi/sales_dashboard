import csv
from pathlib import Path

import numpy as np
from sklearn.linear_model import LinearRegression

DATA_PATH = Path(__file__).resolve().parent / "data" / "monthly_ca.csv"
NOTE = "L'historique est court, cette estimation reste approximative."


def next_month(month):
    year, month_number = (int(part) for part in month.split("-"))
    month_number += 1
    if month_number == 13:
        year += 1
        month_number = 1
    return f"{year:04d}-{month_number:02d}"


def load_history():
    if not DATA_PATH.exists():
        raise FileNotFoundError("Le fichier mensuel est introuvable.")
    rows = []
    with DATA_PATH.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None or not {"month", "ca"}.issubset(
            {name.strip().lower() for name in reader.fieldnames}
        ):
            raise ValueError("Le fichier doit contenir les colonnes month et ca.")
        fields = {name.strip().lower(): name for name in reader.fieldnames}
        for raw in reader:
            month = raw[fields["month"]].strip()
            ca = float(str(raw[fields["ca"]]).replace(" ", "").replace(",", "."))
            rows.append({"month": month, "ca": ca})
    rows.sort(key=lambda row: row["month"])
    if len(rows) < 4:
        raise ValueError("Il faut au moins quatre mois pour estimer le mois suivant.")
    return rows


def predict_next_month():
    history = load_history()
    features = []
    targets = []
    for index in range(1, len(history)):
        features.append([index, history[index - 1]["ca"]])
        targets.append(history[index]["ca"])
    model = LinearRegression()
    model.fit(np.array(features), np.array(targets))
    prediction = float(model.predict(np.array([[len(history), history[-1]["ca"]]]))[0])
    return {
        "history": history,
        "nextMonth": next_month(history[-1]["month"]),
        "prediction": max(0.0, prediction),
        "note": NOTE,
        "source": "data/monthly_ca.csv",
    }
