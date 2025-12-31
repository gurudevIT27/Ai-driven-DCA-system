import React, { useEffect, useState } from "react";
import "./styles.css";

function Dashboard() {
  // KPI STATES
  const [totalOverdue, setTotalOverdue] = useState(0);
  const [recoveryRate, setRecoveryRate] = useState(0);
  const [slaBreaches, setSlaBreaches] = useState(0);
  const [activeCases, setActiveCases] = useState(0);

  // CASE LIST
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/?format=json")
      .then((res) => res.json())   // ✅ FIXED
      .then((data) => {
        console.log("Dashboard API Data:", data); // 🔍 DEBUG

        // ✅ UPDATE KPI CARDS
        setTotalOverdue(data.total_overdue ?? 0);
        setRecoveryRate(data.recovery_rate ?? 0);
        setSlaBreaches(data.sla_breaches ?? 0);
        setActiveCases(data.active_cases ?? 0);

        // ✅ UPDATE TABLE
        setCases(data.cases ?? []);
      })
      .catch((err) => console.error("Dashboard API Error:", err));
  }, []);

  return (
    <div className="container">
      <h1 className="title">AI-Driven DCA Management System</h1>

      {/* KPI CARDS */}
      <div className="cards">
        <div className="card purple">
          <h2>${totalOverdue.toLocaleString()}</h2>
          <p>Total Overdue Amount</p>
        </div>

        <div className="card blue">
          <h2>{recoveryRate}%</h2>
          <p>Recovery Rate</p>
        </div>

        <div className="card orange">
          <h2>{slaBreaches}</h2>
          <p>SLA Breaches</p>
        </div>

        <div className="card green">
          <h2>{activeCases}</h2>
          <p>Active Cases</p>
        </div>
      </div>

      {/* CASE LIST */}
      <div className="table-box">
        <h3>Case List</h3>

        {cases.length === 0 ? (
          <p style={{ textAlign: "center" }}>No cases found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Outstanding Amount</th>
                <th>Overdue Days</th>
                <th>Assigned DCA</th>
                <th>Recovery Prediction</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {cases.map((c, index) => (
                <tr key={index}>
                  <td>{c.customer_id}</td>
                  <td>${Number(c.outstanding_amount).toLocaleString()}</td>
                  <td>{c.overdue_days}</td>
                  <td>{c.assigned_dca}</td>
                  <td>{c.recovery_prediction}</td>
                  <td>
                    <span
                      className={`status ${c.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
