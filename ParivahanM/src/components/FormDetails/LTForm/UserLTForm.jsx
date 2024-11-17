import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Paper, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Mock data for the form
const details = [
  {
    applicationNo: '123456',
    dob: '01-01-1990',
    llPassword: 'password123',
    rtoCode: 'ABC123',
    country: 'Country1',
    state: 'State1',
    city: 'City1',
  },
  {
    applicationNo: '654321',
    dob: '02-02-1985',
    llPassword: 'password456',
    rtoCode: 'DEF456',
    country: 'Country2',
    state: 'State2',
    city: 'City2',
  },
  {
    applicationNo: '123456',
    dob: '01-01-1990',
    llPassword: 'password123',
    rtoCode: 'ABC123',
    country: 'Country1',
    state: 'State1',
    city: 'City1',
  },
  {
    applicationNo: '654321',
    dob: '02-02-1985',
    llPassword: 'password456',
    rtoCode: 'DEF456',
    country: 'Country2',
    state: 'State2',
    city: 'City2',
  },
  {
    applicationNo: '123456',
    dob: '01-01-1990',
    llPassword: 'password123',
    rtoCode: 'ABC123',
    country: 'Country1',
    state: 'State1',
    city: 'City1',
  },
  {
    applicationNo: '654321',
    dob: '02-02-1985',
    llPassword: 'password456',
    rtoCode: 'DEF456',
    country: 'Country2',
    state: 'State2',
    city: 'City2',
  },
  
  // Add more objects as needed
];

export default function UserLTForm() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f6f8' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        align="center" 
        color="primary"
        style={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        User LT Form Details
      </Typography>

      <Grid container spacing={3}>
        {details.map((entry, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              style={{
                padding: '16px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}
            >
              <Accordion style={{ marginBottom: '16px', borderRadius: '8px' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  style={{
                    backgroundColor: '#e3f2fd',
                    padding: '8px 16px',
                    borderRadius: '8px'
                  }}
                >
                  <Typography 
                    style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.2rem', 
                      color: '#1976d2' 
                    }}
                  >
                    Application No: {entry.applicationNo}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails 
                  style={{
                    padding: '16px',
                    backgroundColor: '#f1f8e9',
                    borderRadius: '8px'
                  }}
                >
                  <Box>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>Date of Birth:</strong> {entry.dob}
                    </Typography>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>LL Password:</strong> {entry.llPassword}
                    </Typography>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>RTO Code:</strong> {entry.rtoCode}
                    </Typography>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>Country:</strong> {entry.country}
                    </Typography>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>State:</strong> {entry.state}
                    </Typography>
                    <Typography 
                      style={{ marginBottom: '8px', fontSize: '1rem' }}
                    >
                      <strong>City:</strong> {entry.city}
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
