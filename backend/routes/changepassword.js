const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();


router.put("/changepassword", async function(req,res,next){
    const password = req.body.password;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
   
    try {
        await conn.query('UPDATE user SET password=? WHERE id=?', [password, req.session.userdata.id])
        await conn.commit()
        req.session.userdata.password = req.body.password
        res.send("success")
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})



exports.router = router;