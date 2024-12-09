import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getltffrombyid } from '../../../Services/LTFFrom';
import { Paper, Typography, Box, Grid, CircularProgress, Button, Chip } from '@mui/material'; // Import Material UI components

const UserLTForm = () => {
  const { id } = useParams(); // Get the ID from the URL (which corresponds to applicationNumber)
  const location = useLocation(); // Get location object to access state
  const { applicationNumber } = location.state || {}; // Access application number from state

  // State to store the fetched data
  const [ltfData, setLtfData] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Check if ID (applicationNumber) is available
    if (id) {
      // Fetch data based on the applicationNumber
      getltffrombyid(id)
        .then((data) => {
          console.log('Fetched data:', data); // Log the data returned by the API

          // Find the data corresponding to the applicationNumber
          const filteredData = data.find((item) => item.applicationNumber === applicationNumber);

          if (filteredData) {
            setLtfData(filteredData); // Set the fetched data into state
          } else {
            console.error('No data found for application number:', id); // Handle case if no data is found
          }

          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error('Error fetching data by ID:', error);
          setLoading(false); // Set loading to false if there's an error
        });
    }
  }, [id]); // Run when ID (applicationNumber) changes

  return (
    <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* If still loading, show loading spinner */}
      {loading ? (
        <CircularProgress />
      ) : (
        // Display data if it has been fetched
        ltfData ? (
          <Grid container spacing={3} justifyContent="center" sx={{ width: '100%' }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Paper
                elevation={6}
                sx={{
                  padding: '25px',
                  backgroundColor: '#f4f7fa',
                  borderRadius: '10px',
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%', // Full width
                  boxSizing: 'border-box', // Ensures padding doesn't affect the width
                }}
              >
                <Grid container spacing={2} sx={{ width: '100%' }}>
                  {/* Application Number and Status side by side */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>Application Number:</strong> {ltfData.applicationNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>Status:</strong>
                      {/* Conditional rendering of Chip for status */}
                      <Chip
                        label={ltfData.status}
                        color={ltfData.status === 'Pending' ? 'error' : 'success'}
                        variant="outlined"
                        sx={{
                          marginLeft: '10px',
                          color: ltfData.status === 'Pending' ? '#d32f2f' : '#388e3c', // Custom color if needed
                          borderColor: ltfData.status === 'Pending' ? '#d32f2f' : '#388e3c',
                        }}
                      />
                    </Typography>
                  </Grid>

                  {/* Other details */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>Date of Birth:</strong> {ltfData.dob}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>LL Password:</strong> {ltfData.llPassword}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>RTO Code:</strong> {ltfData.rtoCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>Country:</strong> {ltfData.country}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>User ID:</strong> {ltfData.userId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>State:</strong> {ltfData.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                      <strong>City:</strong> {ltfData.city}
                    </Typography>
                  </Grid>

                  {/* Button inside the Grid */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontSize: '1rem',
                          padding: '10px 20px',
                        }}
                      >
                        Upload Report
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="h6" color="error">
            No data found for the application number: {id}
          </Typography>
        )
      )}
    </Box>
  );
};

export default UserLTForm;
