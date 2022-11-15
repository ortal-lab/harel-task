import React, { useRef, useState, useMemo, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import useDebounceValidation from "../helpers/useDebounceValidation";
import moment from "moment";
import {
  validateName,
  validatePhone,
  validateDate,
  validateAccount,
} from "../helpers/validations";
import axios from "axios";
const theme = createTheme();

export default function Edit() {
  let { id } = useParams();
  const useValidationFirstName = () =>
    useDebounceValidation((text) => validateName(text));
  const useValidationLastName = () =>
    useDebounceValidation((text) => validateName(text));
  const useValidationPhone = () =>
    useDebounceValidation((text) => validatePhone(text));
  const useValidationDate = () =>
    useDebounceValidation((text) => validateDate(text));
  const useValidationAccount = () =>
    useDebounceValidation((text) => validateAccount(text));
  const [firstName, setFirstName, isValidFirstName] = useValidationFirstName();
  const [lastName, setLastName, isValidLastName] = useValidationLastName();
  const [phone, setPhone, isValidPhone] = useValidationPhone();
  const [date, setDate, isValidDate] = useValidationDate();
  const [account, setAccount, isValidAccount] = useValidationAccount();

  const navigate = useNavigate();

  useEffect(() => {
    async function getCustomerById() {
      try {
        let result = await axios.get(
          `http://localhost:8080/web-api/customer/${id}`
        );
        let customer = result.data;
        let formatDate = moment(customer.date).format("YYYY-MM-DD");
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setPhone(customer.phone);
        setDate(formatDate);
        setAccount(customer.accountNumber);
      } catch (e) {
        alert(e.message);
      }
    }
    getCustomerById();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await axios.put(
        `http://localhost:8080/web-api/customer/${id}`,
        {
          accountNumber: account,
          date: date + "T00:00:00+02:00",
          firstName,
          id,
          lastName,
          phone,
        }
      );
      if (result.status == 200) {
        alert("user updated!");
        navigate("/home")
      }
    } catch (e) {
      alert(e.message);
    }
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
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit{" "}
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
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  error={!isValidLastName.result}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={phone}
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  error={!isValidPhone.result}
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={date}
                  required
                  fullWidth
                  name="date"
                  error={!isValidDate.result}
                  label="Date"
                  type="date"
                  id="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={account}
                  required
                  fullWidth
                  error={!isValidAccount.result}
                  name="account"
                  label="Account"
                  id="account"
                  onChange={(e) => setAccount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="info"
                  sx={{ mt: 2, mb: 1 }}
                  onClick={() => {
                    navigate("/Home");
                  }}
                >
                  back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
