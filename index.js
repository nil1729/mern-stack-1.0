if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Importing all necessary modules
const express = require('express'),
	mysql = require('mysql'),
	app = express();

// Middleware read JSON Request Body
app.use(express.json());

// Database Setup (Create Connection to Database)
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_USER_PASSWORD,
	database: process.env.DB_DATABASE,
});

// Connect to Database
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Database connection established');
});

// Set (db) as global variable
global.db = db;

// PORT for this Web Application
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`);

	// Closed the Server
	server.close(() => {
		console.log('Server closed due to unhandled promise rejection');
		process.exit(1);
	});
});
