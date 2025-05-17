const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const teacherRoutes = require('./routes/teacherRoutes');
app.use('/api/teacher', teacherRoutes);


const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);


// Connect to DB
mongoose.connect('mongodb://localhost:27017/gradescope', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('DB error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
