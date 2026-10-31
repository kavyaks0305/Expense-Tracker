import { useState } from "react";
import { login, startLogoutTimer } from "../api/auth";
import "./Login.scss";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email: email, password: password });

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("expires_in", res.data.expires_in.toString());
      
      startLogoutTimer(res.data.expires_in);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountCreationBtnClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="input-container">
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
        <button onClick={handleLogin}>Login</button>
      </div>

      <div className="create-account-container">
        <span>Dont have an account?</span>
        <button onClick={handleAccountCreationBtnClick}>Create account</button>
      </div>
    </div>
  );
}

export default Login;
