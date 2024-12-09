import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Box, Typography, TablePagination, Chip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';  // Importing the View icon
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for routing
import { PUCRepository } from '../../../Services/PUCRepository';

export default function OnlinePuc() {
  // State for handling search and vehicle data
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(7); // Rows per page (initially set to 7)
  const [vehicleData, setVehicleData] = useState([]); // State to store the fetched vehicle data
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const vehicles = await PUCRepository();
        setVehicleData(vehicles);  // Store fetched vehicle data in state
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
  }, []);

  // Function to handle View action
  const handleView = (id) => {
    console.log('View User with ID:', id);
    // Navigate to the UserOnlinePucForm page, passing the user ID as a URL parameter
    navigate(`/dashboard/online-puc/UserOnlinePucForm/${id}`);
  };

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredVehicleData = vehicleData.filter((vehicle) => {
    console.log('vehicle:', vehicle); // Log the vehicle object to check its values
    return (
      (String(vehicle.userId || "").toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(vehicle.vehicleNumber || "").toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(vehicle.rtoCode || "").toLowerCase().includes(searchQuery.toLowerCase())) ||
      (String(vehicle.status || "").toLowerCase().includes(searchQuery.toLowerCase()))
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
  const paginatedData = filteredVehicleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Function to return Chip style based on status
  const getStatusChip = (status) => {
    if (status === 'Pending') {
      return (
        <Chip label={status} color="error" variant="outlined" sx={{ fontFamily: "'Poppins', sans-serif" }} />
      );
    } else if (status === 'Completed') {
      return (
        <Chip label={status} color="success" variant="outlined" sx={{ fontFamily: "'Poppins', sans-serif" }} />
      );
    }
    return (
      <Chip label={status} color="default" variant="outlined" sx={{ fontFamily: "'Poppins', sans-serif" }} />
    );
  };

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
          User PUC LTform
        </Typography>

        {/* Search field */}
        <TextField
          label="Search by User ID, Vehicle Number, RTO Code, Status"
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
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Vehicle Number</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>RTO Code</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Fuel Type</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Status</strong></TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>{vehicle.userId}</TableCell>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>{vehicle.vehicleNumber}</TableCell>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>{vehicle.rtoCode}</TableCell>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>{vehicle.fuelType}</TableCell>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>
                  {getStatusChip(vehicle.status)} {/* Display the Chip with status */}
                </TableCell>
                <TableCell sx={{ padding: '13px',fontFamily: "'Poppins', sans-serif" }}>
                  {/* Replaced Edit and Delete icons with View icon */}
                  <IconButton onClick={() => handleView(vehicle.id)} color="primary">
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
        count={filteredVehicleData.length}  // Total number of items after filtering
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
