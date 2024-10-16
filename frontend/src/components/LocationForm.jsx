import React, { useState } from 'react';
import axios from 'axios';
import ViewAvailableList from './viewAvailableList'; // Ensure correct import path
import locations from '../config/Locations'; // Ensure correct import path
import { TextField, MenuItem, Button, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'



const LocationForm = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [drivers, setDrivers] = useState([]); // Array to hold all drivers
  const [showDrivers, setShowDrivers] = useState(false);
  const [error, setError] = useState(null); // To capture errors
  const [language, setLanguage] = useState('en');

  const handleLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8081/drivers?location=${pickupLocation}`);
      setDrivers(response.data); // Set all drivers returned
      setShowDrivers(true); // Show the drivers table
      setError(null);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Error fetching drivers. Please try again later."); // Set error state
      setShowDrivers(false);
    }
  };

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
    }
  };

  return (
    <div style={{
      padding: '20px', textAlign: 'center',
      backgroundColor: '#e8f5e9', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#3c3c3c' }}>
        {language === 'en' ? 'Select Your Pickup Location' : 'ඔබේ ස්ථානය තෝරන්න'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px', justifyContent: 'center' }}>
          <TextField
            select
            label={language === 'en' ? 'Pickup Location' : 'ස්ථානය'}
            value={pickupLocation}
            onChange={handleLocationChange}
            fullWidth
            variant="outlined"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#e0f7fa', // Light blue background for the dropdown
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#00796b', // Green border
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#004d40', // Darker green on hover
              },
              minWidth: '250px',
            }}
          >
            <MenuItem value="" disabled>
              {language === 'en' ? 'Select your pickup location' : 'ඔබේ ස්ථානය තෝරන්න'}
            </MenuItem>
            {locations.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={handleLanguageChange}
            sx={{ marginLeft: '10px', display: 'flex', borderRadius: '12px', backgroundColor: '#e0f7fa' }} // Background color for the group
          >
            <ToggleButton
              value="en"
              sx={{
                border: 'none',
                color: language === 'en' ? '#FFD700' : '#B0BEC5', // Gold for active, light gray for inactive
                backgroundColor: language === 'en' ? '#00796B !important' : '#B2DFDB !important', // Teal for active, light teal for inactive
                padding: '15px 20px',
                borderRadius: '12px',
              }}
            >
              English
            </ToggleButton>
            <ToggleButton
              value="si"
              sx={{
                border: 'none',
                color: language === 'si' ? '#FFD700' : '#B0BEC5', // Gold for active, light gray for inactive
                backgroundColor: language === 'si' ? '#FF5722 !important' : '#B2DFDB !important', // Deep Orange for active, light teal for inactive
                padding: '15px 20px',
                borderRadius: '12px',
              }}
            >
              සිංහල
            </ToggleButton>


          </ToggleButtonGroup>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#66B2FF !important', // Background color for the button
            color: 'black', // Black text color for contrast
            padding: '12px 24px', // Slightly increased padding for a larger button
            borderRadius: '12px',
            marginTop: '20px',
            fontFamily: '"Noto Sans Sinhala", sans-serif', // Add a suitable font family
            fontWeight: 'bold', // Make the text bold
            fontSize: '1.2rem', // Increase font size for better visibility
          }}
        >
          <SearchIcon/>
          {language === 'en' ? 'Find Drivers' : 'රියදුරන් සොයන්න'}
        </Button>
        
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {showDrivers && <ViewAvailableList drivers={drivers} language={language} />}
    </div>
  );
};

export default LocationForm;
