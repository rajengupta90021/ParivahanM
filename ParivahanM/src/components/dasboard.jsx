import React from 'react';
import { Paper, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { recentOrders } from '../constant/constant';

function Dashboard() {
  // Sample data for total visitors over time (could be dynamic)
  const visitorData = [
    { date: '2024-11-01', visitors: 120 },
    { date: '2024-11-02', visitors: 200 },
    { date: '2024-11-03', visitors: 280 },
    { date: '2024-11-04', visitors: 350 },
    { date: '2024-11-05', visitors: 450 },
    { date: '2024-11-06', visitors: 600 },
    { date: '2024-11-07', visitors: 750 },
  ];

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={8}> {/* 60% of the width */}
        <Paper elevation={3} style={{ padding: '20px', height: '300px' }}>
          <Typography variant="h5">Total Visitors Over Time</Typography>
          {/* Graph for Total Visitors */}
          <div style={{ height: '240px', marginTop: '15px' }}>
            <ResponsiveContainer>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
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
            Recent Form Submit
          </Typography>

          <TableContainer style={{ maxHeight: '220px', marginTop: '10px' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Medicine Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Strength</TableCell>
                  <TableCell>Expiry Date</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Sale Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.medicineName}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>{order.strength}</TableCell>
                    <TableCell>{order.expiryDate}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.salePrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ marginTop: 2, textAlign: 'start', width: '100%' }}>
            <Button variant="text" sx={{ color: 'primary.main' }}>
              See more orders
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
