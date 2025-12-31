import os
import joblib
import pandas as pd
from django.conf import settings


# ---------- Load ML Model ----------
MODEL_PATH = os.path.join(
    settings.BASE_DIR,
    "ml_model",
    "recovery_model.pkl"
)

model = joblib.load(MODEL_PATH)


# ---------- Prediction Function ----------
def predict_recovery(case):
    """
    Predict recovery class and probability
    Feature names MUST match training time exactly
    """

    # 🔑 MAP DJANGO FIELDS → ML FEATURE NAMES
    input_data = pd.DataFrame([{
        "case_amount": case.outstanding_amount,     # ✔ mapping
        "days_overdue": case.overdue_days,           # ✔ mapping
        "customer_score": 50                         # ✔ safe default / derived
    }])

    # Prediction
    prediction = model.predict(input_data)[0]

    probability = None
    if hasattr(model, "predict_proba"):
        probability = max(model.predict_proba(input_data)[0])

    return prediction, probability
