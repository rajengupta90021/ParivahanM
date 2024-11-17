import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

  export const PageNotFound = () => {
  return (
  
     <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        padding: 3,
        height:'100%'
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 2,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 2,
          
        }}
      >
        <Typography variant="h1" component="h1" color="error" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist. It might have been moved or deleted.
        </Typography>
    
      </Box>
    </Container>
 
  );
};


