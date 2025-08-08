const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const models = require('../models');
const db = require('../db');
const sendEmail = require('../utils/email');

router.post('/register', async (req,res)=>{
  const { name, email, password } = req.body;
  if(!name||!email||!password) return res.status(400).json({error:'missing fields'});
  if(models.getUserByEmail(email)) return res.status(400).json({error:'email exists'});
  const hash = await bcrypt.hash(password,10);
  const id = uuidv4();
  models.createUser({id,name,email,password:hash});
  const token = jwt.sign({id,email}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'});
  res.json({token});
});

router.post('/login', async (req,res)=>{
  const { email, password } = req.body;
  const user = models.getUserByEmail(email);
  if(!user) return res.status(400).json({error:'invalid'});
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(400).json({error:'invalid'});
  const token = jwt.sign({id:user.id,email:user.email}, process.env.JWT_SECRET || 'secret', {expiresIn:'7d'});
  res.json({token, is_admin: user.is_admin===1});
});

router.post('/forgot', async (req,res)=>{
  const { email } = req.body;
  const user = models.getUserByEmail(email);
  if(!user) return res.json({ok:true}); // don't reveal
  const token = uuidv4();
  const exp = Date.now() + (1000*60*60); // 1 hour
  models.saveResetToken(user.id, token, exp);
  const resetUrl = (process.env.FRONTEND_URL||'http://localhost:3000') + '/reset-password?token=' + token;
  await sendEmail(email, 'Password reset', `Reset here: ${resetUrl}`);
  res.json({ok:true});
});

router.post('/reset', async (req,res)=>{
  const { token, password } = req.body;
  const row = models.findByResetToken(token);
  if(!row) return res.status(400).json({error:'invalid or expired'});
  const hash = await bcrypt.hash(password,10);
  models.updatePassword(row.id, hash);
  res.json({ok:true});
});

module.exports = router;
