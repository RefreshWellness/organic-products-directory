const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const models = require('../models');
const auth = require('../middleware/auth');

router.get('/', (req,res)=> res.json(models.listCats()));
router.post('/', auth.requireAdmin, (req,res)=>{
  const { name } = req.body;
  if(!name) return res.status(400).json({error:'missing name'});
  const id = uuidv4();
  models.createCat(id,name);
  res.json({id,name});
});
router.put('/:id', auth.requireAdmin, (req,res)=>{
  const { id } = req.params;
  const { name } = req.body;
  models.updateCat(name,id);
  res.json({ok:true});
});
router.delete('/:id', auth.requireAdmin, (req,res)=>{
  models.deleteCat(req.params.id);
  res.json({ok:true});
});

module.exports = router;
