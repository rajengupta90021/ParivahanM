import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Images } from './../images/image'; // Ensure this is your logo or image component

const defaultTheme = createTheme();

export default function Login() {
  const [adminId, setAdminId] = useState(''); // Correct the state variable name for adminId
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Handle the login logic by making a POST request to your adminLogin API
  const handleLogin = async (adminId, password) => {
    try {
      const response = await axios.post('https://us-central1-courtchallanrto.cloudfunctions.net/api/adminLogin', {
        adminId,
        password,
      });
      console.log("Login Response Data:", response.data); // Log response data

      // Check if the response contains the token
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', response.data.token);

        // Set a userLogin flag if needed
        localStorage.setItem('userlogin', true);

        // Redirect to the dashboard
        navigate('/dashboard');
        toast.success("Login successful!");
      } else {
        toast.error("Invalid adminId or password!");
      }
    } catch (error) {
      toast.error(" please check adminid and passwrod . Please try again.");
      console.error(error);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!adminId || !password) {
      toast.error("Admin ID and Password are required!");
      return;
    }

    // Call the handleLogin method with the form values
    handleLogin(adminId, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <ToastContainer />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Use your image component, assuming Images component is a logo */}
          <Images />  
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminId"
              label="Admin ID"
              name="adminId"
              autoComplete="adminId"
              autoFocus
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)} // Corrected onChange
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

// Copyright component for footer
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
