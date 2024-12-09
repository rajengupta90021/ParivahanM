import React from 'react';
import { Grid, Paper, Typography, IconButton, Box } from '@mui/material';
import { School, Settings, Payment, Gavel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Images from '../images/image';
import { showSnackbar } from '../helper/toast';

const Services = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle service click and navigate to corresponding page
  const handleServiceClick = (serviceName) => {
    if (serviceName === "Online PUC") {
      navigate("/dashboard/online-puc");
    } else if (serviceName === "Learning Test") {
      navigate("/dashboard/learning-test");
    } else if (serviceName === "Renewal SLD") {
      showSnackbar("currently  Renewal SLD servie is not avilabe ");
    } else if (serviceName === "Offline Court Chalan") {
      showSnackbar("currently Offline Court Chalan servie is not avilabe ");
    }
  };

  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#f1f5f9', minHeight: '82vh' }}>
        {/* Main Title */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Images />  {/* Assuming this is an image or logo component */}
        </Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            color: 'black',  // Set text color to black
            fontSize: '32px',
            fontWeight: '600',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Explore Our Services
        </Typography>

        {/* Grid for the Services */}
        <Grid container spacing={3}>
          {/* Online PUC */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                padding: '30px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '4px solid #4caf50',  // Green border
                color: 'black',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-8px)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleServiceClick("Online PUC")}
            >
              <IconButton sx={{ color: 'black', fontSize: '40px', marginBottom: '20px' }}>
                <School />
              </IconButton>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                Online PUC
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">User Submitted: 465</Typography>
            </Paper>
          </Grid>

          {/* Learning Test */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                padding: '30px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '4px solid #1976d2',  // Blue border
                color: 'black',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-8px)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleServiceClick("Learning Test")}
            >
              <IconButton sx={{ color: 'black', fontSize: '40px', marginBottom: '20px' }}>
                <Settings />
              </IconButton>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                Learning Test
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">User Submitted: 465</Typography>
            </Paper>
          </Grid>

          {/* Renewal SLD */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                padding: '30px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '4px solid #ff9800',  // Orange border
                color: 'black',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-8px)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleServiceClick("Renewal SLD")}
            >
              <IconButton sx={{ color: 'black', fontSize: '40px', marginBottom: '20px' }}>
                <Payment />
              </IconButton>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                Renewal SLD
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">User Submitted: 465</Typography>
            </Paper>
          </Grid>

          {/* Offline Court Chalan */}
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                padding: '30px',
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                border: '4px solid #f44336',  // Red border
                color: 'black',
                height: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-8px)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleServiceClick("Offline Court Chalan")}
            >
              <IconButton sx={{ color: 'black', fontSize: '40px', marginBottom: '20px' }}>
                <Gavel />
              </IconButton>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>
                Offline Court Chalan
              </Typography>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">User Submitted: 465</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
      </div>
      <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
        <Typography sx={{ fontFamily: "'Poppins', sans-serif", color: 'black' }} variant="body2" color="text.secondary">
          Copyright@ XetaBots.com 2024
        </Typography>
      </Box>
    </>
  );
};

export default Services;
