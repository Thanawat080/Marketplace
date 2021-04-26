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
          if(req.session.userdata.usertype == 'buyer'){
            await conn.query("INSERT INTO `order`(`buyer_id`, `order_price`, `date`, `address`) VALUES(?, ?, ?, ?);", 
            [req.session.userdata.id, null, null, null]) 
          }
          res.send("success")   
        } else {
          res.send('Incorrect Username and/or Password!');
        }
    await conn.commit()
    console.log(req.body.username)
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

router.delete('/logout', async (req, res, next)=>{
  if(req.session.userdata.usertype === 'buyer'){
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try{
      const checkk = await pool.query("SELECT * from `order_detail` where order_id = (SELECT MAX(order_id) FROM `order`)")
      if(checkk[0].length === 0){
        const id = await pool.query("SELECT MAX(order_id) id FROM `order`")
        await pool.query("DELETE FROM `order` where order_id = ?", [id[0][0].id])
      }
      console.log('test')
      req.session.destroy()
      await conn.commit()
      res.json(checkk)
    }catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      console.log("finally");
      conn.release();
    }
  }
  else{
    req.session.destroy()
  }

  
})

exports.router = router;