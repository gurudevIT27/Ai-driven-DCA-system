from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import os
import csv

from .models import Case
from .serializers import CaseSerializer
from .ml_predictor import predict_recovery


# ---------- Helper: Load CSV into DB ----------
def load_cases_from_csv():
    # Load only if DB is empty
    if Case.objects.exists():
        return

    csv_path = os.path.join(
        settings.BASE_DIR,
        "dataset",
        "collections_dataset.csv"
    )

    if not os.path.exists(csv_path):
        print("CSV file not found:", csv_path)
        return

    with open(csv_path, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)

        for row in reader:
            Case.objects.create(
                customer_id=row["customer_id"],
                outstanding_amount=float(row["outstanding_amount"]),
                overdue_days=int(row["overdue_days"]),
                assigned_dca=row.get("assigned_dca", "DCA A"),
                status=row.get("status", "Open"),
                recovery_prediction="Medium"
            )


# ---------- API VIEW ----------
@api_view(["GET"])
def dashboard_data(request):
    # 1️⃣ Load dataset once
    load_cases_from_csv()

    cases = Case.objects.all()

    total_overdue = 0
    active_cases = 0
    high_recovery_count = 0
    sla_breaches = 0

    for case in cases:
        try:
            # 2️⃣ ML Prediction
            pred, prob = predict_recovery(case)

            case.recovery_prediction = str(pred)
            case.recovery_probability = round(float(prob), 2) if prob else None
            case.save(update_fields=["recovery_prediction", "recovery_probability"])

            # 3️⃣ KPI Calculations
            total_overdue += case.outstanding_amount

            if case.status != "Closed":
                active_cases += 1

            if case.recovery_prediction == "High":
                high_recovery_count += 1

            if case.overdue_days > 60:
                sla_breaches += 1

        except Exception as e:
            print("ML prediction error:", e)

    # 4️⃣ Dynamic Recovery Rate
    recovery_rate = (
        int((high_recovery_count / cases.count()) * 100)
        if cases.exists()
        else 0
    )

    serializer = CaseSerializer(cases, many=True)

    return Response({
        "total_overdue": total_overdue,
        "recovery_rate": recovery_rate,
        "sla_breaches": sla_breaches,
        "active_cases": active_cases,
        "cases": serializer.data
    })
