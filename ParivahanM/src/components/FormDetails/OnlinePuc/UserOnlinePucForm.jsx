import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Paper, Box, Avatar, Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mock data for vehicle details
const vehicleDetails = [
  {
    vehicleNo: 'MH12AB1234',
    rtoCode: 'MH12',
    fuelType: 'Petrol',
    frontImage: 'https://forumstatic.oneplusmobile.com/opforum-gl/upload/image/front/thread/20220615/7956362/1089258415668592646/1089258415668592646.jpg',
    backImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNgZDieWvE2y58E7f3cHQzdxOkAzoxJVOIg&s',
  },
  {
    vehicleNo: 'TN09XY5678',
    rtoCode: 'TN09',
    fuelType: 'Diesel',
    frontImage: 'https://forumstatic.oneplusmobile.com/opforum-gl/upload/image/front/thread/20220615/7956362/1089258415668592646/1089258415668592646.jpg',
    backImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNgZDieWvE2y58E7f3cHQzdxOkAzoxJVOIg&s',
  },
  {
    vehicleNo: 'KA03AB9876',
    rtoCode: 'KA03',
    fuelType: 'Electric',
    frontImage: 'https://forumstatic.oneplusmobile.com/opforum-gl/upload/image/front/thread/20220615/7956362/1089258415668592646/1089258415668592646.jpg',
    backImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNgZDieWvE2y58E7f3cHQzdxOkAzoxJVOIg&s',
  },
];

export default function UserOnlinePucForm() {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [expanded, setExpanded] = useState(false);

  // Handle accordion expansion
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle opening the modal with the selected image
  const handleClickOpen = (imageUrl) => {
    setCurrentImage(imageUrl);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setCurrentImage('');
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f6f8', fontFamily: 'Poppins, sans-serif' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        color="primary"
        style={{ fontWeight: 'bold', color: '#1976d2',fontFamily: 'Poppins, sans-serif' }}
      >
        User Online PUC Form Details
      </Typography>

      <Grid container spacing={3}>
        {vehicleDetails.map((vehicle, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              style={{
                padding: '16px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                position: 'relative', // Needed for positioning the button
              }}
            >
              <Accordion 
                expanded={expanded === index} 
                onChange={handleChange(index)} 
                style={{ marginBottom: '16px', borderRadius: '12px' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  style={{
                    backgroundColor: '#e3f2fd',
                    padding: '12px 16px',
                    borderRadius: '8px',
                  }}
                >
                  <Typography 
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.1rem', 
                      color: '#1976d2',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Vehicle No:  {vehicle.vehicleNo}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails 
                  style={{
                    padding: '16px',
                    backgroundColor: '#f1f8e9',
                    borderRadius: '8px',
                    position: 'relative', // Needed for positioning the button
                  }}
                >
                  <Box>
                    {/* Display Vehicle Info */}
                    <Box style={{ marginBottom: '16px', width: '100%' }}>
                      <Typography style={{ marginBottom: '12px', fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                        <strong>RTO Code:</strong> <span style={{ marginLeft: '15px' }}>{vehicle.rtoCode}</span>
                      </Typography>
                      <Typography style={{ marginBottom: '12px', fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                      <strong>Fuel Type:</strong> <span style={{ marginLeft: '15px' }}>{vehicle.fuelType}</span>
                      </Typography>

                      {/* Front and Back Images with Hover Effect */}
                      <Typography style={{ marginBottom: '12px', fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                        <strong>Front Image:</strong>
                        <Avatar
                          src={vehicle.frontImage}
                          alt="Front Image"
                          style={{
                            width: '100px',
                            height: '100px',
                            marginLeft: '8px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                          }}
                          onClick={() => handleClickOpen(vehicle.frontImage)}
                        />
                      </Typography>
                      <Typography style={{ marginBottom: '12px', fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}>
                        <strong>Back Image:</strong>
                        <Avatar
                          src={vehicle.backImage}
                          alt="Back Image"
                          style={{
                            width: '100px',
                            height: '100px',
                            marginLeft: '8px',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                          }}
                          onClick={() => handleClickOpen(vehicle.backImage)}
                        />
                      </Typography>
                    </Box>

                    {/* Upload Document Button with Modern Style */}
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        position: 'absolute', 
                        bottom: '16px', // Position it at the bottom
                        right: '16px', // Position it at the right
                        padding: '12px 24px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    
                    >
                      Upload Document
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog to show full image */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <img 
            src={currentImage} 
            alt="Full View" 
            style={{ width: '100%', height: 'auto' }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
