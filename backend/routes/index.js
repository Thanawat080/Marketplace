const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
router = express.Router();


router.get("/index", async function(req,res,next){
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        const [rows, fields] = await pool.query(
            `SELECT a.*, b.category_name FROM product AS a LEFT JOIN 
            (SELECT * FROM product_picture) AS b ON a.id = b.product_id;`
          );
          console.log(rows)
        
        await conn.commit()
        res.send(rows)
        console.log(result[0][0])
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }

})


router.post("/search", async function (req, res, next) {
  const search = req.body.search;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const rows1 = await pool.query(
      `SELECT a.*, b.category_name FROM product AS a LEFT JOIN 
            (SELECT * FROM product_picture) AS b ON a.id = b.product_id where p_name in (?);`,[search]
    );
    res.send(rows1[0])
    console.log(search)
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }

})





exports.router = router;