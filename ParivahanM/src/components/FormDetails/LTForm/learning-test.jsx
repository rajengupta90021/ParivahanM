import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Box, Typography, TablePagination } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { GetltfFrom } from '../../../Services/LTFFrom';
import { fetchUsers } from '../../../Services/UserService';
import { Chip } from '@mui/material';


export default function LearningTest() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [ltfData, setLtfData] = useState([]);  // State for storing Learning Test Forms data
  const [userData, setUserData] = useState([]);  // State for storing Users data
  const [mergedData, setMergedData] = useState([]);  // State for storing merged data
  const navigate = useNavigate();

  // Fetch the data on component mount using Promise.all
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ltfDataResponse, userDataResponse] = await Promise.all([GetltfFrom(), fetchUsers()]);

        if (ltfDataResponse) {
          setLtfData(ltfDataResponse);  // Set the fetched learning test forms data
        }
        if (userDataResponse) {
          setUserData(userDataResponse);  // Set the fetched user data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

  // Combine ltfData and userData based on common fields (e.g., userId) and sort by timestamp
  useEffect(() => {
    if (ltfData.length && userData.length) {
      const combinedData = ltfData.map(ltf => {
        const user = userData.find(u => u.id === ltf.userId);  // Match by userId
        return user ? { ...ltf, ...user } : ltf;  // Merge user data with ltfData
      });

      // Sort by timestamp._seconds in descending order to get the most recent first
      const sortedData = combinedData.sort((a, b) => {
        return b.timestamp._seconds - a.timestamp._seconds;
      });

      setMergedData(sortedData);  // Set the merged and sorted data
    }
  }, [ltfData, userData]);

  // Function to handle View action
  const handleView = (id, applicationNumber) => {
    console.log('View User with ID:', id, 'Application Number:', applicationNumber);
    navigate(`/dashboard/learning-test/UserLTForm/${id}`, {
      state: { applicationNumber }  // Pass the application number in the state
    });
  };
  
  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the merged data based on the search query
  const filteredUserInfo = mergedData.filter((user) => {
    const name = user.name || '';  // Default to an empty string if undefined
    const applicationNumber = user.applicationNumber || '';  // Default to an empty string if undefined
    const phone = user.phone || '';  // Default to an empty string if undefined
    
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Calculate the paginated data
  const paginatedData = filteredUserInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        <Typography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", color: 'black', margin: 1 }}>
          User Submitted LTform
        </Typography>

        {/* Search field */}
        <TextField
          label="Search by Name, Application Number, Phone"
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
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>User ID</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Name</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Phone</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Wallet</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Application Number</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>RTO Code</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Date of Birth</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>llPasswrod</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>state</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>city</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>status</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif"}}>{user.id}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.name}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.phone}</TableCell>
                <TableCell sx={{color:'green', padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.wallet}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif"}}>{user.applicationNumber}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.rtoCode}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.dob}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.llPassword}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.state}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>{user.city}</TableCell>
                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>
  <Chip
    label={user.status || 'Pending'}  // Default to 'Pending' if status is undefined
    color={user.status?.toLowerCase() === 'completed' ? 'success' : 'error'}  // Green if 'Completed', Red if 'Pending'
    variant={user.status?.toLowerCase() === 'completed' ? 'filled' : 'outlined'}  // Filled if 'Completed', outlined if 'Pending'
  />
</TableCell>

                <TableCell sx={{ padding: '13px', fontFamily: "'Poppins', sans-serif" }}>
                <IconButton onClick={() => handleView(user.id, user.applicationNumber)} color="primary">
                <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[7, 15, 30, 50, 100, 200]}
        component="div"
        count={filteredUserInfo.length}  // Total number of items after filtering
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
