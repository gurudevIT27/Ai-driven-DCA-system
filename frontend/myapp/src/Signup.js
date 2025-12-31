import React, { useState } from "react";

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Demo signup success
    onSignup({
      name: form.firstName,
      email: form.email
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input style={styles.input} name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input style={styles.input} type="date" name="dob" onChange={handleChange} required />
          <input style={styles.input} type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
          <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input style={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />

          <button style={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg,#0f2027,#203a43,#2c5364)"
  },
  card: {
    width: "400px",
    padding: "35px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2c5364"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2c5364",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  }
};
