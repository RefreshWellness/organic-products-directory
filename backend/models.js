const db = require('./db');
module.exports = {
  getUserByEmail: (email) => db.prepare('SELECT * FROM users WHERE email=?').get(email),
  getUserById: (id) => db.prepare('SELECT * FROM users WHERE id=?').get(id),
  createUser: (user) => db.prepare('INSERT INTO users (id,name,email,password,is_admin) VALUES (?,?,?,?,?)').run(user.id,user.name,user.email,user.password, user.is_admin||0),
  saveResetToken: (id, token, exp) => db.prepare('UPDATE users SET reset_token=?, reset_expires=? WHERE id=?').run(token,exp,id),
  findByResetToken: (token) => db.prepare('SELECT * FROM users WHERE reset_token=? AND reset_expires>?').get(token,Date.now()),
  updatePassword: (id, hash) => db.prepare('UPDATE users SET password=?, reset_token=NULL, reset_expires=NULL WHERE id=?').run(hash,id),

  // categories
  listCats: () => db.prepare('SELECT * FROM categories ORDER BY name').all(),
  getCat: (id) => db.prepare('SELECT * FROM categories WHERE id=?').get(id),
  createCat: (id,name) => db.prepare('INSERT INTO categories (id,name) VALUES (?,?)').run(id,name),
  updateCat: (name,id) => db.prepare('UPDATE categories SET name=? WHERE id=?').run(name,id),
  deleteCat: (id) => db.prepare('DELETE FROM categories WHERE id=?').run(id),

  // submissions
  createSubmission: (s) => db.prepare('INSERT INTO submissions (id,url,title,description,tags,company,category_id,user_id,approved,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)').run(s.id,s.url,s.title,s.description,s.tags,s.company,s.category_id,s.user_id,s.approved||0,Date.now()),
  listSubmissions: (onlyApproved=false) => {
    if(onlyApproved) return db.prepare('SELECT * FROM submissions WHERE approved=1 ORDER BY created_at DESC').all();
    return db.prepare('SELECT * FROM submissions ORDER BY created_at DESC').all();
  },
  getSubmission: (id) => db.prepare('SELECT * FROM submissions WHERE id=?').get(id),
  approveSubmission: (id, val=1) => db.prepare('UPDATE submissions SET approved=? WHERE id=?').run(val,id),
  deleteSubmission: (id) => db.prepare('DELETE FROM submissions WHERE id=?').run(id),
};
