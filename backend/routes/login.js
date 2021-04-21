const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");



router = express.Router();



router.post("/login", async function(req, res, next){

  const username = req.body.username;
  const password = req.body.password;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password])
        if (result[0].length > 0) {
          req.session.userdata = result[0][0]
          res.send("success")   
        } else {
          res.send('Incorrect Username and/or Password!');
        }
    await conn.commit()
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})

router.get("/login", function(req,res,next){
  if(req.session.userdata){
    res.send(req.session.userdata)
  }else{
    res.sendStatus(404)
  }

})



exports.router = router;