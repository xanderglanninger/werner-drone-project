import React, { useState } from "react";
import LogoSection from "../features/auth/login/logoSection";
import FormSection from "../features/auth/login/formSection";
import LoginButton from "../features/auth/login/loginButton";
import RegisterLink from "../features/auth/login/registerLink";
import { loginUser } from "../actions/authActions";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await loginUser(username, password, setIsLoading);

    localStorage.setItem("username", username);
  };

  const handleRegisterNavigate = () => {
    window.location.href = "/register";
  };

  return (
    <div id="loginPage">
      <LogoSection />
      <form onSubmit={handleSubmit} id="form">
        <FormSection
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <LoginButton isLoading={isLoading} />
      </form>
      <RegisterLink onClick={handleRegisterNavigate} />
    </div>
  );
}

export default Login;
