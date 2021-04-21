const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();


router.put("/profile", async function(req,res,next){
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const email = req.body.email;
    const phone_number = req.body.phone_number;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
 
    try {
        await conn.query('SELECT * FROM user WHERE username = ? AND password = ?', [req.session.userdata.username, req.session.userdata.password])
        console.log(req.session.userdata.f_name)    
        res.send(req.session.userdata)
        await conn.query('UPDATE user SET f_name = ?, l_name = ?, phone_number = ?, email = ?',[f_name, l_name, phone_number, email])
        await conn.commit()
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})



exports.router = router;