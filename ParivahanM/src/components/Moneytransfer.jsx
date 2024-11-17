import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Box, Chip, TablePagination, Modal, Box as MuiBox, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';  // Import the Edit Icon
import { userInfo } from '../constant/constant';

export default function Moneytransfer() {
  const [page, setPage] = useState(0);  // The current page
  const [rowsPerPage, setRowsPerPage] = useState(7);  // Number of rows per page
  const [hoveredImageUrl, setHoveredImageUrl] = useState(null); // Track hovered image URL
  const [openModal, setOpenModal] = useState(false); // Modal open/close state
  const [openEditModal, setOpenEditModal] = useState(false); // Modal state for editing wallet
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for editing
  const [walletAmount, setWalletAmount] = useState(''); // Track the value of the wallet field
  const [searchQuery, setSearchQuery] = useState(''); // Track the search query

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);  // Reset to first page when rows per page changes
  };

  // Open the modal with the hovered image
  const handleImageHover = (imageUrl) => {
    setHoveredImageUrl(imageUrl);
    setOpenModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setHoveredImageUrl(null);
  };

  // Open the edit modal with the selected user data
  const handleEdit = (user) => {
    setSelectedUser(user); // Store the selected user
    setWalletAmount(user.userWallet || ''); // Pre-fill with the current wallet amount
    setOpenEditModal(true); // Open the edit modal
  };

  // Close the edit modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setWalletAmount(''); // Clear the input field
  };

  // Save the changes and update the userWallet
  const handleSaveChanges = () => {
    if (selectedUser) {
      // Update the userWallet of the selected user
      const updatedUserInfo = userInfo.map(user => 
        user.userId === selectedUser.userId 
        ? { ...user, userWallet: parseFloat(walletAmount) }  // Update the wallet value
        : user
      );
      // Update the state with the new userInfo
      userInfo.splice(0, userInfo.length, ...updatedUserInfo);

      console.log(`Updated Wallet for User ID: ${selectedUser.userId} to ${walletAmount}`);
      handleCloseEditModal(); // Close the modal after saving
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the user info based on the search query
  const filteredUserInfo = userInfo.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.userId.toString().toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.RtoNumber.toLowerCase().includes(query) ||
      user.mobileNo.toLowerCase().includes(query)
    );
  });

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 2,
          marginTop: -2,
        }}
      >
        <h2 style={{ color: 'black', margin: 1 }}>Wallets</h2>

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
              top: 1,
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
                <strong>Money Received</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>UserWallet</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Update to Wallet</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Screenshot</strong>
              </TableCell>
              <TableCell sx={{ fontFamily: "'Poppins', sans-serif" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUserInfo
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: '10px' }}>{user.userId}</TableCell>
                  <TableCell sx={{ padding: '10px' }}>{user.name}</TableCell>
                  <TableCell sx={{ padding: '10px' }}>{user.RtoNumber}</TableCell>
                  <TableCell sx={{ padding: '10px' }}>{user.mobileNo}</TableCell>
                  <TableCell sx={{ padding: '6px 16px' }}>
                    <Chip
                      label={user.moneyReceived ? 'Yes' : 'No'}
                      color={user.moneyReceived ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '10px' }}> Rs:{user.userWallet} /-</TableCell>
                  <TableCell sx={{ padding: '10px' }}>
                    <Chip
                      label={user.updateToWallet ? 'Yes' : 'No'}
                      color={user.updateToWallet ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '10px', position: 'relative' }}>
                    {/* Container for the image */}
                    <div
                      onMouseEnter={() => handleImageHover(user.screenshotUrl)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={user.screenshotUrl}
                        alt={`${user.name}'s screenshot`}
                        style={{ width: 50, height: 50, borderRadius: '0%' }}
                      />
                    </div>
                  </TableCell>
                  <TableCell sx={{ padding: '10px' }}>
                    <IconButton onClick={() => handleEdit(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Control */}
      <TablePagination
        rowsPerPageOptions={[7, 10, 25, 40, 80, 100]}
        component="div"
        count={filteredUserInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Fullscreen Modal for Hovered Image */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)', // Optional: blur the background
        }}
      >
        <MuiBox
          sx={{
            position: 'relative',
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: '40vw',    // Modal width as a percentage of the viewport width
            height: '80vh',   // Modal height as a percentage of the viewport height
            maxWidth: '90%',  // Ensure the modal doesn't exceed the viewport size
            maxHeight: '90%', // Ensure the modal doesn't exceed the viewport size
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',  // Prevent the image from overflowing
          }}
        >
          <img
            src={hoveredImageUrl}
            alt="Hovered screenshot"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ensure the image is fully contained within the modal
            }}
          />
        </MuiBox>
      </Modal>

      {/* Modal for Editing Wallet */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        <MuiBox
          sx={{
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            width: 400,
            maxWidth: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3>Update Wallet</h3>
          <TextField
            label="Wallet Amount"
            value={walletAmount}
            onChange={(e) => setWalletAmount(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="outlined" onClick={handleCloseEditModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveChanges}>
              Update
            </Button>
          </Box>
        </MuiBox>
      </Modal>
    </Paper>
  );
}
