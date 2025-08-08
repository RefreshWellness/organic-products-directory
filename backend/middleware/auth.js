const jwt = require('jsonwebtoken');
const db = require('../db');
const { getUserById } = require('../models');

module.exports = {
  requireAuth: (req,res,next)=>{
    const h = req.headers.authorization||'';
    const token = h.replace('Bearer ','');
    if(!token) return res.status(401).json({error:'missing token'});
    try{
      const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = data;
      next();
    }catch(e){
      return res.status(401).json({error:'invalid token'});
    }
  },
  requireAdmin: (req,res,next)=>{
    module.exports.requireAuth(req,res,()=>{
      const dbUser = getUserById(req.user.id);
      if(!dbUser || dbUser.is_admin !== 1) return res.status(403).json({error:'admin required'});
      next();
    })
  }
};
