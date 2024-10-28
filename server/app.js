const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  // origin: 'http://localhost:3000',
  credentials: true,
}));

// Routes
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const associationRoutes = require('./routes/associationRoutes');
const appraisalRoutes = require('./routes/appraisalRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/formAssociation', associationRoutes);
app.use('/api/appraisals', appraisalRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err, "Error 32 ")
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(()=>{

  console.log("Database has been connected.")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err)=>{
  console.log("Something went wrong to connect DB.")
})
