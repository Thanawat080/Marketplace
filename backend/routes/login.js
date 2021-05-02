const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const { isLoggedIn } = require('../middlewares')



router = express.Router();



router.post("/login", async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    let result = await conn.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password])
    if (result[0].length > 0) {
      req.session.userdata = result[0][0]
      if (req.session.userdata.usertype == 'buyer') {
        let order = await conn.query('SELECT * FROM `order` WHERE buyer_id = ?', [req.session.userdata.id])
        console.log(order[0].length)
        if (order[0].length == 0) {
          await conn.query("INSERT INTO `order`(`buyer_id`, `order_price`, `date`, `address`) VALUES(?, ?, ?, ?)",
            [req.session.userdata.id, null, null, null])
          res.send("success")
        }
        else{
          res.send("success")
        }
      }
      else{
        res.send("success")
      }
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

router.get("/login", isLoggedIn ,function (req, res, next) {
  res.json(req.user)

})

router.delete('/logout', async (req, res, next) => {
  try {
    req.session.destroy()
    res.json('test')
  } catch (err) {
    return res.status(400).json(err);
  } finally {
    console.log("finally");
  }
})

exports.router = router;
