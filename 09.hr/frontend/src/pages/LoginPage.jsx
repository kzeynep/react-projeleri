import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/LoginPage.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import InputAdornment from "@mui/material/InputAdornment";
import loginService from "../services/LoginService";
import storageService from "../services/StorageService";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    if (!username || !password) alert("Tüm alanları doldurunuz");
    loginService
      .login({ username, password })
      .then((response) => {
        if (response?.data?.result) {
          storageService.writeToken(response?.data?.data?.token);
          storageService.writeRefreshToken(response?.data?.data?.refreshToken);
          navigate("/");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container">
      <div className="login-page">
        <div>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-username"
            label="Kullanıcı adı"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-password"
            size="small"
            label="Şifre"
            variant="outlined"
            style={{ marginTop: "7px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <RiLockPasswordFill />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="button-div">
          <Button
            onClick={login}
            className="login-button"
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Giriş Yap
          </Button>

          <Button
            variant="contained"
            className="register-button"
            size="small"
            color="success"
            sx={{ marginLeft: "5px", textTransform: "none" }}
            onClick={() => navigate("/register")}
          >
            Kayıt Ol
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;