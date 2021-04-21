const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

router.post("/register", async function(req, res, next){
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const usertype = req.body.usertype;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query("INSERT INTO user(f_name, l_name, username, password, email, phone_number, usertype) VALUES(?, ?, ?, ?, ?, ?, ?);", 
    [f_name, l_name, username, password, email, phone_number, usertype])  
    await conn.commit()
    res.send("success!");
    
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})
router.post("/register/owner_marketplace", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT MAX(id) id FROM user")  
    await conn.query("INSERT INTO owner_marketplace(id) VALUES(?);", 
    [result[0][0].id])
    await conn.commit()

    res.send(result[0][0].id+"");
  
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})
router.post("/register/buyer", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT MAX(id) id FROM user")  
    await conn.query("INSERT INTO buyer(id) VALUES(?);", 
    [result[0][0].id])
    await conn.commit()

    res.send(result[0][0].id+"");
  
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})
router.post("/register/seller", async function(req, res, next){
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query("SELECT MAX(id) id FROM user")  
    await conn.query("INSERT INTO seller(id) VALUES(?);", 
    [result[0][0].id])
    await conn.commit()

    res.send(result[0][0].id+"");
  
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})


exports.router = router;