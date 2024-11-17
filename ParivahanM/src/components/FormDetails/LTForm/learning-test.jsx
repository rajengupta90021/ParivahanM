import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';  // Importing the View icon
import { LTFdata } from '../../../constant/constant';
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for routing

export default function LearningTest() {
 // State for handling search
 const [searchQuery, setSearchQuery] = useState('');
 const navigate = useNavigate();  // Hook to navigate programmatically

 // Function to handle View action
 const handleView = (id) => {
   console.log('View User with ID:', id);
   // Navigate to the UserLTForm page, passing the user ID as a URL parameter
   navigate(`/dashboard/learning-test/UserLTForm`);
 };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
  const filteredUserInfo = LTFdata.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.rtoNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      sx={{
        height: '86vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Heading and Search */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: -2,
        }}
      >
        <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif" , color: 'black', margin: 1 }}>
         User Submitted LTform
        </Typography>

        {/* Search field */}
        <TextField
          label="Search by User ID, Name, RTO Number, Mobile"
          id="outlined-search"
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{ width: 350 }}
        />
      </Box>

      {/* Table */}
      <TableContainer
        sx={{
          overflowX: 'auto',
          flex: 1,
          maxHeight: 'calc(86vh - 50px)',
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: '#cad0f8',
              zIndex: 1,
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            }}
          >
            <TableRow>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>User ID</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Name</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>RTO Number</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Mobile No</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUserInfo.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ padding: '10px' }}>{user.id}</TableCell>
                <TableCell sx={{ padding: '10px' }}>{user.name}</TableCell>
                <TableCell sx={{ padding: '10px' }}>{user.rtoNumber}</TableCell>
                <TableCell sx={{ padding: '10px' }}>{user.mobileNumber}</TableCell>
                <TableCell sx={{ padding: '10px' }}>
                  {/* Replaced Edit and Delete icons with View icon */}
                  <IconButton onClick={() => handleView(user.id)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
