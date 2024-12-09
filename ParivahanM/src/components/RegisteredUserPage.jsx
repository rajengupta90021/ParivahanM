import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, TextField, TablePagination } from '@mui/material';
import { FadeLoader } from 'react-spinners';
import { fetchUsers } from '../Services/UserService';

function RegisteredUserPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // rows per page

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUsers();
      if (userData) {
        setUsers(userData); // Update the users state
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle searching users
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  // Slice the users to show based on current page and rows per page
  const currentUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Grid container spacing={2} alignItems="stretch">
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px', height: '82vh', display: 'flex', flexDirection: 'column' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ color: 'black', fontFamily: "'Poppins', sans-serif" }}>
              All Registered Users 
            </Typography>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              sx={{ width: '200px' }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Grid>

          {/* Table Container with Overflow Handling */}
          <TableContainer style={{ flexGrow: 1, marginTop: '10px', overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#f0d5cf', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}>ID</TableCell>
                  <TableCell sx={{ backgroundColor: '#f0d5cf', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}>RTO No</TableCell>
                  <TableCell sx={{ backgroundColor: '#f0d5cf', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#f0d5cf', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}>Phone</TableCell>
                  <TableCell sx={{ backgroundColor: '#f0d5cf', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}>Wallet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '60%',
                      left: '50%',
                      transform: 'translate(-70%, -50%)',
                      zIndex: 1, // Ensure the loader is above the table content
                    }}
                  >
                    <FadeLoader color="#36d7b7" loading={loading} size={50} />
                  </Box>
                ) : (
                  currentUsers.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>{user.id}</TableCell>
                      <TableCell sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>{user.rto}</TableCell>
                      <TableCell sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>{user.name}</TableCell>
                      <TableCell sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>{user.phone}</TableCell>
                      <TableCell sx={{ padding: 4, fontFamily: "'Poppins', sans-serif" }}>{user.wallet}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Fixed Pagination at Bottom */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: '#fff',
              zIndex: 1, // Ensure it stays above the table
              borderTop: '1px solid #ddd',
            }}
          />
        </Paper>
        <Box sx={{ marginTop: 2, textAlign: 'center', width: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Copyright@ xetabot.com 2024
        </Typography>
      </Box>
      </Grid>
    </Grid>
  );
}

export default RegisteredUserPage;
