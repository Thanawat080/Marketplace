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
        await conn.query('UPDATE user SET f_name=?, l_name=?, email=?, phone_number=? WHERE id=?', [f_name, l_name, email, phone_number, req.session.userdata.id])
        await conn.commit()
        req.session.userdata.f_name = req.body.f_name
        req.session.userdata.l_name = req.body.f_name
        req.session.userdata.email = req.body.email
        req.session.userdata.phone_number = req.body.phone_number
        res.json('success')
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})



exports.router = router;