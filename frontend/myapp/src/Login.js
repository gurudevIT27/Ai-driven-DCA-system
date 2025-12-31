import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login (replace with API later)
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>AI-Driven DCA System</h2>
        <p style={styles.subtitle}>Secure Business Login</p>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button}>Login</button>
        </form>

        <p style={styles.footer}>
          © 2026 AI Debt Collection Platform
        </p>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(120deg, #0f2027, #203a43, #2c5364)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif"
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 2px, transparent 0)," +
      "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 2px, transparent 0)," +
      "radial-gradient(circle at 50% 70%, rgba(255,255,255,0.05) 2px, transparent 0)",
    backgroundSize: "120px 120px",
    zIndex: 1
  },

  card: {
    zIndex: 2,
    width: "380px",
    padding: "40px",
    background: "white",
    borderRadius: "14px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    textAlign: "center"
  },

  title: {
    marginBottom: "6px",
    color: "#2c5364"
  },

  subtitle: {
    marginBottom: "30px",
    color: "#666"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2c5364",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600"
  },

  footer: {
    marginTop: "20px",
    fontSize: "12px",
    color: "#888"
  }
};
