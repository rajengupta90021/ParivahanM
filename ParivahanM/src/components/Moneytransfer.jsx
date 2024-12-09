import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Box, Chip, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, CircularProgress, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { PaymentRepository } from '../Services/PaymentRepository';
import { showSuccessToast } from '../helper/toast';
import { updateTransactionStatus } from '../Services/LTFFrom';
import { updateUser } from '../Services/UserService';

export default function Moneytransfer() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [userId, setUserId] = useState('');
  const [newWalletAmount, setNewWalletAmount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);

  // State for image modal
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // State to toggle between "Show All" or "Show Pending"
  const [showCompletedStatus, setShowCompletedStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentData = await PaymentRepository();
        const sortedTransactions = paymentData.sort((a, b) => b.timestamp._seconds - a.timestamp._seconds);
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Handle toggling of the switch
  const handleStatusSwitchChange = (event) => {
    setShowCompletedStatus(event.target.checked);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase();
    const isSearchMatch = (transaction.userId && transaction.userId.toLowerCase().includes(query)) ||
                          (transaction.transactionId && transaction.transactionId.toLowerCase().includes(query));
    const isStatusMatch = showCompletedStatus
      ? transaction.status === 'Completed' // Show completed only
      : transaction.status === 'Pending'; // Show pending only
    return isSearchMatch && isStatusMatch;
  });

  const handleEditClick = (transactionId, userId) => {
    setTransactionId(transactionId);
    setUserId(userId);
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (transactionId && newWalletAmount !== '') {
      setLoading(true);
      try {
        await updateUser(userId, { wallet: newWalletAmount });
        await updateTransactionStatus(transactionId, transactionStatus);

        setTransactions(transactions.map(txn =>
          txn.transactionId === transactionId
            ? { ...txn, wallet: newWalletAmount, status: transactionStatus }
            : txn
        ));

        showSuccessToast('Wallet and Transaction Status updated successfully!');
        setOpenModal(false);
      } catch (error) {
        console.error('Error updating wallet or transaction status:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Invalid input data');
    }
  };

  const renderStatusChip = (status) => {
    switch (status) {
      case 'Pending':
        return <Chip variant='outlined' label="Pending" color="warning" />;
      case 'Completed':
        return <Chip variant='outlined' label="Completed" color="success" />;
      case 'Failed':
        return <Chip variant='outlined' label="Failed" color="error" />;
      default:
        return <Chip variant='outlined' label="Unknown" color="default" />;
    }
  };

  // Open the image modal when an image is clicked
  const handleImageClick = (url) => {
    setImageUrl(url); // Set the clicked image URL
    setOpenImageModal(true); // Open the image modal
  };

  return (
    <Paper sx={{ height: '86vh', width: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2,marginTop: -3 }}>
        <h2 style={{ color: 'black' }}>Wallets</h2>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

        <Box sx={{ marginLeft: 2 }}>
            <span>Show Completed:</span>
            <Switch
              checked={showCompletedStatus}
              onChange={handleStatusSwitchChange}
              name="showCompletedStatus"
              color="primary"
            />
          </Box>
          <TextField label="Search by User ID, Transaction ID" value={searchQuery} onChange={handleSearchChange} size="small" sx={{ width: 350 }} />
          
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: 'auto', flex: 1, marginTop: -3 }}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#cad0f8' }}>
            <TableRow>
              {/* <TableCell><strong>ID</strong></TableCell> */}
              <TableCell><strong>User ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Transaction ID</strong></TableCell>
              <TableCell><strong>Screenshot</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.transactionId}>
                {/* <TableCell>{transaction.id}</TableCell> */}
                <TableCell>{transaction.userId}</TableCell>
                <TableCell>{renderStatusChip(transaction.status)}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>
                  <img
                    src={transaction.paymentScreenshotUrl || 'https://via.placeholder.com/50'}
                    alt="screenshot"
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                    onClick={() => handleImageClick(transaction.paymentScreenshotUrl)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(transaction.transactionId, transaction.userId)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[6, 10, 20, 50, 150, 200]}
        component="div"
        count={filteredTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for updating wallet and transaction status */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Wallet and Transaction Status</DialogTitle>
        <DialogContent>
          <TextField
            label="Wallet Amount"
            type="number"
            value={newWalletAmount}
            onChange={(e) => setNewWalletAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Transaction Status</FormLabel>
            <RadioGroup
              row
              value={transactionStatus}
              onChange={(e) => setTransactionStatus(e.target.value)}
            >
              <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
              <FormControlLabel value="Completed" control={<Radio />} label="Completed" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">Cancel</Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for image */}
      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Transaction Screenshot</DialogTitle>
        <DialogContent>
          <img src={imageUrl} alt="Transaction Screenshot" style={{ width: '100%', objectFit: 'contain' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageModal(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
