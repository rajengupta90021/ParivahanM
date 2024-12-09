import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { fetchUsers } from '../Services/UserService';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();  // Initialize navigate

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUsers();
      if (userData) {
        setUsers(userData); // Update the users state
        processUserData(userData); // Process the data for the chart
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Process user data to create a data structure suitable for the chart
  const processUserData = (userData) => {
    const userCountPerDay = userData.reduce((acc, user) => {
      const date = new Date(user.registrationDate).toLocaleDateString(); // Assuming registrationDate is available
      if (!acc[date]) acc[date] = 0;
      acc[date] += 1;
      return acc;
    }, {});

    const formattedData = Object.keys(userCountPerDay).map(date => ({
      date,
      users: userCountPerDay[date],
    }));

    setUserData(formattedData);  // Update the chart data
  };

  const handleSeeMoreClick = () => {
    navigate('/dashboard/registered-users');  // Navigate to the RegisteredUserPage
  };

  // Get only the first 3 users to show in the Dashboard
  const usersToShow = users.slice(0, 3);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={8}> {/* 60% of the width */}
        <Paper elevation={3} style={{ padding: '20px', height: '300px' }}>
          <Typography variant="h5">Total Registered Users Over Time</Typography>
          {/* Graph for Total Registered Users */}
          <div style={{ height: '240px', marginTop: '15px' }}>
            <ResponsiveContainer>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={4}> {/* 40% of the width */}
        <Paper elevation={3} style={{ padding: '30px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6">Recent Deposit</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              ₹3,024.00 on 3 March 2024
            </Typography>
          </div>
          <Button variant="outlined" color="primary" style={{ alignSelf: 'flex-end', marginTop: 'auto' }}>
            View Balance
          </Button>
        </Paper>
      </Grid>

      {/* Recent Orders Section */}
      <Grid item xs={12}> {/* 100% of the width */}
        <Paper elevation={3} style={{ padding: '20px', height: '330px' }}>
          <Typography variant="h6" sx={{ marginTop: 0, color: 'primary.main' }}>
            Recent Register User
          </Typography>

          <TableContainer style={{ maxHeight: '220px', marginTop: '10px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{backgroundColor: '#f0d5cf',fontFamily: "'Poppins', sans-serif"}}>ID</TableCell>
                  <TableCell  sx={{backgroundColor: '#f0d5cf',fontFamily: "'Poppins', sans-serif"}}>RTO No</TableCell>
                  <TableCell  sx={{backgroundColor: '#f0d5cf',fontFamily: "'Poppins', sans-serif"}}>Name</TableCell>
                  <TableCell  sx={{backgroundColor: '#f0d5cf',fontFamily: "'Poppins', sans-serif"}}>Phone</TableCell>
                  <TableCell  sx={{backgroundColor: '#f0d5cf',fontFamily: "'Poppins', sans-serif"}}>Wallet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '70%',
                      left: '50%',
                      transform: 'translate(-70%, -50%)',
                      zIndex: 1, // Ensure the loader is above the table content
                    }}
                  >
                    <FadeLoader color="#36d7b7" loading={loading} size={50} />
                  </Box>
                ) : (
                  usersToShow.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{fontFamily: "'Poppins', sans-serif"}}>{user.id}</TableCell>
                      <TableCell  sx={{fontFamily: "'Poppins', sans-serif"}}>{user.rto}</TableCell>
                      <TableCell sx={{fontFamily: "'Poppins', sans-serif"}}>{user.name}</TableCell>
                      <TableCell sx={{fontFamily: "'Poppins', sans-serif"}}>{user.phone}</TableCell>
                      <TableCell sx={{fontFamily: "'Poppins', sans-serif"}}>{user.wallet}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Button to show more users */}
          <Box sx={{ marginTop: 2, textAlign: 'start', width: '100%' }}>
            <Button variant="text" sx={{ color: 'primary.main' }} onClick={handleSeeMoreClick}>
              See more Users
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Box sx={{ marginTop: 2, textAlign: 'center', width: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Copyright@ xetabot.com 2024
        </Typography>
      </Box>
    </Grid>
  );
}

export default Dashboard;
