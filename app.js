import express from 'express';
import {PORT} from './config/env.js';
const app = express();
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the Subscriptions Tracker API!');
});

// Start the server 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





export default app;
