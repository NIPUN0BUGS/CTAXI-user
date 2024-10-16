const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', // Ensure this matches your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',  // MySQL host
    user: 'root',       // MySQL user
    password: '',       // MySQL password
    database: 'taxidb'  // Database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return; // Stop the server if database connection fails
    }
    console.log('Connected to MySQL');
});

// GET available drivers by location
app.get('/drivers', (req, res) => {
    const { location } = req.query; // Get location from query parameters

    // Validate location
    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    db.query(//fetch all available drivers according to driver location
        'SELECT * FROM drivers WHERE driverAvailability = 1 AND LOWER(driverLocation) = LOWER(?)',
        [location],
        (err, results) => {
            if (err) {
                console.error('Error querying the database:', err);
                return res.status(500).json({ error: 'Error querying the database' });
            }
            console.log(results);
            res.json(results);
        }
      );
      
      
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});
