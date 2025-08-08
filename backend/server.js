const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const subRoutes = require('./routes/submissions');
const catRoutes = require('./routes/categories');
const db = require('./db');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/submissions', subRoutes);
app.use('/api/categories', catRoutes);

// simple health
app.get('/api/health', (req,res)=>res.json({ok:true}));

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Backend listening on', port));
