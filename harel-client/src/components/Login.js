import React, { useRef, useState, useMemo, useEffect, createRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import useDebounceValidation from "../helpers/useDebounceValidation";
import axios from 'axios'
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../helpers/validations";
const theme = createTheme();

export default function Login() {
  const [loadingIndicator, setLoadingIndicator] = useState(false);
  const [disable, setDisable] = useState(true);
  const useValidationFirstName = () =>
    useDebounceValidation((text) => validateName(text));
  const useValidationLastName = () =>
    useDebounceValidation((text) => validateName(text));
  const useValidationEmail = () =>
    useDebounceValidation((text) => validateEmail(text));
  const useValidationPassword = () =>
    useDebounceValidation((text) => validatePassword(text));
  const [firstName, setFirstName, isValidFirstName] = useValidationFirstName();
  const [lastName, setLastName, isValidLastName] = useValidationLastName();
  const [email, setEmail, isValidEmail] = useValidationEmail();
  const [password, setPassword, isValidPassword] = useValidationPassword();
  let navigate = useNavigate();

  useEffect(() => {
    if (
      !isValidEmail.result ||
      !isValidPassword.result ||
      email == "" ||
      password == ""
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [isValidEmail, isValidPassword]);

  const login = async () => {
    try {
      let result = await axios.get(
        `http://localhost:8080/web-api/user/login/${email}/${password}`
      );
      setLoadingIndicator(false)
      if(result.status==200)
      {
        navigate(`/Home`);
      }
      else {
        alert('not existing user')
      }
    } catch (e) {
      setLoadingIndicator(false)
      alert('not existing user')
      
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingIndicator(true);
    login()
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  autoComplete="given-name"
                  name="firstName"
                  error={!isValidFirstName.result}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  error={isValidLastName && !isValidLastName.result}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={isValidEmail && !isValidEmail.result}
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  required
                  fullWidth
                  name="password"
                  error={isValidPassword && !isValidPassword.result}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            <Button
              disabled={disable}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loadingIndicator ? (
                <CircularProgress size={30} style={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
