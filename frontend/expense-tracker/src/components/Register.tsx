import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import "./Login.scss";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ username: name, password, email });

      navigate("/login");
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="login-container">
      <div className="input-container">
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Login;
