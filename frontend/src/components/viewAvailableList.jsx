import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button, Collapse, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import '../ViewAvailableList.css';
import PhoneIcon from '@mui/icons-material/Phone';


const ViewAvailableList = ({ drivers, language }) => { // Ensure language is received as prop

  const [expandedDriverId, setExpandedDriverId] = useState(null);

  const handleDriverClick = (driverId) => {
    setExpandedDriverId((prevId) => (prevId === driverId ? null : driverId));
  };

  const callDriver = (driverPhone) => {
    alert(`Calling C APP driver... `);
  };

  return (
    <Container className='outerbox1' sx={{ padding: '20px', bgcolor: '#F5EFFF', borderRadius: '10px' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'textSecondary' }}>
        {language === 'en' ? 'Available Drivers' : 'ලබාගත හැකි රියදුරන්'}
      </Typography>

      <Stack direction="column" spacing={3}>
        {drivers.length > 0 ? (
          drivers.map((driver) => (
            <Card
              key={driver.id}
              variant="outlined"
              sx={{
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '15px',
                bgcolor: driver.driverAvailability ? '#d3d9d4' : '#CDC1FF',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  onClick={() => handleDriverClick(driver.id)}
                  style={{ cursor: 'pointer', color: '#A594F9', display: 'flex', alignItems: 'center' }}
                >
                  {driver.driverAvailability ? (
                    <CheckCircleIcon sx={{ color: 'green', marginRight: '8px' }} />
                  ) : (
                    <CancelIcon sx={{ color: 'red', marginRight: '8px' }} />
                  )}
                  {driver.driverName}
                </Typography>
                <Collapse in={expandedDriverId === driver.id}>
                  <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <Typography color="textSecondary">
                      {language === 'en' ? 'Availability:' : 'ඇත:'}
                      <span style={{ color: driver.driverAvailability ? 'green' : 'red', fontWeight: 'bold' }}>
                        {driver.driverAvailability ? (language === 'en' ? ' Available' : ' සේවාව ලබා ගත හැක.') : (language === 'en' ? ' Unavailable' : ' ලබා ගත නොහැක')}
                      </span>
                    </Typography>
                    <Typography color="textSecondary">
                      {language === 'en' ? 'Phone Number:' : 'දුරකථන අංකය:'} {driver.driverPhone}
                    </Typography>
                    <Typography color="textSecondary">
                      {language === 'en' ? 'Vehicle Color:' : 'වාහනයේ පැහැය:'} {driver.vehicleColor}
                    </Typography>
                    <Typography color="textSecondary">
                      {language === 'en' ? 'License Plate:' : 'වාහන අංකය:'} {driver.vehicleLicencePlate}
                    </Typography>
                    <Typography color="textSecondary">
                      {language === 'en' ? 'Location:' : 'ස්ථානය:'} {driver.driverLocation}
                    </Typography>
                  </Stack>
                </Collapse>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    borderRadius: '25px',
                    backgroundColor: '#4CAF50 !important', // Green background
                    '&:hover': {
                      backgroundColor: '#d32f2f !important', // Darker red on hover
                    },
                    textTransform: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => callDriver(driver.driverPhone)}
                >
                  <PhoneIcon sx={{ marginRight: '5px' }} /> 
                  {language === 'en' ? 'Call Driver' : 'රියදුරා අමතන්න'}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography align="center" sx={{ color: '#9e9e9e', fontStyle: 'italic' }}>
            {language === 'en' ? 'No drivers available for the selected location.' : 'තෝරා ගත් ස්ථානයට සම්බන්ධ රියදුරන් නොමැත.'}
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default ViewAvailableList;
