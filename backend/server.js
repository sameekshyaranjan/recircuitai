const dotenv = require('dotenv');
// Load env vars FIRST, before requiring anything else
dotenv.config();

const app = require('./app');
const connectDB = require('./src/config/db');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
