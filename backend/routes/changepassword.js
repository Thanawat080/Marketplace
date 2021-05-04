const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();
const bcrypt = require('bcrypt');

router.put("/changepassword", async function(req,res,next){
    const password = await bcrypt.hash(req.body.password, 5);
    const old = req.body.oldpassword;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
   
    try {
        console.log(req.session.userdata.password)
        if (!(await bcrypt.compare(old, req.session.userdata.password))) {
            throw new Error('incorrectpassword')
        }

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