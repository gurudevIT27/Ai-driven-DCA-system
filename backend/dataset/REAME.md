# AI-Driven DCA Management System – Backend


👥 Team

Team Name: Manas
Institution: Prathyusha Engineering College
Team Lead: Gurudev A


## 📌 Overview
This backend service powers the **AI-Driven Debt Collection Agency (DCA) Management System** developed for the **FedEx SMART Hackathon**.  
It centralizes overdue case management, enforces SOP-driven workflows, performs AI-based recovery prediction, and exposes REST APIs for real-time dashboards.

---

## 🎯 Key Capabilities
- Centralized overdue case ingestion and storage
- AI/ML-based recovery prediction using trained models
- Dynamic KPI computation (Overdue Amount, SLA Breaches, Active Cases)
- Secure user authentication (Signup / Login)
- REST APIs for dashboard and case management
- Scalable Django architecture suitable for enterprise use

---

## 🧠 AI / ML Integration
- Model: RandomForest / DecisionTree (Scikit-Learn)
- Input Data: Overdue days, case amount, customer risk attributes
- Output: Recovery likelihood (High / Medium / Low)
- Model loaded via `.pkl` using `joblib`
- Inference performed directly inside Django (no Flask/FastAPI)

---

## 🛠️ Tech Stack
- **Backend Framework:** Django + Django REST Framework
- **Database:** SQLite (can be upgraded to PostgreSQL)
- **ML:** Scikit-Learn, Joblib, Pandas
- **Security:** Django Auth, Role-based access ready
- **API Format:** JSON

---

## 📂 Project Structure
# AI-Driven DCA Management System – Backend

## 📌 Overview
This backend service powers the **AI-Driven Debt Collection Agency (DCA) Management System** developed for the **FedEx SMART Hackathon**.  
It centralizes overdue case management, enforces SOP-driven workflows, performs AI-based recovery prediction, and exposes REST APIs for real-time dashboards.

---

## 🎯 Key Capabilities
- Centralized overdue case ingestion and storage
- AI/ML-based recovery prediction using trained models
- Dynamic KPI computation (Overdue Amount, SLA Breaches, Active Cases)
- Secure user authentication (Signup / Login)
- REST APIs for dashboard and case management
- Scalable Django architecture suitable for enterprise use

---

## 🧠 AI / ML Integration
- Model: RandomForest / DecisionTree (Scikit-Learn)
- Input Data: Overdue days, case amount, customer risk attributes
- Output: Recovery likelihood (High / Medium / Low)
- Model loaded via `.pkl` using `joblib`
- Inference performed directly inside Django (no Flask/FastAPI)

---

## 🛠️ Tech Stack
- **Backend Framework:** Django + Django REST Framework
- **Database:** SQLite (can be upgraded to PostgreSQL)
- **ML:** Scikit-Learn, Joblib, Pandas
- **Security:** Django Auth, Role-based access ready
- **API Format:** JSON

---

## 📂 Project Structure
backend/
│
├── cases/
│ ├── models.py
│ ├── views.py
│ ├── serializers.py
│ ├── urls.py
│ ├── ml_predictor.py
│
├── dca_backend/
│ ├── settings.py
│ ├── urls.py
│
├── dataset/
│ └── collections_dataset.csv
│
├── ml_model/
│ └── recovery_model.pkl
│
├── manage.py
└── README.md


---

## 🚀 Setup Instructions

### 1️⃣ Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate

#Install Dependencies
pip install django djangorestframework django-cors-headers pandas scikit-learn joblib

#Run Migrations
python manage.py makemigrations
python manage.py migrate

#Start Backend Server
python manage.py runserver 

# run at  
http://127.0.0.1:8000/

