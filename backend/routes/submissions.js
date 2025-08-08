const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const models = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth.requireAuth, (req,res)=>{
  const { url, title, description, tags, company, category_id } = req.body;
  if(!url||!title) return res.status(400).json({error:'missing fields'});
  const id = uuidv4();
  models.createSubmission({id,url,title,description,tags,company,category_id,user_id:req.user.id});
  res.json({ok:true});
});

// list (admin sees all, public sees only approved)
router.get('/', (req,res)=>{
  const authHeader = (req.headers.authorization||'').replace('Bearer ','');
  if(!authHeader) return res.json(models.listSubmissions(true));
  // try to verify token
  const jwt = require('jsonwebtoken');
  try{
    const data = jwt.verify(authHeader, process.env.JWT_SECRET || 'secret');
    // if admin show all
    const user = require('../models').getUserById(data.id);
    if(user && user.is_admin===1) return res.json(models.listSubmissions(false));
    return res.json(models.listSubmissions(true));
  }catch(e){
    return res.json(models.listSubmissions(true));
  }
});

router.post('/:id/approve', auth.requireAdmin, (req,res)=>{
  models.approveSubmission(req.params.id,1);
  res.json({ok:true});
});

router.delete('/:id', auth.requireAdmin, (req,res)=>{
  models.deleteSubmission(req.params.id);
  res.json({ok:true});
});

module.exports = router;
