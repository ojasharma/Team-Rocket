const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
