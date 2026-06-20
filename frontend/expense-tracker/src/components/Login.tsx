import "./Login.scss";

function Login() {
  return (
    <div className="login-container">
      <div className="input-container">
        <input type="text" />
        <input type="text" />
      </div>
      <div className="button-container">
        <button>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
}

export default Login;
