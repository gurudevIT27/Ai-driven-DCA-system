import React, { useState } from "react";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Signup onSignup={setUser} />
      )}
    </>
  );
}

export default App;
