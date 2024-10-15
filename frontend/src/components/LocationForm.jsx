import React, { useState } from 'react';
import axios from 'axios';
import ViewAvailableList from './viewAvailableList'; // Ensure correct import path
import locations from '../../../../taxiAppAdmin/admin-portal-frontend/src/config/Locations'; // Ensure correct import path
import '../LocationForm.css';

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

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="form-container">
      <h1>{language === 'en' ? 'Select Your Pickup Location' : 'ඔබේ ස්ථානය තෝරන්න'}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              className='dropbox1'
              value={pickupLocation}
              onChange={handleLocationChange}
              required
            >
              <option value="" disabled>Select your pickup location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={language}
              onChange={(e) => toggleLanguage(e.target.value)}
              style={{ padding: '5px', marginLeft: '10px', borderRadius: '5px' }}
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
            </select>
          </div>

          <button
            type="submit"
            className="find-drivers-btn"
            style={{ padding: '10px 20px', 
              backgroundColor: 'red', 
              color: 'black', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}
          >
            {language === 'en' ? 'Find Drivers' : 'රියදුරන් සොයන්න'}
          </button>
        </div>
      </form>
      {error && <div>{error}</div>}
      {showDrivers && <ViewAvailableList drivers={drivers} language={language} />} {/* Pass language prop here */}
    </div>
  );
};

export default LocationForm;
