const express = require('express');
const mongoose = require('mongoose');
const requestRoutes = require('./routes/requestRoutes');
const { mongoURI } = require('./config/config');

const app = express();
app.use(express.json());
app.use('/api', requestRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
