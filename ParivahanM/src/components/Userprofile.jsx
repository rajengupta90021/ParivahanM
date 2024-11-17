import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid, Divider, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


export const Userprofile = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Administrator',
        joined: 'January 1, 2022',
        department: 'IT Management',
        location: 'New York Office'
    });

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSave = () => {
        // Save logic here (e.g., API call)
        handleCloseModal();
    };

    return (
       
            <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#e0f7fa', overflowY: 'auto', flexGrow: 1 }}>
                <Box component="main" sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        
                        <img src="/images/parivahan.png" alt="Logo" style={{ height: 200, marginBottom: '16px' }} />
                        <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                            BALAJIMOTERS
                        </Typography>
                    </Box>

                    <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
                        Admin Profile
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxShadow: 3, borderRadius: 2 }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 120, height: 120, mb: 2, border: '2px solid #00796b' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_FHH9UN-qe_ilF69vUpgxa1UJ6P_f3PTaA&s" alt="Admin Avatar" />
                                    <Typography variant="h5" component="div" sx={{ mb: 1, fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                                        {userInfo.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {userInfo.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                                        Profile Information
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
                                        <strong>Role:</strong> {userInfo.role}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2 }}>
                                        <strong>Joined:</strong> {userInfo.joined}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
                                        <strong>Department:</strong> {userInfo.department}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}>
                                        <strong>Location:</strong> {userInfo.location}
                                    </Typography>
                                    <Box sx={{ mt: 'auto', position: 'relative' }}>
                                        <IconButton onClick={handleOpenModal} sx={{ position: 'absolute', bottom: 40, right: 16 }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Modal for Editing User Info */}
                {/* <Dialog open={modalOpen} onClose={handleCloseModal}>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Role"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="role"
                            value={userInfo.role}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Joined Date"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="joined"
                            value={userInfo.joined}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Department"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="department"
                            value={userInfo.department}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Location"
                            type="text"
                            fullWidth
                            variant="outlined"
                            name="location"
                            value={userInfo.location}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
    <Button 
        onClick={handleSave} 
        sx={{ color: 'white', '&:hover': {  } }}
    >
        Save
    </Button>
    <Button 
        onClick={handleCloseModal} 
        sx={{ backgroundColor: '#e0e0e0', color: '#000000', '&:hover': { backgroundColor: '#bdbdbd' } }}
    >
        Cancel
    </Button>
</DialogActions>

                </Dialog> */}
            </Box>
        
    );
};
